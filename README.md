# sliki

A basic wiki using Angular & CouchDB

## Develop It!

1. [Install CouchDB](http://docs.couchdb.org/en/1.6.1/install/index.html)
    + Ubuntu users:`sudo apt-get install software-properties-common -y && sudo add-apt-repository ppa:couchdb/stable -y && sudo apt-get update -y && sudo apt-get remove couchdb couchdb-bin couchdb-common -yf && sudo apt-get install -V couchdb`
2. [Install Node.js](https://nodejs.org/en/download/)
    + Ubuntu users:`curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash - && sudo apt-get install -y nodejs`
3. Install gulp: `sudo npm install -g gulp`
4. `npm install` to install the necessary Node components
5. `gulp` to push the application to CouchDB & open it in a browser
