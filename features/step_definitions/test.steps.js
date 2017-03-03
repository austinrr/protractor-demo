//features/step_definitions/test_steps.js
var support = require('./support');

var myStepDefinitionsWrapper = function () {

    this.Given(/^I go to "([^"]*)"$/, function (site, callback) {
        //protractor.browser.get(site);
        //support.get(this, site, null)
        support.get(site, callback);
    });

    this.When(/^I add "([^"]*)" in the task field$/, function (arg1, callback) {
        callback.pending();
    });

    this.When(/^I click the add button$/, function (callback) {
        callback.pending();
    });

    this.Then(/^I should see my new task in the list$/, function (callback) {
        callback.pending();
    });

};
module.exports = myStepDefinitionsWrapper;