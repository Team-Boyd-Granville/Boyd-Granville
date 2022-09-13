## Database

In order to connect to the postgres database, dependency is required.

    <dependency>
      <groupId>org.postgresql</groupId>
      <artifactId>postgresql</artifactId>
      <version>42.2.0</version>
    </dependency> 

Setup Commands: (necessary ones to be added to a script file)

```
sudo passwd postgres           (set to pass123 for now)
sudo service postgresql start
createdb mydb

```

Commands for error checking:

```
sudo service postgresql status                - for checking the status of your database.
sudo service postgresql start                 - to start running your database.
sudo service postgresql stop                  - to stop running your database.
createdb mydb                                 - creates and adds mydb database to postgres instance
dropdb mydb                                   - drops mydb database from postgres instance
psql mydb                                     - enters mydb via psql interface
psql -h localhost -p 5432                     - sets port
\i scriptfile.sql;                            - used inside psql interface, runs script from .sql file
CREATE USER <username> SUPERUSER;             - used inside psql interface, adds a user to the postgres instance
ALTER USER <username> PASSWORD <password>;    - used inside psql interface, adds/changes password for user in postgres instance
```