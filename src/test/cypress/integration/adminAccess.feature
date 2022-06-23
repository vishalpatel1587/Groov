Feature: Get Admin Access to Team Rituals
    Scenario: Verify that the user is asked to enter email address, to get admin access while clicking on the Edit Team Info menu
        Given I am on the team page
        When i click on the edit team info menu
        Then I am presented with a modal to enter the email of a team member
        And I can confirm the "vishal.patel@groovnow.com"
        And I get access to Edit team info

    Scenario: Verify that the user is asked to enter email address, to get admin access while clicking on the Add or Remove Ritual menu
        Given I am on the team page
        When i click on the edit add or remove ritual menu
        Then I am presented with a modal to enter the email of a team member
        And I can confirm the "vishal.patel@groovnow.com"
        And I get access to add or remove ritual

    Scenario: Verify that the user is asked to enter email address, to get admin access while clicking on the Edit Team Member menu
        Given I am on the team page
        When i click on the edit team member menu
        Then I am presented with a modal to enter the email of a team member
        And I can confirm the "vishal.patel@groovnow.com"
        And I get access to add team member