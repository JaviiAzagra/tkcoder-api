const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const profilesSchema = new Schema({
  address1: { type: String, required: true, trim: true },
  address2: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  province: { type: String, required: true, trim: true },
  postalcode: { type: String, required: true },
  user: [{ type: mongoose.Types.ObjectId, ref: "users", required: true }],
});

const Profile = mongoose.model("profiles", profilesSchema);

module.exports = Profile;
