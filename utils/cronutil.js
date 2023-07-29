const puppeteer = require("puppeteer");
const CronJob = require("cron").CronJob;

function cronStarter(myCollection) {
  console.log(myCollection.name);
  console.log("ithe hai ithe");
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
      console.log(getXpathContent(task.xPath, task.url));
      // runCronTask(task)
      //console.log(task);
    });
  });
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
      observe(xPath, url);
    },
    null,
    true,
    "America/Los_Angeles"
  );
}

function runXpathJob(xpath, previous) {
  console.log(previous);
}

async function getXpathContent(xPath, url) {
  try {
    
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();

    await page.goto(
      "https://www.flipkart.com/viewsonic-21-5-inch-full-hd-led-backlit-va-panel-eco-mode-hdmi-1-4-viewmode-technology-flicker-free-lowe-blue-light-filter-monitor-va2215-h/p/itm22f85c42f2876?pid=MONGHFC4DHDAGSKP&lid=LSTMONGHFC4DHDAGSKPIZUVT5&marketplace=FLIPKART&store=6bo%2Fg0i%2F9no&srno=b_1_3&otracker=hp_omu_Best%2Bof%2BElectronics_3_3.dealCard.OMU_NOBMPKW1HQ7A_3&otracker1=hp_rich_navigation_PINNED_neo%2Fmerchandising_NA_NAV_EXPANDABLE_navigationCard_cc_3_L2_view-all%2Chp_omu_PINNED_neo%2Fmerchandising_Best%2Bof%2BElectronics_NA_dealCard_cc_3_NA_view-all_3&fm=neo%2Fmerchandising&iid=e005c539-02de-43f8-a40b-1ace682a6379.MONGHFC4DHDAGSKP.SEARCH&ppt=hp&ppn=homepage&ssid=8brog3o99c0000001688104910252"
    );

    

    let element = await page.$x(
      "/html/body/div[1]/div/div[3]/div[1]/div[2]/div[2]/div/div[1]/h1/span"
    );

    // Get all p elements using page.$x
    console.log(element);
    console.log("above daa");
    //let all_p_elements = await page.$x("//p");

    // Get the textContent of the h1 element
    let h1_value = await page.evaluate((el) => el.textContent, element[0]);

    // The total number of p elements on the page
    //let p_total = await page.evaluate((el) => el.length, all_p_elements);

    console.log(h1_value);

    console.log(p_total);

    // Close browser.
    await browser.close();

    return h1_value;
  } catch (error) {
    console.log("Unable to get website XPath: " + error);
    return error;
  }
}

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
