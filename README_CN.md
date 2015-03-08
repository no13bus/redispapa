# RedisPAPA
利用redis的`info`信息对redis的使用情况进行监控。用到的技术：angular flask socket.io. PAPA是Dad的意思。
官方文档推荐使用info，而不是monitor(因为其会大大降低redis的负载)。

================

## 开始使用
- `pip install -r requirements.txt`
- 配置好config.py内的需要监控的redis服务器的相关信息
- `python run.py` 即可进行redis服务监控

## 使用到的技术
- angular
- flask
- socket.io
- highchart

## 说明
- flask的后台会开启多个监控redis的线程，定时通过socket.io向前台发送info信息。flask在这个项目里面的主要作用就是socket.io的后台，不会对前台的模板进行渲染。
- angular 承担了主要的前端模板渲染工作。angular会将socket.io接受到的数据利用highchart-ng和ng-socket-io这2个库对前端的图表进行渲染。
- angular 的优点就是双向绑定，在前端切换不同的redis服务器的时候，只需要点选不同的选项，模型随之改变，前端页面就会随之改变。开发过程非常顺畅。

## 截图

![1](https://raw.githubusercontent.com/no13bus/redispapa/master/1.png) 
![2](https://raw.githubusercontent.com/no13bus/redispapa/master/2.png) 
![3](https://raw.githubusercontent.com/no13bus/redispapa/master/3.png)


## 相关项目连接
- [redis stat](https://github.com/junegunn/redis-stat)
- [highchart-ng](https://github.com/pablojim/highcharts-ng)
- [ng-socket-io](https://github.com/mbenford/ngSocketIO)
- [angular](https://github.com/angular/angular)
- [flask](https://github.com/mitsuhiko/flask)