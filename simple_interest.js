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

function getInterestType(){
    for(let interest_type of document.querySelectorAll("div.interest-type div input")){
        if(interest_type.checked){
            return interest_type.value;
        }
    }
}

function calculateInterest(amount, percentage, time, time_measure, interest_form, currency_type="$"){
    let interest = 0;
    let result = 0
    let rate = parseFloat(percentage/100);

    if((interest_form == "simple") && (time_measure == "years")){
        interest = parseFloat((amount * percentage * time) / 100);
        result = parseFloat(amount + interest);
    }else if((interest_form == "simple") && (time_measure == "months")){
        interest = parseFloat((amount * percentage * time) / 1200);
        result = parseFloat(amount + interest);
    }else if((interest_form == "simple") && (time_measure == "days")){
        interest = parseFloat((amount * percentage * time) / 36500);
        result = parseFloat(amount + interest);
    }else if((interest_form == "compound") && (time_measure == "years")){
        result = 1 + rate;
        result = result ** time;
        result *= amount;
    }else if((interest_form == "compound") && (time_measure == "months")){
        result = 1 + (rate/12);
        result = result ** time;
        result *= amount;
    }else if((interest_form == "compound") && (time_measure == "days")){
        result = 1 + rate;
        result = result ** time;
        result *= amount;
    }


    return `${currency_type}${result}`;
}

computeInterest.addEventListener("click", () =>{
    let number_of_x = 0;
    let rate = 0;
    let principal_amount = 0;
    let timeframe = "";
    let currency_symbol = ""; 
    let interest_type = "";

    rate = parseInt(interestRate.value);
    principal_amount = parseInt(principal.value);
    currency_symbol = currency.value;
    interest_type = getInterestType();

    if(document.querySelector("div.active input")){
        number_of_x = parseInt(document.querySelector("div.active input").value);
        timeframe = "days";
    }else if(document.querySelector("div.active select")){
        number_of_x = parseInt(document.querySelector("div.active select").value);
        if(document.querySelector("div.active").classList.contains("months")){
            timeframe = "months"
        }else if(document.querySelector("div.active").classList.contains("years")){
            timeframe = "years";
        }
    }
    

    console.log(calculateInterest(principal_amount, rate, number_of_x, timeframe, interest_type, currency_symbol));
})