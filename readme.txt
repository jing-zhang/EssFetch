//send job to mq
node send.js
----------- description ------
rabbitmqHelper.sendTask('google', JSON.stringify(gugle1));
first paramtere is channel
second paramere is messagebody





//consume job from mq
node work.js
----------- description ------
in work.js

saveToDB : true, retrieve data save to db
           false, retrieve data print on console.(debug)

rabbitmqHelper.consumeTask('google', apiCall);

first paramtere is channel, define matches in send.js


node quickstart.js
----------- description ------
to generate access token and refresh_token.
the file will be saved in \home\myNmae\.crendtials

https://developers.google.com/admin-sdk/directory/v1/quickstart/nodejs

Step 1: Turn on the Directory API

    Use this wizard to create or select a project in the Google Developers Console and automatically turn on the API. Click Continue, then Go to credentials.
    On the Add credentials to your project page, click the Cancel button.
    At the top of the page, select the OAuth consent screen tab. Select an Email address, enter a Product name if not already set, and click the Save button.
    Select the Credentials tab, click the Create credentials button and select OAuth client ID.
    Select the application type Other, enter the name "Directory API Quickstart", and click the Create button.
    Click OK to dismiss the resulting dialog.
    Click the file_download (Download JSON) button to the right of the client ID.
    Move this file to your working directory and rename it client_secret.json.


Step 2
    Retieve refresh_token at the file will be saved in \home\myNmae\.credentials

    {
    "access_token":"ya29.Ci-nAw-1Z7wJqOFw1oplRRS01KExNpNoirrltKY96hNnGM0fPjrQNPxXWlFCXHU8dQ",
    "refresh_token":"1/rqLRtabmwjJcRZX6DZvHfqyFO5RVcHA0Szcihc5o7YCjtRG4-j9tSCQmqzSBmgOA",
    "token_type":"Bearer",
    "expiry_date":1480609133776
    }