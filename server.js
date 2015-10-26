var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var session=require('express-session')
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(session({secret: 'ssshhhhh'}));

var port = process.env.PORT || 8081;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();    
var mongoose = require('mongoose');
	mongoose.connect('mongodb://localhost/UserReg');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error:'));
	db.once('open', function (callback) {
	  // yay!
	});
	var Bear     = require('./model');
router.route('/user').post(function(req, res) {
	var sess=req.session
    
	/*var kittySchema = mongoose.Schema({
	    name: String
	});
	var Kitten = mongoose.model('Kitten', kittySchema);
	var silence = new Kitten({ name: 'Syam' });*/
	var UserIns=new Bear();
	for(var attr in req.body){
		UserIns[attr]=req.body[attr];
	}

	//UserIns.firstname=req.body.firstname;
	UserIns.save(function (err, data) {
		if(err){
			res.json({ 
  				'success':false
  			});
		}else{
	  		res.json({ 
	  			'success': true,
	  			'id':data._id
	  		});
		}
	});
})
router.route('/login').post(function(req,res){
	var email=req.body.email;
	var password=req.body.password;
	Bear.findOne({
		$and:[
			{'email':email},
			{'password':password}
		]
	},{'password':false},function(err,person){
		if(err){
			res.json({ message: err });
		}else{
			if(person){
				res.json({'success':true,'user':person})
			}else{
				res.json({'success':false})
			}
		}
	})
})
router.route('/finduser').get(function(req,res){
	var email=req.query.email;
	Bear.findOne(
			{'email':email},{'password':false},function(err,person){
		if(err){
			res.json({ message: err });
		}else{
			if(person){
				res.json({'success':true,'user':person})
			}else{
				res.json({'success':false})
			}
		}
	})
})
app.use('/api', router);
app.listen(port);
console.log('Magic happens on port ' + port);