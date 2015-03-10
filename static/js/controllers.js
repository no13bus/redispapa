'use strict';

/* Controllers */
myApp.controller('RedisCtl', function($scope, $routeParams, $filter, socket) {
    // $scope.id = $routeParams.id;

    $scope.send_command = function(command, args, r_server){
        console.log(r_server);
        socket.emit('command_exec', {command: command, args:args, r_server: r_server});
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
        // Listening to an event
    socket.on('connect', function() {
        socket.emit('event', {
            data: 'I\'m connected!'
        });
    });
    socket.on('result', function(msg){
          $scope.result = 'Time:' + $filter(new Date(), 'h-m-s') + ' : ' + msg.data;
//        if($scope.results){
//            $scope.results.push('Time:' + new Date() + ' : ' + msg.data);
//        }else{
//            $scope.results = [];
//        }

    });
    socket.on('servers', function(msg) {
        $scope.servers = msg.data;
        $scope.server = msg.data[0];
    });
    socket.on('disconnect', function() {
        $scope.error_msg = 'Oh! The server is disconnected.Please check!';
    });
    // event handler for server sent data
    // the data is displayed in the "Received" section of the page
    socket.on('response', function(msg) {
        if ($scope.server == msg.server) {
            $scope.stat = msg.stat;
            $scope.table = msg.table;
            handler_cmd(msg.commands);
            handler_cpu(msg.cpu);
            handler_mem(msg.mem);
        }
    });
});