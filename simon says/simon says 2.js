let gameseq=[];
let userseq=[];
let btns = ["yellow","red","purple","green"];
let started =false;
let level =0;


let h2=document.querySelector("h2");

document.addEventListener("keypress",function(){
    if(started==false){
        console.log("game started");
        started= true;
        levelup();
    }

});
function btnflash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
       btn.classList.remove("flash"); 
    },200);
}
function userFlash(btn){
    btn.classList.add("userflash");
    setTimeout(function(){
        btn.classList.remove("userflash");

    },250);
}
function levelup(){
    userseq=[];
    level++;
    h2.innerText = `level ${level}`;
    let randIdx = Math.floor(Math.random()*4);
    let randColor = btns[randIdx];
    console.log(randColor);
    let randBtn = document.querySelector(`.${randColor}`);
    btnflash(randBtn)
    gameseq.push(randColor);
    console.log(gameseq);
    ;

}
function checkAns (idx){
    if(userseq[idx]==gameseq[idx]){
        if (userseq.length==gameseq.length){
            setTimeout(levelup,1000);
        }

    }else{
        h2.innerHTML=`Game Over ! Your score was <b>${level}</b> Press any key to start.`;
        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector("body").style.backgroundColor = "white";
            
        },150);
        reset();
    }
}
function btnPress(){
    console.log("btn was pressed");
    let btn =this;
    userFlash(btn);
    usercolor = btn.getAttribute("id");
    console.log(usercolor);
    userseq.push(usercolor); 
    console.log(userseq)

    checkAns(userseq.length-1);

}
let allBtns = document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);

}
function reset(){
    started=false;
    gameseq=[];
    userseq=[];
    level = 0;

}
