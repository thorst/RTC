#oRTC
######Open WebRTC Implementation


#Dont use yet, I'm still porting to this project from one that is working, but quite a mess.


###WebRTC Basics:

You can read more at [webrtc's official project page](http://www.webrtc.org/blog). 
You can read more about firefox's implementation at [this blog](http://mozillamediagoddess.org/category/webrtc/)

* GetUserMedia()- Ability to access Camera and Mic
* PeerConnection()- Ability to directly connect 2 peers
* DataChannels()- Ability to send data between clients on a peer connection

###Application Flow:

* Client gives name and begins a session reciving a session guid
* Admin clicks on Clients name and joins that session. This sends a websocket message to client.
* Client sends an offer, and begins sending ice messages
* Admin receives offer, sends answer, begins sending ice messages
* Both exchange ice messages as needed until a connection is established

###Purpose of this project:

Would be to get a clean, working example for easy implmentation. For any user to begin learning how webRTC works.

Our sample application would be similar to a help desks. Where users can log in and choose between text or video. Admins can see a list of users and have multiple sessions open at a given time.

One should be able to take this and turn it into a direct connection or the same scenario as mine, except instead of choosing text or video, one chat screen can become either.

###Current Status:

I'm still building this project. Pulling the source from another project and trying to clean things up.

In another project I have the application works on same networked machines, but not between networks. I'm hopeful that the community can pull together and get it working everywhere.


###Testing Scenarios:
Below are the scenarios I test. The ones in bold are currently **_NOT_** working.

#####LocalHost
* Same pc

#####Internally Hosted
* Same pc
* 2 pcs

#####Externally Hosted
* Same pc
* 2 pcs both work network
* 2 pcs both home network
* **2 pcs different 3g verizon air cards**
* **2 pcs 1 on home (verizon dsl internet), 1 on work network**
* **2 pcs 1 on home (verizon dsl internet), 1 on inlaws (comcast cable internet)**


###Browser Support:

The intention is not to support every browser prefix. It would be to support those who have finished implementing the features. If it turns out that they hold onto the prefixes for a while, I may change my mind.

Currently I'm only targetting Chrome. Specifically the [Dev Branch](http://www.chromium.org/getting-involved/dev-channel).


###Technologies:

Here are a list of some technoligies you should be familiar with prior to editing the project.

* [jQuery](http://jquery.com/) (Javascript)
	* [jsrender](https://github.com/BorisMoore/jsrender)(JS Templating)
* [Bootstrap](http://twitter.github.com/bootstrap/) (Web Design)
* [Signalr](https://github.com/SignalR/SignalR) (WebSockets) ([Amazing Video](http://vimeo.com/43659069))
* c# - Visual Studio 2012


###Current TODO:
* cant actually connect yet
