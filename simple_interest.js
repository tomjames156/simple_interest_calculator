const yearsOptions = document.getElementById("year");
const monthsOptions = document.getElementById("month");

function addOptions(start, stop, receiver, option){
    for(i = start; i < (stop + 1); i++){
        receiver.innerHTML += `<option  id="${option + '-' + i}" value='${i}'>${i}</option>`;
    }
}

addOptions(1, 100, yearsOptions, "year");
addOptions(1, 12, monthsOptions, "month");