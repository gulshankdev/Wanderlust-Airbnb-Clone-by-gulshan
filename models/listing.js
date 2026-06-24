const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const Address = require("ipaddr.js");
// In your server.js or app.js


const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: String,
    url: String,
  },
 price: {
    type: Number,
    required: true,
    min: 0
},
  location: String,
 geometry: {
  lat: Number,
  lng: Number,
},

  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  // category: {
  //   type: String,
  //   enum: ["mountains", "arctic", "farms", "deserts"]
  // }
});

listingSchema.post("findOneAndDelete", async(listing) => {
  if(listing){
  await Review.deleteMany({reviews : {$in: listing.reviews}});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;