#!/usr/bin/env bash

export HOME=/root

dnu publish --configuration Release

if [ -f "/run/expertlux-live.sock" ]; then
  rm "/run/expertlux-live.sock"
fi

cd ~www/expertlux/bin/output/approot
bash web-live \
--configuration Release Microsoft.AspNet.Server.Kestrel \
--server.urls http://unix:/run/expertlux-live.sock