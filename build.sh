npm install && \
/root/.dnx/runtimes/dnx-mono.1.0.0-rc1-update2/bin/dnu restore && \
/root/.dnx/runtimes/dnx-mono.1.0.0-rc1-update2/bin/dnu build && \
gulp clean && \
gulp release && \
/etc/init.d/supervisor force-stop && \
/etc/init.d/supervisor stop && \
/etc/init.d/supervisor start
