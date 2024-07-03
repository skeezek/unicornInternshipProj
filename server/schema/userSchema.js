const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Country: { type: String, required: true },
    marketShare: { type: Number, required: true },
    renewableEnergyPercentage: { type: Number, required: true },
    yearlyRevenue: { type: Number, required: true },
});

const Provider = mongoose.model('Provider1', providerSchema);
module.exports = Provider;