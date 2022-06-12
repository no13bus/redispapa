# RedisPAPA
we use `redis info` to monitor the redis usage. PAPA means a father who is monitoring the redis.
>  accoding to the [redis doc](http://redis.io/commands/info), it is be recommanded to use `info` other than `monitor`.

================


[中文文档](https://github.com/no13bus/redispapa/blob/master/README_CN.md)

## Let's start
- `cd backend && pip3 install -r requirements.txt`
- check out the file `config.py` and make your own configure accoding to your redis servers.
- the REDIS_SERVER should be formated like this `['ip:port:password', 'ip:port', .....]`
- type this command `python3 run.py`, then you can watch it in `http://127.0.0.1:5000`
- we recommand use this command to deploy: `gunicorn --worker-class socketio.sgunicorn.GeventSocketIOWorker run:app -b 0.0.0.0:5000`
- `cd frontend && yarn install`
- `yarn dev`

## The tech we use
- [Python3](https://docs.python.org/3/)
- [React](https://github.com/facebook/react)
- [Flask](https://github.com/pallets/flask)
- [Socket.io](http://socket.io/)
- [Ant Design](https://ant.design/)
- [Ant Design Charts](https://charts.ant.design/)
- [Vite](https://vitejs.dev/)

## demo website

[https://redispapa.v2j.tech](https://redispapa.v2j.tech)

## Project Details
- we do not use any database to store the redis information, we store the data in the memory.
- we use flask to start serveral threads which is equal to your redis server amount，and then send infomation to the front-end at regular time by socket.io.
- we use vite and react to render the front-end。React will get the data from socket.io and then render the templates with ant design charts.
- when you change the redis server ip in the front-end select element, you will get a new redis data immediately.

## Project Screen
![1](https://raw.githubusercontent.com/no13bus/redispapa/master/screen/1.png)
![2](https://raw.githubusercontent.com/no13bus/redispapa/master/screen/2.png)
![3](https://raw.githubusercontent.com/no13bus/redispapa/master/screen/3.png)
![4](https://raw.githubusercontent.com/no13bus/redispapa/master/screen/4.png)
![5](https://raw.githubusercontent.com/no13bus/redispapa/master/screen/5.png)

## Version 0.4
- update the flask version to 2.x, socket-io version to 4.x, Python version to 3.x
- use Vite and react to build the frontend. 

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