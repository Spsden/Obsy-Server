const mongoose = require("mongoose");
const { collection } = require("../models/user");
const { ObsyTaskSchema } = require("../models/task");
const CronStarter = require("../utils/cronutil");

const AllTaskCollection = mongoose.model("Task", ObsyTaskSchema);
const AllUserCollection = mongoose.model("User");

mongoose.set("strictQuery", true);
const connectDB = (url) => {
  return mongoose
    .connect(url, {
      useNewUrlParser: true,

      useUnifiedTopology: true,
    })

    .then(() => {
      CronStarter(AllTaskCollection);
     // CronStarter(AllUserCollection);

      console.log("connected to db");
      mongoose.connection.db.listCollections().toArray((err, collections) => {
        collections.forEach((collection) => {
          console.log(collection.name);
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//console.log(connectDB.getCollectionNames())

module.exports = {
  connectDB,
};
