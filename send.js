var rabbitmqHelper = require('./mq_service/rabbitHelper');

var oa1 = {};
oa1["clientId"] = '789069923461-2ba0jevmn0p6pj0nb8fl5psq0m76mji9.apps.googleusercontent.com';
oa1["clientSecret"] = 'otj25guHi5tkzl58R06buxpb';
oa1["refreshToken"] = '1/rqLRtabmwjJcRZX6DZvHfqyFO5RVcHA0Szcihc5o7YCjtRG4-j9tSCQmqzSBmgOA';
oa1["accessToken"] = 'ya29.Ci-GA1N7xMP-TEfYSButcKeN4yvKUJ1Ooc4Jc7gRRTtq6dDOwOZd0OIPbmlhnAY2e';
oa1["groupKey"] = '000596@appsdemo.sharpschool.com';
oa1["type"] = 'google';


var oa2 = {};
oa2["clientId"] = '789069923461-2ba0jevmn0p6pj0nb8fl5psq0m76mji9.apps.googleusercontent.com';
oa2["clientSecret"] = 'otj25guHi5tkzl58R06buxpb';
oa2["refreshToken"] = '1/rqLRtabmwjJcRZX6DZvHfqyFO5RVcHA0Szcihc5o7YCjtRG4-j9tSCQmqzSBmgOA';
oa2["accessToken"] = 'ya29.Ci-GA1N7xMP-TEfYSButcKeN4yvKUJ1Ooc4Jc7gRRTtq6dDOwOZd0OIPbmlhnAY2e';
oa2["groupKey"] = 'group2@appsdemo.sharpschool.com';
oa2["type"] = 'google';

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


rabbitmqHelper.sendTask('google', JSON.stringify(oa1));
rabbitmqHelper.sendTask('google', JSON.stringify(oa2));
rabbitmqHelper.sendTask('google', JSON.stringify(ldap1));