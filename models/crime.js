var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


var crimeSchema = new mongoose.Schema({
  type: String,
  geometry: Object,
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
    rms_cdw_id: { type : Number , unique : true, required : true, dropDups: true },
    summary_offense_code: String,
    general_offense_number: Number,
    offense_code_extension: Number,
    district_sector: String,
    occurred_date_range_end: Date,
    date_reported: Date,
    month: Number
  }
});
crimeSchema.plugin(uniqueValidator);
crimeSchema.index( {
    "location_zip": 1,
    "summarized_offense_description": 1,
    "occurred_date_or_date_range_start": 1,
    "occurred_date_range_end": 1 } );
module.exports = mongoose.model('Crime', crimeSchema);
