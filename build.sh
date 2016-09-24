#!/usr/bin/env bash

export HOME=/root && \
npm install --no-bin-links --no-optional && \
node_modules/.bin/bower install --config.interactive=false -s --allow-root && \
node_modules/.bin/gulp clean && \
node_modules/.bin/gulp release && \
/root/.dnx/runtimes/dnx-mono.1.0.0-rc1-update2/bin/dnu restore && \
/root/.dnx/runtimes/dnx-mono.1.0.0-rc1-update2/bin/dnu build && \
/etc/init.d/supervisor force-stop && \
/etc/init.d/supervisor stop && \
/etc/init.d/supervisor start