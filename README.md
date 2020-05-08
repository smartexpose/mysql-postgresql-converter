# MySQL to PostgreSQL converter

This is a minimal working prototype for converting MySQL to PostgreSQL DB based on the [NMIG](https://github.com/AnatolyUss/nmig) library, which should in principle support *precise migration of the database structure*.

## Table of Contents

- [Setup](#setup)
- [Configuration](#configuration)
- [Usage](#usage)
- [Tests](#tests)
- [NMIG](https://github.com/AnatolyUss/nmig/blob/master/README.md)

### Setup

**Requirements**
- Git
- NodeJS > v8

Clone git project
```bash
git clone https://github.com/smartexpose/mysql-postgresql-converter.git
```

Install dependencies
```bash
npm install
```

### Configuration

You must enter the necessary credentials and details in `config/config.json`. The file contains a brief description of each required parameter.
Make sure to configure:
- username (PostgreSQL superuser, usually "postgres")
- See here for information on [superuser](http://www.postgresql.org/docs/current/static/app-createuser.html)

### Usage

**Create a new PostgreSQL database**

```postgresql
CREATE DATABASE my_postgresql_database;
```

Note:
>  If you are planning to migrate spatial data (geometry type columns), then PostGIS should be installed and enabled.

**Build and run**

```bash
npm run build
npm start
```

If the migration failed, simply restart the process.

```bash
npm start
```

Once the migration is finished, check log file in `logs_directory` for possible errors

### Tests

**Create a new PostgreSQL Test database**

```postgresql
CREATE DATABASE nmig_test_db;
```

You can use `test_config.json` to configure the test DB environment, and adjust according to 
your test environment.

**Build and run**

```bash
npm run build
npm start
```
