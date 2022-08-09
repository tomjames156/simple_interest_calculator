'use strict';
const infoBtn = document.querySelector("i.fa-circle-info");
const principalDef = document.querySelector("p.principal-meaning");
const timeframeOptions = document.querySelectorAll("div.time div.time-frames div > input");
const interestRate = document.getElementById("rate");
let principal = document.getElementById("principal");
let currency = document.getElementById("currencies");
const interestRateContainer = document.querySelector("div.interest-rate");
let currentRate = document.getElementById("current-rate");
const simple = document.getElementById("simple");
const compound = document.getElementById("compound");
const computeInterest = document.getElementById("submit");
const interest = document.getElementById("result");

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
    document.querySelector("span#time").innerHTML = timeframe.slice(0, timeframe.length -1);
}

infoBtn.addEventListener("mouseover", () => {
    principalDef.classList.remove("default-hide");
})

infoBtn.addEventListener("mouseout", () =>{
    principalDef.classList.add("default-hide");
})

function validateInput(receiver){
    if(receiver.value < 1){
        receiver.value = "";
        alert("Enter a positive number");
    }
}

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
    let rate = parseFloat(percentage / 100);

    if((interest_form == "simple") && (time_measure == "years")){
        interest = parseFloat(amount * rate * time);
        result = parseFloat(amount + interest);
    }else if((interest_form == "simple") && (time_measure == "months")){
        // interest = parseFloat((amount * rate * time) / 12);
        interest = parseFloat(amount * rate * time);
        result = parseFloat(amount + interest);
    }else if((interest_form == "simple") && (time_measure == "days")){
        // interest = parseFloat((amount * rate * time) / 365);
        interest = parseFloat(amount * rate * time)
        result = parseFloat(amount + interest);
    }else if((interest_form == "compound") && (time_measure == "years")){
        result = parseFloat(1 + rate);
        result = parseFloat(result ** time);
        result *= amount;
    }else if((interest_form == "compound") && (time_measure == "months")){
        result = parseFloat(1 + rate);
        // result = parseFloat(1 + (rate / 12));
        result = parseFloat(result ** time);
        result *= amount;
    }else if((interest_form == "compound") && (time_measure == "days")){
        result = parseFloat(1 + rate);
        // result = parseFloat(1 + (rate / 365));
        result = parseFloat(result ** time);
        result *= amount;
    }

    result = result.toFixed(2);
    return `${currency_type}${result}`;
}

computeInterest.addEventListener("click", () =>{
    let number_of_x = 0;
    let rate = 0;
    let principal_amount = 0;
    let total_amount = 0;
    let interest_amount = 0;
    let timeframe = "";
    let currency_symbol = ""; 
    let interest_type = "";

    rate = parseInt(interestRate.value);
    principal_amount = parseInt(principal.value);
    currency_symbol = currency.value;
    interest_type = getInterestType();

    if(document.querySelector("div.active input")){
        number_of_x = parseInt(document.querySelector("div.active input").value);
        
        if(document.querySelector("div.active").classList.contains("days")){
            timeframe = "days";
        }
        else if(document.querySelector("div.active").classList.contains("months")){
            timeframe = "months"
        }else if(document.querySelector("div.active").classList.contains("years")){
            timeframe = "years";
        }
    }  

    if((simple.checked == false) && (compound.checked == false)){
        alert("Choose a type of interest");
    }

    total_amount = (calculateInterest(principal_amount, rate, number_of_x, timeframe, interest_type, currency_symbol));
    interest_amount = (total_amount.slice(1, total_amount.length) - principal_amount).toFixed(2)

    interest.innerHTML = `<br> Principal Invested = ${currency_symbol}${principal_amount} <br>
    Investment rate per ${timeframe.slice(0, timeframe.length -1)} = ${rate} %<br>
    Number of times interest was collected = ${number_of_x}<br>
    Total amount after interest = ${total_amount}<br>
    Total interest after investment = $${interest_amount}
    `;
})