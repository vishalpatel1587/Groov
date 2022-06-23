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

    Scenario: Verify the user can add ritual
        Given I am on the team page
        When I click on Create a New Ritual button and confirm my access by entering my "vishal.patel@groovnow.com"
        Then I add a new ritual
            | Trigger               | Action             | CheckinFrequency |
            | When I Add 2nd Ritual | It should be added | Every 2 months   |
        Then The ritual should be added successfully


    Scenario: Verify the user can remove ritual
        Given I am on the team page
        When I click on the edit add or remove ritual menu for "When I Add 2nd Ritual" ritual and confirm my access by entering my "vishal.patel@groovnow.com"
        Then I remove "When I Add 2nd Ritual" ritual
        And The "When I Add 2nd Ritual" ritual should be removed successfully