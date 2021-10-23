let mongoose = require('mongoose');


let contactModel = mongoose.Schema({
    contactName: String,
    contactNumber: String,
    emailAddress: String,
    
},
{
    collection: "contacts"
})

module.exports = mongoose.model('Contact', contactModel);