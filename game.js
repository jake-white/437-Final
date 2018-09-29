var can = document.getElementById('canvas');
var ctx = can.getContext('2d');

ctx.translate(50,50); // just to get away from edge
// show original 200x200 area:
ctx.fillStyle = 'lightblue';
ctx.fillRect(0,0,1000,1000);


var img = new Image();
img.onload = function() {
    //ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    let ydist = 0;
    for(let i = 1; i < 1024; ++i) {
        ctx.drawImage(img, 0, i, 1024, 1, 250-Math.pow(i,2)*0.005   , 200+ydist, Math.pow(i,2)*0.01, i*0.0005);
        ydist+=i*0.0005;
    }
    
    // than scale
    ctx.translate(200*(1/3)/2,200 * (1/3) / 2) // move by half of the 1/3 space to center it
    ctx.scale(10, 2/3); // squish it to 2/3 vertical size
    
}

img.src = "mario_circuit_2.png";