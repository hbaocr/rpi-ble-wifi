#!/bin/bash

screen_name="peripheral"

if ! screen -list | grep -q ${screen_name}; then
    echo "No peripheral found"
    screen -dm -S ${screen_name} sudo node ../index.js
fi