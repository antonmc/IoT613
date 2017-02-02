**Development Steps for IoT613 Project**

1. Connect the Arduino board to your computer using a serial cable
2. Download Intel XDK: https://software.intel.com/en-us/intel-xdk
3. Import Rob's project using the xdk
4. Open the serial terminal at the bottom of the window
5. Login to the board - username root, password inteledison
6. configure_edison --setup to setup wifi
7. run npm install mqtt --save [ from the serial shell? ] on the device before you run it in order to install the MQTT module
8. Load [ which file into Intel XDK? ] from working example here: https://github.com/rcwoolley/IoT613_DeviceApp


9. Go to http://bluemix.net and create a new project

https://github.com/rcwoolley/IoT613_DeviceApp

For reference - https://developer.ibm.com/recipes/tutorials/intel-edison/