/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

var fs = require('fs');

var bodyParser = require('body-parser');


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
}));

/* IoT setup */

var Client = require("ibmiotf");
var config = {
    "org": "organization",
    "id": "deviceId",
    "domain": "internetofthings.ibmcloud.com",
    "type": "deviceType",
    "auth-method": "token",
    "auth-token": "authToken"
};

var device;

var deviceClient = new Client.IotfDevice(config);

// Config
var iotAppConfig = require('./config/iot.js');

var Client = require('ibmiotf').IotfApplication;
//var Recommendation = require('./controllers/recommendation.js');

console.log(iotAppConfig);
var appClient = new Client(iotAppConfig);

appClient.connect();

appClient.on("connect", function () {
    console.log("subscribe to input events");

    var myData = {
        'DelaySeconds': 10
    };
    //    myData = JSON.stringify(myData);

    appClient.subscribeToDeviceEvents();

    //    appClient.publishDeviceCommand("NUC-CIELO", "NUCCIELO", "blink", "json", myData);
    //    appClient.publishDeviceCommand("NUC-CIELO", "NUCCIELO", "blink", "json", myData);
    //
    //    var myData = {
    //        'DelaySeconds': 10
    //    };
    //    myData = JSON.stringify(myData);
    //    appClient.publishDeviceCommand("NUC-CIELO", "NUCCIELO", "test", "json", myData);


});

appClient.on("deviceEvent", function (deviceType, deviceId, eventType, format, payload) {
    //    if (eventType === 'motionSensor') {
    //        motionSensorData.motionPayload = JSON.parse(payload);
    //    } else {
    //        console.log('Got other events of ' + eventType + ' from ' + deviceId + ':' + JSON.stringify(payload));
    //    }

    /* blink */


    console.log(deviceId);

    device = deviceId;

    var myData = {
        "info": "anton"
    };
    myData = JSON.stringify(myData);

    var datareceived = JSON.parse(payload)

    if (datareceived.d.temp != undefined) {
        temp = datareceived.d.temp;
    }

    if (datareceived.d.light != undefined) {
        light = datareceived.d.light;
    }



    appClient.publishDeviceCommand("NUCCIELO", deviceId, "blink", "json", 0);


    //    console.log('buzz');

    //    appClient.publishDeviceCommand("NUCCIELO", deviceId, "buzz", "json", 1);

    //    appClient.publishDeviceCommand("NUCCIELO", deviceId, "test", "json", myData);


    console.log(JSON.parse(payload));
});

/* REST services for hotel reservations */




app.get('/temp', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        temp: temp
    }, null, 3));
})

app.get('/light', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        light: light
    }, null, 3));
})

app.get('/environment', function (req, res) {
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        light: light,
        temp: temp
    }, null, 3));
})

app.post('/message', function (req, res) {
    var details = req.body;

    var response = {
        "message": "sent"
    };

    var myData = {
        "info": details.message
    };
    myData = JSON.stringify(myData);

    appClient.publishDeviceCommand("NUCCIELO", device, "test", "json", myData);

    res.send(JSON.stringify(response, null, 3));
});


app.post('/buzzer', function (req, res) {
    var details = req.body;

    var response;

    console.log(details);

    if (details.state === 'on') {
        appClient.publishDeviceCommand("NUCCIELO", device, "buzz", "json", 1);

        response = {
            "buzzer": "on"
        };

    } else {

        console.log("turning lights off");

        appClient.publishDeviceCommand("NUCCIELO", device, "buzz", "json", 0);

        response = {
            "buzzer": "off"
        };
    }

    res.send(JSON.stringify(response, null, 3));
});


app.post('/leds', function (req, res) {
    var details = req.body;

    var response;

    console.log(details);

    if (details.state === 'on') {
        appClient.publishDeviceCommand("NUCCIELO", device, "blink", "json", 1);

        response = {
            "lights": "on"
        };

    } else {

        console.log("turning lights off");

        appClient.publishDeviceCommand("NUCCIELO", device, "blink", "json", 0);

        response = {
            "lights": "off"
        };
    }

    res.send(JSON.stringify(response, null, 3));
});




// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function () {
    // print a message when the server starts listening
    console.log("server starting on " + appEnv.url);
});