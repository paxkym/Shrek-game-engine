# Shrek game engine
Documentation and engine created by Paxon Kymissis

v1.0

---
## Section 1
This section will be an overview of how the game engine works. The usage is documented in further sections.
#### Basic overview
Shrek game engine is a bitmap game engine which is desgned for ease of animation, utility, speed, and small size. 
#### Structure
Shrek game engine contains four main structures:
##### Items
Items are a kind of sprite with few capabilities, of which, include:
- A single array of images, known as the animation track
- An x and y coordinate
- A hitbox

##### Sprites
Full sprites contain:
- An x and y coordinate
- A hitbox
- Multiple animation tracks
- A property list, to store things like health, or equipped items

##### Rooms

Rooms contain a list of items, and sprites. The hitboxes of each thing in the room a, as well as the sprite rendering are all handeled by rooms on each animation frame.
##### Maps


Maps are arrays of rooms, which store references to where each rooms leads to when you go off screen. They serve only as a container for rooms, and do not handle rendering, and only serve to link each room with another.
#### Function

The game has a master map array, contained inside the `game` object.
The object contains the following:

`game.loop`, this is where your game loop is stored, which will run on every frame of animation. (function)

`game.maps`, is the master maps array.  (array)

`game.target`, is the canvas context that will contain your game (html element)

`game.map`, contains the current map (int)

`game.room`, contains the current room you are in. Its value is checked every frame (int)

`game.break`, is a special variable. When it is set to true, the game will stop on the next frame (boolean)

---

`game.settings`, is a special object which has the game settings. (object) 
The object contains the following:
 
 `game.settings.frameRate`, is the frame rate of the game. Please note that the game's maximum frame rate is limited by your computers hardware, and is by default set to 25 fps (int)
 
 `game.settings.antiAliasing`, decides if the canvas graphics are anti-aliased. Setting this variable to false is not guaranteed to eradicate smoothing, due to unavoidable limitations in browsers. This is true for every html game engine, and may cause for smaller pixelated images to be smoothed. (boolean)

`game.settings.dialogue`, is an object containing settings for the dialogue boxes. (object) It defaultly contains: `{font:'Helvetica', size:'10px', color:'black', background:'teal'}`

Note that 'size' sets the _**font size**_
---
## Section 2
This section is about the more in-depth properties of the engine. This section also contains the syntax for using game structures

#### Items
Items contain multiple properties to function. This is a list of them:

`x`, The x position (int)

`y`, The y position (int)

`track`, The series of images used to be put onscreen when animating the sprite. The array contains paths which lead to the images. (array)

`frames`, The number of frames that each image in the animation track is displayed for (int)

`render()`, The function that is called each frame (function)








