const selectOptions =document.querySelectorAll("select");
const CurrTime=document.querySelector("h1");
const SetAlarm=document.querySelector("button");
const content=document.querySelector(".content");
//for Hour element
let alarmTime;
let ringTone=new Audio("./ringTone.mp3");
let isAlarmEnabled=false;
for(let i=12;i>0;i--){
    i=i<10?"0"+i:i;
    let option = `<option value="${i}">${i}</option>`;
    selectOptions[0].firstElementChild.insertAdjacentHTML("afterend",option);
}
//for Minute element
for(let i=59; i>=0; i--){
    i=i<10?"0"+i:i;
    let option = `<option value="${i}">${i}</option>`;
    selectOptions[1].firstElementChild.insertAdjacentHTML("afterend",option);
}
//Set Am/Pm value
for(let i=2 ;i>0 ;--i){
    let ampm=i==1?"AM":"PM";
    let option = `<option value="${ampm}">${ampm}</option>`;
    selectOptions[2].firstElementChild.insertAdjacentHTML("afterend",option);
}
//This interval will continue to  call 1000 ms gap 
setInterval(()=>{
    let date=new Date();
    h=date.getHours();
    m=date.getMinutes();
    s=date.getSeconds();
    ampm="AM";
    if(h>12){
        h=h-12;
        ampm="PM";
    }
    //USING TERNARY OPERATOR TO ADD 0 WHEN LESS THAN 10
    h=h==0?h=12:h;
    h=h<10?"0"+h:h;
    m=m<10?"0"+m:m;
    s=s<10?"0"+s:s;
   CurrTime.innerText=`${h}:${m}:${s} ${ampm}`;
//if set time and time which is runnning are same then ringing the alarm
   if(alarmTime ==`${h}:${m} ${ampm}`){
    console.log("Alarm ringing...");
    ringTone.play();
    ringTone.loop=true;
   }
},1000);
//calling an event by pressing the set alarm button
SetAlarm.addEventListener('click',function(e) {
    //This will clear the set alaram if the alarm is being held
    if(isAlarmEnabled){
        alarmTime="";
        ringTone.pause();
        content.classList.remove("disable");
        SetAlarm.innerText="Set Alarm";
        isAlarmEnabled=false;
        return isAlarmEnabled;
    }


    let time=`${selectOptions[0].value}:${selectOptions[1].value} ${selectOptions[2].value}`;
    //if No time is being selected then will show up the error message
    if(time.includes("Hour")||time.includes("Minute")||time.includes("AM/PM")){
        return alert("Please select valid time");
    }
    isAlarmEnabled=true;
    alarmTime=time;
    content.classList.add("disable");
    SetAlarm.innerText="Clear Time";
    console.log(time);
});
