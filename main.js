img="";
objects=[];
status="";

function preload(){
    img=loadImage("baby.jpg");
}

function setup(){
    canvas=createCanvas(400,400);
    canvas.center();
    objectDetector=ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML="Status: object detecting";
}
function modelLoaded(){
    console.log('model is loaded');
    status=true;
}
function gotResult(error, results){
    if(error){
        console.error(error);
    }
    console.log(results);
    objects=results;
}
function draw(){
    image(img,0,0,400,400);
    if(status != ""){
        r= random(255);
        g= random(255);
        b= random(255);
        objectDetector.detect(img, gotResult);
        for(i=0;i<objects.length;i++){
        document.getElementById("status").innerHTML="Status: Object Detect";   
        document.getElementById("baby").innerHTML="Baby found";
        fill(r,g,b);
        percent=floor(objects[i].confidence * 100);
        text(objects[i].label+ " " +percent + "%",objects[i].x + 20,objects[i].y + 30);
        noFill();
        stroke(r,g,b);
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}