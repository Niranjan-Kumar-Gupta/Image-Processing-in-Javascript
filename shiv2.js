const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize',function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  
});
const myImage = new Image()
myImage.src = 'shiv21.png'
let alpha1 =  0.4;

myImage.addEventListener('load',function(){

  

    let imageWidth = myImage.width*0.5;
    let imageHeight = myImage.height*0.85;
    ctx.drawImage(myImage,0,0,imageWidth,imageHeight);
    let data = ctx.getImageData(0,0,imageWidth,imageHeight);
    ctx.clearRect(0,0,canvas.width,canvas.height);
    
    console.log(data)

    const heartX = [];
    const heartY = [];
    
    let animate = false;
    let final = false

    let heartRad = 1 
    let song = new Audio()
    song.src = "https://www.mp3ringtonedownload.in/wp-content/uploads/2021/06/Shiv-Tandav-Stotram-Mp3-Ringtone-Download.mp3"

    function HeartData() {
        for (let i = 0; i <= Math.PI * 2; i += 0.06) {
            let m = (16 * Math.sin(i) ** 3);
            heartX.push(m);
            let n = -(13 * Math.cos(i) - 5 * Math.cos(2 * i) - 2 * Math.cos(3 * i) - Math.cos(4 * i));
            heartY.push(-n);
        }
    }
    HeartData();
    
    let k =0;
    class ImgPoint{
        constructor(x,y,color,c1,c2,c3){
            this.x = heartX[k]*heartRad+canvas.width/2;
            this.y = heartY[k]*heartRad+canvas.height/2;
            this.xx = x + canvas.width/2 - myImage.width/2*1.9;
            this.yy = y + canvas.height/2 - myImage.height/2*2.1; 
            this.size = 1.9;        
            this.color = color;
            this.rad= 0;
            this.dir = 1;
            this.speedX = Math.random()*2+1
            this.speedY = Math.random()*5+1
            this.shadow = `rgba(${c1},${c2},${c3},0.4)`;
            this.th = 0
            if (k>=heartX.length-1) {
                k=0
                heartRad -= 0.1
            }else{
                k++
            }
        }
        draw(){
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.shadowBlur = 5;
            ctx.shadowColor =  this.shadow;
            ctx.fillRect(this.x,this.y,this.size*2,this.size*2)
            ctx.closePath();
            ctx.fill(); 
        }

        update(){
         
            

            
            if (timeUp) {
                
                if (!animate) {
                    this.th += 5
                    if (this.x !== this.xx) {
                        let dx = this.x - this.xx;
                        this.x -= dx/20*Math.sin(this.th);
                    }
                    if (this.y !== this.yy) {
                        let dy = this.y - this.yy;
                        this.y += dy/15*Math.cos(this.th*1.5);
                    } 
                }else{
                    this.th += 0.0
                    if (final) {
                        if (this.x !== this.xx) {
                            let dx = this.x - this.xx;
                            this.x -= dx/10;
                        }
                    }else{
                        if (this.x !== this.xx) {
                            let dx = this.x - this.xx;
                            this.x -= dx/10*Math.sin(this.th);
                        }
                    }
                   
                    if (this.y !== this.yy) {
                        let dy = this.y - this.yy;
                        this.y -= dy/15;
                    } 
                }
              
             }else{
                 this.rad += 0.5*this.dir
                 if (this.x < -30 ) {
                     this.dir *= -1;
                 }
               

             }
            

            

        }
        
    }

    let timeUp = false;
    setTimeout(()=>{
        timeUp = true;
        alpha1 = 1
        },2000);

    setTimeout(() => {
        animate = true
        }, 7000);

    setTimeout(() => {
    final = true
    }, 20000);

    let imgPoint = [];
    function init() {
       
        
        for (let y = 0 , y2=data.height; y < y2; y+=1) {
             
          for (let x = 0 , x2=data.width; x < x2; x+=1) {
              
             if (data.data[(y*4*data.width)+(x*4)+3] > 128) {
              let positionX = x;
              let positionY = y;
              let color = "rgb(" + data.data[(y*4*data.width)+(x*4)] + "," +
                                   data.data[(y*4*data.width)+(x*4)+1] + "," +
                                   data.data[(y*4*data.width)+(x*4)+2] + ")" ;
              imgPoint.push(new ImgPoint(positionX*3.8,positionY*2.5,color,data.data[(y*4*data.width)+(x*4)] , data.data[(y*4*data.width)+(x*4)+1], data.data[(y*4*data.width)+(x*4)+2]));
             }
              
          }       
        }
      }
      init()
    
    

    function handelImgPoint() {
       
        for (let i = 0; i < imgPoint.length; i++) {
        imgPoint[i].draw();
        imgPoint[i].update(); 
            
        }
    }

    class Circle {
        constructor() {
            this.x =  Math.random()*canvas.width;
            this.y = Math.random()*canvas.height;
            this.size = Math.random() * 3 + 0.5;
            this.dir = 1;
            this.speedX = Math.random()*5-2.5
            this.speedY = Math.random()*5-2.5
            this.color = `rgb(${Math.random()*255},${Math.random()*255},${Math.random()*255})`
        }
        draw() {
            ctx.fillStyle = this.color;
            ctx.lineWidth = 0;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();
        }
        update(){
            this.x += this.speedX*this.dir;
            this.y += this.speedY*this.dir;
            if (this.x < 0 || this.x > canvas.width) {
                this.dir *= -1
            }
            if (this.y < 0 || this.y > canvas.height) {
                this.dir *= -1
            }
        }
    }
    let cir = [];
    function Cir() {
        for (let i = 0; i < 156; i++) {
            cir.push(new Circle(Math.random() * canvas.width, Math.random() * canvas.height));
        }
    }
    Cir();
    function handlecircle() {
        for (let i = 0; i < cir.length; i++) {
            cir[i].draw();
            cir[i].update();
        }
    }



    function clear() {
        ctx.fillStyle = `rgba(0, 0, 20,${alpha1})`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    }
    setInterval(()=>{
    clear();
    song.play()
    handelImgPoint(); 
    handlecircle();
     
    },1000/60)

})



