# rpi-ble-wifi

A node.js application to configure the Wifi network over BLE of a Raspberry Pi

Works in conjunction with the [RpiWifiConnect](https://github.com/DCreatives/RpiWifiConnect) iOS app.


## Setup

1. Install node on your raspberry pi:
    
        curl -sL https://deb.nodesource.com/setup_5.x | sudo bash
    
        apt-get install nodejs -y
    
    *Note: we have only tested this code for node 4.X.X*


2. Install BLE tools:
    
        sudo apt-get install libdbus-1-dev libglib2.0-dev libdbus-glib-1-dev libusb-dev libudev-dev libreadline-dev
    
        sudo apt-get install screen bluez bluez-hcidump


3. Clone rpi-ble-wifi repo and install dependencies:
    
        git clone git@github.com:DCreatives/rpi-ble-wifi.git && cd rpi-ble-wifi


4. Install node modules:

        sudo npm install -g


## Run Peripheral

We will be creating the RPi to act as a peripheral device, always discoverable by the app.

We have chosen to run the the peripheral script in a background screen. To ensure the screen is always present, install
this line in your crontab:
    
    * * * * * sh /home/pi/rpi-ble-wifi/shell_scripts/run_peripheral.sh


Once running the [RpiWifiConnect](https://github.com/DCreatives/RpiWifiConnect) app will always be able to find, pair and connect to your RPi.
    




