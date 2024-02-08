const mongoose = require("mongoose");

const vaultSchema = new mongoose.Schema({
  name: {
    type: String,
    enum: ["Gold", "Silver", "Platinum"],
    required: [true, "Please choose a precious metal to secure"],
  },
  ounce: Number,
  startDate: Date,
  endDate: Date,
  depositDate: Date,
  fee: Number,
  status: Boolean,
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
});

const Vault = mongoose.model("Vault", vaultSchema);

module.exports = Vault;
