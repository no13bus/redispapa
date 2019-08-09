# RedisPAPA
> 利用redis的`info`信息对redis的使用情况进行监控。用到的技术：angular flask socket.io. PAPA是Dad的意思。
官方文档推荐使用info，而不是monitor(因为其会大大降低redis的负载)。

================

## 相较原系统改动
- > 从原系统的读config文件获取监控target列表(静态,需手动修改并重启服务器)切换到sqlite动态发现(通过管理后台变更数据,无需重启)
- > 添加了flask admin管理后台用于动态变更监控target列表

### 大致原理
通过定时任务定期查询数据库字段并更新线程列表.数据库动态发现target刷新时间设置为20秒一次,所以添加新target之后前端数据可能会有1-20s的延迟才会刷新.

### 部署方式

- 普通部署:
```shell
pip install -r requirements.txt

python run.py
```

- docker部署:
```shell
docker run -d -p 5000:5000 calmkart/redispapa-sqlite:v0.0.1
```

### 使用方式

监控页面

`http://0.0.0.0:5000/`

后台配置页面

`http://0.0.0.0:5000/admin/redisobj/`

================
# 以下为原系统readme

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

## demo website
http://redispapa.no13bus.com


## 说明
- 该项目没有使用任何数据库对监控信息进行存储，只是将监控到的前几个数据点保存到了内存中供前台调用。
- flask的后台会开启多个监控redis的线程，定时通过socket.io向前台发送info信息。flask在这个项目里面的主要作用就是socket.io的后台，不会对前台的模板进行渲染。
- angular 承担了主要的前端模板渲染工作。angular会将socket.io接受到的数据利用highchart-ng和ng-socket-io这2个库对前端的图表进行渲染。
- angular 的优点就是双向绑定，在前端切换不同的redis服务器的时候，只需要点选不同的选项，模型随之改变，前端页面就会随之改变。开发过程非常顺畅。

## 截图

![1](https://raw.githubusercontent.com/no13bus/redispapa/master/screen/1.png)
![2](https://raw.githubusercontent.com/no13bus/redispapa/master/screen/2.png)
![3](https://raw.githubusercontent.com/no13bus/redispapa/master/screen/3.png)
![version 0.2](https://raw.githubusercontent.com/no13bus/redispapa/master/screen/4.png)
![version 0.2](https://raw.githubusercontent.com/no13bus/redispapa/master/screen/5.png)

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
