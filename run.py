#coding: utf-8
import os
# from app import app
import threading
from config import *
import redis
import time
import os
import json
from flask import Flask, request, Response
from flask import render_template, send_from_directory, url_for
from flask import Flask, render_template
from flask.ext.socketio import SocketIO






app = Flask(__name__)
app.config.from_object('config')
app.url_map.strict_slashes = False
socketio = SocketIO(app)


redis_info_list = []


class Handle_Info(object):
    def __init__(self, redis_info):
        pass


class RedisInfo(threading.Thread):
    """docstring for RedisInfo"""
    def __init__(self, host, port, password):
        super(RedisInfo, self).__init__()
        self.host = host
        self.port = port
        self.password = password
        self.event = threading.Event()
        self.client = redis.StrictRedis(host=self.host, port=self.port, password=self.password)

    def run(self):
        while 1:
            redis_info = self.client.info()
            time.sleep(INFO_INTERVAL)

    def is_stop(self):
        return self.event.is_set()

    def stop_all(self):
        self.event.set()
        


@socketio.on('message')
def handle_message(message):
    print('received message: ' + message)

    

if __name__ == '__main__':
    info_thread = []
    for rs in REDIS_SERVER:
        redisinfo = RedisInfo(*(rs.split(":")))
        info_thread.append(redisinfo)
        redisinfo.start()
    socketio.run(app)
