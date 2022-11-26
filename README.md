To import the game engine, download the file: Shrek-game-engine.js. Next, put it as the _**first**_ script tag, then your code's script tag. This library is also available on npm, for those who use node (or browserify).
# Shrek game engine
Documentation and engine created by Paxon Kymissis

v1.0

---
## Section 1
This section will be an overview of how the game engine works. The usage is documented in further sections. The game engine as shown on its github repository contains an additional game bundled in with the library. This is an absolute necessity for testing, and the game may be played if you wish, or can be ignored. All code (including the game) is free, and open-source under the MIT License. 
#### Basic overview
Shrek game engine is a bitmap game engine which is desgned for ease of animation, utility, speed, and small size. The game engine is 100% frontend code that can be run in the browser, Or be used in an app (That supports web rendering). It is not recomended however, that the engine is used in a browser, as a web browser may slow down code execution. This will drop the frame rate, and may cause some sub-frame processing glitches. Instead, use a dedicated renderer; You may also use a framework of your choice, although the reccomended usage is in electron.
Shrek game engine is not capable of anything that is not mentioned in the documentation, such as playing audio, or 3d games. If you want another feature, fork the repo, and add it there. To modify the source code, section 4 describes its inner functionality. This will aid in its modification.


**Important:** Please read ***All the way*** through the documentation and demo before using the game engine.
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

`game.main`, is the sprite for the main character. (Sprite/Item)

`game.target`, is the canvas context that will contain your game (html element)

`game.map`, contains the current map (int)

`game.room`, contains the current room you are in. Its value is checked every frame (int)

`game.windowWidth`, contains the canvas width (int)

`game.windowHeight`, contains the canvas height (int)

`game.break`, is a special variable. When it is set to true, the game will stop on the next frame (boolean)

---

`game.settings`, is a special object which has the game settings. (object) 
The object contains the following:
 
 `game.settings.frameRate`, is the frame rate of the game. Please note that the game's maximum frame rate is limited by your computers hardware, and is by default set to 25 fps (int)
 
 `game.settings.antiAliasing`, decides if the canvas graphics are anti-aliased. Setting this variable to false is not guaranteed to eradicate smoothing, due to unavoidable limitations in browsers. This is true for every html game engine, and may cause for smaller pixelated images to be smoothed. (boolean)

---
## Section 2
This section is about the more in-depth properties of the engine. This section also contains the syntax for using game structures

#### Items
Items contain multiple properties to function. This is a list of them:

`x`, The x position (int)

`y`, The y position (int)

`width`, The width of the hitbox (int)

`height`, The height of the hitbox (int)

`layer`, A reference used by rooms to decide the order that sprites are rendered. (int) Smaller numbers mean lower layers.

`track`, The series of images used to be put onscreen when animating the sprite. The array contains paths which lead to the images. (array)

`frames`, The number of frames that each image in the animation track is displayed for (int)

`render()`, The function that is called each frame (function)
When declaring a  new item, you set each input argument like so:
```
var Table = new Item(x, y, track, frames)
```
The item rendering is taken care of by rooms, and does not concern the developer.
However, rooms are not necessary if you only wish to have a 1 room game, or a customizable game to your liking. If so, you may use the render function every frame, and load background graphics with `loadImage(path, x, y)`. Note that collision detection is performed by rooms also.
**Important**: paths to images are all relative to your game file.

#### Sprites

Full sprites contain:

`x`, The x position (int)

`y`, The y position (int)

`width`, The width of the hitbox (int)

`height`, The height of the hitbox (int)

`tracks`, A list of animation tracks. (array)

`track`, The current animation track. (int)

`id`, A string which helps the developer identify specific sprites in a room, or collison. (string)

`class`, A string which helps identify a type of sprite. (string) For example:

`sprite.class = 'grass'`. This info is not used by the engine, but can be used on collisions to detect if an item is solid or not.

`front`, A variable which decides if a sprite is rendered in the front, or back. If it is rendered in the same layer as another sprite, 

`frames`, The number of frames that each image in the animation track is displayed for (int)

`layer`, A reference used by rooms to decide the order that sprites are rendered. (int) Smaller numbers mean lower layers. When two sprites are on the same layer, the first in the sprite list will be rendered earlier.

`render()`, The function that is called each frame, which renders the next frame of animation for the sprite (function). Like with items, you will not need to worry about this function (unless you are not using a map)

