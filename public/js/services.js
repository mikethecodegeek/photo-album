'use strict';

var app = angular.module('angularApp');

app.service('userService',function($http) {
    var profile = {loggedin: false};
    this.setProfile = function(myprofile) {
        profile = myprofile
    };
    this.returnProfile = function(){
        return profile;
    };
    this.getAll = () => {
        return $http.get('./api/users');
    };
    this.getProfile = () => {
        return $http.get('./api/users/profile');
    };
    
    this.register = newPost => {
        console.log(newPost)
        return $http.post('./api/users/register', {name: newPost.name,
        username: newPost.username, email: newPost.email, password: newPost.password,
        location: newPost.location});
    };
    this.deleteById = id => {
        return $http.delete(`./api/users/${id}`);
    };
    this.viewProfile = id => {
        console.log(id.id);
        return $http.get(`./api/users/${id.id}`);
    };
    this.editById = (id, newPost) => {
        console.log(id);
        return $http.put(`./api/users/${id}`, {name: newPost.name,
            username: newPost.username, email: newPost.email});
    }

    this.login = (user) => {
        return $http.post('./api/users/login/', {email: user.email, password: user.password});
    };
    this.logout = () => {
        //console.log('User:', user)
        return $http.delete('./api/users/logout/');
    };

    this.makeBid = id => {
        console.log(id);
        return $http.post(`./api/users/auctions/makebid/${id.listing._id}`,{user: id.user.data, listing: id.listing,
            bid: id.bid});
    };
    
});

app.service('albumService',function($http) {
    this.getAll = () => {
        return $http.get('./api/albums');
    };
    this.createAlbum = (item) => {
        console.log(item)
        return $http.post('./api/albums/newAlbum', {user: item.user.data.username, name: item.user.data.albumname}
        );
    };
    
    this.deleteById = id => {
        return $http.delete(`./api/albums/${id}`);
    };
    this.viewAlbums = id => {
   //     console.log(id);
        return $http.get(`./api/albums/${id}`);
    };
    this.editById = (id, newPost) => {
        console.log(id);
        return $http.put(`./api/albums/${id}`, {user: item.user.data.username, name: item.user.data.albumname});
    }
    

});
