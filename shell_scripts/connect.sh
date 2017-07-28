#!/bin/bash

# Input parameters
network=$1
password=$2
file="/etc/wpa_supplicant/wpa_supplicant.conf"

# Maintain beginning of file
sed -n '/network={/q;p' $file > tmp && mv tmp $file

# Append new network name and password
echo "network={
  ssid=\"$network\"
  psk=\"$password\"
}" >> $file

# Restart wifi service
sudo ifdown wlan0 && sudo ifup wlan0

# Wait until wifi has restarted
sleep 10

# Check connectivity
sh './shell_scripts/is_connected.sh'
