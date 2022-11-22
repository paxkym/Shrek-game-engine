const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
game.target = ctx
var i = 0
const Graphic = new Sprite(10,10,[['./shrek/Shrek-backward-1.png','./shrek/Shrek-backward-3.png'],['shrek/Shrek-forward-2.png','shrek/Shrek-forward-3.png'], ['shrek/Shrek-left-2.png','shrek/Shrek-left-3.png'], ['shrek/Shrek-right-2.png','shrek/Shrek-right-3.png']], 5)

game.loop = function(){
    i++
    console.log('amogus')
    game.break = i>200
    Graphic.render()
    Graphic.stop = true
}

window.onkeydown = function(key){
    if(key.key == 'w'){
        Graphic.stop = false
        Graphic.track = 0
        Graphic.y--
    }else if(key.key == 's'){
        Graphic.stop = false
        Graphic.track = 1
        Graphic.y++
   }else if(key.key == 'a'){
    Graphic.stop = false
    Graphic.track = 2
    Graphic.x--
}else if(key.key == 'd'){
    Graphic.stop = false
    Graphic.track = 3
    Graphic.x++
}
}

start()
