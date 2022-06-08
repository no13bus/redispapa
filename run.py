# coding:utf-8
import threading
import datetime
import signal
import sys
import time
import redis
import os
# from apscheduler.schedulers.background import BackgroundScheduler
from flask import Flask, render_template, session, request, send_from_directory, make_response
from flask_socketio import SocketIO, emit, join_room, leave_room, disconnect
# from flask.ext.sqlalchemy import SQLAlchemy
# from flask_admin import Admin
# from flask_admin.contrib.sqla import ModelView
from gevent import monkey
monkey.patch_all()
from config import *


# BASE_DIR = os.path.dirname(os.path.abspath(__file__))
# db_path = os.path.join(BASE_DIR, 'redispapa.db')


app = Flask(__name__)
app.debug = True
app.config.from_object('config')
# app.config['FLASK_ADMIN_SWATCH'] = 'cerulean'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:////' + db_path
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True
# db = SQLAlchemy(app)
socketio = SocketIO(app)
all_thread = []

__version__ = '0.3'


# class RedisObj(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     host = db.Column(db.String(120))
#     port = db.Column(db.Integer)
#     password = db.Column(db.String(120))

#     def __init__(self, host=None, port=None, password=None):
#         self.host = host
#         self.port = port
#         self.password = password

#     def __repr__(self):
#         return '<Redis %r>' % self.host


# class RedisInfo(threading.Thread):
#     """threads for RedisInfo"""
#     def __init__(self, host, port, password=None):
#         super(RedisInfo, self).__init__()
#         self.host = host
#         self.port = port
#         self.password = password
#         self.client = redis.StrictRedis(host=self.host, port=self.port, password=self.password)
#         self.status = {}
#         self.table = []
#         self.table_row = []
#         self.commands_chart = []
#         self.mem_chart = []
#         self.cpu_chart = []
#         self.nowtime = datetime.datetime.now()
#         self.last_total_commands_processed = 0
#         self.last_expired_keys = 0
#         self.last_evicted_keys = 0
#         self.last_keyspace_hits = 0
#         self.last_keyspace_misses = 0
#         self.commands_per_seconds = 0
#         self.used_cpu_user = 0
#         self.used_cpu_sys = 0
#         self.mem_rss = 0
#         self.mem = 0
#         self.event = threading.Event()

#     def exec_cmd(self, *args):
#         try:
#             cmd_name = args[0].lower()
#             if cmd_name == 'del':
#                 cmd_name = 'delete'
#             cmd_method = getattr(self.client, cmd_name)
#             result = cmd_method(*args[1:])
#             if not result:
#                 result = 'None'
#             emit('result', {'data': result, 'm_type': 'info'})
#         except Exception as ex:
#             emit('result', {'data': ex.message, 'm_type': 'error'})
#             print '\033[93m %s \033[0m' % ex.message

#     def run(self):
#         while 1:
#             try:
#                 if self.event.isSet():
#                     return
#                 redis_info = self.client.info()
#                 self.nowtime = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S %Z")
#                 # status
#                 self.status['redis_server_ip'] = '%s:%s' % (self.host, self.port)
#                 self.status['redis_version'] = redis_info['redis_version']
#                 self.status['redis_mode'] = redis_info['redis_mode'] if 'redis_mode' in redis_info else ''
#                 self.status['process_id'] = redis_info['process_id']
#                 self.status['uptime_in_seconds'] = redis_info['uptime_in_seconds']
#                 self.status['uptime_in_days'] = redis_info['uptime_in_days']
#                 self.status['role'] = redis_info['role']
#                 self.status['connected_slaves'] = redis_info['connected_slaves']
#                 self.status['rdb_bgsave_in_progress'] = redis_info['rdb_bgsave_in_progress'] if 'rdb_bgsave_in_progress' in redis_info else ''
#                 self.status['rdb_last_save_time'] = redis_info['rdb_last_save_time'] if 'rdb_last_save_time' in redis_info else ''

#                 # table
#                 self.table_row = []
#                 # nowtime = datetime.datetime.now().strftime("%H:%M:%S")
#                 self.table_row.append(self.nowtime)
#                 self.used_cpu_user = redis_info['used_cpu_user']
#                 self.used_cpu_sys = redis_info['used_cpu_sys']
#                 self.table_row.append(self.used_cpu_user)
#                 self.table_row.append(self.used_cpu_sys)
#                 self.table_row.append(redis_info['connected_clients'])
#                 self.table_row.append(redis_info['blocked_clients'])
#                 self.mem = round(redis_info['used_memory'] / 1024 / 1024, 2)
#                 self.table_row.append('%sM' % self.mem)
#                 self.mem_rss = round(redis_info['used_memory_rss'] / 1024 / 1024, 2)
#                 self.table_row.append('%sM' % self.mem_rss)
#                 keys = sum([v['keys'] for k, v in redis_info.items() if k.startswith('db') and 'keys' in v])
#                 self.table_row.append(keys)
#                 if len(self.table) == 0:
#                     self.table_row.append(0)
#                     self.table_row.append(0)
#                     self.table_row.append(0)
#                     self.table_row.append(0)
#                     self.table_row.append(0)
#                 else:
#                     self.commands_per_seconds = (redis_info['total_commands_processed'] - self.last_total_commands_processed) / INFO_INTERVAL
#                     self.table_row.append(self.commands_per_seconds)
#                     self.table_row.append((redis_info['expired_keys'] - self.last_expired_keys) / INFO_INTERVAL)
#                     self.table_row.append((redis_info['evicted_keys'] - self.last_evicted_keys) / INFO_INTERVAL)
#                     self.table_row.append((redis_info['keyspace_hits'] - self.last_keyspace_hits) / INFO_INTERVAL)
#                     self.table_row.append((redis_info['keyspace_misses'] - self.last_keyspace_misses) / INFO_INTERVAL)

