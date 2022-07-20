# My CRUD App

## CRUD

### Node.js / React / MySQL + Adminer

How to run:

`docker-compose up -d`

Rebuild everything:

`docker-compose build`

Rebuild specific containers...

`docker-compose build {container_name}`

`docker-compose up {container_name}`

To persist DB data uncomment the following line:

` - ./apps/mysql:/var/lib/mysql`

Access the application on:

`http://localhost:3000`

In the case you need to force/build/recreate:

`docker-compose up --force-recreate --build`
