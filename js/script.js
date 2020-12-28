var setting             = document.getElementById("setting");
var btnSetting          = document.getElementById("btn-setting");
var btnClear            = document.getElementById("btn-clear");
var btnIncrease         = document.getElementById("btn-increase");
var btnDecrease         = document.getElementById("btn-decrease");
var bar                 = document.getElementById("bar");
var inputColor          = document.getElementById("input-color");
var textDisplay         = document.getElementById("text-display");

var barTop              = bar.offsetTop;
var barHeight           = bar.offsetHeight;

var settingCondition    = true;
var fontSize            = 16;
var barSize             = 40;
var cursorY             = null;

//set default fontSize for display
if(textDisplay != null){
    textDisplay.style.fontSize = fontSize + "px";
}

//hide/display setting buttons
if(btnSetting != null){
    btnSetting.addEventListener("click", setBtnSetting);
}

function setBtnSetting(){
    if(settingCondition){   //if button is clicked
        setting.style.display       = "none";
        btnSetting.style.color      = "#C1C1C1";
        settingCondition            = false;
    }else{                  //if button is not clicked
        setting.style.display       = "block";
        btnSetting.style.color      = "#0094FF";
        settingCondition            = true;
    }
}

//increase/decrease font
if(btnIncrease != null && btnDecrease != null ){
    btnIncrease.addEventListener("click", increaseText);
    btnDecrease.addEventListener("click", decreaseText);
}

function increaseText(){
    fontSize = fontSize + 4;
    barSize = barSize + 4;
    checkSize(fontSize, barSize);
}

function decreaseText(){
    fontSize = fontSize - 4;
    barSize = barSize - 4;
    checkSize(fontSize, barSize);
}

//check to disable font size increase/decrease button
function checkSize(currentSize, barSize){
    var maxTextSize         = 32;
    var minTextSize         = 12;
    textDisplay.style.fontSize  = currentSize + "px";
    bar.style.height            = barSize + "px";

    if(currentSize == maxTextSize){
        btnIncrease.disabled = true;
    }else if(currentSize == minTextSize){
        btnDecrease.disabled = true;
    }else{
        btnIncrease.disabled = false;
        btnDecrease.disabled = false;
    }
}

//change bar color
if(inputColor != null){
    inputColor.addEventListener("click", timerColor);
}

function setColor(){
    bar.style.backgroundColor = inputColor.value;
}

var timerColor = setInterval(function(){ 
                        setColor(); 
                    }, 100  );

//bar movement                    
document.body.addEventListener("mousemove", getMousePosition);

function getMousePosition(mouseEvent){
    if (mouseEvent){    //modern browser
        cursorY = mouseEvent.pageY;
    }else{              //IE
        cursorY = window.event.pageY;
    }
    if(bar != null){
        if((cursorY + barHeight /2) <= window.innerHeight){
            bar.style.top = cursorY - (barHeight / 2) + "px";
        }
    }
    console.log( window.innerHeight + " == " +(cursorY + barHeight /2));
}

//trigger click on input text         
if(bar != null){
    bar.addEventListener("click", focusInput);
} 

function focusInput(){
    textDisplay.focus();
}

//trigger click on input text         
if(bar != null){
    bar.addEventListener("click", focusInput);
} 

function focusInput(){
    textDisplay.focus();
}

//trigger clear input text         
if(btnClear != null){
    btnClear.addEventListener("click", clearInput);
} 

function clearInput(){
    textDisplay.value = "";
}