`p`, An object that serves no purpose, other than to store information about the sprite. This object can only be changed by the developer, and is not interacted with by the engine. (object)

When declaring a  new full sprite, you set each input argument like so:
```
var Skeleton = new Sprite(x, y, tracks, frames)
```

`collision`, Information about the last sprite collision (object). It contains:

`collision.type`, The type of the sprite which was collided with. True means it was an item, and false means that it was a full sprite (boolean)

`collision.number`, The index of the sprite collided with in its respective room's sprite list (int)

`collision.on`, The function to be performed when the collision takes place. Preferably, this should be an async function. (function)

`collision.now`, A variable that is true when a collision is currently happening, And false when it is not. (boolean)

`collision.id`, The id string of the collided sprite (string)

`collision.class`, The class string of the collided sprite (string)
#### Rooms

A Room is a special container for sprites, which performs automatic rendering, as well as detection for certain things, like collisions. Rooms are technically an optional structure, but without them, you will need to manually render each sprite in your game loop, and calculate hitboxes yourself. You also cannot use a map strucure without a room.

`sprites`, An array of all the things in the room. (array)

`l`, The index in the master map array for the room that you are taken to when the main sprite is too far left. (int)

`r`, The right offscreen reference (same as l, but for right instead of left)

`u`, The top offscreen reference

`d`, The bottom offscreen reference

`render()`, Renders each frame of animation

## Section 3
This section is a demonstration showing how to make the demo game bundled in with the library. When you use this tutorial, it is assumed that you already have prior knowledge about html, and js, and have made some kind of thing with them.
#### Step 1: Import files
First, download the 'shrek' folder, and the 'Shrek-game-engine.js' file. Next, create a file called 'game.js' (or whatever you want to call it).

Then, create the 'index.html' file and put the following in it:

```
<!DOCTYPE html>
<body>
<head>
<title>Shrek</title>
</head>
<canvas id="game" height="200" width="450"></canvas>
<script src="Shrek-game-engine.js"></script>
<script src="game.js"></script>
</body>
```
You have now made the index file.

#### Step 2: Setup the game
Go into 'game.js', and then add the following:

```
const canvas = document.getElementById('game')
game.windowWidth = canvas.width
game.windowHeight = canvas.height
game.settings.frameRate = 25
const ctx = canvas.getContext('2d')
game.target = ctx
```

This is just some basic setup to let the engine know where to render the game, by setting the target to an apropriate graphics context, as well as setting some preferences.

We also have to make a room, to put everything in, so we'll make a room called 'pond' like so:

`const pond = new Room([])`

, and then put it into a map:

`game.maps.push([pond])`

Maps are not a special structure, they are simply just arrays. The game parses the master map array (stored inside of `game.maps`), takes the current map, (`game.map`) and the current room in that map (`game.room`), and renders it each frame. To do this, paste in the following:

```
game.map = 0
game.room = 0
```

You have now created a room which is ready to be rendered.

#### Step 3: Put sprites onscreen
We'll now create an item, called Water:

```
const Water = new Item(100,30,['./shrek/deep-water-1.png','./shrek/deep-water-2.png','./shrek/deep-water-3.png'], 8)
Water.width = 20
Water.height = 20
```

This item has three images in its animation track, and each is onscreen for 8 frames, with the coordinates 100,30

Next, put it into the room:

`pond.sprites.push(Water)`
 
 Add the code: `game.start()` at the end of your code, to let the game know that it is ready to begin.
 
 Finally, run the program by going into your web browser, and paste in the file path of your html file. You should now see an animated block of water.
 
 You have now created a simple animation. 
 
 For reference, your code should look something like this:
 
 ```
 // Setup
const canvas = document.getElementById('game')
game.windowWidth = canvas.width
game.windowHeight = canvas.height
game.settings.frameRate = 25
const ctx = canvas.getContext('2d')
game.target = ctx
game.map = 0
game.room = 0
// Game
const pond = new Room([])
game.maps.push([pond])
const Water = new Item(100,30,['./shrek/deep-water-1.png','./shrek/deep-water-2.png','./shrek/deep-water-3.png'], 8)
Water.width = 20
Water.height = 20
pond.sprites.push(Water)
game.start()
 ```

#### Step 3: Add a player

We have created a static object, but you can also add a moving sprite.





.
.
.
.
.
.
.
