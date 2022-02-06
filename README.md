# My CRUD App

## NODEJS / REACT / MYSQL

To run this CRUD application just execute:

`docker-compose up -d`

You can rebuild everything:

`docker-compose build`

Or if needed to rebuild specific containers...

`docker-compose build {container_name}`

`docker-compose up {container_name}`

If you want to persist DB data uncomment the following line: 

` - ./apps/mysql:/var/lib/mysql`