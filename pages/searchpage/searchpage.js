'use strict';


var Searchpage = function() {
    //this.prototype = Object.create(basePage.prototype)
    this.name = "Searchpage";
}

module.exports = Searchpage;

Searchpage.prototype = Object.create({}, {
    
    numberOfResults: {
        get: function () {
            return element(by.css('span.search-summary var:nth-child(2)'));
        }
    }
});