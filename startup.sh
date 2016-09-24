#!/usr/bin/env bash

if [ -f "/run/expertlux-live.sock" ]; then
  rm "/run/expertlux-live.sock"
fi

cd /var/www/expertlux/bin/output/wwwroot
bash web-live \
--configuration Release Microsoft.AspNet.Server.Kestrel \
--server.urls http://unix:/run/expertlux-live.sock