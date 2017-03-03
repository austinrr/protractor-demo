# Protractor Demo

### Getting started:
- download repo & run the following:

```sh
npm install
npm run start-server
```

### Updating the Cucumber Script
You may want to update the cucumber script with new dates or other options for the home page search.  **Also, the final step will may fail if the expect results are not set correctly.**

```cucumber
    When I enter the trip information
      | DestinationCity | RewardsProgram          | ArrivalDate | DepartureDate | NumGuests | NumRooms |
      | Austin          | Southwest Rapid Rewards | 03-5-2017   | 03-10-2017    | 3         | 2        |
```
Typically this is not a field I would not have a static assertion on, but just for the purpses of demoing a simple test I left it as such.
```cucumber
    Then I should be presented with '50' hotel options
```

### Run the Test
```sh
npm run test
```

### Shutdown Webdriver
```sh
npm stop-server
```


### Notes
This took me a little longer to put together than I expected ~2.5 hours.  My javascript experience is limited so this was a learning experience and I'm less familiar with Angular since I've been working with React for the last two years.  All that said, I think I could elaborate on this humble starting point much more easily now.  It should not be too difficult to put in a more flushed out and coherent page-object-model and write additional tests.  The most difficult challange would be getting protractor and angular to play nice.  I'm not exactly sure why protractor could not sync with the angular front-end so I ended up having to disable syncing and incorporate more traditional waits.  I think some time with the developers at Rocket Miles could help me sort this out.
