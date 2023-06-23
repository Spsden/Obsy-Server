const CronJob = require("cron").CronJob;

function cronStarter(myCollection) {
  console.log(myCollection.name);
  console.log("ithe hai ithe")
  // Array.from(myCollection).forEach(element => {
    
  //   console.log(element)
  // });

  myCollection.find({}, (err, items) => {
    if (err) {
      console.error(err);
      return;
    }

    Array.from(items).forEach((task) => {
      //const { interval, durationType, createdBy, url, xpath } = task;

      console.log("hello gello hello hello");
     // runCronTask(task)
      console.log(task);
    });
  }
  )
 
}

function runCronTask(task) {
  console.log(task);
  const { interval, durationType, createdBy, url, xPath } = task;
  const cronPattern = cronPatternGenerator(durationType, interval);
  console.log(xPath);
  console.log(cronPattern);

  var job = new CronJob(
    cronPattern,
    function () {
      console.log(xPath);
      console.log(url);
    },
    null,
    true,
    "America/Los_Angeles"
  );
}

// function observe(xpath, previous) {

//   console.log(previous)
// }

const cronPatternGenerator = (durationType, duration) => {
  let cronPattern = "*/1 * * * *";

  if (durationType === "hour") {
    cronPattern = `0 */${duration} * * *`;
  }
  if (durationType === "mins") {
    cronPattern = `*/${duration} * * * *`;
  }
  if (durationType === "secs") {
    cronPattern = `*/${duration} * * * * *`;
  }
  if (durationType === "days") {
    cronPattern = `0 0 */${duration} * *`;
  }
  return cronPattern;
};

module.exports = { cronStarter, runCronTask };
