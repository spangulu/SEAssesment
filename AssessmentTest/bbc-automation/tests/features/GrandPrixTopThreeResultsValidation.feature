Feature: Validate Las Vegas Grand Prix 2023 Results

  As a BBC editor,
  I want to accurately report the results of the 2023 Las Vegas Grand Prix,
  where Max Verstappen took 1st place, George Russell finished 2nd,
  and Sergio Perez secured 3rd place,
  so that my audience is informed about the key highlights of the race.

  # with Valid data
  Scenario: Verify the top 3 finishers and their teams for the Las Vegas Grand Prix with Valid data
    Given I open the BBC Sport Formula 1 results homepage
    And I accept cookies if prompted
    When I select the "Results" tab for Formula 1
    And I choose the "2023" season
    And I open the "Las Vegas Grand Prix, Las Vegas Street Circuit" results page
    Then the top 3 finishers should appear at the top of the race results table:
      | Position | Driver         |
      | 1        | Max Verstappen |
      | 2        | Charles Leclerc |
      | 3        | Sergio Perez   |
    And the team names for these drivers should be correctly listed as:
      | Driver          | Team            |
      | Max Verstappen  | Red Bull |
      | Charles Leclerc | Ferrari  |
      | Sergio Perez    | Red Bull |

# Requested data positions was incorrect 
  Scenario: Verify the top 3 finishers and their teams for the Las Vegas Grand Prix with Invalid data
    Given I open the BBC Sport Formula 1 results homepage
    And I accept cookies if prompted
    When I select the "Results" tab for Formula 1
    And I choose the "2023" season
    And I open the "Las Vegas Grand Prix, Las Vegas Street Circuit" results page
    Then the top 3 finishers should appear at the top of the race results table:
      | Position | Driver         |
      | 1        | Max Verstappen |
      | 2        | George Russell |
      | 3        | Sergio Perez   |
    And the team names for these drivers should be correctly listed as:
      | Driver          | Team            |
      | Max Verstappen  | Red Bull |
      | George Russell  | Mercedes  |
      | Sergio Perez    | Red Bull |