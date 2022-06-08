# RedisPAPA
we use `redis info` to monitor the redis usage. PAPA means a father who is monitoring the redis.
>  accoding to the [redis doc](http://redis.io/commands/info), it is be recommanded to use `info` other than `monitor`.

================

[![repo](http://ohmyrepo.ml/static/ohmyrepo.png)](http://ohmyrepo.ml/show?u=no13bus&r=redispapa)

[中文文档](https://github.com/no13bus/redispapa/blob/master/README_CN.md)

## Let's start
- `pip install -r requirements.txt`
- check out the file `config.py` and make your own configure accoding to your redis servers.
- the REDIS_SERVER should be formated like this `['ip:port:password', 'ip:port', .....]`
- type this command `python run.py`, then you can watch it in `http://127.0.0.1:5000`
- we recommand use this command to deploy: `gunicorn --worker-class socketio.sgunicorn.GeventSocketIOWorker run:app -b 0.0.0.0:5000`

## The tech we use
- [Angular](https://github.com/angular/angular)
- [Flask](https://github.com/mitsuhiko/flask)
- [Socket.io](http://socket.io/)
- [Highchart](http://www.highcharts.com/)



## Project Details
- we do not use any database to store the redis information, we store the data in the memory.
- we use flask to start serveral threads which is equal to your redis server amount，and then send infomation to the front-end at regular time by socket.io.
- we use angular to render the front-end。angular will get the data from socket.io and then render the templates with highchart-ng and ngSocketIO.
- the good part of angular is two way bindings, when you change the redis server ip in the front-end select element, you will get a new front-end immediately.

## Project Screen
![1](https://raw.githubusercontent.com/no13bus/redispapa/master/screen/1.png)
![2](https://raw.githubusercontent.com/no13bus/redispapa/master/screen/2.png)
![3](https://raw.githubusercontent.com/no13bus/redispapa/master/screen/3.png)
![version 0.2](https://raw.githubusercontent.com/no13bus/redispapa/master/screen/4.png)
![version 0.2](https://raw.githubusercontent.com/no13bus/redispapa/master/screen/5.png)

## Version 0.3
- docker support: you can pull the [docker image of redispapa](https://registry.hub.docker.com/u/sinchb/redispapa/) from docker hub

  ```
  docker pull sinchb/redispapa
  ```

  to start a redispapa instance with default settings:

  ```
  docker run -p 5000:5000 sinchb/redispapa
  ```

  If you want to use your own config.py:

  ```
  docker run -p 5000:5000 -v /path/to/config.py:/root/redispapa/config.py sinchb/redispapa
  ```

  If you want to build your own docker image, please clone this repo, and run:

  ```
  cd /path/to/your/redispapa/
  docker build -t=your-redispapa-tag .
  ```

## Version 0.2
- new feature: exectute redis commands in the website.
- In the website, you can type `set` in `command input box`, and type `a, papapa` in `args input box`
or you can type `get` in `command input box`, and type `a` in `args input box. Then you can get the result
from the redis server.

## Version 0.1
supply kinds of information of redis server

## The links
- [redis stat](https://github.com/junegunn/redis-stat)
- [highchart-ng](https://github.com/pablojim/highcharts-ng)
- [ng-socket-io](https://github.com/mbenford/ngSocketIO)
- [Angular](https://github.com/angular/angular)
- [Flask](https://github.com/mitsuhiko/flask)

