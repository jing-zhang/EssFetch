var mongodbHelper = require('./db_service/mongodbHelper')
var uuid = require('node-uuid');
var ldapFetch = require('./ldap_service/ldapHelper');

var ldapUrl = 'ldap://168.102.133.12:636';
var ou = 'cn=ldapweb, O=eacs';
var password = 'sharpsk00l';

var dnGroup = 'ou=Faculty,ou=ADM,o=eacs';
var opts = {
    filter: '(|(objectClass=user)(objectClass=person))',
    scope: 'sub',
    //attributes: ['dn','cn','objectguid'],
    attributes: [],
    paging: {
        pageSize: 1000,
        pagePause: true
    }
}


var now = new Date();

var stampObject = {
    queryId: uuid.v1(),
    url: ldapUrl,
    ou: ou,
    dnGroup: dnGroup,
    startTime: now,
    expireTime: new Date(now.getTime() + (3 * 3600 * 1000))
}

mongodbHelper.insertObjects(stampObject, 'stamps')
//Create Ldap Client
var client = ldapFetch.buildClient(ldapUrl, ou, password);
//Fetch Users and put in DB
ldapFetch.fetchData(dnGroup, opts, stampObject.queryId);