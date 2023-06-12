const cron = require("cron");

function CronStarter(myCollection) {
  myCollection.find({}, (err, items) => {
    if (err) {
      console.error(err);
      return;
    }

    Array.from(items).forEach(task => {
        const {
            interval ,
            durationType ,
            createdBy,
            url,
            xpath
    
        } = task


        console.log("hello gello hello hello")
        console.log(task)
    })

    // items.array.forEach(task => {
    //     const {
    //         interval ,
    //         durationType ,
    //         createdBy,
    //         url,
    //         xpath
    
    //     } = task
    //     console.log("hello gello hello hello")
    //     console.log(task)
        
    // });





    // Print the items
    console.log("Items in the collection:");
    
  });
}

const runCronTask =(task) => {

    const {
        interval ,
        durationType ,
        createdBy,
        url,
        xpath

    } = task
    const cronPattern = 

    var job = new cron.CronJob(

    )



}

const cronPatternGenerator = (durationType, duration)=> {
    let cronPattern = '';

    if(durationType === 'hour'){

    }
    if(durationType === 'mins'){

    }
    if(durationType === 'secs'){

    }
    if(durationType === 'days'){
        
    }
}

module.exports = CronStarter;
