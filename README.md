ROM - A dead-simple Redis Object Mapper
=======================================

A super flexible Redis Object Mapper. It's all about model method DRY-ness.


    var rom = require('rom');
    var redisClient = require('redis').createClient();

    // Use redis or hiredis! Awesome!
    var db = rom.createDatabase('myDatabase', redisClient);

    // Or you can just.. This automatically picks up your current
    // redis and creates a client. Also names the database 'default'.
    var db = rom.createDatabase();

    var User = db.Model.extend('user', {
        hello: function() {
            return "Hello, " + this.get('name') + "!";
        }
    });
    
    var user = new User({name: "Jesse"});
    user.hello();  // Hello, Jesse!

Usage
-----

###Import

    var rom = require('rom');
    var client = require('redis').createClient();  // or hiredis

###Create database instance

    var db = rom.createDatabase('myDatabase', client);  // Database name and redis client.

###Define a model

    var User = db.Model.extend('user', {
        // hello method
        hello: function() {
            return "Hello, " + this.get('name') + "!";
        }
    });

###Create an instance of the model

    var user = new User({name: "Jesse"});

    user.hello();  // Hello, Jesse!

###Save the instance

    user.save(function(e, m) {
        m.hello();  // Hello, Jesse!
    });

    // Alternatively, you can get the local current state.
    user.save();

###Getters

    user.get('name');  // Returns "Jesse"

###Setters

    user.set('name', 'New name');  // Returns "New name"

###Finding an instance

    User.find(<user_id>, function(err, user) {
        user.hello();  // You should get "Hello, <user.name>"
    });

###Destroying an instance

    user.destroy(function(err, res) {
        // res becomes 1/0 if the deletion is successful.
    });

Overriding
----------

You can easily override the Model object by subclassing it.

    var rom = require('rom');

    var db = rom.createDatabase('myDatabase');

    var AwesomeModel = db.Model.extend('awesomeBase', {
        // Awesome stuff here
    });

    var User = AwesomeModel.extend();  // We now use the AwesomeModel


TODO
----

1. Tests!
2. More documentation.
3. More methods.
