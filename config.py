#coding: utf-8
REDIS_SERVER = ["127.0.0.1:6379", "myip:redisport", "anotherip:redisport:mypassword"]
# interval which you monitor the redis info.
INFO_INTERVAL = 2.0
# in the index, the table is set to show 10 rows redis data by default. you can change it.
TABLE_MAX_ROWS = 10
# flaks debug mode
DEBUG = False
SECRET_KEY = 'temporary_secret_key'



####dev enviriment or deploy enviriment
import socket
if socket.gethostname() == 'jqh-virtual-machine' or socket.gethostname() == 'no13busdeMacBook-Air.local' or socket.gethostname() == 'localhost':
    try:
        from config_dev import *
    except ImportError:
        pass
