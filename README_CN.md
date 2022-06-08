## 开始使用
- `pip install -r requirements.txt`
- 配置好config.py内的需要监控的redis服务器的相关信息.
- REDIS_SERVER服务器的类型这样 `['ip:port:pawword', 'ip:port', .....]`
- `python run.py` 即可进行redis服务监控
- 如果线上部署的话，推荐使用gunicorn部署. `gunicorn --worker-class socketio.sgunicorn.GeventSocketIOWorker run:app -b 0.0.0.0:5000`

## 使用到的技术
- angular
- flask
- socket.io
- highchart



## version 0.3
- 支持docker: 现在可以直接从docker hub下载最新的[redispapa的镜像](https://registry.hub.docker.com/u/sinchb/redispapa/):

```
docker pull sinchb/redispapa
```

用默认配置启动一个redispapa实例:

```
docker run -p 5000:5000 sinchb/redispapa
```

用自己的config.py配置启动一个redispapa实例:

```
docker run -p 5000:5000 -v /path/to/config.py:/root/redispapa/config.py sinchb/redispapa
```

如果要build自己的redispapa 镜像，请先克隆本项目，然后运行:

```
cd /path/to/your/redispapa/
docker build -t=your-redispapa-tag .
```

## version 0.2
- 加入新特性: 在前端执行redis命令, 返回执行结果。
- 执行方法如下: 网页上的command内写redis命令, args写命令的各个参数.
比如command内写 `set`, args内写 `a, papapa`
再比如command内写 `get`, args内写 `a`

## version 0.1
提供了redis-server的info的监控信息

## 相关项目连接
- [redis stat](https://github.com/junegunn/redis-stat)
- [highchart-ng](https://github.com/pablojim/highcharts-ng)
- [ng-socket-io](https://github.com/mbenford/ngSocketIO)
- [angular](https://github.com/angular/angular)
- [flask](https://github.com/mitsuhiko/flask)
