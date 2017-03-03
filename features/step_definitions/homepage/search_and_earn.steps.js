'use strict';

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var support = require('../support');
var homepage = require('../../../pages/homepage/homepage');
var searchpage = require('../../../pages/searchpage/searchpage');

chai.use(chaiAsPromised);
var expect = chai.expect;
var should = chai.should();
var Q = require('q')

var myStepDefinitionsWrapper = function () {


    this.Given(/^I go to the url "([^"]*)"$/, function (url, callback) {
        protractor.browser.ignoreSynchronization = true;
        var page = new homepage();

        protractor.browser.get(url).then(function () {
            protractor.browser.sleep(4000).then(function () {
                page.signUpModalCloseBtn.click().then(function () {
                    protractor.browser.sleep(4000).then(callback);
                });
            });
        });
    });

    this.When(/^I enter the trip information$/, function (table, callback) {
        protractor.browser.ignoreSynchronization = true;
        var page = new homepage();
        var data = table.hashes().reduce(function (map, obj) {
            map[obj.key] = obj.val;
            return map;
        });

        var checkInDay = new Date(data["ArrivalDate"]).getDate();
        var checkOutDay = new Date(data["DepartureDate"]).getDate();
        var guests = data['NumGuests'];
        var rooms = data['NumRooms'];

        Q.all([
            // enter destination city
            page.enterDestination(data['DestinationCity'], function () {
            }),

            // select rewards program
            page.selectRewardsProgram(data['RewardsProgram']),

            // select check-in & check-out
            page.selectCheckInDate(checkInDay),
            page.selectCheckOutDate(checkOutDay),

            // select number  of guests
            page.selectNumGuests(guests),

            // select number of rooms
            page.selectNumRooms(rooms)
        ]).then(function () {

            // verification steps
            Q.all([
                expect(page.destinationField.getAttribute('value')).to.eventually.have.string('Austin, TX'),
                expect(page.selectedRewardsProgram).to.eventually.have.string(data['RewardsProgram']),
                expect(page.checkInFilterValue).to.eventually.have.string(checkInDay),
                expect(page.checkOutFilterValue).to.eventually.have.string(checkOutDay),
                expect(page.guestsFilterValue).to.eventually.have.string(guests + ' Guest'),
                expect(page.roomsFilterValue).to.eventually.have.string(rooms + ' Room')
            ]).should.notify(callback);
        });
    });

    this.When(/^Search$/, function (callback) {
        var page = new homepage();

        page.clickSearchBtn().then(function () {
            protractor.browser.sleep(4000).then(callback);
        });
    });

    this.Then(/^I should be presented with '(\d+)' hotel options$/, function (num_hotels, callback) {
        protractor.browser.ignoreSynchronization = true;
        var page = new searchpage();

        protractor.browser.wait(function () {
            return protractor.until.elementIsVisible(page.numberOfResults);
        }, 30000).then(function () {
            expect(page.numberOfResults.getText()).to.eventually.equal(num_hotels).notify(callback);
        }, function (error) {
            callback(error);
        });
    });
};

module.exports = myStepDefinitionsWrapper;