var mongoose = require('mongoose');

var crimeSchema = new mongoose.Schema({
  type: String,
  geometry: {
    type: String,
    coordinates: Array
  },
  properties: {
    location_state:String,
    hundred_block_location: String,
    location_zip: String,
    occurred_date_or_date_range_start: Date,
    offense_type: String,
    latitude: Number,
    zone_beat: String,
    census_tract_2000: Number,
    offense_code: String,
    location_address: String,
    summarized_offense_description: String,
    location_city: String,
    year: Number,
    longitude: Number,
    rms_cdw_id: Number,
    summary_offense_code: String,
    general_offense_number: Number,
    offense_code_extension: Number,
    district_sector: String,
    occurred_date_range_end: Date,
    date_reported: Date,
    month: Number
  }
});

module.exports = mongoose.model('Crime', crimeSchema);
