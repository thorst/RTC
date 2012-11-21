#oRTC
######Open WebRTC Implementation


###WebRTC Basics:

You can read more at [webrtc's official project page](http://www.webrtc.org/blog). 
You can read more about firefox's implementation at [this blog](http://mozillamediagoddess.org/category/webrtc/)

* http://blog.chromium.org/search/label/webrtc
* http://blog.chromium.org/2012/04/chromes-webrtc-roadmap.html

######Do you have other links? Please submit them to me.

* GetUserMedia()- Ability to access Camera and Mic
* PeerConnection()- Ability to directly connect 2 peers
* DataChannels()- Ability to send data between clients on a peer connection (chrome hasn't implemented yet)

###Application Flow:

* Client gives name and begins a session (receives guid)
* Admin clicks on Clients name and joins that session. This sends a websocket message to client.
* Client sends an offer, and begins sending ice messages
* Admin receives offer, sends answer, begins sending ice messages
* Both exchange ice messages as needed until a connection is established

###How To Work Project:
* Deploy project in iis - nothing special for setup.
* Open client page in chrome 24
 * Type in name
 * Click video button
 * Click allow (to access mic and cam)
*Open in another tab admin page (or refresh if it was already open)
 * Click on name on the right hand side
 * Click allow to begin session

###Purpose of this project:

Would be to get a clean, working example for easy implmentation. For any user to begin learning how webRTC works.

Our sample application would be similar to a help desks. Where users can log in and choose between text or video. Admins can see a list of users and have multiple sessions open at a given time.


###Current Status:

At the core it works now. I just need to clean things up and then open it up to the community to try to figure out why it's not working.

Also the text will be developed as soon as chrome supports datachannels


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
* **2 pcs different 3g verizon air cards (no routers)**
* **2 pcs 1 on home (verizon dsl internet), 1 on work network**
* **2 pcs 1 on home (verizon dsl internet), 1 on inlaws (comcast cable internet)**


###Browser Support:

The intention is not to support every browser prefix. It would be to support those who have finished implementing the features. If it turns out that they hold onto the prefixes for a while, I may change my mind.

Currently I'm only targetting Chrome. Specifically the [Dev Branch](http://www.chromium.org/getting-involved/dev-channel).


###Technologies:

Here are a list of some technoligies you should be familiar with prior to editing the project.

* [jQuery](http://jquery.com/) (Javascript)
	* [jsrender](https://github.com/BorisMoore/jsrender) (JS Templating)
* [Bootstrap](http://twitter.github.com/bootstrap/) (Web Design)
* [Signalr](https://github.com/SignalR/SignalR) (WebSockets) ([Amazing Video](http://vimeo.com/43659069))
* c# - Visual Studio 2012


###Current TODO:
* cleanup code
* make sure we handshake before we begin session
