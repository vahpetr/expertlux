npm install
bower install
dnu restore
dnu build
gulp clean
gulp release
/etc/init.d/supervisor force-stop && \
/etc/init.d/supervisor stop && \
/etc/init.d/supervisor start
