let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// Create a reference to the db schema (our model)
let Contact = require('../models/contact');

module.exports.displayContactList =(req, res, next) => {
    Contact.find({}).sort('contactName').exec((err, contactList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(ContactList);
            res.render('contact/list', {title: 'Contact List', 
            ContactList: contactList,
            displayName: req.user ? req.user.displayName : ''})
        }

    })
}
module.exports.displayAddPage = (req,res,next)=>{
    res.render('contact/add', {title: 'Add Contact',
    displayName: req.user ? req.user.displayName : ''})
    
}
module.exports.processAddPage = (req, res, next) => {
    let newContact = Contact ({
        "contactName" :req.body.contactName,
        "contactNumber" : req.body.contactNumber,
        "emailAddress" : req.body.emailAddress
       
    });
    Contact.create(newContact, (err, Contact) =>{
        if(err)
        {
            return console.error(err);
            res.end(err);
        }
        else
        {
            //refresh the contact list
            res.redirect('/contact-list');
        }

    })
}

module.exports.displayUpdatePage = (req,res,next)=>{
    let id = req.params.id;


    Contact.findById(id, (err, contactToUpdate) => {
        if(err)
        {
            return console.error(err);
            res.end(err);
        }
        else
        {
            //show the update view
            res.render('contact/update', {title: 'Update Contact', contact : contactToUpdate,
            displayName: req.user ? req.user.displayName : ''})
        }

    })
}

module.exports.processUpdatePage = (req,res,next)=>{
    let id = req.params.id;
    let updatedContact = Contact ({
        "_id" : id,
        "contactName" :req.body.contactName,
        "contactNumber" : req.body.contactNumber,
        "emailAddress" : req.body.emailAddress
    });
    Contact.updateOne({_id: id}, updatedContact, (err) => {
        if(err)
        {
            return console.error(err);
            res.end(err);
        }
        else
        {
            //refresh the contact list
            res.redirect('/contact-list');
        }

    });

}

module.exports.performDelete = (req,res,next)=>{
    let id = req.params.id;
    Contact.remove({_id: id}, (err) => {
        if(err)
        {
            return console.error(err);
            res.end(err);
        }
        else
        {
            //refresh the contact list
            res.redirect('/contact-list');
        }

    });
}