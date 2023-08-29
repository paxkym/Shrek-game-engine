To import the game engine, download the file: Shrek-game-engine.js. Next, put it as the _**first**_ script tag, then your code's script tag. This library is also available on npm, for those who use node (or browserify).
# Shrek game engine
Documentation and engine created by Paxon Kymissis
### **Warning: this library does not work properly**


v1.0
---
## Section 1
This section will be an overview of how the game engine works. The usage is documented in further sections. The game engine as shown on its github repository contains an additional game bundled in with the library. This is an absolute necessity for testing, and the game may be played if you wish, or can be ignored. All code (including the game) is free, and open-source under the MIT License. 
#### Basic overview
Shrek game engine is a bitmap game engine which is desgned for ease of animation, utility, speed, and small size. The game engine is 100% frontend code that can be run in the browser, Or be used in an app (That supports web rendering). It is not recomended however, that the engine is used in a browser, as a web browser may slow down code execution. This will drop the frame rate, and may cause some sub-frame processing glitches. Instead, use a dedicated renderer; You may also use a framework of your choice, although the reccomended usage is in electron.
Shrek game engine is not capable of anything that is not mentioned in the documentation, such as playing audio, or 3d games. To modify the source code, section 4 describes its inner functionality. This will aid in its modification.


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

This item has three images in its animation track, and each is onscreen for 8 frames, with the coordinates 100, 30, and a hitbox size of 20, 20

Next, put it into the room:

`pond.sprites.push(Water)`
 
 Add the code: `game.start()` at the end of your code, to let the game know that it is ready to begin. When you add this please be sure to ***always*** keep it at the ***very end*** of your code
 
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

We have created a static object, but you can also add a moving sprite. To do this, it is similar to item creation:

`const Shrek = new Sprite(10,10,[['./shrek/Shrek-backward-1.png','./shrek/Shrek-backward-3.png'],['shrek/Shrek-forward-2.png','shrek/Shrek-forward-3.png'], ['shrek/Shrek-left-2.png','shrek/Shrek-left-3.png'], ['shrek/Shrek-right-2.png','shrek/Shrek-right-3.png']], 1)`

it is the same, except this time the animation is an array of other animations instead. These are the animation tracks, and they can be switched by setting the track variable. Push Shrek to the `pond.sprites` array, and then look at the result. You can do so by adding:

```
 const Shrek = new Sprite(10,10,[['./shrek/Shrek-backward-1.png','./shrek/Shrek-backward-3.png'],['shrek/Shrek-forward-2.png','shrek/Shrek-forward-3.png'], ['shrek/Shrek-left-2.png','shrek/Shrek-left-3.png'], ['shrek/Shrek-right-2.png','shrek/Shrek-right-3.png']], 1)
 Shrek.width = 5
Shrek.height = 13
Shrek.layer = 1
pond.sprites.push(Shrek)
```

You'll see that shrek is on layer 1, whereas by default, the water is on layer zero. This means that shrek is in front of the water instead of behind.

Now, we need to make shrek move. We can do so by using the `window.onkeydown` function, and moving shrek's position when certain keys are pressed. To do so, add this:

```
const stepSize = 4
window.onkeydown = function(key){
    if(key.key == 'w'){
        Shrek.track = 0
        Shrek.y -= stepSize
    }else if(key.key == 's'){
        Shrek.track = 1
        Shrek.y += stepSize
   }else if(key.key == 'a'){
    Shrek.track = 2
    Shrek.x -= stepSize
}else if(key.key == 'd'){
    Shrek.track = 3
    Shrek.x+= stepSize
}
}
```

If you run the code now, you'll see that shrek moves when you press the WASD keys, but doesn't stop his running animation when on water. To stop it, we can use the `.stop` property of sprites, which stops animating the sprite, until it is set to true again. You can add this by putting: `shrek.stop = false` between the if statement, and `shrek.track` setting. In other words, do this for every if statement above:
```
   }else if(key.key == 'a'){
   Shrek.stop = false // this will be added in
    Shrek.track = 2
    Shrek.x -= stepSize
}else if(key.key == 'd'){
```

Now, add this code:

```
window.onkeyup = function(key){
    Shrek.stop = true
}
```

to stop it each time the key is up. The code you added before will cancel that stop when the key is pressed down again.

There is now a new problem, which is that shrek does not stand when he stops walking, he stays frozen in his animation. You can add more code to the `onkeyup` function by saying that when the key is up, the last key to be pressed must have been the direction, and therefore shrek must have his new animation set to the static standing animation for that direction. To do this, give shrek four new animation tracks, by setting his declaration to the following:

