Feature:  Organizations - Delete organization
    Scenario: Delete an organization being an unauthorized user
        Given An unauthorized user
        And calls DELETE .api.v1.organizations."xxx"
        Then Returns 403
       
    Scenario: Delete an organization being an authorized user who doesn't belong to the org |api-tests|
        Given As user "lo+gideon@dev.kyso.io"
        And In "api-tests" organization
        When Logs in into the API 
        And calls DELETE .api.v1.organizations."xxx"
        Then Returns 403

    Scenario: Delete an organization being an authorized user who belongs to the org |api-tests| as reader
        Given As user "lo+chewbacca@dev.kyso.io"
        And In "api-tests" organization
        When Logs in into the API 
        And calls DELETE .api.v1.organizations."xxx"
        Then Returns 403

    Scenario: Delete an organization being an authorized user who belongs to the org |api-tests| as contributor
        Given As user "lo+ahsoka@dev.kyso.io"
        And In "api-tests" organization
        When Logs in into the API 
        And calls DELETE .api.v1.organizations."xxx"
        Then Returns 403

    Scenario: Delete an organization being an authorized user who belongs to the org |api-tests| as channel admin
        Given As user "lo+rey@dev.kyso.io"
        And In "api-tests" organization
        When Logs in into the API 
        And calls DELETE .api.v1.organizations."xxx"
        Then Returns 403

    Scenario: Delete an organization being an authorized user who belongs to the org |api-tests| as org admin
        Given As user "lo+leia@dev.kyso.io"
        And In "api-tests" organization
        When Logs in into the API 
        And calls DELETE .api.v1.organizations."xxx"
        Then Returns 201

    Scenario: Delete an organization being an authorized user who doesn't belong to the org |api-tests| but is global admin
        Given As user "lo+palpatine@dev.kyso.io"
        And In "api-tests" organization
        When Logs in into the API 
        And calls DELETE .api.v1.organizations."xxx"
        Then Returns 201

Feature: Organizations - Update a role of an user in an organization

    Scenario: Update an users' role being an unauthorized user
        Given An unauthorized user
        And calls POST api.v1.organizations/"637cc345d0539d42537b8f99"/members-roles to change user "xxx" to role "yyy"
        Then Returns 403
       
    Scenario: Update an users' role being an authorized user who doesn't belong to the org |api-tests|
        Given As user "lo+gideon@dev.kyso.io"
        And In "api-tests" organization
        When Logs in into the API 
        And calls POST api.v1.organizations/"637cc345d0539d42537b8f99"/members-roles to change user "xxx" to role "yyy"
        Then Returns 403

    Scenario: Delete an organization being an authorized user who belongs to the org |api-tests| as reader
        Given As user "lo+chewbacca@dev.kyso.io"
        And In "api-tests" organization
        When Logs in into the API 
        And calls POST api.v1.organizations/"637cc345d0539d42537b8f99"/members-roles to change user "xxx" to role "yyy"
        Then Returns 403

    Scenario: Delete an organization being an authorized user who belongs to the org |api-tests| as contributor
        Given As user "lo+ahsoka@dev.kyso.io"
        And In "api-tests" organization
        When Logs in into the API 
        And calls POST api.v1.organizations/"637cc345d0539d42537b8f99"/members-roles to change user "xxx" to role "yyy"
        Then Returns 403

    Scenario: Delete an organization being an authorized user who belongs to the org |api-tests| as channel admin
        Given As user "lo+rey@dev.kyso.io"
        And In "api-tests" organization
        When Logs in into the API 
        And calls POST api.v1.organizations/"637cc345d0539d42537b8f99"/members-roles to change user "xxx" to role "yyy"
        Then Returns 403

    Scenario: Delete an organization being an authorized user who belongs to the org |api-tests| as org admin
        Given As user "lo+leia@dev.kyso.io"
        And In "api-tests" organization
        When Logs in into the API 
        And calls POST api.v1.organizations/"637cc345d0539d42537b8f99"/members-roles to change user "xxx" to role "yyy"
        Then Returns 201

    Scenario: Delete an organization being an authorized user who doesn't belong to the org |api-tests| but is global admin
        Given As user "lo+palpatine@dev.kyso.io"
        And In "api-tests" organization
        When Logs in into the API 
        And calls POST api.v1.organizations/"637cc345d0539d42537b8f99"/members-roles to change user "xxx" to role "yyy"
        Then Returns 201