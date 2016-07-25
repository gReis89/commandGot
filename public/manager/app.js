(function() {

    var app = angular.module('commandGotManager', []).directive('onFinishRender', function ($timeout) {
  		return {
  			restrict: 'A',
  			link: function (scope, element, attr) {
  				if (scope.$last === true) {
  					$timeout(function () {
  						scope.$emit(attr.onFinishRender);
  						$('#myTable').DataTable();
  					});
  				}
  			}
  		}
  	});

    app.value('updata',[]);

    app.controller("read_all", ['$scope','$http', 'updata', function($scope, $http)
    		{
    			$http.get('http://commandgot.herokuapp.com/characters').success (function(data){
      				$scope.characters = data;
      		});
          $scope.myFunc = function(id)
          {
            $http.get('http://commandgot.herokuapp.com/characters/'+id).success (function(data){
                updata = data;
                document.getElementById('upd_name').value = updata.name;
                $('#upd_about').val(updata.about);
                $('#upd_path').val(updata.path);
                $('.navbar-nav li').removeClass('active');
                $('#myTable_wrapper').hide();
                $('#div_add').hide();
                $('#div_upd').show();
            });
          };
    		}]
    );

    app.controller('AddController', function($scope, $http) {

        $scope.addChar = function() {

            var data = {
                char_name: $scope.name,
                about: $scope.about,
                path: $scope.path
            };

            $http({
                method: 'POST',
                url: 'http://commandgot.herokuapp.com/characters/add',
                data: data
            }).success(function (data, status, header, config) {
                $scope.PostDataResponse = "Well done, character added :)";
                clear();
            }).error(function (data, status, header, config) {
                $scope.PostDataResponse = "Ops, something is wrong and your character can't be added, try again! :(";
            });
        };

        function clear() {
            $scope.name = "";
            $scope.about = "";
            $scope.path = "";
        }
    });

    app.controller('UpdController', [ '$scope', '$http', 'updata', function($scope, $http) {

        $scope.updChar = function() {

          var c_name, c_about, c_path;

          if($scope.name!=undefined)
          c_name = $scope.name;
          else
          c_name = updata.name;


          if($scope.about!=undefined)
          c_about = $scope.about;
          else
          c_about = updata.about;

          if($scope.path!=undefined)
          c_path = $scope.path;
          else
          c_path = updata.path;

            var data = {
                id: updata._id,
                char_name: c_name,
                about: c_about,
                path: c_path
            };

            console.log(data);

            $http({
                method: 'PUT',
                url: 'http://commandgot.herokuapp.com/characters/update',
                data: data
            }).success(function (data, status, header, config) {
                $scope.PostDataResponse = "Well done, character updated :)";
                clear();
            }).error(function (data, status, header, config) {
                $scope.PostDataResponse = "Ops, something is wrong and your character can't be updated, try again! :(";
            });
        };

        function clear() {
            /*$scope.name = "";
            $scope.about = "";
            $scope.path = "";*/
        }
    }]);

})();

function navigation(place)
{
  $('#div_upd').hide();
  $('.navbar-nav li').removeClass('active');
  $('#myTable_wrapper').hide();
  $('#div_add').hide();

  if(place=='list')
  {
    $('.tab_1').addClass('active');
    $('#myTable_wrapper').show();
  }

  if(place=='add')
  {
    $('.tab_2').addClass('active');
    $('#div_add').show();
  }

}
