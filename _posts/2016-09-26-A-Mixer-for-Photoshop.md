--- 
layout: "default"
---
# A Mixer For Photoshop

I ran across a cool product online that let you [control photoshop values with knobs and sliders](http://palettegear.com/). However, the base model is $200 excluding shipping and only comes with 2 value adjusting controls which is fairly insane. I decided this would be pretty easy and cheap to make with just an Arduino. 

## Materials
- 5x [10k ohm Potentiometers](https://www.sparkfun.com/products/9939) (5 x $0.95 = $4.75)
- 5x [Silver Metal Knob Heads](https://www.sparkfun.com/products/10001) (5 x $1.50 = $7.50)
- [Arduino Microcontroller](https://www.sparkfun.com/products/11021) ($24.95)
- Wire
- Some kind of container

**Total:** $37.2 (Slightly cheapr than $200 and you get 5 instead of 2...)

## Wiring
It's some pretty easy circuity too. You don't even need a board. The wiring is detailed in the below diagram. The side connectors on the potentiometers need to go to the 5V Out and the ground on the Arduino. It doesn't matter which side goes to which port but it needs to be consistent across each potentiometer. The middle pin needs to connect to an analog input.

<img src="https://www.arduino.cc/en/uploads/Tutorial/AnalogReadSerial_BB.png" />

## Mounting
The next step is to mount the potentiometer to your case. You can even use a piece of tupperware but if you want something nicer, sparkfun has a metal case here. Drill five 1/4 inch wide holes in the places you want the potentiometers, leaving space for the knob heads to turn.

## Software
I wrote a Photoshop Extension that works with this project called Knobby you can find on GitHub. It was probably the hardest part of the project, because just setting up the default project was a hassle. The nodejs version Photoshop includes is also very outdated which made it hard to communicate with the Arduino. I ended up writing an external program that gets launched when the extension launches. This external program then listens for analog input from the Arduino and communicates the input to the extension via TCP sockets. Here's about a minute after I got it working:

<div>
  <video class='snap' width="200" height="360" autoplay loop muted><source src="https://raw.githubusercontent.com/BenLorantfy/BenLorantfy.github.io/master/img/knobby_tests.mp4" type="video/mp4"/> </video> 
</div>


There is a prerequisite for the extension to work. You first need to load the firmata protocal onto the Arduino. This is a protocal for communicating to microcontrollers with a PC. You can find an implementation of it in the examples tab of the Arduino IDE called `StandardFirmata`.

<img src="https://raw.githubusercontent.com/BenLorantfy/BenLorantfy.github.io/master/img/firmata.png" />
