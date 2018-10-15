var socket = io('http://178.128.145.52:3000/');
//var socket = io('http://localhost:3000/');
var stateMotor = false;
var stateTurbine = false;
var valueMinTemp = 0;
var temperatura = 0;
var humedad = 0;

/* Update view to all customers */
/* socket.on('get motorState', function (data) {
    $('#motor').addClass('checked');
});
socket.on('get turbineState', function (data) {
    $('#turbine').attr('checked', !stateTurbine);
}) */

/* -----Controls------ */
$('#motor-ctrl').change(function () {
    stateMotor = $(this).prop('checked');    
    socket.emit('stateMotor', stateMotor);  
    stateMotor = !stateMotor;
});
$('#turbine-ctrl').change(function () {
    stateTurbine = $(this).prop('checked');
    socket.emit('stateTurbine', stateTurbine);
    stateTurbine = !stateTurbine;
});

/* ----- Alarm Control ----- */
$('#minTemp').change(function () {
    let valueMinTemp = $(this).prop('value');
    $('.slideValue1').text(valueMinTemp);
    socket.emit('minTemp', valueMinTemp);
});
$('#maxTemp').change(function () {
    let valueMaxTemp = $(this).prop('value');
    $('.slideValue2').text(valueMaxTemp);
    socket.emit('maxTemp', valueMaxTemp);
});

/* ----- Highcharts ----- */

Highcharts.chart('charts-temp', {
    time: {
        timezone: 'America/Bogota'
    },
    chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
            load: function () {                
                var series = this.series[0];
                socket.on('sensors', function (temp, humd, date) {
                    let temperatura = parseFloat(temp);                                      
                    series.addPoint([date, temperatura]);                    
                    sensorData(temp, humd);
                });

            }
        }
    },
    title: {
        text: 'Temperaura Cultivo (°C)'
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
    },
    yAxis: {
        title: {
            text: 'Temperatura °C'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                //Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                Highcharts.numberFormat(this.y, 2);
        }
    },
    legend: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    series: [{
        name: 'Temperatura',
        data: [],
        marker: {
            enable: true,
            radius: 3
        }
    }]
});


Highcharts.chart('charts-humid', {
    chart: {
        type: 'spline',
        animation: Highcharts.svg, // don't animate in old IE
        marginRight: 10,
        events: {
            load: function () {
                var series = this.series[0];
                socket.on('sensors', function (temp, humd, date) {
                    let humedad = parseFloat(humd);
                    series.addPoint([date, humedad]);
                });

            }
        }
    },
    title: {
        text: 'Humedad Relativa (%HR)'
    },
    xAxis: {
        type: 'datetime',
        tickPixelInterval: 150
    },
    yAxis: {
        title: {
            text: 'Humedad %HR'
        },
        plotLines: [{
            value: 0,
            width: 1,
            color: '#808080'
        }]
    },
    tooltip: {
        formatter: function () {
            return '<b>' + this.series.name + '</b><br/>' +
                //Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                Highcharts.numberFormat(this.y, 2);
        }
    },
    legend: {
        enabled: false
    },
    exporting: {
        enabled: false
    },
    series: [{
        name: 'Humedad',
        data: [],
        marker: {
            enable: true,
            radius: 3
        }
    }]
});

function sensorData(temp, humd) {
    $('#tem-data').html(temp);
    $('#hum-data').html(humd);
    return;
};