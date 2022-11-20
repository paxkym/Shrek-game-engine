var game = { loop:function(){}, 
maps:[],
settings:{frameRate:25, antiAliasing:false,
     dialogue:{font:'Helvetica', size:'10px', color:'black', background:'teal'}
    },
 target:null, 
 map:null, 
 room:null, 
 break:false 
}
class item {
x = 0
y = 0
track = []
frames = 5
i = 0
frame = 0
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
    if(this.frame>this.frames){
        i++
        this.frame = 0
    }
    console.log(this.i, this.frame, this.track.length, this.frames)
    if(this.i>this.track.length){
        this.i = 0
    }
    console.log(this.x)
loadImage(this.track[i],this.x,this.y)
}
}
function loadImage(path, x, y){
    var ld = new Image()
    if(game.settings.antiAliasing){
        game.target.imageSmoothingEnabled = true
    }else{
        game.target.imageSmoothingEnabled = false
    }
    ld.src = path
    ld.onload = function(){
game.target.drawImage(ld, x, y)
    }
}

function wait(time){
    setTimeout(start, time*1000)
}
function start(){
    if(game.break){
        return
    }
    wait(1/game.settings.frameRate)
    game.loop()
}
//Game starts here. Everything above is the library
const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
game.target = ctx
var i = 0
const Graphic = new item(10,10,['shrek/Shrek-backward-1.png','shrek/Shrek-backward-2.png','shrek/Shrek-backward-3.png'], 5)

console.log(Graphic.u)
game.loop = function(){
    i++
    console.log('amogus')
    game.break = i>100
    Graphic.render()
}
start()