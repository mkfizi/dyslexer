var setting             = document.getElementById("setting");
var btnClear            = document.getElementById("btn-clear");
var inputSearch         = document.getElementById("input-search");
var btnGo               = document.getElementById("btn-go");
var btnSetting          = document.getElementById("btn-setting");
var btnOverlay          = document.getElementById("btn-overlay");
var btnIncreaseText     = document.getElementById("btn-increase-text");
var btnDecreaseText     = document.getElementById("btn-decrease-text");
var bar                 = document.getElementById("bar");
var inputColor          = document.getElementById("input-color");
var textDisplay         = document.getElementById("text-display");
var placeholder         = document.getElementById("placeholder");

var barTop              = bar.offsetTop;
var barHeight           = bar.offsetHeight;

var settingCondition    = true;
var overlayCondition    = true;
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

//hide/display overlay color selection
if(btnOverlay != null){
    btnOverlay.addEventListener("click", setBtnOverlay);
}

function setBtnOverlay(){
    if(overlayCondition){   //if button is clicked
        btnOverlay.style.color      = "#C1C1C1";
        overlayCondition            = false;
        inputColor.disabled         = true;
        bar.style.display           = "none";
    }else{                  //if button is not clicked
        btnOverlay.style.color      = "#0094FF";
        overlayCondition            = true;
        inputColor.disabled         = false;
        bar.style.display           = "block";
    }
}

//increase/decrease font
if(btnIncreaseText != null && btnDecreaseText != null ){
    btnIncreaseText.addEventListener("click", increaseText);
    btnDecreaseText.addEventListener("click", decreaseText);
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

//check to disable font size increase/decrease button (TEXT)
function checkSize(currentSize, barSize){
    var maxTextSize         = 32;
    var minTextSize         = 12;
    textDisplay.style.fontSize  = currentSize + "px";
    bar.style.height            = barSize + "px";

    if(currentSize == maxTextSize){
        btnIncreaseText.disabled = true;
    }else if(currentSize == minTextSize){
        btnDecreaseText.disabled = true;
    }else{
        btnIncreaseText.disabled = false;
        btnDecreaseText.disabled = false;
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

if(btnGo != null){
    btnGo.addEventListener("click", setURL);
} 

function setURL(){
    // var webURL = 
}

//check URL
function validURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }