function setup(){
    canvas = createCanvas(280, 280);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth = window.speechSynthesis;


}

function preload()
{

    classifier = ml5.imageClassifier('DoodleNet');
}

function clearCanvas(){
    background("white");
}

function draw(){
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed) {
        line( pmouseX, pmouseY, mouseX, mouseX);
    }
}

function  classifyCanvas(){
    classifier.classify(canvas, gotResult);
}

function gotResult(error, result){
    if(error){
        console.error(error);
    }
    console.log(result);
    document.getElementById('lable').innerHTML = 'Lable:' + result[0];
    document.getElementById('confidence').innerHTML = 'Confidence:' + Math.round(result[0].confidence*100)+'%';

    utterThis= new SpeechSynthesisUtterance(result[0].lable);
    synth.speak(utterThis);

}