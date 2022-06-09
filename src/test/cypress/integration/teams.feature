Feature: Create and verify team details
@DeleteTeamFromDb
    Scenario: Verify a team can be created by giving all the details
        Given I am on the home page of "Ritual Builder"
        When I click on Add a new team
        Then I am presented with "Add a new team" page
        And I am able to provide all the values
            | TeamName          | TeamDescription                | Trigger                         | Action         | Email                     | ConfirmEmail              | CheckinFrequency |
            | AutomationTesting | Automation Testing Description | When you are running automation | All tests pass | vishal.patel@groovnow.com | vishal.patel@groovnow.com | Every 3 months   |
        And create a team
