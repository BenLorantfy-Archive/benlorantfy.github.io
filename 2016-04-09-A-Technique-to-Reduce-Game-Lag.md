--- 
layout: "default"
---
# A Technique to Reduce Game Lag

The following is a technique to attempt to reduce lag in multiplayer games. The example uses gamepod.io and PubNub. The purple player will serve as the local player and the blue player as the network player. We can make the boxes follow eachother to demonstrate the lag.

One of the first things we should do is make sure we only process new messages. We can do that using the following code.

    var lastTime = "";
    Game.Server.on("update",function(data){
        // Only uses latest event
        if(data.time > lastTime){

            lastTime = data.time;
            // todo: process message
        }
    })
    
    
A first attempt might be to just set the coordinates every time we recieve the messages like so.

    var lastTime = "";
    Game.Server.on("update",function(data){
        // Only uses latest event
        if(data.time > lastTime){

            lastTime = data.time;

            player2.x(data.x);
            player2.y(data.y);
        }
    })
    
However, this means the blue box will be behind by the length of our send interval. So if we send the messages every 100ms, the box will be behind by 100ms. One way to fix this is to send the messages more often. However, this might be too expensive a solution.

This is where the technique comes in. The idea is to interpolate the coordinates between messages by sending the velocities as well. We can even apply other world physics such as hit detection. The following code will work for our example.

    var lastTime = "";
    var lastData = null;
    Game.Server.on("update",function(data){
        // Only uses latest event
        if(data.time > lastTime){
            lastTime = data.time;
            lastData = data;
        }
    })

    Game.loop(function(){
        if(!lastData) return;

        lastData.oy = lastData.y;
        lastData.ox = lastData.x;

        // Gravity
        lastData.vy -= ay;

        // Movement
        lastData.x += lastData.vx;
        lastData.y -= lastData.vy;

        // Set x/y
        player2.x(lastData.x);
        player2.y(lastData.y);

        // Detect hitting ground
        if(player2.hits(ground,".top")){
            // Set vy to 0
            lastData.vy = 0;

            // Restore to old y value
            lastData.y = lastData.oy;
            player2.y(lastData.y);
        }
    })
