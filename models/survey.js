const mongoose = require('mongoose');
const { Schema } = mongoose;
const recipientSchema = require('./recipients');

const surveySchema = new Schema({
  title: String,
  body: String,
  subject: String,
  recipients: [recipientSchema],
  _user: {type: Schema.Types.ObjectId, ref: "user"},
  yes: {type: Number, default: 0},
  no: {type: Number, default: 0},
  dateSent: Date,
  lastResponded: Date
})

mongoose.model('survey', surveySchema);