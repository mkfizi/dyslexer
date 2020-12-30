var setting             = document.getElementById("setting");
var btnClear            = document.getElementById("btn-clear");
var inputSearch         = document.getElementById("input-search");
var btnGo               = document.getElementById("btn-go");
var btnSetting          = document.getElementById("btn-setting");
var btnOverlay          = document.getElementById("btn-overlay");
var btnIncreaseText     = document.getElementById("btn-increase-text");
var btnDecreaseText     = document.getElementById("btn-decrease-text");
var readbar             = document.getElementById("readbar");
var inputColor          = document.getElementById("input-color");
var textDisplay         = document.getElementById("text-display");
var placeholder         = document.getElementById("placeholder");

if(readbar != null){
    var readbarTop          = readbar.offsetTop;
    var readbarHeight       = readbar.offsetHeight;
}

var settingCondition    = true;
var overlayCondition    = true;
var changePage          = false;
var fontSize            = 16;
var readbarSize         = 40;
var readbarTop          = 0;
// var cursorY             = null;
// var cursorX             = null;

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
        readbar.style.display       = "none";

    }else{                  //if button is not clicked
        btnOverlay.style.color      = "#0094FF";
        overlayCondition            = true;
        inputColor.disabled         = false;
        readbar.style.display       = "block";
    }
}

//increase/decrease font
if(btnIncreaseText != null && btnDecreaseText != null ){
    btnIncreaseText.addEventListener("click", increaseText);
    btnDecreaseText.addEventListener("click", decreaseText);
}

function increaseText(){
    fontSize    = fontSize + 4;
    readbarSize = readbarSize + 4;
    readbarTop  = readbarTop - 4;
    checkSize(fontSize, readbarSize);
}

function decreaseText(){
    fontSize    = fontSize - 4;
    readbarSize = readbarSize - 4;
    readbarTop  = readbarTop + 4;
    checkSize(fontSize, readbarSize, readbarTop);
}

//check to disable font size increase/decrease button (TEXT)
function checkSize(currentSize, readbarSize, readbarTop){
    var maxTextSize         = 32;
    var minTextSize         = 12;
    textDisplay.style.fontSize  = currentSize + "px";
    readbar.style.height        = readbarSize + "px";
    readbar.style.top           = readbarTop + "px";

    if(currentSize == maxTextSize){
        btnIncreaseText.disabled = true;
    }else if(currentSize == minTextSize){
        btnDecreaseText.disabled = true;
    }else{
        btnIncreaseText.disabled = false;
        btnDecreaseText.disabled = false;
    }
}

//change readbar color
if(inputColor != null){
    inputColor.addEventListener("click", timerColor);
}

if(readbar != null){
    function setColor(){
        readbar.style.backgroundColor = inputColor.value;
    }

    var timerColor = setInterval(function(){ 
                            setColor(); 
                        }, 100  );
}

//readbar movement                    
document.body.addEventListener("mousemove", moveReadbar);

function moveReadbar(mouseEvent){
    if (mouseEvent){    //modern browser
        cursorY = mouseEvent.pageY;
    }else{              //IE
        cursorY = window.event.pageY;
    }
    if(readbar != null){
        if((cursorY + readbarHeight /2) - readbarTop <= window.innerHeight){
            readbar.style.top = cursorY - (readbarHeight / 2) + "px";
        }
    }
}

//trigger clear input text         
if(btnClear != null){
    btnClear.addEventListener("click", clearInput);
} 

function clearInput(){
    textDisplay.value = "";
}

//set iframe
if(btnGo != null){
    btnGo.addEventListener("click", setURL);
} 

function setURL(){
    var webURL      = inputSearch.value;
    var checkURL    = validURL(webURL);

    if(checkURL){
        removeClass("#web-display", "d-none");
        addClass("#web-placeholder", "d-none");
        addClass("#web-error    ", "d-none");
    }else{
        removeClass("#web-error", "d-none");
        addClass("#web-placeholder", "d-none");
        addClass("#web-display", "d-none");
    }
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

//****************************************GLOBAL FUNCTION
//check if class or id
function type(elementName){
    var name = "";
    var type = elementName.split("");
    for(var i = 1; i < type.length; i++){
        name = name + type[i];
    }
    if(type[0] == "#"){ //if id
        return document.getElementById(name);   //return id
    }else if(type[0] == "."){ //if class
        return document.getElementsByClassName(name); //return class
    }
}

//add class
function addClass(elementName, classElement) {
    var element = type(elementName);
    var arr     = element.className.split(" ");
    if (arr.indexOf(classElement) == -1) {
      element.className += " " + classElement;
    }
}

//remove class
function removeClass(elementName, classElement) {
    var element = type(elementName);
    element.className = element.className.replace(classElement, "");
}