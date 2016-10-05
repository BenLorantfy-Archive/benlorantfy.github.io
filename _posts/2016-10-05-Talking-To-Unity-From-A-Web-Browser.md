--- 
layout: "default"
---
# Talking To Unity From A Web Browser

I recently figured out a way to communicate with a web browser from a Unity game over LAN. The solution uses a HTML5 Web Socket on the browser side and a TCP/IP socket from Unity. Before unity and the browser can talk to each other, unity first has to handle a websocket upgrade request. Unity also has to send messages in a specific format in order to be recieved properly by the browser web socket. 

<div>
  <video width="1000" autoplay loop muted><source src="https://raw.githubusercontent.com/BenLorantfy/BenLorantfy.github.io/master/img/unity_browser_demo.mp4" type="video/mp4"/></video>
</div>

I wrote a websocket server class for unity that you can view below

<script src="https://gist.github.com/BenLorantfy/abee5736de50dc0da388aafd17a90b1e.js"></script>
