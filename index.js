
let contentopen = false;
let dateofBirth;
let settingcog = document.getElementById("settingicon");
let settingcont = document.getElementById("settingcontent");
const initialTextEL = document.getElementById("initialText");
const afterDOBBtnTxt  = document.getElementById("afterDOBBtnTxt");
const afterbtn = document.getElementById("dobbutton");
const dobInputEL = document.getElementById("dobInput");

const yearEL = document.getElementById("year");
const monthEL = document.getElementById("month");
const dayEL = document.getElementById("day");
const hourEL = document.getElementById("hour");
const minutesEL = document.getElementById("minutes");
const secondsEL = document.getElementById("seconds");

const maketodgnum = (number) =>{
    return number > 9 ? number : `0${number}`;

};

const toggledateofbirthselector = () =>{
    if (contentopen){
        settingcont.classList.add("hide");
    }else{
        settingcont.classList.remove("hide");
    }
    contentopen =!contentopen;
    console.log("Toggle",contentopen);

}; 

const updateAge = ()=>{
    const currentDate = new Date();
    const dateDiff = currentDate - dateofBirth;
    
    //this is wrong calculation
    // const year = Math.floor(dateDiff/(1000*60*60*24*365));
    // const month = Math.floor(dateDiff/(1000*60*60*24*365)) % 12;
    // const day = Math.floor(dateDiff/(1000*60*60*24))%30;
    // const hour = Math.floor(dateDiff/(1000*60*60))%24;
    // const minutes = Math.floor(dateDiff/(1000*60))%60;
    // const seconds = Math.floor(dateDiff/(1000%60))%60;

    const year = Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365));
    const month = Math.floor((dateDiff % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30)); // Adjusted to calculate months correctly
    const day = Math.floor((dateDiff % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24)); // Adjusted to calculate days correctly
    const hour = Math.floor((dateDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)); // Correctly calculates hours
    const minutes = Math.floor((dateDiff % (1000 * 60 * 60)) / (1000 * 60)); // Correctly calculates minutes
    const seconds = Math.floor((dateDiff % (1000 * 60)) / 1000); // Corrected the seconds calculation

    
    yearEL.innerHTML =maketodgnum(year);
    monthEL.innerHTML =maketodgnum(month);
    dayEL.innerHTML =maketodgnum(day);
    hourEL.innerHTML =maketodgnum(hour);
    minutesEL.innerHTML =maketodgnum(minutes);
    secondsEL.innerHTML =maketodgnum(seconds);
  


};

let setDOBHandler = () => {
    const dateString= dobInputEL.value ;

    dateofBirth = dateString ? new Date(dateString) :null;

    const year = localStorage.getItem("year");
    const month = localStorage.getItem("month");
    const date = localStorage.getItem("day");

    if(year && month && date){
       console.log({
        year,month,date
       });
    }
    
    if(dateofBirth){
        localStorage.setItem('year',dateofBirth.getYear());
        localStorage.setItem('month',dateofBirth.getMonth());
        localStorage.setItem('day',dateofBirth.getDate());
        initialTextEL.classList.add("hide");
        afterDOBBtnTxt.classList.remove("hide");
    
        setInterval(() =>updateAge(),1000 );

    }else{
        afterDOBBtnTxt.classList.add("hide");
        initialTextEL.classList.remove("hide");
    };
};
setDOBHandler();


settingcog.addEventListener("click",toggledateofbirthselector);
afterbtn.addEventListener("click",setDOBHandler);