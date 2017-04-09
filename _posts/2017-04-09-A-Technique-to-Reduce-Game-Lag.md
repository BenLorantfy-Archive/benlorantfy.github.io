--- 
layout: "default"
---
# A Technique to Reduce Game Lag

The following is a technique to attempt to reduce lag in multiplayer games. The example uses gamepod.io and PubNub. The purple player will serve as the local player and the blue player as the network player. We can make the boxes follow eachother to demonstrate the lag.

One of the first things we should do is make sure we only process new messages. We can do that using the following code.

<script src="https://gist.github.com/BenLorantfy/80bdff05b8149e59d624a2c8e1c4e0d2.js"></script>  
    
A first attempt might be to just set the coordinates every time we recieve the messages like so.

<script src="https://gist.github.com/BenLorantfy/79eac8b2c943d9a085e8bb22bc6de333.js"></script>
    
<video src="/img/lag1.mov" autoplay loop></video>
    
However, this means the blue box will be behind by the length of our send interval. So if we send the messages every 100ms, the box will be behind by 100ms. One way to fix this is to send the messages more often. However, this might be too expensive a solution.

This is where the technique comes in. The idea is to interpolate the coordinates between messages by sending the velocities as well. We can even apply other world physics such as gravity and hit detection. The following code will work for our example.

<script src="https://gist.github.com/BenLorantfy/b12b879927f941c932d58fcdaa454c52.js"></script>

<video src="/img/lag2.mov" autoplay loop></video>

If you compare the two videos you will notice a significant improvement in the second one, yet we're still sending the same amount of messages at the same message sending rate.
