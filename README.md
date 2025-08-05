# Macro-for-Outside-Nav
* [Introduction](https://github.com/dhenwood/Dynamic-Wallpaper#introduction)
* [Setup](https://github.com/dhenwood/Dynamic-Wallpaper#setup)

## Introduction
A new feature in Cisco video devices (currently in beta) allows for an outside Navigator to incorporate UI Extensions and Macros. Beta details [can be found here](https://gobeta.webex.com/project/feature/item.html?cap=115ca7c0-65ba-4f05-966c-81d02e884c9f&artid=7dae6035-ef0a-4d48-aaf1-c8e618325810).

The following is an example of
1. Send a short message from outside a meeting room to people inside (displayed on the screen). See first example below.
2. View Cisco Spaces from outside the room to locate an available room. See second example below.

![example](https://github.com/dhenwood/Macro-for-Outside-Nav/blob/main/Send%20Message%20Example.png)
![example](https://github.com/dhenwood/Macro-for-Outside-Nav/blob/main/View%20Spaces%20Example.png)

## Setup
In order for the outside navigator to send a message to the inside video codec, a message is sent via the Cisco Cloud API's. Whislst there are a number of ways to achieve this, the easiest is creating a BOT.

### Create and associate a BOT
Details on creating a BOT can be [found here](https://developer.webex.com/messaging/docs/bots). The crucial part of this set is to save the BOT token once created. This will be used furtheron by the macro for authentication.

### Obtian the Device ID
