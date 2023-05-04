Webcam.set[{
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
}];
camera = document.getElementById("camera");
Webcam.attach("#camera");
function takeSnapshot () {
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id='capture_image' src='"+ data_uri +"'>";
    });
}
console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/RtXB5Db2e/model.json', modelLoaded);
function modelLoaded () {
    console.log("model is loaded!");
}
function speaking () {
    var synth = window.speechSynthesis;
    speak_data = "The prediction is " + prediction;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
}

function check () {
    img = document.getElementById("capture_image");
    classifier.classify(img, gotResult);
}
function gotResult (error, result) {
    if (error) {
        console.log(error);
    }
    else {
        console.log(result);
        document.getElementById("result_hand_gesture").innerHTML = result[0].label;
        prediction = result[0].label;
        speaking();
        if (prediction == "Victory") {
            document.getElementById("update_hand_gesture").innerHTML= '&#9996' + " - That was a marvelous victory!";
        }
        if (prediction == "Best") {
            document.getElementById("update_hand_gesture").innerHTML= '&#128077' + " - All the best!";
        }
        if (prediction == "Amazing") {
            document.getElementById("update_hand_gesture").innerHTML= '&#128076' + " - This is looking amazing!";
        }
    }
}