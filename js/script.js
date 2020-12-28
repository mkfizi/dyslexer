// var navbar      = document.getElementById("dyslexer-navbar");
// var display     = document.getElementById("dyslexer-display");

// console.log(display.clientHeight);
// // set display height
// display.style.height = display.clientHeight - navbar.clientHeight - 10 + "px"; 

// console.log(display.clientHeight);
// console.log(navbar.clientHeight);
var setting             = document.getElementById("setting");
var btnSetting          = document.getElementById("btn-setting");
var btnIncrease         = document.getElementById("btn-increase");
var btnDecrease         = document.getElementById("btn-decrease");
var textDisplay         = document.getElementById("text-display");
var settingCondition    = true;
var fontSize            = 16;

textDisplay.style.fontSize = fontSize + "px";

//hide/display setting buttons
btnSetting.addEventListener("click", setBtnSetting);

function setBtnSetting(){
    if(settingCondition){
        setting.style.display       = "none";
        btnSetting.style.color      = "#C1C1C1";
        settingCondition            = false;
    }else{
        setting.style.display       = "block";
        btnSetting.style.color      = "#0094FF";
        settingCondition            = true;
    }
}

//increase/decrease font
btnIncrease.addEventListener("click", increaseText);
btnDecrease.addEventListener("click", decreaseText);

function increaseText(){
    fontSize = fontSize + 4;
    checkSize(fontSize);
}

function decreaseText(){
    fontSize = fontSize - 4;
    checkSize(fontSize);
}

function checkSize(currentSize){
    var maxTextSize         = 32;
    var minTextSize         = 12;
    textDisplay.style.fontSize = currentSize + "px";
    if(currentSize == maxTextSize){
        btnIncrease.disabled = true;
    }else if(currentSize == minTextSize){
        btnDecrease.disabled = true;
    }else{
        btnIncrease.disabled = false;
        btnDecrease.disabled = false;
    }

}