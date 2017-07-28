require('dotenv').config();
var bleno = require('bleno');
var exec = require('child_process').execSync;
var validator = require('validator');


// Get UUID and name from environment file
var uuid = process.env.UUID;
var name = process.env.NAME;

console.log('UUID and NAME loaded: ' + uuid + ' ' + name);

// Reformat UUID if not valid
if (!validator.isUUID(uuid)) {
    console.log('reformatting UUID');
    while (uuid.length < 32) {
        uuid += "f";
    }
    console.log('UUID reformatted to: ' + uuid);
}


// Setup Characteristics
var WifiCharacteristic = require('./characteristic');
var wifiCharacteristic = new WifiCharacteristic();

var characteristics = [ wifiCharacteristic ];


// Setup Services
var WifiService = bleno.PrimaryService;
var wifiService = new WifiService({
    uuid: uuid,
    characteristics: [ wifiCharacteristic ]
});

var services = [ wifiService ];


// Start Advertising
console.log('Bleno - Wifi connectivity');

bleno.on('stateChange', function(state) {
    console.log('BLE stateChanged to: ' + state);
    if (state === 'poweredOn') {
        bleno.startAdvertising(name, [uuid]);
    } else {
        bleno.stopAdvertising();
    }
});

bleno.on('advertisingStart', function(error) {
    console.log('advertisingStart: ' + (error ? 'error ' + error : 'success'));
    if (!error) {
        bleno.setServices( services );
    }
});