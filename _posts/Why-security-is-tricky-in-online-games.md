Security in online games is trickier to implement than you would think.  Some aspects are pretty straight forward. For example, it's easy enough to make sure accounts are secure. 

But ensuring high scores are legitmate, for example, is actually not trivial. When the game is over and the highscores are submitted, how do you stop someone from opening up the browser console and submitting their own highscore? If you put some thought into this, you realize the only 100% secure way to do this is to submit every user input to the server and run the game itself on the server. Otherwise, you can't trust the user actually played the game and submitted a true highscore.

However, this presents some additional problems. The bandwidth and processing time required to recieve each key press and/or mouse move for every user could end up being very expensive. This is also a lot more development. You might have started your system thinking it would just be a simple highscore service but now you realize you have to end up creating a much bigger and complex system. If you realized these issues afterwards, you could end up having to scrap your entire architecture.  Becuase of these issues, most online games are completely insecure and you really can't trust things like the highscore list at all. 

[purposegames.com](http://www.purposegames.com/) is a really good example of this. They have a huge database of trivia games and every single one has this problem. Here's a perfect score I got on a [game](http://www.purposegames.com/game/countries-of-south-america-quiz) in 1 second:


