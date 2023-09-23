#!/bin/sh

echo "waiting for db"
bash -c 'while !</dev/tcp/postgres/5432; do sleep 1; done;'

set -e
    python manage.py makemigrations
    python manage.py migrate
exec "$@"