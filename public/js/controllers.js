'use strict';
var app = angular.module('angularApp');

app.controller('homeCtrl', function(userService, $scope, $state) {
    
    $scope.loggedin = false;
    var currentUser = userService.getProfile()
        .then(stuff => {
            console.log(stuff);
            $scope.loggedin =true;
        });


    $scope.logout = function () {
        userService.logout()
            .then(stuff => {
               $scope.loggedin = false;
                $state.go('home');
            });
    }





});

app.controller('browseCtrl', function(userService, $scope, $state) {
    userService.getAll()
        .then(stuff => {
            $scope.apiData = stuff;
           // console.log($scope.apiData)
        });
    
    $scope.viewProfile = function(friend) {
     //   console.log(friend);
    }

});



app.controller('loginCtrl', function(userService, $scope, $state, $auth) {
    $scope.authenticate = provider => {
        $auth.authenticate(provider).then(function() {
            $state.go('myprofile')
        })
    };

    $scope.login = function() {
        var thisuser = {
            email: $scope.email,
            password: $scope.password
        };
        userService.login(thisuser)
            .then( (stuff) => {
                console.log(stuff)
                userService.setProfile(stuff)
                $state.go('myprofile')
            });
    }
    
});
app.controller('profileCtrl', function(userService, $scope, $state) {
    console.log('Profiles');
            userService.getProfile()
                .then(stuff => {
                    $scope.apiData = stuff
                console.log($scope.apiData)
    })
            
    $scope.logout = function () {
        userService.logout()
            .then(stuff => {
                $scope.loggedin = false;
                $state.go('home');
            });
    }

});
app.controller('registerCtrl', function(userService, $scope, $state) {
    $scope.register = function() {
        var thisuser = {
            name: $scope.newName,
            email: $scope.newEmail,
            username: $scope.newUsername,
            password: $scope.newPassword,
            location: $scope.newLocation
        };
        userService.register(thisuser)
            //console.log(thisuser)
            .then((stuff) => {
            $state.go('home')
         });
    }
   

});

app.controller('editCtrl', function(userService, $scope, $state) {
    userService.getProfile()
        .then(stuff => {
            console.log(stuff)
            $scope.apiData = stuff;
            $scope.editName = stuff.data.name;
           
        });

    $scope.editUser = function() {
        var thisuser = {
            name: $scope.editName,
            username: $scope.editUsername,
            
        };
        userService.editById($scope.apiData.data._id, thisuser)
            .then(stuff => {
                $scope.apiData = stuff;
                $state.go('myprofile')
                //   console.log($scope.apiData)
            });
    }

});

app.controller('viewprofileCtrl', function(userService, $scope, $state) {

    userService.viewProfile($state.params)
        .then(stuff => {
            $scope.apiData = stuff;
            console.log($scope.apiData)
            if ($scope.apiData.status === 200) {
                $scope.loggedin = true;
            }
        });

});

    
