ROM - A dead-simple Redis Object Mapper
=======================================

A super flexible Redis Object Mapper. It's all about model method DRY-ness.


Usage
-----

ROM is easy to use!

__Import__

    var rom = require('rom');
    var client = require('redis').createClient();
    var db = rom.createDatabase('myDatabase', client);
    // Or you can just let rom pick-up your redis client automatically
    // var db = rom.createDatabase('myDatabase');

__Define your model and its methods__

    var User = db.Model.extend('user', {
        defaults: {
            first_name: "My First Name",
            last_name: "My Last Name"
        },
        fullName: function() {
            return this.get('first_name') + " " + this.get('last_name');
        },
        hello: function() {
            return "Hello, " + this.fullName() + "."
        }
    });

__Create an instance__

    var user = User({first_name: "John", last_name: "Doe"});

__Save your model__

    user.save();  // Returns the local state.
                  // You can get the db state by passing a callback.

__Call your method__

    user.hello();  // "Hello, John Doe."


Installation
------------

__Using npm:__

    $ npm install rom


License
-------

(MIT License)

Copyright (c) 2012 Jesse Panganiban <me@jpanganiban.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


