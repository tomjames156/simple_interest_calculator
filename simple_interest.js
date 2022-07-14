const yearsOptions = document.querySelector("select#years");
const monthsOptions = document.querySelector("select#months");
const infoBtn = document.querySelector("i.fa-circle-info");
const principalDef = document.querySelector("p.principal-meaning");
const timeframeOptions = document.querySelectorAll("div.time div.time-frames div > input");
const interestRate = document.getElementById("rate");
let principal = document.getElementById("principal");
let currency = document.getElementById("currencies");
const interestRateContainer = document.querySelector("div.interest-rate");
let currentRate = document.getElementById("current-rate");
const computeInterest = document.getElementById("submit");
const result = document.getElementById("result");

function addOptions(start, stop, receiver, option){
    for(i = start; i < (stop + 1); i++){
        receiver.innerHTML += `<option  id="${option + '-' + i}" value='${i}'>${i}</option>`;
    }
}

addOptions(1, 100, yearsOptions, "year");
addOptions(1, 12, monthsOptions, "month");

function resetshownTimeFrameOptions(){
    let timeframes = ['days', 'months', 'years'];
    for(let timeframe of timeframes){
        document.querySelector(`div.${timeframe}`).classList.add("default-hide");
        document.querySelector(`div.${timeframe}`).classList.remove("active");
    }
}

function showTimeFrameOption(timeframe, receiver){
    for(let curr_timeframe of timeframeOptions){
        curr_timeframe.checked = false;
    }
    resetshownTimeFrameOptions();
    document.querySelector(`div.${timeframe}`).classList.remove("default-hide");
    document.querySelector(`div.${timeframe}`).classList.add("active");
    receiver.checked = true;
}

infoBtn.addEventListener("mouseover", () => {
    principalDef.classList.remove("default-hide");
})

infoBtn.addEventListener("mouseout", () =>{
    principalDef.classList.add("default-hide");
})

interestRate.addEventListener("input", () =>{
    currentRate.innerHTML = "";
    currentRate.innerHTML += `${interestRate.value}%`;
})

computeInterest.addEventListener("click", () =>{
    if(document.querySelector("div.active input")){
        console.log(document.querySelector("div.active input").value);
    }else if(document.querySelector("div.active select")){
        console.log(document.querySelector("div.active select").value);
    }
    console.log(`Rate - ${interestRate.value}`);
    console.log(`Principal - ${principal.value}`);
    console.log(currency.value);
})