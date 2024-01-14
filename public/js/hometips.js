// const tips = require("")

const schedule = require('node-schedule');
const count = tips.length
console.log(count)
// use math.random to decide what tips will be shown. filter out to make sure it is not the same tip as last day.
function decidetip(){
let num = Math.floor((Math.random() * tips.length));
NewTip = tips[num];
console.log(NewTip);
return NewTip
}

decidetip()

// display a new tip every 24h.

const job = schedule.scheduleJob({hour:23, minute: 30}, function(){
    
  console.log("hello!")
  });