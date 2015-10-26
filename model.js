var mongoose=require('mongoose');
var Schema=new mongoose.Schema({
	'firstname':String,
	'lastname':String,
	'email':String,
	'mobile':String,
	'password':String
})
module.exports=mongoose.model('userDetails',Schema);