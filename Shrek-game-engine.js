var game = { 
    loop:function(){}, 
maps:[],
start:function(){},
settings:{
    frameRate:25,
     antiAliasing:false
    },
 target:null, 
 map:0, 
 room:0, 
 break:false,
 windowWidth:450,
 windowHeight:200, 
 main:null
}
function loadImage(path, x, y){
    if(game.settings.antiAliasing){
        game.target.imageSmoothingEnabled = true
    }else{
        game.target.imageSmoothingEnabled = false
    }
    var ld = new Image()
    ld.src = path
    ld.onload = function(){
game.target.drawImage(ld, x, y)
    }
}
class Item {
width = 10
height = 10
x = 0
y = 0
track = []
frames = 5
i = 0
frame = 0
front = false
layer = 0
constructor(x, y, track, frames){
    this.frames = frames
    this.i = 0
    this.frame = 0
    this.x = x
this.y = y
this.track = track
}
render(){
    this.frame++
    if(this.frame == this.frames+1){
        this.i++
        this.frame = 0
    }
    if(this.i == this.track.length){
        this.i = 0
    }
    // console.log(this.track[this.i])
loadImage(this.track[this.i],this.x,this.y)
}
}
class Sprite {
    width = 10
    height = 10
    x = 0
    y = 0
    tracks = []
    track = 0
    class = null
    id = null
    collision = {
    on: function(){},
    type:null,
    number:null,
    id:null,
    now:false,
    class:null
    }
    p = {}
    frames = 5
    i = 0
    frame = 0
    stop = false
    layer = 0
    constructor(x, y, tracks, frames){
        this.frames = frames
        this.i = 0
        this.frame = 0
        this.x = x
    this.y = y
    this.tracks = tracks
    }
    render(){
        if(!this.stop){
        this.frame++
        if(this.frame == this.frames+1){
            this.i++
            this.frame = 0
        }
        if(this.i == this.tracks[this.track].length){
            this.i = 0
        }
    }
    loadImage(this.tracks[this.track][this.i],this.x,this.y)
    }
}
class Room {
    sprites = []
    constructor(sp){
    this.sprites = sp
    }
   render = function (){
    // Layer calculation
    let list = this.sprites
    let order = []
    let ignore = []
    let result = []
    // Extracting the layer from each sprite and ordering them
    // Algorithm is O(n^2), not the most efficient
    for(let i = 0; i<list.length; i++){
        order.push(list[i].layer)
    }
    order = order.sort()
    // Matching each sprite with its orig layer
    // to order them after sorting them
    // and then rendering them onscreen in that order
    for(let i = 0; i<order.length; i++){
        for(let i2 = 0; i2<list.length; i2++){
            if(list[i2].layer == order[i] && !ignore.includes(list[i2])){
                ignore.push(list[i2])
                result.push(list[i2])
            }
        }
    }
    for(let i = 0; i<this.sprites.length; i++){
        result[i].render()
    }
    }
    calculateHitboxes = function(){
        let collisionDidHappen = false
        // Extract full sprites
        let sprites = []
        for(let i = 0; i<this.sprites.length; i++){
            if(this.sprites[i].constructor == Sprite){
                this.sprites[i].collision.now = false
                sprites.push(this.sprites[i])
            }
        }
        // Perform collision detection algorithm
        // Efficiency is O((n^2)*16), counting the total number of comparison statements

        // It detects if the sprite is lower than the highest point in the other, higher than the lowest point, etc
        // This tactic is done four times, with the first sprite having its own size adjusted for each
        // time
        for(let i = 0; i<sprites.length; i++){
            for(let i2 = 0; i2<this.sprites.length; i2++){
                if(sprites[i] != this.sprites[i2]){

            sprites[i].x += sprites[i].width/2
            if(((sprites[i].x < this.sprites[i2].x + this.sprites[i2].width/2 && sprites[i].x > this.sprites[i2].x - this.sprites[i2].width/2) && (sprites[i].y < this.sprites[i2].y + this.sprites[i2].height/2 && sprites[i].y > this.sprites[i2].y - this.sprites[i2].height/2))){
                collisionDidHappen = true
            }

            sprites[i].x -= sprites[i].width
            if(((sprites[i].x < this.sprites[i2].x + this.sprites[i2].width/2 && sprites[i].x > this.sprites[i2].x - this.sprites[i2].width/2) && (sprites[i].y < this.sprites[i2].y + this.sprites[i2].height/2 && sprites[i].y > this.sprites[i2].y - this.sprites[i2].height/2))){
                collisionDidHappen = true
            }
            sprites[i].x += sprites[i].width/2
            sprites[i].y += sprites[i].height/2
            if(((sprites[i].x < this.sprites[i2].x + this.sprites[i2].width/2 && sprites[i].x > this.sprites[i2].x - this.sprites[i2].width/2) && (sprites[i].y < this.sprites[i2].y + this.sprites[i2].height/2 && sprites[i].y > this.sprites[i2].y - this.sprites[i2].height/2))){
                collisionDidHappen = true
            }

            sprites[i].y -= sprites[i].height
            if(((sprites[i].x < this.sprites[i2].x + this.sprites[i2].width/2 && sprites[i].x > this.sprites[i2].x - this.sprites[i2].width/2) && (sprites[i].y < this.sprites[i2].y + this.sprites[i2].height/2 && sprites[i].y > this.sprites[i2].y - this.sprites[i2].height/2))){
                collisionDidHappen = true
            }
            
            sprites[i].y += sprites[i].height/2
            if(collisionDidHappen){
                sprites[i].collision.type = (this.sprites[i2].constructor == Item)
                sprites[i].collision.number = game.maps[game.map][game.room].sprites.indexOf(this.sprites[i2])
                sprites[i].collision.now = true
                sprites[i].collision.id = this.sprites[i2].id
                sprites[i].collision.class = this.sprites[i2].class
                console.log(sprites[i].collision)
                console.log(sprites[i], " Is touching ", this.sprites[i])
            }
        }
            }
        }
    }
}

game.start = function(){
    if(game.break){
        return
    }
    game.loop()
    game.maps[game.map][game.room].render()
    game.maps[game.map][game.room].calculateHitboxes()
    setTimeout(game.start, (1/game.settings.frameRate)*1000)
    game.target.clearRect(0, 0, game.windowWidth, game.windowHeight);
}
