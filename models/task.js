const mongoose = require("mongoose");

const ObsyTaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "title required"],
  },
  durationType: {
    type: String,
    required: [true, "duration type required"],
  },
  icon: {
    type: String,
    required: [true, "icon required"],
  },
  localId: {
    type: String,
    required: [true, "localId required"],
  },
  interval: {
    type: Number,
    required: [true, "interval required"],
  },
  duration: {
    type: String,
    required: [true, "duration required"],
  },
  url: {
    type: String,
    required: [true, "url required"],
  },
  xPath: {
    type: String,
    required: [true, "xPath required"],
  },
  date: Date,
});

module.exports = mongoose.model("Task", ObsyTaskSchema);
