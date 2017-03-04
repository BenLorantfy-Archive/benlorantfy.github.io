--- 
layout: "default"
---
# Collatz Conjecture Illustrated

A conjective in the context of mathematics, if you're not aware, is basically a strong theory that hasn't been proven. Some conjectures are eventually solved. For example, Fermat's Last Theorem was a conjecture that lasted 358 years before being eventually proven in 1995.

The Collatz Conjecture is a conjecture that has yet to be proven. The conjecture states that if you take any number and divide by 2 if it's even or multiply by 3 and add 1 if it's odd, that you'll eventually get to 1 if you repeat this process for long enough. 

<img style="display:block; margin:auto" src="https://imgs.xkcd.com/comics/collatz_conjecture.png"/>

I recently had to implement a fast algorithim to do this as part of an interview process. The interview got me thinking about any patterns that emerge in the conjecture. One area where a pattern might exist is with the number of steps it takes to reach 1. I ended up making an interactive that you can use to search for a pattern below.

<p data-height="567" data-theme-id="0" data-slug-hash="KWzXoX" data-default-tab="result" data-user="benlorantfy" data-embed-version="2" data-pen-title="Collatz Illustrated" class="codepen">See the Pen <a href="http://codepen.io/benlorantfy/pen/KWzXoX/">Collatz Illustrated</a> by Ben Lorantfy (<a href="http://codepen.io/benlorantfy">@benlorantfy</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

The black bars are the steps it takes to reach each number. The red line is the line of best fit calculated using the least squares method. The yellow line is a rolling average. You can change the period of the rolling average using the textbox. With these analytics, there are a few patterns that emerge when you look at a big enough dataset. First you will notice that the red line has a slight positive slope, suggesting bigger numbers generally take more steps to reach 1. The yellow line also seems to suggest that the randomness of the data increases as the numbers increase.

You can adjust the properties above to see if you can find any other patterns
