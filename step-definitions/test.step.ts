import { When, Then, Given } from '@cucumber/cucumber';

Given('An unauthorized user', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

When('calls api.v1.activity-feed.user.|username| using skywalker', function () {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});

/**
 *     | action       | entity       | entity_id | organization | team           | user_id  |
       | pin_global   | report       | {id}      | api-tests    | public-channel | {rey id} |
       | unpin_global | report       | {id}      | api-tests    | public-channel | {rey id} |
       | create       | report       | {id}      | api-tests    | public-channel | {rey id} |
       | new_version  | report       | {id}      | api-tests    | public-channel | {rey id} |
       | delete       | report       | {id}      | api-tests    | public-channel | {rey id} |
       | create       | comment      | {id}      | api-tests    | public-channel | {rey id} |
       | add_author   | report       | {id}      | api-tests    | public-channel | {rey id} |
       | star         | report       | {id}      | api-tests    | public-channel | {rey id} |
       | unstar       | report       | {id}      | api-tests    | public-channel | {rey id} |
       | create       | channel      | {id}      | api-tests    |                | {rey id} |
       | delete       | channel      | {id}      | api-tests    | {team id}      | {rey id} |
       | add          | user         | {id}      | api-tests    | public-channel | {rey id} |
       | delete       | user         | {id}      | api-tests    | public-channel | {rey id} |
       | mention      | comment      | {id}      | api-tests    | public-channel | {rey id} |
       | create       | organization | {id}      | api-tests    |                | {rey id} |
 */
Then('The endpoint returns all the public activity feed of skywalker', function (dataTable) {
  // Write code here that turns the phrase above into concrete actions
  return 'pending';
});


Given('2An unauthorized user', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });
  
  When('2calls api.v1.activity-feed.user.|username| using skywalker', function () {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });
  
  /**
   *     | action       | entity       | entity_id | organization | team           | user_id  |
         | pin_global   | report       | {id}      | api-tests    | public-channel | {rey id} |
         | unpin_global | report       | {id}      | api-tests    | public-channel | {rey id} |
         | create       | report       | {id}      | api-tests    | public-channel | {rey id} |
         | new_version  | report       | {id}      | api-tests    | public-channel | {rey id} |
         | delete       | report       | {id}      | api-tests    | public-channel | {rey id} |
         | create       | comment      | {id}      | api-tests    | public-channel | {rey id} |
         | add_author   | report       | {id}      | api-tests    | public-channel | {rey id} |
         | star         | report       | {id}      | api-tests    | public-channel | {rey id} |
         | unstar       | report       | {id}      | api-tests    | public-channel | {rey id} |
         | create       | channel      | {id}      | api-tests    |                | {rey id} |
         | delete       | channel      | {id}      | api-tests    | {team id}      | {rey id} |
         | add          | user         | {id}      | api-tests    | public-channel | {rey id} |
         | delete       | user         | {id}      | api-tests    | public-channel | {rey id} |
         | mention      | comment      | {id}      | api-tests    | public-channel | {rey id} |
         | create       | organization | {id}      | api-tests    |                | {rey id} |
   */
  Then('2The endpoint returns all the public activity feed of skywalker', function (dataTable) {
    // Write code here that turns the phrase above into concrete actions
    return 'pending';
  });