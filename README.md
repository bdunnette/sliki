# sliki

A basic wiki using Angular & CouchDB

## Develop It!

1. [Install CouchDB](http://docs.couchdb.org/en/1.6.1/install/index.html)
    + Ubuntu users:`sudo apt-get install software-properties-common -y && sudo add-apt-repository ppa:couchdb/stable -y && sudo apt-get update -y && sudo apt-get remove couchdb couchdb-bin couchdb-common -yf && sudo apt-get install -V couchdb`
2. [Install Node.js](https://nodejs.org/en/download/)
    + Ubuntu users:`curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - && sudo apt-get install -y nodejs`
3. Install gulp: `sudo npm install -g gulp`
4. `npm install` to install the necessary Node components
5. Create your CouchDB database (named _sliki_)
6. `gulp` to push the application to CouchDB & open it in a browser
    + NOTE: If you have a username and password set on your CouchDB (which is a good thing - you can do it via [fauxton]( http://localhost:5984/_utils/fauxton/#createAdmin)), you'll need to give gulp that username and password, like so: `gulp --username myuser --password mypass`
7. Browse your wiki at http://localhost:5984/sliki/_design/sliki/_rewrite
