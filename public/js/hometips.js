// temp vars for testing.
const tiptext = "Hello!"
const Username = "Someone"



function displaytip(){
// define the elements
let tip = document.getElementById("dailyTip");
let UserCred = document.getElementById("userName");
// replace the elements inner value with the appropriate data.
tip.innerText = tiptext
UserCred.innerText = (`From User: ${Username}`)
}


displaytip()