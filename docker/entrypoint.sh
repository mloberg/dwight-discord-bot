#!/bin/sh
set -e

if [ "$1" = "install" ]; then
    GUILD_ID="$2" node dist/bin/install.js
    exit 0
fi

exec "$@"