#                 self.last_total_commands_processed = redis_info['total_commands_processed']
#                 self.last_expired_keys = redis_info['expired_keys']
#                 self.last_evicted_keys = redis_info['evicted_keys']
#                 self.last_keyspace_hits = redis_info['keyspace_hits']
#                 self.last_keyspace_misses = redis_info['keyspace_misses']
#                 if redis_info['aof_enabled']:
#                     self.table_row.append(redis_info['aof_current_size'])
#                 else:
#                     self.table_row.append(0)

#                 self.table.append(self.table_row)
#                 if len(self.table) > TABLE_MAX_ROWS:
#                     self.table.pop(0)
#                 table_result = list(reversed(self.table))
#                 # commands highchart
#                 self.commands_chart.append({'x': self.nowtime, 'y': self.commands_per_seconds})
#                 # cpu usage (system and user)
#                 self.cpu_chart.append({'x': self.nowtime, 'y_s': self.used_cpu_sys, 'y_u': self.used_cpu_user})
#                 # memory usage
#                 self.mem_chart.append({'x': self.nowtime, 'y_mem': self.mem, 'y_rss': self.mem_rss})
#                 # Points which are showed in every chart is set to 5 now. You can change it to any amount you want.
#                 if len(self.commands_chart) > 5:
#                     self.commands_chart.pop(0)
#                 if len(self.cpu_chart) > 5:
#                     self.cpu_chart.pop(0)
#                 if len(self.mem_chart) > 5:
#                     self.mem_chart.pop(0)

#                 socketio.emit('response', {
#                     'stat' : self.status, 'table' : table_result, 'server' : '%s:%s' % (self.host, self.port),
#                     'commands' : self.commands_chart, 'cpu' : self.cpu_chart, 'mem' : self.mem_chart
#                 })
#             except Exception as ex:
#                 print ex.message
#             time.sleep(INFO_INTERVAL)

#     def is_stop(self):
#         return self.event.is_set()

#     def stop(self):
#         self.event.set()

@app.route('/')
def index():
    return make_response(open('templates/index.html').read())


@socketio.on('event')
def client_message(message):
    servers = [':'.join(s.split(':')[:2]) for s in REDIS_SERVER]
    # servers = [r.host+":"+str(r.port) for r in RedisObj.query.all()]
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
# for r in RedisObj.query.all():
#     if r.password:
#         r_info = RedisInfo(r.host, r.port, r.password)
#     else:
#         r_info = RedisInfo(r.host, r.port)
#     r_info.setDaemon(True)
#     r_info.start()
#     all_thread.append(r_info)

# admin = Admin(app, name='redispapa')
# admin.add_view(ModelView(RedisObj, db.session))


# def update_redis_server_thread():
#     try:
#         print([t.host+":"+str(t.port) for t in all_thread])
#         new_all_thread = []
#         for r in RedisObj.query.all():
#             if r.password:
#                 r_info = RedisInfo(r.host, r.port, r.password)
#             else:
#                 r_info = RedisInfo(r.host, r.port)
#             new_all_thread.append(r_info)

#         def redis_info_set_helper(list_a, list_b):
#             '''返回list_a里有list_b里没有的元素list'''
#             list_a_sub_b = []
#             for a in list(set(list_a)):
#                 if (a.host+":"+str(a.port)) in [b.host+":"+str(b.port) for b in list_b]:
#                     continue
#                 list_a_sub_b.append(a)
#             return list_a_sub_b
#         remove_set = set(redis_info_set_helper(all_thread, new_all_thread))
#         create_set = set(redis_info_set_helper(new_all_thread, all_thread))
#         for t in list(remove_set):
#             all_thread.remove(t)
#             t.stop()
#         for t in list(create_set):
#             t.setDaemon(True)
#             t.start()
#             all_thread.append(t)
#     except Exception as e:
#         print(e)

# scheduler = BackgroundScheduler()
# scheduler.add_job(func=update_redis_server_thread, trigger='cron', second='*/20')
# scheduler.start()

if __name__ == '__main__':
    signal.signal(signal.SIGINT, signal_handler)
    socketio.run(app, host='0.0.0.0', port=5000)
