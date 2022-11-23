Feature:  Inline Comments - Delete an inline comment
    Scenario: Delete an inline comment in a report being an unauthorized user
        Given An unauthorized user
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 403
       
    Scenario: Delete an inline comment in a report being an authorized user who doesn't belong to the org |api-tests|
        Given As user "lo+gideon@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 403

    Scenario: Delete an inline comment in a report being an authorized user who doesn't belong to the org |api-tests| but is the author of the comment
        Given As user "lo+gideon@dev.kyso.io"
        And In "api-tests" organization
        And In "protected-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 403

   Scenario: Delete an inline comment in a report being an authorized user who belongs to the org |api-tests|, is reader and is the author 
        Given As user "lo+chewbacca@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 201

    Scenario: Delete an inline comment in a report being an authorized user who belongs to the org |api-tests|, is reader and is NOT the author 
        Given As user "lo+chewbacca@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 403

    Scenario: Delete an inline comment in a private report being an authorized user who belongs to the org |api-tests|, is reader, is the author and belongs to |private-channel|
        Given As user "lo+chewbacca@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 201

    Scenario: Delete an inline comment in a private report being an authorized user who belongs to the org |api-tests|, is reader, is NOT the author and belongs to |private-channel|
        Given As user "lo+chewbacca@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 403

    Scenario: Delete an inline comment in a private report being an authorized user who belongs to the org |api-tests|, is reader, is the author and don't belongs to |private-channel|
        Given As user "lo+baby_yoda@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 403

    Scenario: Delete an inline comment in a report being an authorized user who belongs to the org |api-tests|, is contributor and is the author 
        Given As user "lo+ahsoka@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 201

    Scenario: Delete an inline comment in a report being an authorized user who belongs to the org |api-tests|, is contributor and is NOT the author 
        Given As user "lo+ahsoka@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 403


    Scenario: Delete an inline comment in a private report being an authorized user who belongs to the org |api-tests|, is contributor, is NOT the author and belongs to the |private-channel|
        Given As user "lo+kylo@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 403

    Scenario: Delete an inline comment in a private report being an authorized user who belongs to the org |api-tests|, is contributor, is the author and belongs to the |private-channel|
        Given As user "lo+kylo@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 201

    Scenario: Delete an inline comment in a private report being an authorized user who belongs to the org |api-tests|, is contributor, is the author but doesn't belong to the |private-channel|
        Given As user "lo+ahsoka@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 403

    Scenario: Delete an inline comment in a report being an authorized user who belongs to the org |api-tests|, is channel admin and is not the author
        Given As user "lo+rey@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 201

    Scenario: Delete an inline comment in a report being an authorized user who belongs to the org |api-tests|, is channel admin and is the author
        Given As user "lo+rey@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 201

    Scenario: Delete an inline comment in a private report being an authorized user who belongs to the org |api-tests|, is channel admin, belongs to the |private-channel| and is not the author
	    Given As user "lo+baby_yoda@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 200

    Scenario: Delete an inline comment in a private report being an authorized user who belongs to the org |api-tests|, is channel admin, belongs to the |private-channel| and is the author
	    Given As user "lo+baby_yoda@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 201

    Scenario: Delete an inline comment in a private report being an authorized user who belongs to the org |api-tests|, is channel admin, belongs to the |private-channel| and is NOT the author
	    Given As user "lo+baby_yoda@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 201

    Scenario: Delete an inline comment in a private report being an authorized user who belongs to the org |api-tests|, is channel admin, doesn't belong to the |private-channel| and is the author
	    Given As user "lo+rey@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 403

    Scenario: Delete an inline comment in a private report being an authorized user who belongs to the org |api-tests|, is channel admin, doesn't belong to the |private-channel| and is NOT the author
	    Given As user "lo+rey@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 403

    Scenario: Delete an inline comment in a report being an authorized user who belongs to the org |api-tests|, is org admin and is NOT the author
        Given As user "lo+leia@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 200

    Scenario: Delete an inline comment in a report being an authorized user who belongs to the org |api-tests|, is org admin and is the author
        Given As user "lo+leia@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 200

    Scenario: Delete an inline comment in a private report being an authorized user who belongs to the org |api-tests|, is org admin, belongs to |private-channel| as channel admin, and is not the author
        Given As user "lo+amidala@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 200

    Scenario: Delete an inline comment in a private report being an authorized user who belongs to the org |api-tests|, is org admin, belongs to |private-channel| as reader, and is not the author
        Given As user "lo+mando@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 403

    Scenario: Delete an inline comment in a private report being an authorized user who belongs to the org |api-tests|, is org admin, belongs to |private-channel| as reader, and is the author
        Given As user "lo+mando@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 201

    Scenario: Delete an inline comment in a private report being an authorized user who belongs to the org |api-tests|, is org admin, doesn't belong to |private-channel|, and is the author
        Given As user "lo+leia@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 403

    Scenario: Delete an inline comment in a private report being an authorized user who belongs to the org |api-tests|, is org admin, doesn't belong to |private-channel|, and is NOT the author
        Given As user "lo+leia@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.inline-comments."xxx"
        Then Returns 403