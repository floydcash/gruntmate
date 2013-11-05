Mimer [![Build Status](https://secure.travis-ci.org/heldr/mimer.png?branch=master)](http://travis-ci.org/heldr/mimer)
=========

A simple [Mime][mime] type getter built on top of [Node.js][nodejs].

AS MODULE
---------

`npm install mimer` into your project

### Getting a mime type
```js

var Mimer = require('mimer');

// you can use
Mimer('file.css'); // => "text/css"

// or
var mime = new Mimer();
mime.get('file.css');  // => "text/css"

```

### Setting a mime type
```js

var Mimer = require('mimer'),
	mime = new Mimer();

mime.set('.monster','movie/thriller')
	.get('zombie.monster');
	// => "movie/thriller"

```

AS CLIENT
---------

`npm install -g mimer` (it may require Root privileges)

### pritting a mime type
```CLI
$ mimer brand.png
```

DEVELOPING
----------

The only essential library to develop mimer is jshint.

```CLI
$ make install
$ make test
```

If you'd like to test the full process including npm installer, just run:

```CLI
$ make fulltest
```

## License

MIT License
(c) [Helder Santana](http://heldr.com)

[nodejs]: http://nodejs.org/download
[mime]: http://en.wikipedia.org/wiki/MIME