'use strict';

/* Controllers */
myApp.controller('RedisCtl', function($scope, $routeParams, $filter, $sce, socket,$interval) {
    
    $scope.duration = 10;


    $scope.send_command = function(command, args, r_server){
        socket.emit('command_exec', {command: command, args:args, r_server: r_server});
    }
    $scope.send_command_monitor = function(){
        $scope.monitoring = true;
        $scope.result_monitor = null;
        $scope.commands_time = null
        $scope.heaviest_commands = null;
        $scope.slowest_commands = null;
        $scope.top_commands = null;
        $scope.top_keys = null;
        socket.emit('monitor_command_exec', {r_server: $scope.server, duration: $scope.duration});
    }
    //highchart
    $scope.chartConfig_cmd = {
        options: {
            global: {
                useUTC: false
            },
            chart: {
                useUTC: false,
                type: 'spline',
            }
        },
        series: [{
            name: 'commands/s',
            data: []
        }],
        title: {
            text: 'commands/s'
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Time'
            }
        },
        yAxis: {
            title: {
                text: 'value'
            },

        },
    };

    $scope.chartConfig_cpu = {
        options: {
            global: {
                useUTC: false
            },
            chart: {
                useUTC: false,
                type: 'spline',
            }
        },
        series: [{
            name: 'sys',
            data: []
        }, {
            name: 'user',
            data: []
        }],
        title: {
            text: 'used_cpu'
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Time'
            }
        },
        yAxis: {
            title: {
                text: 'value'
            },

        },
    };
    $scope.chartConfig_mem = {
        options: {
            global: {
                useUTC: false
            },
            chart: {
                useUTC: false,
                type: 'spline',
            }
        },
        series: [{
            name: 'memory',
            data: []
        }, {
            name: 'memory_rss',
            data: []
        }],
        title: {
            text: 'used_memory'
        },
        xAxis: {
            type: 'datetime',
            title: {
                text: 'Time'
            }
        },
        yAxis: {
            title: {
                text: 'value'
            },

        },
    };

    function handler_cmd(cmd) {
        // body...
        var seriesArray = $scope.chartConfig_cmd.series;
        seriesArray[0].data = [];
        for (var i = 0; i < cmd.length; i++) {
            seriesArray[0].data.push({
                x: Date.parse(cmd[i].x),
                y: cmd[i].y
            });
        }
    }

    function handler_cpu(cpu) {
        // body...
        var seriesArray = $scope.chartConfig_cpu.series;
        seriesArray[0].data = [];
        seriesArray[1].data = [];
        for (var i = 0; i < cpu.length; i++) {
            seriesArray[0].data.push({
                x: Date.parse(cpu[i].x),
                y: cpu[i].y_s
            });
            seriesArray[1].data.push({
                x: Date.parse(cpu[i].x),
                y: cpu[i].y_u
            });
        }
    }

    function handler_mem(mem) {
            // body...
            var seriesArray = $scope.chartConfig_mem.series;
            seriesArray[0].data = [];
            seriesArray[1].data = [];
            for (var i = 0; i < mem.length; i++) {
                seriesArray[0].data.push({
                    x: Date.parse(mem[i].x),
                    y: mem[i].y_mem
                });
                seriesArray[1].data.push({
                    x: Date.parse(mem[i].x),
                    y: mem[i].y_rss
                });
            }
        }

    socket.on('connect', function() {
        $scope.error_msg = null;
        socket.emit('event', {
            data: 'I\'m connected!'
        });
    });

    socket.on('result', function(msg){
        // $scope.result = "Time: " + $filter('date')(new Date(), "hh:mm:ss") + " Result: " + msg.data;
        // $scope.results.push('Time: ' + $filter('date')(new Date(), "hh:mm:ss") + " Result: " + msg.data);

        // I don not know why there are two response msg here????
        console.log(msg.m_type);
        if (msg.m_type == 'info') {
            $scope.result = $sce.trustAsHtml("Time: " + $filter('date')(new Date(), "hh:mm:ss") + "<span class='text-info'>" + " Result: " + msg.data + "</span>");
        } else{
            $scope.result = $sce.trustAsHtml("Time: " + $filter('date')(new Date(), "hh:mm:ss") + "<span class='text-danger'>" + " Result: " + msg.data + "</span>");
        }
    });

    function parseResult(data) {
        $scope.commands_time = JSON.stringify(data['commands_time']);
        $scope.heaviest_commands = JSON.stringify(data['heaviest_commands']);
        $scope.slowest_commands = JSON.stringify(data['slowest_commands']);
        $scope.top_commands = JSON.stringify(data['top_commands']);
        $scope.top_keys = JSON.stringify(data['top_keys']);
    }

    socket.on('result_monitor', function(msg){
        $scope.monitoring = false;
        if (msg.m_type == 'info' && msg.data) {
            parseResult(msg.data);
        } else if (msg.m_type == 'error'){
            $scope.result_monitor = $sce.trustAsHtml("<span class='text-danger'>" + " Result: " + msg.data + "</span>");
        } else{
           $scope.result_monitor =  $sce.trustAsHtml("<span class='text-info'>no activities in server</span>");
        }
    });

    socket.on('servers', function(msg) {
        $scope.servers = msg.data;
        $scope.server = msg.data[0];
    });
    socket.on('disconnect', function() {
        $scope.error_msg = 'Oh! The server is disconnected.Please check!';
    });

    String.prototype.replaceAll = function(search, replacement) {
        var target = this;
        return target.replace(new RegExp(search, 'g'), replacement);
    };

    function translate(data) {
        $scope.stat = {};
        angular.forEach(data, function(value, key) {
          $scope.stat[key.replaceAll('redis','cacheone')] = value;
        }, $scope.stat);
        return $scope.stat;
    }

    socket.on('response', function(msg) {
        if ($scope.server == msg.server) {
            $scope.stat = translate(msg.stat);
            $scope.table = msg.table;
            handler_cmd(msg.commands);
            handler_cpu(msg.cpu);
            handler_mem(msg.mem);
        }
    });

    // $interval( function(){ $scope.send_command_monitor(); }, 120000);

    
});