let worldX = 300, worldY = 300, angle = 0.3;
let fovhalf = 3.14/4;
let near = 1, far = 100;
let farx1, fary1, farx2, fary2, nearx1, neary1, nearx2, neary2;
let img = new Image();
img.src = "mario_circuit_2.png";

var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;

let loadImage = function() {
    setInterval(getParallelogram, 10);
    getParallelogram();
}
img.onload = loadImage;

let getParallelogram = function() {
    angle+=0.01
    ctx.clearRect(0, 0, width, height);

    farx1 = worldX + Math.cos(angle - fovhalf) * far;
    fary1 = worldY + Math.sin(angle - fovhalf) * far;

    farx2 = worldX + Math.cos(angle + fovhalf) * far;
    fary2 = worldY + Math.sin(angle + fovhalf) * far;
    
    nearx1 = worldX + Math.cos(angle - fovhalf) * near;
    neary1 = worldY + Math.sin(angle - fovhalf) * near;
    
    nearx2 = worldX + Math.cos(angle + fovhalf) * near;
    neary2 = worldY + Math.sin(angle + fovhalf) * near;


    for(let y = 0; y < height/2; ++y) {
        let sampledepth = y/(height/2);

        let startX = (farx1 - nearx1) / (sampledepth) + nearx1;
        let startY = (fary1 - neary1) / (sampledepth) + neary1;
        let endX = (farx2 - nearx2) / (sampledepth) + nearx2;
        let endY = (fary2 - neary2) / (sampledepth) + neary2;

        for(let x = 0; x < width; x+=2) {
            let samplewidth = x / width;
            let sampleX = (endX - startX) * samplewidth + startX;
            let sampleY = (endY - startY) * samplewidth + startY;

            ctx.drawImage(img, Math.floor(sampleX), Math.floor(sampleY), 1, 1, x, y+height/2, 2, 1);
        }
    }
}


document.addEventListener('keydown', (event) => {
    if(event.key == "a") {
        angle-=0.05;
    }
    else if(event.key == "d") {
        angle += 0.05;
    }
  });