const yearsOptions = document.querySelector("select#years");
const monthsOptions = document.querySelector("select#months");
const infoBtn = document.querySelector("i.fa-circle-info");
const principalDef = document.querySelector("p.principal-meaning");
const timeframeOptions = document.querySelectorAll("div.time > input");

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
    }
}

function showTimeFrameOption(timeframe, receiver){
    for(let timeframe of timeframeOptions){
        timeframe.checked = false;
    }
    resetshownTimeFrameOptions();
    document.querySelector(`div.${timeframe}`).classList.remove("default-hide");
    receiver.checked = true;
}

infoBtn.addEventListener("mouseover", () => {
    principalDef.classList.remove("default-hide");
})

infoBtn.addEventListener("mouseout", () =>{
    principalDef.classList.add("default-hide");
})