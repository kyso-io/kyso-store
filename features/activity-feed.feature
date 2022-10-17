Feature: Activity feed of an user - user profile

    Get all the activity feed of an user, an organization or channel according to the role of the logged user.
    Rule: It will only return information of the queried user 
   
    Scenario: public channel with unauthorized user

    Given An unauthorized user 
    When  calls api.v1.activity-feed.user.|username| using skywalker
    Then The endpoint returns all the public activity feed of skywalker

        | action       | entity       | entity_id | organization | team           | user_id  |
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
