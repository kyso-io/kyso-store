Feature:  Report - Delete report
    
    Scenario: Delete a public report being an unauthorized user
        Given An unauthorized user
        And calls DELETE .api.v1.reports."63596fd9b3388dc3de683ead"
        Then Returns 403

    Scenario: Delete a protected report being an unauthorized user
        Given An unauthorized user 
        And calls DELETE .api.v1.reports."63597688eddfd38c1d7b44a5"
        Then Returns 403

    Scenario: Delete a private report being an unauthorized user
        Given An unauthorized user 
        And calls DELETE .api.v1.reports."635976c24de76e0e9451d8b3"
        Then Returns 403
       
    Scenario: Delete a public report being an authorized user who doesn't belong to the org |api-tests|
        Given As user "lo+gideon@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.reports."63596fd9b3388dc3de683ead"
        Then Returns 403

    Scenario: Delete a protected report being an authorized user who doesn't belong to the org |api-tests|
        Given As user "lo+gideon@dev.kyso.io"
        And In "api-tests" organization
        And In "protected-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.reports."63597688eddfd38c1d7b44a5"
        Then Returns 403

    Scenario: Delete a private report being an authorized user who doesn't belong to the org |api-tests|
        Given As user "lo+gideon@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.reports."635976c24de76e0e9451d8b3"
        Then Returns 403


   Scenario: Delete a public report being an authorized user who belongs to the org |api-tests|, is reader and is the author 
        Given As user "lo+chewbacca@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.reports."63596fd9b3388dc3de683ead"
        Then Returns 403

    Scenario: Delete a protected report being an authorized user who belongs to the org |api-tests|, is reader and is the author
        Given As user "lo+chewbacca@dev.kyso.io"
        And In "api-tests" organization
        And In "protected-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.reports."63597688eddfd38c1d7b44a5"
        Then Returns 403

    Scenario: Delete a private report being an authorized user who belongs to the org |api-tests|, is reader, is the author and he belongs to |private-channel|
        Given As user "lo+chewbacca@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.reports."635976c24de76e0e9451d8b3"
        Then Returns 403

    Scenario: Delete a public report being an authorized user who belongs to the org |api-tests|, is contributor and is not the author 
        Given As user "lo+ahsoka@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.reports."63596fd9b3388dc3de683ead"
        Then Returns 403

    Scenario: Delete a protected report being an authorized user who belongs to the org |api-tests|, is contributor and is not the author
        Given As user "lo+ahsoka@dev.kyso.io"
        And In "api-tests" organization
        And In "protected-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.reports."63597688eddfd38c1d7b44a5"
        Then Returns 403

    Scenario: Delete a private report being an authorized user who belongs to the org |api-tests|, is contributor, is not the author and belongs to the |private-channel|
        Given As user "lo+kylo@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.reports."635976c24de76e0e9451d8b3"
        Then Returns 403

    Scenario: Delete a public report being an authorized user who belongs to the org |api-test|, is contributor and is the author
        Given As user "lo+ahsoka@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.reports."63597c477d26f8fbbc9d8ba4"
        Then Returns 200

    Scenario: Delete a protected report being an authorized user who belongs to the org |api-tests|, is contributor and is the author
        Given As user "lo+ahsoka@dev.kyso.io"
        And In "api-tests" organization
        And In "protected-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.reports."63597caeb00fd5b902813aa9"
        Then Returns 200

    Scenario: Delete a private report being an authorized user who belongs to the org |api-tests|, is contributor, is the author and belongs to the |private-channel|
        Given As user "lo+kylo@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.reports."63597d243ef740bde54aad46"
        Then Returns 200

    Scenario: Delete a private report being an authorized user who belongs to the org |api-tests|, is contributor, is the author but doesn't belong to the |private-channel|
        Given As user "lo+ahsoka@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.reports."635976c24de76e0e9451d8b3"
        Then Returns 403

    Scenario: Delete a public report being an authorized user who belongs to the org |api-tests|, is channel admin and is not the author
        Given As user "lo+rey@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.reports."63597dfce86ab9f1dd20c5df"
        Then Returns 200
           
    Scenario: Delete a protected report being an authorized user who belongs to the org |api-tests|, is channel admin and is not the author
	    Given As user "lo+rey@dev.kyso.io"
        And In "api-tests" organization
        And In "protected-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.reports."63597e77de9ddb0aa5c03059"
        Then Returns 200

    Scenario: Delete a private report being an authorized user who belongs to the org |api-tests|, is channel admin, belongs to the |private-channel| and is not the author
	    Given As user "lo+baby_yoda@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.reports."63597f35e9f8e31a0642288c"
        Then Returns 200

    Scenario: Delete a private report being an authorized user who belongs to the org |api-tests|, is channel admin, doesn't belong to the |private-channel| and is the author
	    Given As user "lo+rey@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.reports."63597f8a549ed03279144ead"
        Then Returns 403

    Scenario: Delete a public report being an authorized user who belongs to the org |api-tests|, is org admin and is not the author
        Given As user "lo+leia@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.reports."6359800d1a2d0631ffc9fe95"
        Then Returns 200
           
    Scenario: Delete a protected report being an authorized user who belongs to the org |api-tests|, is channel admin and is not the author
        Given As user "lo+leia@dev.kyso.io"
        And In "api-tests" organization
        And In "protected-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.reports."635980ab77aa10746b01606e"
        Then Returns 200

    Scenario: Delete a private report being an authorized user who belongs to the org |api-tests|, is org admin, belongs to |private-channel| as channel admin, and is not the author
        Given As user "lo+amidala@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.reports."6359813ce4b9ea2012aea302"
        Then Returns 200

    Scenario: Delete a private report being an authorized user who belongs to the org |api-tests|, is org admin, doesn't belong to |private-channel|, and is the author
        Given As user "lo+leia@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.reports."635981a574a32b3860aa6d6a"
        Then Returns 403

