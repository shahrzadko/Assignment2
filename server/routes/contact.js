let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let passport = require('passport');

let contactController = require('../controllers/contact');
const { register } = require('../models/contact');

/* helper function for gaurding purposes */
function requireAuth(req,res,next)
{
    //if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

/* GET Route for the Contact List page - READ Operation */
router.get('/', contactController.displayContactList)
module.exports = router;

/* GET Route for displaying the Add page -  CREAT Operation */
router.get('/add', requireAuth, contactController.displayAddPage);

/* POST Route for processing the Add page -  CREAT Operation */
router.post('/add', requireAuth, contactController.processAddPage);

/* GET Route for displaying the Edit page -  UPDATE Operation */
router.get('/edit/:id', requireAuth, contactController.displayEditPage);


/* POST Route for processing the Edit page -  UPDATE Operation */
router.post('/edit/:id', requireAuth, contactController.processEditPage);

/* GET Route to perform deletion -  DELETE Operation */
router.get('/delete/:id', requireAuth, contactController.performDelete)

