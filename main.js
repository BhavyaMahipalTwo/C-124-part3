noseX = 0;
noseY = 0;
leftWristX = 0;
rightWristX = 0;
difference = 0;

function setup(){
video = createCapture(VIDEO);
video.size(600, 500);
video.position(150, 130);

canvas = createCanvas(550, 500);
canvas.position(800, 130);

poseNet = ml5.poseNet(video, modelLoaded);
poseNet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet Model Is loaded!");
}

function draw() {
    background("#D3D3D3");

    document.getElementById("square_side").innerHTML = "Width and Height of the Square is " + difference + "px";
    stroke(0, 0, 0);
    fill(255, 0, 55);
    square(noseX, noseY, difference);
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("Nose X = " + noseX + ", Nose Y = " + noseY);

        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = floor(leftWristX - rightWristX);
        console.log("Left Wrist X = " + leftWristX + ", Right Wrist X = " + rightWristX + ", Distance Between them = " + difference);
    }
}
