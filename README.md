# RedisPAPA
we use `redis info` to monitor the redis usage.
>  accoding to the [redis doc](http://redis.io/commands/info), it is be recommanded to use `info` other than `monitor`. 

================

[中文文档](https://github.com/no13bus/redispapa)

## Let's start
- `pip install -r requirements.txt`
- check out the file `config.py` and make your own configure accoding to your redis servers.
- type this command `python run.py`, then you can watch it in `http://127.0.0.1:5000`

## the tech we use
- [angular](https://github.com/angular/angular)
- [flask](https://github.com/mitsuhiko/flask)
- [socket.io](http://socket.io/)
- [highchart](http://www.highcharts.com/)

## Project Details
- we use flask to start serveral threads which is equal to your redis server amount，and then send infomation to the front-end at regular time by socket.io.
- we use angular to render the front-end。angular will get the data from socket.io and then render the templates with highchart-ng and ngSocketIO.
- the good part of angular is two way bindings, when you change the redis server ip in the front-end select element, you will get a new front-end immediately.

## Project Screen
![1](https://github.com/no13bus/redispapa) 
![2](https://github.com/no13bus/redispapa) 
![3](https://github.com/no13bus/redispapa)

## The links
- [redis stat](https://github.com/junegunn/redis-stat)
- [highchart-ng](https://github.com/pablojim/highcharts-ng)
- [ng-socket-io](https://github.com/mbenford/ngSocketIO)
- [angular](https://github.com/angular/angular)
- [flask](https://github.com/mitsuhiko/flask)