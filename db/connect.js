const mongoose = require("mongoose");
const { collection } = require("../models/user");
const {ObsyTaskSchema} = require("../models/task")


const MyCollectionModel = mongoose.model('Task', ObsyTaskSchema);

mongoose.set('strictQuery', true);
const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,

    useUnifiedTopology: true,
  })

    .then(() => {

      MyCollectionModel.find({}, (err, items) => {
        if (err) {
          console.error(err);
          return;
        }
  
        // Print the items
        console.log("Items in the collection:");
        console.log(items);

      });
      console.log("connected to db");
      mongoose.connection.db.listCollections().toArray((err,collections)=>{
        collections.forEach((collection) => {

          console.log(collection.name);
        });
      })
    })
    .catch((err) => {
      console.log(err);
    });
};



//console.log(connectDB.getCollectionNames())

module.exports = {
  connectDB,
};
