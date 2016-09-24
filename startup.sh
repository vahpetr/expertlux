#!/usr/bin/env bash

if [ -f "/run/expertlux-live.sock" ]; then
  rm "/run/expertlux-live.sock"
fi

cd /var/www/expertlux
/root/.dnx/runtimes/dnx-mono.1.0.0-rc1-update2/bin/dnu web-live \
--appbase /var/www/expertlux Microsoft.Dnx.ApplicationHost \
--configuration Release Microsoft.AspNet.Server.Kestrel \
--server.urls http://unix:/run/expertlux-live.sock