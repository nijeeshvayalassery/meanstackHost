Appfactory=angular.module('factories', []);
Appfactory.factory('userfactory', [function(){
	var currentuser;
	return{
		setuser:function(user){
			currentuser=user;
		},
		getcurrentuser:function(){
			if(currentuser){
				return(currentuser)
			}else{
				return(null)
			}
		}
	};
}])
Appfactory.factory('webservice', ['$http','$q', function($http,$q){
	return {
		postForm:function(data,url){
			var deff=$q.defer()
			$http.post(url,data).then(function(response){
				deff.resolve(response)
			}).then(function(err){
				deff.reject(err)
			})
			return deff.promise
		},
		getUser:function(url){
			var deff=$q.defer()
			$http.get(url).then(function(response){
				deff.resolve(response)
			}).then(function(err){
				deff.reject(err)
			})
			return deff.promise
		}
	};
}])