#!/bin/sh

if [ -f "/run/expertlux-live.sock" ]; then
  rm "/run/expertlux-live.sock"
fi

export HOME=/root


npm install &&
bower install --allow-root --silent &&
gulp clean &&
gulp release &&
#cd '/var/www/expertlux' ;  
/root/.dnx/runtimes/dnx-mono.1.0.0-rc1-update2/bin/dnx \
--appbase /var/www/expertlux Microsoft.Dnx.ApplicationHost \
--configuration Release Microsoft.AspNet.Server.Kestrel \
--server.urls=http://127.0.0.1:5004/
#--server.urls=http://unix:/run/expertlux-live.sock

#dnx Microsoft.Dnx.ApplicationHost --configuration Release Microsoft.AspNet.Server.Kestrel --server.urls=http://127.0.0.1:5004/


