# coding:utf-8
import threading
import datetime
import signal
import sys
import time
import redis
import os
from flask import Flask, render_template, session, request, send_from_directory, make_response
from flask_socketio import SocketIO, emit, join_room, leave_room, disconnect
from gevent import monkey
monkey.patch_all()
from config import *


app = Flask(__name__)
app.debug = True
app.config.from_object('config')
socketio = SocketIO(app)
all_thread = []

__version__ = '0.4'


class RedisInfo(threading.Thread):
    """threads for RedisInfo"""
    def __init__(self, host, port, password=None):
        super(RedisInfo, self).__init__()
        self.host = host
        self.port = port
        self.password = password
        self.client = redis.StrictRedis(host=self.host, port=self.port, password=self.password)
        self.status = []
        self.table = []
        self.table_row = {}
        self.commands_chart = []
        self.mem_chart = []
        self.cpu_chart = []
        self.nowtime = datetime.datetime.now()
        self.last_total_commands_processed = 0
        self.last_expired_keys = 0
        self.last_evicted_keys = 0
        self.last_keyspace_hits = 0
        self.last_keyspace_misses = 0
        self.commands_per_seconds = 0
        self.used_cpu_user = 0
        self.used_cpu_sys = 0
        self.mem_rss = 0
        self.mem = 0
        self.event = threading.Event()

    def exec_cmd(self, *args):
        try:
            cmd_name = args[0].lower()
            if cmd_name == 'del':
                cmd_name = 'delete'
            cmd_method = getattr(self.client, cmd_name)
            result = cmd_method(*args[1:])
            if not result:
                result = 'None'
            else:
                if isinstance(result, bool):
                    result = str(result)
                else:
                    result = str(result, encoding='utf-8')
            emit('result', {'data': result, 'm_type': 'info'})
        except Exception as ex:
            emit('result', {'data': str(ex), 'm_type': 'error'})
            print(' %s ' % ex)

    def run(self):
        while 1:
            try:
                if self.event.isSet():
                    return
                redis_info = self.client.info()
                self.nowtime = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S %Z")
                # status
                self.status = []
                self.status.append({"key":'redis_server_ip' , "value": '%s:%s' % (self.host, self.port)})
                self.status.append({"key":'redis_version', "value": redis_info['redis_version']})
                self.status.append({"key":'redis_mode', "value": redis_info['redis_mode'] if 'redis_mode' in redis_info else ''})
                self.status.append({"key":'process_id',  "value":redis_info['process_id']})
                self.status.append({"key":'uptime_in_seconds', "value": redis_info['uptime_in_seconds']})
                self.status.append({"key":'uptime_in_days', "value": redis_info['uptime_in_days']})
                self.status.append({"key":'role', "value": redis_info['role']})
                self.status.append({"key":'connected_slaves',"value":  redis_info['connected_slaves']})
                self.status.append({"key":'rdb_bgsave_in_progress', "value": redis_info['rdb_bgsave_in_progress'] if 'rdb_bgsave_in_progress' in redis_info else ''})
                self.status.append({"key":'rdb_last_save_time', "value": redis_info['rdb_last_save_time'] if 'rdb_last_save_time' in redis_info else ''})
                # table
                self.table_row = {}
                # nowtime = datetime.datetime.now().strftime("%H:%M:%S")
                self.table_row["time"] = self.nowtime
                self.used_cpu_user = redis_info['used_cpu_user']
                self.used_cpu_sys = redis_info['used_cpu_sys']
                self.table_row["us"] = (self.used_cpu_user)
                self.table_row["sy"] = (self.used_cpu_sys)
                self.table_row["cl"] = (redis_info['connected_clients'])
                self.table_row["bcl"] = (redis_info['blocked_clients'])
                self.mem = round(redis_info['used_memory'] / 1024 / 1024, 2)
                self.table_row["mem"] = ('%sM' % self.mem)
                self.mem_rss = round(redis_info['used_memory_rss'] / 1024 / 1024, 2)
                self.table_row["rss"] = ('%sM' % self.mem_rss)
                keys = sum([v['keys'] for k, v in redis_info.items() if k.startswith('db') and 'keys' in v])
                self.table_row["keys"] = (keys)
                if len(self.table) == 0:
                    self.table_row["cmd"] = (0)
                    self.table_row["exp"] = (0)
                    self.table_row["evt"] = (0)
                    self.table_row["hit"] = (0)
                    self.table_row["mis"] = (0)
                else:
                    self.commands_per_seconds = (redis_info['total_commands_processed'] - self.last_total_commands_processed) / INFO_INTERVAL
                    self.table_row["cmd"] = (self.commands_per_seconds)
                    self.table_row["exp"] = ((redis_info['expired_keys'] - self.last_expired_keys) / INFO_INTERVAL)
                    self.table_row["evt"] = ((redis_info['evicted_keys'] - self.last_evicted_keys) / INFO_INTERVAL)
                    self.table_row["hit"] = ((redis_info['keyspace_hits'] - self.last_keyspace_hits) / INFO_INTERVAL)
                    self.table_row["mis"] = ((redis_info['keyspace_misses'] - self.last_keyspace_misses) / INFO_INTERVAL)

                self.last_total_commands_processed = redis_info['total_commands_processed']
                self.last_expired_keys = redis_info['expired_keys']
                self.last_evicted_keys = redis_info['evicted_keys']
                self.last_keyspace_hits = redis_info['keyspace_hits']
                self.last_keyspace_misses = redis_info['keyspace_misses']
                if redis_info['aof_enabled']:
                    self.table_row["aofcs"] = (redis_info['aof_current_size'])
                else:
                    self.table_row["aofcs"] = (0)

                self.table.append(self.table_row)
                if len(self.table) > TABLE_MAX_ROWS:
                    self.table.pop(0)
                table_result = list(reversed(self.table))
                # commands highchart
                self.commands_chart.append({'x': self.nowtime, 'y': self.commands_per_seconds})
                # cpu usage (system and user)
                self.cpu_chart.append({'x': self.nowtime, 'y_s': self.used_cpu_sys, 'y_u': self.used_cpu_user})
                # memory usage
                self.mem_chart.append({'x': self.nowtime, 'y_mem': self.mem, 'y_rss': self.mem_rss})
                # Points which are showed in every chart is set to 5 now. You can change it to any amount you want.
                if len(self.commands_chart) > 5:
                    self.commands_chart.pop(0)
                if len(self.cpu_chart) > 5:
                    self.cpu_chart.pop(0)
                if len(self.mem_chart) > 5:
                    self.mem_chart.pop(0)

                socketio.emit('response', {
                    'stat' : self.status, 'table' : table_result, 'server' : '%s:%s' % (self.host, self.port),
                    'commands' : self.commands_chart, 'cpu' : self.cpu_chart, 'mem' : self.mem_chart
                })
            except Exception as ex:
                print(ex.message)
            time.sleep(INFO_INTERVAL)

    def is_stop(self):
        return self.event.is_set()

    def stop(self):
        self.event.set()

