## 开始使用
- `cd backend && pip3 install -r requirements.txt`
- 配置好config.py内的需要监控的redis服务器的相关信息.
- REDIS_SERVER服务器的类型这样 `['ip:port:pawword', 'ip:port', .....]`
- `python3 run.py` 即可进行redis服务监控
- 如果线上部署的话，推荐使用gunicorn部署. `gunicorn --worker-class socketio.sgunicorn.GeventSocketIOWorker run:app -b 0.0.0.0:5000`

## 使用到的技术
- [Python3](https://docs.python.org/3/)
- [React](https://github.com/facebook/react)
- [Flask](https://github.com/pallets/flask)
- [Socket.io](http://socket.io/)
- [Ant Design](https://ant.design/)
- [Ant Design Charts](https://charts.ant.design/)
- [Vite](https://vitejs.dev/)

## demo website
[https://redispapa.v2j.tech](https://redispapa.v2j.tech)

## 项目细节
- 我们不使用任何数据库存储redis的相关信息，数据仅存在于运行内存中
- 我们使用flask框架开启多个线程, 每个线程对应一个redis服务实例, 使用socket.io将数据传输到前端，前端使用react框架进行实时展示
- 我们使用react和Vite构建前端应用. 前端使用的是ant design以及ant design charts进行数据展示.
- 在前端页面，当你选择不同的redis实例的时候，你会立刻看到相应的redis性能数据

## 项目截图
![1](https://raw.githubusercontent.com/no13bus/redispapa/master/screen/1.png)
![2](https://raw.githubusercontent.com/no13bus/redispapa/master/screen/2.png)
![3](https://raw.githubusercontent.com/no13bus/redispapa/master/screen/3.png)
![4](https://raw.githubusercontent.com/no13bus/redispapa/master/screen/4.png)
![5](https://raw.githubusercontent.com/no13bus/redispapa/master/screen/5.png)

## Version 0.4
- 将flask升级到2.x, Python升级到3.x socket-io升级到4.x
- 前端使用react和Vite来构建

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

## Version 0.4
- 将项目中用到的框架升级到最新版本，Python升级到3.x, flask升级到2.x, socketIO升级到4.x
- 使用Vite和React来构建前端页面, 使用前后端分离的方式来开发项目


## version 0.2
- 加入新特性: 在前端执行redis命令, 返回执行结果。
- 执行方法如下: 网页上的command内写redis命令, args写命令的各个参数.
比如command内写 `set`, args内写 `a, papapa`
再比如command内写 `get`, args内写 `a`

## version 0.1
提供了redis-server的info的监控信息

## 相关项目连接
- [redis stat](https://github.com/junegunn/redis-stat)
