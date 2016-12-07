var rabbitmqHelper = require('./mq_service/rabbitHelper');

var gugle1 = {};
gugle1["clientId"] = '789069923461-2ba0jevmn0p6pj0nb8fl5psq0m76mji9.apps.googleusercontent.com';
gugle1["clientSecret"] = 'otj25guHi5tkzl58R06buxpb';
gugle1["refreshToken"] = '1/rqLRtabmwjJcRZX6DZvHfqyFO5RVcHA0Szcihc5o7YCjtRG4-j9tSCQmqzSBmgOA';
gugle1["accessToken"] = 'ya29.Ci-GA1N7xMP-TEfYSButcKeN4yvKUJ1Ooc4Jc7gRRTtq6dDOwOZd0OIPbmlhnAY2e';
gugle1["groupKey"] = '000596@appsdemo.sharpschool.com';
gugle1["type"] = 'google';


var gugle2 = {};
gugle2["clientId"] = '789069923461-2ba0jevmn0p6pj0nb8fl5psq0m76mji9.apps.googleusercontent.com';
gugle2["clientSecret"] = 'otj25guHi5tkzl58R06buxpb';
gugle2["refreshToken"] = '1/rqLRtabmwjJcRZX6DZvHfqyFO5RVcHA0Szcihc5o7YCjtRG4-j9tSCQmqzSBmgOA';
gugle2["accessToken"] = 'ya29.Ci-GA1N7xMP-TEfYSButcKeN4yvKUJ1Ooc4Jc7gRRTtq6dDOwOZd0OIPbmlhnAY2e';
gugle2["groupKey"] = 'group2@appsdemo.sharpschool.com';
gugle2["type"] = 'google';

var gugle3 = {};
gugle3["clientId"] = '789069923461-2ba0jevmn0p6pj0nb8fl5psq0m76mji9.apps.googleusercontent.com';
gugle3["clientSecret"] = 'otj25guHi5tkzl58R06buxpb';
gugle3["refreshToken"] = '1/rqLRtabmwjJcRZX6DZvHfqyFO5RVcHA0Szcihc5o7YCjtRG4-j9tSCQmqzSBmgOA';
gugle3["accessToken"] = 'ya29.Ci-GA1N7xMP-TEfYSButcKeN4yvKUJ1Ooc4Jc7gRRTtq6dDOwOZd0OIPbmlhnAY2e';
gugle3["groupKey"] = 'group3@appsdemo.sharpschool.com';
gugle3["type"] = 'google';

var gugle4 = {};
gugle4["clientId"] = '789069923461-2ba0jevmn0p6pj0nb8fl5psq0m76mji9.apps.googleusercontent.com';
gugle4["clientSecret"] = 'otj25guHi5tkzl58R06buxpb';
gugle4["refreshToken"] = '1/rqLRtabmwjJcRZX6DZvHfqyFO5RVcHA0Szcihc5o7YCjtRG4-j9tSCQmqzSBmgOA';
gugle4["accessToken"] = 'ya29.Ci-GA1N7xMP-TEfYSButcKeN4yvKUJ1Ooc4Jc7gRRTtq6dDOwOZd0OIPbmlhnAY2e';
gugle4["groupKey"] = 'testing4567@appsdemo.sharpschool.com';
gugle4["type"] = 'google';

var ldap1 = {};
ldap1["ldapUrl"] = 'ldap://192.168.1.145:389';
ldap1["ou"] = 'CN=Administrator,CN=Users,DC=Testing,DC=com';
ldap1["password"] = 'P@ssw0rd';
ldap1["dnGroup"] = 'OU=MaryTest,DC=Testing,DC=com';
ldap1["type"] = 'ldap';
ldap1["opts"] = {
    filter: '(|(objectClass=user)(objectClass=person))',
    scope: 'sub',
    attributes: [],
    paging: {
        pageSize: 50,
        pagePause: true
    }
};

var ldap2 = {};
ldap2["ldapUrl"] = 'ldap://192.168.1.145:389';
ldap2["ou"] = 'CN=Delinquent,OU=Roles,OU=Intrafinity,DC=intrafinity,DC=loc';
ldap2["password"] = 'P@ssw0rd';
ldap2["dnGroup"] = 'OU=MaryTest,DC=Testing,DC=com';
ldap2["type"] = 'ldap';
ldap2["opts"] = {
    filter: '(|(objectClass=user)(objectClass=person))',
    scope: 'sub',
    attributes: [],
    paging: {
        pageSize: 50,
        pagePause: true
    }
};

var ldap3 = {};
ldap3["ldapUrl"] = 'ldap://192.168.1.145:389';
ldap3["ou"] = 'CN=Delinquent,OU=Roles,OU=Intrafinity,DC=intrafinity,DC=loc';
ldap3["password"] = 'P@ssw0rd';
ldap3["dnGroup"] = 'CN=Developers,OU=Development,OU=Intrafinity,DC=intrafinity,DC=loc';
ldap3["type"] = 'ldap';
ldap3["opts"] = {
    filter: '(|(objectClass=user)(objectClass=person))',
    scope: 'sub',
    attributes: [],
    paging: {
        pageSize: 50,
        pagePause: true
    }
};

rabbitmqHelper.sendTask('google', JSON.stringify(gugle1));
// rabbitmqHelper.sendTask('google', JSON.stringify(gugle2));
// rabbitmqHelper.sendTask('google', JSON.stringify(gugle3));
// rabbitmqHelper.sendTask('google', JSON.stringify(gugle4));
// rabbitmqHelper.sendTask('google', JSON.stringify(ldap1));
// rabbitmqHelper.sendTask('google', JSON.stringify(ldap2));
// rabbitmqHelper.sendTask('google', JSON.stringify(ldap3));
//process.exit();