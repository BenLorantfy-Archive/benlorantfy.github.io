--- 
layout: "default"
---
# Modrian Art Puzzle

I recently learned about something called a Mondrian Puzzle. These are square puzzles where you need to draw in rectangles to fill the square. The catch is that you can't reuse rectangles with the same or opposite dimensions. Your score is the area of the biggest rectangles minus the area of the smallest rectangle and you're trying to get smaller scores.

While you can draw this puzzle on paper, it's screaming to be made into an interactive widget. I created it in codepen.io and I've embeded it below.  It was mostly UX logic and also includes an algorithim for validating the rectangle patterns. 

<iframe src="http://blog.benlorantfy.com/lab/mondrian/"></iframe>

I also added a highscores list using firebase.  It tracks the best score for each grid size (e.g. 5x5, 6x6, etc). To submit a score, a POST request is sent to a firebase HTTP function with the rectangle pattern. The firebase function then verifies the rectangles are a valid pattern and then calculates the score. This firebase function is neccessary to prevent any sort of cheating and ensures the database only contains valid scores. 

So far, several different people have gotten highscores for various grid sizes. My hope is that this compeition helps create a database of lowest scores for each grid size, which could be a significant contribution to the theoretical research on Mondrian Art Puzzles.  This would be esspecially helpful because computers start to take too long to brute force the answer for large grid sizes, making it difficult to create a database without human help. One unsolved question this might help solve, for example, is do the minimum scores ever converge to 0 as the grid size increases? 