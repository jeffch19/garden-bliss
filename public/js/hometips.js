// temp var for testing.

const Tips = fetch('../../seeds/tipsData.json')
console.log(Tips)


function preparetip(){
  // logging tip and choosing the tip number to be chosen
  console.log(`Total tips in rotation: ${Tips.length}`)
  let rawTip = Math.floor(Math.random() * (Tips.length))
  console.log(`Current tip to be rendered: ${rawTip}`)
  // loop untill random ID meets the ID found in the json.
  for(tip of Tips){
    //finding object where id is equal to chosen one.
        if (tip.id === rawTip){
          console.log(tip)
          displaytip()
        }}}

preparetip()


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

