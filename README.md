Technologies used:
Html, Css, bootstrap, javascript





Planning and development proccess

I started off by deciding what functionality I wanted. I was aiming for the
minimum, just get the functionality done, then move on from there.
I started off by doing the game logic, then moved onto the api. after
getting the authentication finished, I started working on the game aspect.
Having the game logic done was convenient, because I could simply tweek
the game logic as I needed it for sending information to the api.

As for working through problems. When building the computer player, I had an initial
idea of how to do things based on the name of an algorythm I had heard.
I had a piece put together, but quickly saw that it was definitly a good piece,
but I needed more pieces in the decision making process. So I satted writing
a piece that would take a spot to win a game, I was then able to use that to block
the opposing player from winning the game. At this point the computer was able
to win or tie every time, so long as the opponent played "accurately", however
it could be tricked.
This made me realize I needed to write one last piece to check for squares that
if played in would give the player two possibilities of winning.
By writing small pieces that did a specific thing, I was able to more accurately
figure out what went wrong.
(I still need to fix the hookup for the computer to the UI, that is still bugy,
but I ran out of time, however, the computer picks the right move.)
I would also google things if I did not know what was happening, and ask for help.
Now I had a couple times where literally as I was explaining an issue to someone
that I saw what was wrong. Usually a really stupid mistake that was very difficult
to catch, susch as having an if else that was supposed to come after a for loop,
but was barely inside, so it didn't register as a syntax error, but caused the
code to fail.


Unsolved problems:
I need to create a better UI. I focused on creating a mvp, after that point, I started to work on a computer opponent. This ended up taking more time than expected, so when I have time this will be addressed.

The computer is a bit buggy. When starting a new game, it would struggle on the second game played after the player logged in, so for now, I have removed computer functionality. 
The AI also fails to identify the proper move in one situation. Specifically when the computer moves second, and the player plays in a corner. The computer will then play in the center of the board, which is the accurate move. If the human player then plays in the opposite corner, the computer does not identify the proper move, and will play in one of the other two corners, causing a loss.
Wireframe:
https://git.generalassemb.ly/juliansirkin/game-project-scope-study/tree/response
