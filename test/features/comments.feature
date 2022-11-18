Feature:  Comments - Delete comment
    Scenario: Delete a comment in a report being an unauthorized user
        Given An unauthorized user
        And calls DELETE .api.v1.comments."63763836c4b37ed7ce2c0061"
        Then Returns 403
       
    Scenario: Delete a comment in a report being an authorized user who doesn't belong to the org |api-tests|
        Given As user "lo+gideon@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."63763836c4b37ed7ce2c0061"
        Then Returns 403
        
    Scenario: Delete a comment in a report being an authorized user who doesn't belong to the org |api-tests| but is the author of the comment
        Given As user "lo+gideon@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."63763914dd0dd3a502797172"
        Then Returns 403

    Scenario: Delete a comment in a report being an authorized user who belongs to the org |api-tests|, is reader and is NOT the author 
        Given As user "lo+chewbacca@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."6376395f291927634fb52f76"
        Then Returns 403

    Scenario: Delete a comment in a report being an authorized user who belongs to the org |api-tests|, is reader and is the author 
        Given As user "lo+c3po@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."6376395f291927634fb52f76"
        Then Returns 200
        And Check if comment is marked as deleted

    Scenario: Delete a comment in a private report being an authorized user who belongs to the org |api-tests|, is reader, is NOT the author and belongs to |private-channel|
        Given As user "lo+chewbacca@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."63763b6a338ab11639eec6f7"
        Then Returns 403

    Scenario: Delete a comment in a private report being an authorized user who belongs to the org |api-tests|, is reader, is the author and belongs to |private-channel|
        Given As user "lo+kylo@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."63763b6a338ab11639eec6f7"
        Then Returns 200
        And Check if comment is marked as deleted

    Scenario: Delete a comment in a private report being an authorized user who belongs to the org |api-tests|, is reader, is the author and don't belongs to |private-channel|
        Given As user "lo+c3po@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."637644f0ab4c89731504672b"
        Then Returns 403

    Scenario: Delete a comment in a report being an authorized user who belongs to the org |api-tests|, is contributor and is NOT the author 
        Given As user "lo+bb8@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."63764520e9ba2d7b7273dcdf"
        Then Returns 403

    Scenario: Delete a comment in a report being an authorized user who belongs to the org |api-tests|, is contributor and is the author 
        Given As user "lo+ahsoka@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."63764520e9ba2d7b7273dcdf"
        Then Returns 200
        And Check if comment is marked as deleted

    Scenario: Delete a comment in a private report being an authorized user who belongs to the org |api-tests|, is contributor, is NOT the author and belongs to the |private-channel|
        Given As user "lo+kylo@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."6376458476bcbff63263a18c"
        Then Returns 403

    Scenario: Delete a comment in a private report being an authorized user who belongs to the org |api-tests|, is contributor, is the author and belongs to the |private-channel|
        Given As user "lo+kylo@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."637645cddb69a6b680019d35"
        Then Returns 200
        And Check if comment is marked as deleted

    Scenario: Delete a comment in a private report being an authorized user who belongs to the org |api-tests|, is contributor, is the author but doesn't belong to the |private-channel|
        Given As user "lo+ahsoka@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."63764603386e2998d5a22348"
        Then Returns 403

    Scenario: Delete a comment in a report being an authorized user who belongs to the org |api-tests|, is channel admin and is not the author
        Given As user "lo+rey@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."63764661a393c514802adaed"
        Then Returns 200
        And Check if comment is marked as deleted

    Scenario: Delete a comment in a report being an authorized user who belongs to the org |api-tests|, is channel admin and is the author
        Given As user "lo+rey@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."6376467d6c4e419eb53b76f5"
        Then Returns 200
        And Check if comment is marked as deleted

    Scenario: Delete a comment in a private report being an authorized user who belongs to the org |api-tests|, is channel admin, doesn't belong to the |private-channel| and is the author
	    Given As user "lo+rey@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."637646cd78e55a49eab84b51"
        Then Returns 403

    Scenario: Delete a comment in a private report being an authorized user who belongs to the org |api-tests|, is channel admin, doesn't belong to the |private-channel| and is NOT the author
	    Given As user "lo+r2d2@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."637646cd78e55a49eab84b51"
        Then Returns 403

    Scenario: Delete a comment in a private report being an authorized user who belongs to the org |api-tests|, is channel admin, belongs to the |private-channel| and is not the author
	    Given As user "lo+baby_yoda@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."637646cd78e55a49eab84b51"
        Then Returns 200
        And Check if comment is marked as deleted

    Scenario: Delete a comment in a private report being an authorized user who belongs to the org |api-tests|, is channel admin, belongs to the |private-channel| and is the author
	    Given As user "lo+baby_yoda@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."6376471b43ed65102c61aafb"
        Then Returns 200
        And Check if comment is marked as deleted

    Scenario: Delete a comment in a private report being an authorized user who belongs to the org |api-tests|, is channel admin, belongs to the |private-channel| and is NOT the author
	    Given As user "lo+baby_yoda@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."637647470cb8805adced23e4"
        Then Returns 200
        And Check if comment is marked as deleted

    Scenario: Delete a comment in a private report being an authorized user who belongs to the org |api-tests|, is org admin, belongs to |private-channel| as reader, and is not the author
        Given As user "lo+mando@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."6376479348611f2c2791797d"
        Then Returns 403

    Scenario: Delete a comment in a private report being an authorized user who belongs to the org |api-tests|, is org admin, doesn't belong to |private-channel|, and is NOT the author
        Given As user "lo+leia@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."6376479348611f2c2791797d"
        Then Returns 403

    Scenario: Delete a comment in a private report being an authorized user who belongs to the org |api-tests|, is org admin, belongs to |private-channel| as channel admin, and is not the author
        Given As user "lo+amidala@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."6376479348611f2c2791797d"
        Then Returns 200
        And Check if comment is marked as deleted

    Scenario: Delete a comment in a private report being an authorized user who belongs to the org |api-tests|, is org admin, doesn't belong to |private-channel|, and is the author
        Given As user "lo+leia@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."637648709cc1777e2ab60a8f"
        Then Returns 403

    Scenario: Delete a comment in a private report being an authorized user who belongs to the org |api-tests|, is org admin, belongs to |private-channel| as reader, and is the author
        Given As user "lo+mando@dev.kyso.io"
        And In "api-tests" organization
        And In "private-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."63764814df4e2e0bfd911588"
        Then Returns 200
        And Check if comment is marked as deleted

    Scenario: Delete a comment in a report being an authorized user who belongs to the org |api-tests|, is org admin and is NOT the author
        Given As user "lo+leia@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."637648ad1c5b4cdc30ead36a"
        Then Returns 200
        And Check if comment is marked as deleted

    Scenario: Delete a comment in a report being an authorized user who belongs to the org |api-tests|, is org admin and is the author
        Given As user "lo+leia@dev.kyso.io"
        And In "api-tests" organization
        And In "public-channel" channel
        When Logs in into the API 
        And calls DELETE .api.v1.comments."637648d8aca006fbd01fded1"
        Then Returns 200
        And Check if comment is marked as deleted