`
const Shrek = new Sprite(10,10,[['./shrek/Shrek-backward-1.png','./shrek/Shrek-backward-3.png'],['shrek/Shrek-forward-2.png','shrek/Shrek-forward-3.png'], ['shrek/Shrek-left-2.png','shrek/Shrek-left-3.png'], ['shrek/Shrek-right-2.png','shrek/Shrek-right-3.png'], ['shrek/Shrek-right-1.png', 'shrek/Shrek-right-1.png'], ['shrek/Shrek-left-1.png', 'shrek/Shrek-left-1.png'], ['shrek/Shrek-forward-1.png', 'shrek/Shrek-forward-1.png'], ['shrek/Shrek-backward-2.png', 'shrek/Shrek-backward-2.png']], 1)
`

You will see two of the same frame in each idle track. This is because of internal game limitations which require at least two animation frames.

Now, set `onkeyup` to the folowing:

```
window.onkeyup = function(key){
    let direction = key.key
    if(direction === 'd'){
    Shrek.track = 4
    }else if(direction === 'a'){
        Shrek.track = 5
        }else if(direction === 's'){
            Shrek.track = 6
            }else if(direction === 'w'){
                Shrek.track = 7
                }
    Shrek.render()
    Shrek.stop = true
}
```

This code checks the key last pressed, and sets its track accordingly. Because the animation is stopped when this happens, shrek is manually rendered once to add the idle animation.

#### Step 4: Increase the pond size

Shrek's pond currently has only has one block of water. Let's add some more.
To do so, we'll create a function that makes water blocks, called Water(). First, add a new item with an identical declaration as our other water block:

```
function Water(x, y){
 const item = new Item(x,y,['./shrek/deep-water-1.png','./shrek/deep-water-2.png','./shrek/deep-water-3.png'], 8)
 
}
```

Then, add the hitbox size (inside the function):

```
 item.width = 20
 item.height = 20
```

Next, give it a class, which will let us know that it is water:

`item.class = 'water'`

And return value:

```
return item
```

next, remove the water sprite that we added before, by removing the lines mentioning it.

We can now add the new water to the room:

```
pond.sprites = pond.sprites.concat([Water(100, 30), Water(120, 30), Water(140, 30), Water(100, 30), Water(100, 50), Water(120, 50), Water(140, 50), Water(100, 50), Water(80, 30), Water(120, 70), Water(160, 10), Water(160, 30)])
```

you should now have a pond.

#### Step 5: make solid sprites

Currently, shrek can walk on top of the water, which is not realistic. To de-jesusify shrek, you need to use hitboxes. First, set collision.on for shrek:

```
Shrek.collision.on = function(){
if(Shrek.collision.class === 'water'){
    console.log('hi')
    if(direc == 'a'){
        Shrek.x++
    }else if(direc == 'd'){
        Shrek.x--
    }else if(direc == 'w'){
        Shrek.y++
    }else if(direc == 's'){
        Shrek.y--
    }
}
}
```

But before you run the code, create a global variable called 'direc', and inside of onkeydown, put: `direc = key.key` to let the collision detection know what direction you are in.

However, this method is not recommended, because it pushes you in the opposite direction you are in. This allows for super mario brothers style glitches to push you deep into areas you noramlly can't go into, and if you want, you can try to push yourself into the pond by going upwards into a block, and then during the short period that you are inside of it, hit the D key, which should, if done properly, push you left through the blocks.

Now, shrek can't go into the pond (mostly) and other blocks with the class 'water'.

#### Step 6: Adding greenery

Shrek has some water, but now he may need some grass. To do this, we'll add a grass creating function:

```
function Grass(x, y){
    const item = new Item(x,y,['shrek/short-grass-1.png', 'shrek/short-grass-2.png', 'shrek/short-grass-3.png'], 7)
    item.width = 20
    item.height = 20
    item.class = 'short-grass'
    return item 
}
```

, And then put some grass onscreen. But we need to fill the *entire screen* with it, and that may take a while. To combat this issue, create a function that fills items onscreen:

```
function fillItems(room, x, y, midx,  midy, type){
     i = 0
     i2 = 0
    while(i<x){
        while(i2<y){
      room.sprites.push(type((i*20)+midx, (i2*20)+midy))
      i2++
    }
    i2 = 0
      i++
    }
    
  }
```

And then use it to fill with grass:

`fillItems(pond, 10, 7, 0, 0, Grass)`

We can now add bushes, by adding a creation function for them:

```

```




.
.
.
.
.
.
.
