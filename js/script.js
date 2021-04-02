//---------------------Getting all id and classes to js file-------------------------------------
let resetbtn = document.querySelector("#reset")
let time = document.querySelector("#time");
let counter = document.querySelector("#counter");
let accuracy = document.querySelector("#accuracy");
let begin = document.querySelector("#start");
let result = document.querySelector("#result");
let timeHead = document.querySelector("#timeHead");
let words = document.querySelector("#words");
let characters = document.querySelector("#characters");
let error = document.querySelector("#error");
let preWrittentext = document.querySelector(".preWrittentext");
let userInput = document.querySelector("#userInput");

//----------------------------Pre defined text for practice --------------------------------------

let text = `But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful.Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?`

//------------------------Defining and declaring ther variables------------------------------------

let timer = 60;
let interval = null;
let errors = 0;
let charCount = 0;

userInput.disabled = true;  //Initially the textbox will be disabled untill user start typing

begin.addEventListener("click" , ()=>{ //When user click the start button it will enable taking inputs
    begin.innerText = `Start Typing`;    
    userInput.disabled = false;   

    text.split("").forEach(characters =>{ //Each character will be added to span so that counting and coloring become easy.
        let spanSplitText = document.createElement("span");
        spanSplitText.innerText = characters;
        preWrittentext.appendChild(spanSplitText);
    })

    interval = setInterval(timeCounter , 1000);
    time.style.display = "grid";
    accuracy.innerText =100; //Default accuracy
    begin.style.pointerEvents = "none"; // After starting the typing test user cannot click start 
});

let timeCounter = ()=>{ // it checks that time runs only for 1 minute  and reduce time by 1 each time.
    if(timer > 0){
        timer--;
        counter.innerText = timer; 
        words.innerText = userInput.value.split(" ").length;    //words count
    }
    else
    {
        userInput.disabled = true;  //On timeout user inputs will be disabled
        counter.innerText = "Result"; //Result will be shown on page
        begin.innerText = ""; // start will be null
        timeHead.innerText = ""; 
        clearInterval(interval); //reset the timer
        timer = 0;    
    }
}
function reset(){ //It reset the game by refreshing the page
    location.reload();
}

//----------------------------Colors, character count and accuracy------------------------------------------

userInput.addEventListener("input" , b =>{ 
let userSplitInput = userInput.value.split("");
let predefinedText = preWrittentext.querySelectorAll("span");

if(b.inputType === "deleteContentBackward"){ //If user press backspace so, color which was changed will be reset 
    charCount--;
    predefinedText[charCount].classList.remove("correct");
    predefinedText[charCount].classList.remove("incorrect");
}
else if(userSplitInput[charCount] === predefinedText[charCount].innerText){ // If inputs of user's text is matched with predefined text the color will be changed of span
    predefinedText[charCount].classList.add("correct");
    characters.innerText=charCount++;
    let totalaccuracy = ((char - err)/char)*100;
    if(totalaccuracy <0){   //Accuracy cannot be in minus
        accuracy.innerText=0; 
    }else{
    accuracy.innerText = totalaccuracy.toFixed(2);
    }}
else
{
    {
    predefinedText[charCount].classList.add("incorrect"); //if text it incorrect then color will changed of particular span
    let char = characters.innerText=charCount++;
    let err = error.innerText=errors++;
    let totalaccuracy = ((char - err)/char)*100;
    if(totalaccuracy <0){
        accuracy.innerText=0;
    }else{

    accuracy.innerText = totalaccuracy.toFixed(2);
    }
}
}
});
//-------------------------------To enable dark mode--------------------------------------------
function darkMode() {
   document.body.classList.toggle("dark-mode");
}
//----------------------------------------------------------------------------------------------