@app.route('/')
def index():
    return make_response(open('templates/index.html').read())


@socketio.on('event')
def client_message(message):
    servers = [':'.join(s.split(':')[:2]) for s in REDIS_SERVER]
    emit('servers', {'data': servers})

@socketio.on('command_exec')
def client_command(message):
    args = message['args']
    args = tuple(args.split(','))
    cmd = message['command']
    args = (cmd,) + args
    r_server =  message['r_server']
    cmd_threads = [t for t in all_thread if '{0}:{1}'.format(t.host, t.port) == r_server]
    # print(cmd_threads)
    if cmd_threads:
        cmd_thread = cmd_threads[0]
        cmd_thread.exec_cmd(*args)
    else:
        emit('result', {'data': 'I can not find the redis server'})


@socketio.on('connect')
def client_connect():
    print('connected ....')


def signal_handler(signal, frame):
    for t in all_thread:
        t.stop()
    print('Now all of info thread are stopped!')
    sys.exit(0)

@socketio.on('disconnect')
def client_disconnect():
    print('Client disconnected')


# start all of the redis info monitor threads
for r in REDIS_SERVER:
    r_list = r.split(':')
    if len(r_list) > 2:
        r_info = RedisInfo(r_list[0], r_list[1], r_list[2])
    else:
        r_info = RedisInfo(r_list[0], r_list[1])  

    r_info.setDaemon(True)
    r_info.start()
    all_thread.append(r_info)


if __name__ == '__main__':
    signal.signal(signal.SIGINT, signal_handler)
    socketio.run(app, host='0.0.0.0', port=5000)
