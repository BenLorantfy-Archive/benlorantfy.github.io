--- 
layout: "default"
---
# An IoT Dog Pen

How cool is the internet of things? It has the oppurtunity to make our lives easier by doing everything from a smart fridge telling us when we're out of milk and sending a notification to our phone to cars emailing us when we need an oil change. I recently spent a weekend playing around with the revolutionary idea of machines connected to the internet and I created a smart pen for my dog, "minion".

## Final Product

<iframe src="http://benlorantfy.com/minion/" style='width:100%;height:1000px;display:block;'></iframe>

View in a full window [here](http://benlorantfy.com/minion/)

## Materials
- 7 2x4s - **$15**
- 20' long roll of chicken wire - **$15**
- Sheet of 1/4" plywood - **$10**
- Knock-off Ardunio - **$10**
- [Water Level Sensor](http://www.ebay.ca/itm/like/121879477528?lpid=116&chn=ps) - **$4**
- [Bildge Pump](http://www.canadiantire.ca/en/pdp/v-600-bilge-pump-0793542p.html#srp) - **$27**
- 3V relay - **$2**
- Cheap webcam - **$7**
- Old point and shoot camera
- Some wire

## Libraries
- [ffmpeg](https://ffmpeg.org/)
- [jquery](https://jquery.com/)
- [jsmpeg](https://github.com/phoboslab/jsmpeg)
- [nodejs](https://nodejs.org/en/)
- [chartjs](http://www.chartjs.org/)
- [mysql](https://www.mysql.com/)

## The actual pen

Before I can make the pen smart, I have to make a pen. Minion's a small dog so the idea was to make a medium-sized pen I could fit in the flower garden so it didn't have to be moved to cut the grass. I also had the idea to put it up against the basement window so minion could jump through the window whenever he wanted to go outside.

<img class='snap' src='https://raw.githubusercontent.com/BenLorantfy/BenLorantfy.github.io/master/img/pen_step1.jpg'/>
<img class='snap' src='https://raw.githubusercontent.com/BenLorantfy/BenLorantfy.github.io/master/img/pen_step2.jpg'/>
<img class='snap' src='https://raw.githubusercontent.com/BenLorantfy/BenLorantfy.github.io/master/img/pen_step3.jpg'/>

I cleared out a 8' x 3' space in the weed ridden graden in my backyard. I created a 3-sided frame out of 2x4 with the thought that the 4th side would be the house. I then wrapped chicken wire around the 3 sides and stapeled it to the 2x4s. I dug a little trench for the bottom 2x4s and covered them up so it would be harder for minion to dig under the pen if he tried. I also filled the bottom of the pen with wood chips so minion wouldn't drag in mud.

<img class='snap' src='https://raw.githubusercontent.com/BenLorantfy/BenLorantfy.github.io/master/img/mom_with_root_.jpg'/>
<img class='snap' src='https://raw.githubusercontent.com/BenLorantfy/BenLorantfy.github.io/master/img/pen_step4_.jpg'/>

Next I made the door of the pen. The idea was to have it fit where the screen ussually fits so the window could still close when it rains, snows, etc. Or we could also close it if we didn't want minion outside for whatever reason. I also made a small ramp so minion can climb up and down from the window. The ramp also doubles as a tiny dog house so minion can have some shade on hot days.

<div>
  <video class='snap' width="200" height="360" autoplay loop muted><source src="https://raw.githubusercontent.com/BenLorantfy/BenLorantfy.github.io/master/img/pen_jigsaw.mp4" type="video/mp4"/></video>
  
  <img class='snap' src='https://raw.githubusercontent.com/BenLorantfy/BenLorantfy.github.io/master/img/pen_door.jpg'/>
  
  <video class='snap' width="200" height="360" autoplay loop muted>
  <source src="https://raw.githubusercontent.com/BenLorantfy/BenLorantfy.github.io/master/img/pen_final_product.mp4" type="video/mp4"/>
  </video>
</div>

## Cameras

Next I mounted some web cameras to the pen. There was a couple problems I had to solve at this point. At first I tried a $7 dollar-store webcam but the quality was so bad that in the sunlight the screen went completely white. So instead I mounted the $7 dollar camera under the ramp in the shade and found an old point-and-shoot camera for a view of the whole pen. 

The second problem was that the point-and-shoot camera ran on batteries and I didn't want to have to change the batteries every time they ran out. I solved this by wiring up a 3V DC power supply to the battery terminals and running the wires through the window to an outlet in my the basement.

The third problem was that whenever the camera screen went to sleep, the feed would go black. Because my camera didn't have an option to turn off the sleep, this was a significant problem. I ended up having to install a hack fireware version to the SD card of the camera and have it autoboot into the custom firmware. The firmware I used is called [CHDK](http://chdk.wikia.com/wiki/CHDK) (Cannon Hack Development Kit). This custom fireware did have an option to turn off the screen sleep which fixed the feed going black problem.

<div>
  <video class='snap' width="200" height="360" autoplay loop muted><source src="https://raw.githubusercontent.com/BenLorantfy/BenLorantfy.github.io/master/img/pen_camera.mp4" type="video/mp4"/></video>
</div>

So, next I wanted to setup a web page to stream the camera feeds live. I found that the HTML spec is still pretty new on livestreaming and all the different browsers have way different protocals making it fairly difficult to implement. Of course I could use Flash but I'd rather avoid using a non-standard web technology. I found a solution with [jsmpeg](https://github.com/phoboslab/jsmpeg) which is a really cool mpeg stream decoder in JavaScript. The process flow was as follows:

  1. Create a mpeg stream with something like [ffmpeg](https://ffmpeg.org/) using webcam input and outputing an http stream. The following command worked for me on windows. Make sure your frame rate matches the frame rate of the device you're using, this was an issue for me that I had to figure out.
  
    `ffmpeg -s 320x240 -r 30 -f dshow -rtbufsize 500000k -i video="Dazzle DVC100 Video" -f mpeg1video -b 400k -r 30 http://127.0.0.1:8082/password123/320/240`

  2. Create a mpeg websocket stream from the http stream. The jsmpeg repsitory convientantly includes a stream server that does just this for you.
  3. Recieve the mpeg websocket stream on the browser and use [jsmpeg](https://github.com/phoboslab/jsmpeg) to decode it onto a canvas.
  
To host it, I'm using a spare PC desktop with decent specs but you could probably just as easily use a cheap Rasberry Pi.  It's running node.js and a simple mysql database.  I redirected requests to the router IP to the server's private IP from the router settings for port 80 and a couple websocket ports for each camera stream.

## Water Bowl

I also added the ability to fill minion's water bowl by holding a button on the pen's webpage. I used a Chinese knockoff Ardunio that I got for $10 at a local electronics shop. Since my web server was written in node.js I used the [johnny five](http://johnny-five.io/) javascript robotics library. It's a really cool library that lets you talk to Ardunios from node.js. You have to make sure you load Firmata onto the board first, which is a protocal for communicating with microcontrollers over USB, which you can find in the examples in the Ardunio IDE as "StandardFirmata". I hooked up the Ardunio to a 3V relay that controlled power to a 12V bildge pump. The bildge pump was put in a bucket of water and I connected a hose from the pump to a custom built water trough that I put in minion's pen.

<div>
  <video class='snap' width="200" height="360" autoplay loop muted><source src="https://raw.githubusercontent.com/BenLorantfy/BenLorantfy.github.io/master/img/pen_waterbowl.mp4" type="video/mp4"/></video>
</div>

I also attached a cheap water level sensor I found on ebay to the inside of the waterbowl so I can display the current water level on the web page. This also lets me allow any one to fill the water bowl since I can prevent abuse by stopping it when it reaches a certain water level.  I also added a couple neat real-time graphs to see the water level over time. I've also embedded them here:

<div>
<iframe src="http://72.39.166.255/last-minute-chart.html" style='width:350px;height:300px;border:0;margin-right:20px;display:inline-block'></iframe>
<iframe src="http://72.39.166.255/last-day-chart.html" style='width:350px;height:300px;border:0;display:inline-block'></iframe>
</div>
