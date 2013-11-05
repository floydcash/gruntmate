/*
 * mimer
 * https://github.com/heldr/mimer
 *
 * Copyright (c) 2013 Helder Santana
 * Licensed under the MIT license.
 * https://raw.github.com/heldr/mimer/master/MIT-LICENSE.txt
 */

var Mimer = function (extPath) {
    if (!(this instanceof Mimer)) {
        if (extPath) {
            var mime = new Mimer();
            return mime.get(extPath);
        }
        return new Mimer();
    }

    this._loadMultipleList();
};

Mimer.prototype = {
    extGetter : require('./extensions/getter'),

    set : function ( ext , type ) {
        if (!(ext instanceof Array)) {
            if (ext.match('.')) {
                ext = ext.replace('.','');
            }
            this.list[ext] = type;
            return this;
        } else {
            for ( var i = 0; i < ext.length; i++ ) {
                this.set(ext[i], type);
            }
        }
    },

    get : function ( ext ) {
        ext = this.extGetter(ext).split('.')[1];
        return ( this.list[ext] ) ? this.list[ext] : '\nInvalid extension';
    },

    list : require('./extensions/single'),

    _loadMultipleList : function () {
        var multiple = require('./extensions/multiple');

        for (var item in multiple) {
            if ( multiple.hasOwnProperty(item) ) {
                this.set( multiple[item] , item );
            }
        }
    }
};

module.exports = Mimer;
