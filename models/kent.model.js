const mongoose = require('mongoose');
// eto yung package na ginagamit natin sa paggawa ng mga Models (si DB STRUCTURE essentially)

const Schema = mongoose.Schema;

// The database schema of a database is its structure described in a formal 
// language supported by the database management system (DBMS).
// https://en.wikipedia.org/wiki/Database_schema

// Eto rin pala list of Mongoose DataTypes na pwede gamitin:
// https://mongoosejs.com/docs/schematypes.html

const kentSchema = new Schema({
    "type":{type: String, default: 'Feature'}, //type: "Polygon"
    "properties": {"type": "Array"},

    "geometry":{
        "type": { type: String, default: "Polygon" },
        "coordinates":{"type":"array"},
    }
}, { collection: 'kent' });

// Pangalanan natin yung Schema na ginawa mo
const Kent = mongoose.model('kent', kentSchema);

module.exports = Kent;