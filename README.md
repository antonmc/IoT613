**Development Steps for IoT613 Project**

1. Connect the Arduino board to your computer using a serial cable
2. Download Intel XDK: https://software.intel.com/en-us/intel-xdk
3. Load IoT613_DeviceApp.xdk from working example here: https://github.com/rcwoolley/IoT613_DeviceApp
4. Open the serial terminal at the bottom of the window
5. Login to the board - username: 'root', password: 'inteledison'
6. configure_edison --setup to setup wifi
7. run npm install mqtt --save [ from the serial shell? ] on the device before you run it in order to install the MQTT module
8. Go to http://bluemix.net and create a new SDK for JS app
9. Connect a new Internet of Things connection
10. Launch into the Watson IoT Platform
11. Create a new device - it'll ask for a type - you can call it Arduino ( or what you like )
12. Create a new device of that type - I called mine 'antonsarduino'

- - - - - - - 

notes ...

https://github.com/rcwoolley/IoT613_DeviceApp

For reference - https://developer.ibm.com/recipes/tutorials/intel-edison/

poweroff - to shut down the arduino board