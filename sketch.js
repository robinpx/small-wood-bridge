let fontFamily;
let banners=[];
let aspectRatio = 0;

function preload() {
    fontFamily = loadFont("./assets/NotoSansSC-Medium.otf");
}

function setup() {
    createCanvas(displayWidth, displayHeight, WEBGL);
    textFont(fontFamily);
    noStroke();
    aspectRatio = width > height ? width : height;
    banners.push(new Banner("欢迎，来到若冰和景天家！", random(-140,-80), random(-20,20), aspectRatio/50, aspectRatio/20));
    banners.push(new Banner("WELCOME TO SMALL WOOD BRIDGE!", random(-50,50),random(-50,50), aspectRatio/50, 1));
    banners.push(new Banner("HAVE A GOOD DAY :)", random(70,160), random(-20,20), aspectRatio/20, aspectRatio*2));
    banners.push(new Banner("小木桥路", random(0,100), random(-200,-60), aspectRatio/10, aspectRatio/2000));
}

function draw() {
    background(255);
    frameRate(20);
    for (let i=0;i < banners.length;i++) {
        banners[i].display();
    }

}

class Banner {
    constructor(fullText, offsetY, offsetYbounce, fontSize, spacing) {
        this.fullText=fullText.split("");
        this.letters=[];
        for (let i=0;i < this.fullText.length;i++) {
            this.letters.push(new Letter(fullText[i], this.fullText.length, 
                offsetYbounce, fontSize, spacing));
        }
        this.offsetY = offsetY;
        this.offsetYbounce = offsetYbounce;
        this.spacing = spacing;
    }

    display() {
        push();
        translate(0,this.offsetY + 10*sin(frameCount));
        for (let i=0;i < this.letters.length;i++) {
            if (this.fullText[i] !== " ") {
                this.letters[i].display(i);
            }
        }
        pop();
    }
}


class Letter {
    constructor(letter, bannerLen, offsetYbounce, fontSize, spacing) {
        this.letter=letter;
        this.size = fontSize;
        this.length = bannerLen;
        this.offsetYbounce=offsetYbounce;
        this.spacing=spacing;
        this.texture = createGraphics(this.size,this.size+5);
    }
            
    display(i) {
        angleMode(DEGREES);
        this.texture.textSize(this.size);
        this.texture.text(this.letter,0,this.size-2);
        fill(0);
        texture(this.texture);

        push();
        rotateX(this.offsetYbounce * sin(frameCount*0.5));
        rotateY((360 / this.length) * i - frameCount*0.3);
        //rotateZ(frameCount*0.5);
        translate(0,0,(aspectRatio*this.length)/(40*PI)+this.spacing);
        plane(this.size,this.size+5);
        pop();
    }
}