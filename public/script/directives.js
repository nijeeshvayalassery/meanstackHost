directive=angular.module('directives',[]);
directive.directive('matchField',function() {
	return {
		require:'ngModel',
		scope:{
			matchField:'='
		},
		link:function(scope,ele,attr,ctrl){
			ctrl.$validators.compareTo=function(modelval){
				console.log(modelval)
				return modelval==scope.matchField
			}
			scope.$watch('matchField', function(newValue, oldValue, scope) {
				ctrl.$validate()
			});
		}

	}
})
