# Macro for Outside Navigator
* [Introduction](https://github.com/dhenwood/Macro-for-Outside-Nav#introduction)
* [Setup](https://github.com/dhenwood/Macro-for-Outside-Nav#setup)


## Introduction
A new feature in Cisco video devices (currently in beta) allows for an outside Navigator to incorporate UI Extensions and Macros. Beta details [can be found here](https://gobeta.webex.com/project/feature/item.html?cap=115ca7c0-65ba-4f05-966c-81d02e884c9f&artid=7dae6035-ef0a-4d48-aaf1-c8e618325810).

The following is an example of
1. Send a short message from outside a meeting room to people inside (displayed on the screen). See first example below.
2. View Cisco Spaces from outside the room to locate an available room. See second example below.

![example](https://github.com/dhenwood/Macro-for-Outside-Nav/blob/main/Send%20Message%20Example.png)
![example](https://github.com/dhenwood/Macro-for-Outside-Nav/blob/main/View%20Spaces%20Example.png)

**NOTE:** This works on both Cisco RoomOS devices and Cisco Microsoft Teams Room assuming the outside navigator is running RoomOS.

## Setup
In order for the outside navigator to send a message to the inside video codec, a message is sent via the Cisco Cloud API's. Whislst there are a number of ways to achieve this, the easiest is creating a BOT.

### Create and associate a BOT
Details on creating a BOT can be [found here](https://developer.webex.com/messaging/docs/bots). The crucial part of this step is to **save the BOT token** once created. This will be used further on by the macro for authentication.

The second part to this step is to provide the BOT "Full Access" to the video device. This is required to post a message on the video codecs screen. From Control Hub, follow the steps to assigning the BOT to the device ensuring the for step 5, the name of the BOT is the same as the previous step. For step 6, ensure the BOT has **Full Access**. 
![example](https://github.com/dhenwood/Macro-for-Outside-Nav/blob/main/Associate%20BOT%20Example.png)

### Obtain the Device ID
Each cloud registered video device has a unique Device ID. To obtain the video codecs DeviceID, from Control Hub, follow thes steps and copy the **Webex DeveloperId**.
![example](https://github.com/dhenwood/Macro-for-Outside-Nav/blob/main/Obtian%20DeviceId%20Example.png)

### Install Macro
Copy the [messageSpacesMacro](https://github.com/dhenwood/Macro-for-Outside-Nav/blob/main/messageSpacesMacro.js) and deploy either via Control Hub or locally on the device. Replace the **botToken** and **deviceId** with the details obtained above. Set the **spacesUrl** to the desired URL.
