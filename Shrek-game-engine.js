var game = { 
    loop:function(){}, 
maps:[],
start:function(){},
settings:{
    frameRate:25,
     antiAliasing:false,
     dialogue:{font:'Helvetica', size:'10px', color:'black', background:'teal'}
    },
 target:null, 
 map:null, 
 room:null, 
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
    id:null
    }
    p = {}
    frames = 5
    i = 0
    frame = 0
    stop = false
    front = true
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
    constructor(sp){
    this.sprites = sp
    }
    sprites = []
   render = function (){
        this.sprites.forEach(i => function(){
            
            i.render()
        })
    }
}

game.start = function(){
    if(game.break){
        return
    }
    game.loop()
    setTimeout(game.start, (1/game.settings.frameRate)*1000)
    game.target.clearRect(0, 0, game.windowWidth, game.windowHeight);
}
