Feature: Validate Search Results for "Sport in 2023"

  As a BBC editor,
  I want to ensure that when a user searches for "Sport in 2023",
  at least 4 relevant results are returned,
  so that readers can explore a variety of BBC Sports articles and reports.

  Scenario: Verify that search results for "Sport in 2023" are sufficient and relevant
    Given I am on the BBC Sport homepage
    And I accept cookies if prompted
    When I search for "Sport in 2023"
    Then I should see at least 4 relevant search results displayed
    And each result title should include the keyword "Sport" or "2023"
    And no result entry should be empty or broken
