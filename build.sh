#rm -rf node_modules && \
npm install --no-bin-links --no-optional
bower install --allow-root
~/.dnx/runtimes/dnx-mono.1.0.0-rc1-update2/bin/dnu restore
~/.dnx/runtimes/dnx-mono.1.0.0-rc1-update2/bin/dnu build && \
gulp clean && \
gulp release
/etc/init.d/supervisor force-stop && \
/etc/init.d/supervisor stop && \
/etc/init.d/supervisor start