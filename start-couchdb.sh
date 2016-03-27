COUCHDIR="/var/run/couchdb"
if [ -d "$COUCHDIR" ]; then
  sudo mkdir -p $COUCHDIR
fi
sudo couchdb -b -A /etc/couchdb/
