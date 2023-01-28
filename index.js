const lengthSlider=document.querySelector(".passLength input"),
passwordInput = document.querySelector(".pass-box input"),
passIndicator = document.querySelector(".passStrength"),
copyIcon = document.querySelector(".pass-box span"),
options=document.querySelectorAll(".option input"),
generatebtn=document.querySelector("button");

const characters={
    lowercase:"abcdefghijklmnopqrstuvwxyz",
    uppercase:"ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers:"0123456789",
    symbols:"!@#%&*,.<>()-+/{}"
}

const generatePassword=()=>{
    let pass=""; let randPass="";
    let passLength=lengthSlider.value,
    excludeDuplicate=false;
    options.forEach(option=>{
        if(option.checked){
            if(option.id !== "duplicate" && option.id !== "space"){
                pass+=characters[option.id];
            }else if(option.id === "space"){
                pass += `  ${pass}  `;
            }else{
                excludeDuplicate=true;
            }
        }
    });
    for(let i=0;i<passLength;i++){
        let randChar=pass[Math.floor(Math.random()* pass.length)];
        if(excludeDuplicate){
            if(!randPass.includes(randChar)|| randChar==" "){
                randPass+=randChar;
            }else i--;
        }else{
            randPass+=randChar;
        }
    }
    passwordInput.value=randPass;
}
const updatePassStrength=()=>{
    passIndicator.id= lengthSlider.value<=8 ? "weak": lengthSlider.value <=16 ? "medium": "strong";
    console.log(passIndicator);
}
const copyButton=()=>{
    navigator.clipboard.writeText(passwordInput.value); 
    copyIcon.innerText = "check"; 
    copyIcon.style.color = "#4285F4";
    setTimeout(() => { 
        copyIcon.innerText = "content_copy";
        copyIcon.style.color = "#707070";
    }, 1500);
}
const updateSlider=()=>{
    document.querySelector(".passLength span").innerText=lengthSlider.value;
    generatePassword();
    updatePassStrength();
}
updateSlider();
lengthSlider.addEventListener("input",updateSlider);
generatebtn.addEventListener("click",generatePassword);
copyIcon.addEventListener("click",copyButton);