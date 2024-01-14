// temp var for testing.
const rawTip =  {
  "user_name": "DaisyDiva",
  "title": "Daisy Care",
  "content": "Deadheading daisies can greatly increase their blooming duration. Regularly check for wilted flowers."
}


function displaytip(){
// define the elements.
let tip = document.getElementById("dailyTip");
let UserCred = document.getElementById("userName");
// create tipText and UserName text to display.
const tipData = Object.values(rawTip)
tipText = tipData[2]
UserName = tipData[0]
// replace the elements inner value with the appropriate data.
tip.innerText = tipText
UserCred.innerText = (`From User: ${UserName}`)
}

displaytip()