var util = require('util');
var bleno = require('bleno');
var exec = require('child_process').execSync;
var os = require('os');

var BlenoCharacteristic = bleno.Characteristic;

// BLE Descriptor
var WifiDescriptor = bleno.Descriptor;
var wifiDescriptor = new WifiDescriptor({
    uuid: 'ec0e',
    value: 'Connects to wifi and checks connectivity' // static value, must be of type Buffer or string if set
});

var WifiCharacteristic = function() {
    WifiCharacteristic.super_.call(this, {
        uuid: 'ec0e',
        properties: ['read', 'write'],
        value: null,
        descriptors: [ wifiDescriptor ]
    });
    this._value = new Buffer(0);
    this._updateValueCallback = null;
};

util.inherits(WifiCharacteristic, BlenoCharacteristic);

WifiCharacteristic.prototype.onReadRequest = function(offset, callback) {
    check_is_connected(callback);
};

WifiCharacteristic.prototype.onWriteRequest = function(data, offset, withoutResponse, callback) {
    connect_to_wifi(data, callback);
};


// Helper Functions
function check_is_connected(callback) {
    var command = 'sh ./shell_scripts/is_connected.sh';
    this._value = exec(command, []).toString();
    console.log('WifiCharacteristic - onReadRequest: value = ' + this._value);

    if (this._value == 'Online\n') {
        console.log('We are online');
        callback(this.RESULT_UNLIKELY_ERROR);
    }
}

function connect_to_wifi(data, callback) {
    var params = data.toString().split(",");
    console.log(data);
    console.log(params);
    var command = 'sh ./shell_scripts/connect.sh ' + params[0] + ' ' + params[1];
    this._value = exec(command, []).toString();
    console.log('WifiCharacteristic - onWriteRequest: value = ' + this._value);

    if (this._value == 'Online\n') {
        console.log('Connection established');
        callback(this.RESULT_SUCCESS);
    }
}

module.exports = WifiCharacteristic;