const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')
game.target = ctx
var i = 0
const stepSize = 4
const Shrek = new Sprite(10,10,[['./shrek/Shrek-backward-1.png','./shrek/Shrek-backward-3.png'],['shrek/Shrek-forward-2.png','shrek/Shrek-forward-3.png'], ['shrek/Shrek-left-2.png','shrek/Shrek-left-3.png'], ['shrek/Shrek-right-2.png','shrek/Shrek-right-3.png']], 1)
const Water = new Item(100,30, ['./shrek/deep-water-1.png','./shrek/deep-water-2.png','./shrek/deep-water-3.png'], 8)
Water.width = 20
Water.height = 20
Shrek.width = 5
Shrek.height = 13
Shrek.layer = 1
const outside = new Room([Shrek, Water])
game.maps.push([outside])
game.loop = function(){
    i++
    game.break = i>6000
}

window.onkeydown = function(key){
    if(key.key == 'w'){
        Shrek.stop = false
        Shrek.track = 0
        Shrek.y -= stepSize
    }else if(key.key == 's'){
        Shrek.stop = false
        Shrek.track = 1
        Shrek.y += stepSize
   }else if(key.key == 'a'){
    Shrek.stop = false
    Shrek.track = 2
    Shrek.x -= stepSize
}else if(key.key == 'd'){
    Shrek.stop = false
    Shrek.track = 3
    Shrek.x+= stepSize
}
}
window.onkeyup = function(key){
    Shrek.stop = true
}

game.start()
