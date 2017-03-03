Feature: Searching for a hotel
  As a typical user of RocketMiles
  I should be able to input a my trip information
  In order to be presented with hotel options

  Scenario: Trip to Austin for SXSW
    Given I go to the url "https://www.rocketmiles.com"
    When I enter the trip information
      | DestinationCity | RewardsProgram          | ArrivalDate | DepartureDate | NumGuests | NumRooms |
      | Austin          | Southwest Rapid Rewards | 03-5-2017  | 03-10-2017    | 3         | 2        |
    And Search
    Then I should be presented with '50' hotel options