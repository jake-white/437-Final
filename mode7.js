let worldX = 300, worldY = 500, angle = 0.3;
let fovhalf = 3.14/4;
let near = 1, far = 20;
let farx1, fary1, farx2, fary2, nearx1, neary1, nearx2, neary2;
let img = new Image();
img.src = "mario_circuit_2.png";
let sky_img = new Image();
sky_img.src = "sky.png";
let bg_data = [];
let sky_data = [];

let canvas = document.getElementById('canvas');
let bg_canvas = document.createElement('canvas');
let sky_canvas = document.createElement('canvas');
var ctx = canvas.getContext('2d');
let width = canvas.width;
let height = canvas.height;


var loadAllBGData = function() {
    bg_canvas.width = img.width;
    bg_canvas.height = img.height;
    bg_canvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    for(let x = 0; x < img.width; ++x) {
        bg_data[x] = [];
        for(let y = 0; y < img.height; ++y) {
            bg_data[x][y] = bg_canvas.getContext('2d').getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
        }
    }
}

var loadAllSkyData = function() {
    sky_canvas.width = sky_img.width;
    sky_canvas.height = sky_img.height;
    sky_canvas.getContext('2d').drawImage(sky_img, 0, 0, sky_img.width, sky_img.height);
    for(let x = 0; x < img.width; ++x) {
        sky_data[x] = [];
        for(let y = 0; y < img.height; ++y) {
            sky_data[x][y] = sky_canvas.getContext('2d').getImageData(Math.floor(x), Math.floor(y), 1, 1).data;
        }
    }
}

img.onload = loadAllBGData;
sky_img.onload = loadAllSkyData;
let getParallelogram = function() {
    angle+=0.02;
    ctx.clearRect(0, 0, width, height);

    farx1 = worldX + Math.cos(angle - fovhalf) * far;
    fary1 = worldY + Math.sin(angle - fovhalf) * far;

    farx2 = worldX + Math.cos(angle + fovhalf) * far;
    fary2 = worldY + Math.sin(angle + fovhalf) * far;
    
    nearx1 = worldX + Math.cos(angle - fovhalf) * near;
    neary1 = worldY + Math.sin(angle - fovhalf) * near;
    
    nearx2 = worldX + Math.cos(angle + fovhalf) * near;
    neary2 = worldY + Math.sin(angle + fovhalf) * near;
    //ctx.beginPath();

    for(let y = 0; y < height/2; y+=4) {
        let sampledepth = y/(height/2);

        let startX = (farx1 - nearx1) / (sampledepth) + nearx1;
        let startY = (fary1 - neary1) / (sampledepth) + neary1;
        let endX = (farx2 - nearx2) / (sampledepth) + nearx2;
        let endY = (fary2 - neary2) / (sampledepth) + neary2;

        for(let x = 0; x < width; x+=4) {
            let samplewidth = x / width;
            let sampleX = (endX - startX) * samplewidth + startX;
            let sampleY = (endY - startY) * samplewidth + startY;
            ctx.fillStyle = "rgba("+bg_data[sampleX][sampleY][0]+","+bg_data[sampleX][sampleY][1]+","+
                            bg_data[sampleX][sampleY][2]+","+bg_data[sampleX][sampleY][3]+")";
            ctx.fillRect(x,y+height/2, 4, 4);

            var sky_data = sky_canvas.getContext('2d').getImageData(Math.floor(sampleX), Math.floor(sampleY), 1, 1).data;
            ctx.fillStyle = "rgba("+sky_data[sampleX][sampleY][0]+","+sky_dat[sampleX][sampleY][1]+","+sky_data[sampleX][sampleY][2]+","+sky_data[sampleX][sampleY][3]+")";
            ctx.fillRect(x, height/2 - y, 4, 4);


            // ctx.drawImage(img, Math.floor(sampleX), Math.floor(sampleY), 1, 1, x, y+height/2, 4, 4  );
            // ctx.drawImage(sky_img, Math.floor(sampleX), Math.floor(sampleY), 1, 1, x, height/2 - y, 4, 4);
        }
    }
    //ctx.closePath();
}
setInterval(getParallelogram, 30);



document.addEventListener('keydown', (event) => {
    if(event.key == "a") {
        angle-=0.1;
    }
    else if(event.key == "d") {
        angle += 0.1;
    }
  });