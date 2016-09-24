
#!/bin/sh

if [ -f "/run/expertlux-live.sock" ]; then
  rm "/run/expertlux-live.sock"
fi

#sorry for root
export HOME=/root

npm install --no-bin-links --no-optional
#sorry for root
node_modules/.bin/bower install --config.interactive=false -s --allow-root

~/.dnx/runtimes/dnx-mono.1.0.0-rc1-update2/bin/dnu restore
~/.dnx/runtimes/dnx-mono.1.0.0-rc1-update2/bin/dnu build && \

gulp clean && \
gulp release

/etc/init.d/supervisor force-stop && \
/etc/init.d/supervisor stop && \
/etc/init.d/supervisor start