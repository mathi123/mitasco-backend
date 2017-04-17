#!/bin/bash

if psql -U postgres -tAc "SELECT 1 FROM pg_roles WHERE rolname='mitasco'" | grep -q 1;
    then
        echo '[x] user mitasco bestaat reeds';
    else
        psql -U postgres -c "CREATE USER mitasco WITH PASSWORD 'mitasco';"
fi

if psql -U postgres -lqt | cut -d \| -f 1 | grep -qw mitasco_dev; then
    echo '[x] database mitasco_dev bestaat reeds';
else
    psql -U postgres -c "CREATE DATABASE mitasco_dev WITH ENCODING 'UTF8' TEMPLATE template0;"
fi