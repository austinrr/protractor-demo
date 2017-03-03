//var basePage = require('../Basepage')
'use strict';


// extending action sequences
protractor.ActionSequence.prototype.sleep = function (delay) {
    var driver = this.driver_;
    this.schedule_("sleep", function () { driver.sleep(delay); });
    return this;
};

protractor.ActionSequence.prototype.perform = function () {
    var actions = this.actions_.slice();
    var driver = this.driver_;
    return driver.controlFlow().execute(function() {
        actions.forEach(function(action) {
            var command = action.command;
            if (typeof command === "function")
                driver.flow_.execute(command);
            else
                driver.schedule(command, action.description);
        });
    }, 'ActionSequence.perform');
};

var Homepage = function() {
    //this.prototype = Object.create(basePage.prototype)
    this.name = "Homepage";
}

module.exports = Homepage;

Homepage.prototype = Object.create({}, {

    imgLogo: {
        get: function() {
            return element(by.css('img.rm-logo'));
        }
    },
    signUpModalCloseBtn: {
        get: function () {
            return element(by.css('#new-sign-up-modal button.close'));
        }
    },
    destinationField: {
        get: function () {
            return element(by.css('input[placeholder="Where do you need a hotel?"]'));
        }
    },
    rewardsProgramBtn: {
        get: function () {
            return element(by.css('div.program button'))
        }
    },
    rewardsProgramOption: {
        value: function (name) {
            return element(by.linkText(name));
        }
    },
    selectedRewardsProgram: {
        get: function() {
            return element(by.css('div.program button span.value')).getText();
        }
    },
    checkInBtn: {
        get: function () {
            return element(by.css('div.checkin.booking-date input'));
        }
    },
    checkInFilterValue: {
        get: function () {
            return element(by.css('div.checkin.booking-date input + span')).getText();
        }
    },
    datePickerDay: {
        value: function (day) {
            return element(by.cssContainingText('.ui-datepicker-calendar a', day));
        }
    },
    checkOutBtn: {
        get: function () {
            return element(by.css('div.checkout.booking-date input'));
        }
    },
    checkOutFilterValue: {
        get: function () {
            return element(by.css('div.checkout.booking-date input + span')).getText();
        }
    },
    guestsDropdwn: {
        get: function () {
            return element(by.css('div.adults button'));
        }
    },
    guestsOption: {
        value: function (num_guests) {
            return element(by.cssContainingText('div.adults ul.dropdown-menu a', num_guests ));
        }
    },
    guestsFilterValue: {
      get: function () {
          return element(by.css('div.adults button span.value')).getText();
      }
    },
    roomDropdwn: {
        get: function () {
            return element(by.css('div.rooms button'));
        }
    },
    roomsOption: {
        value: function (num_rooms) {
            return element(by.cssContainingText('div.rooms ul.dropdown-menu a', num_rooms));
        }
    },
    roomsFilterValue: {
      get: function () {
          return element(by.css('div.rooms button span.value')).getText();
      }
    },
    searchBtn: {
        get: function () {
            return element(by.css('button.search-submit-btn'));
        }
    },
    closeSignUpModal: {
        value: function () {
            protractor.browser.wait(protractor.until.elementIsVisible(this.signUpModalCloseBtn), 5000);
            this.signUpModalCloseBtn.click();
        }
    },
    enterDestination: {
        value: function (destination, callback) {
            var destinationField = this.destinationField;
            protractor.browser.wait(function () {
               return protractor.until.elementIsVisible(destinationField);
            }, 30000).then(function () {
                var action = protractor.browser.actions();
                action.click(destinationField);
                action.sendKeys(destination);
                action.sleep(2000);
                action.sendKeys(protractor.Key.ENTER);
                action.perform().then(callback());
            });
        }
    },
    selectRewardsProgram: {
        value: function (rewardsProgram) {
            this.rewardsProgramBtn.click();
            return this.rewardsProgramOption(rewardsProgram).click();
        }
    },
    // currently only supports selecting a valid day in the current month
    selectCheckInDate: {
        value: function (day) {
           this.checkInBtn.click();
           this.datePickerDay(day).click();
        }
    },
    // currently only supports selecting a valid day in the current month
    // the method expect that check-in was called first and the datepicker for checkout will be open
    selectCheckOutDate: {
        value: function (day) {
            this.datePickerDay(day).click();
        }
    },
    selectNumGuests: {
        value: function (guests) {
            this.guestsDropdwn.click();
            this.guestsOption(guests).click();
        }
    },

    selectNumRooms: {
        value: function (rooms) {
            this.roomDropdwn.click();
            this.roomsOption(rooms).click();
        }
    },
    clickSearchBtn: {
        value: function() {
            return this.searchBtn.click();
        }
    }

});
