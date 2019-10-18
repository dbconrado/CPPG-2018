var config = {
    development: {
        //url to be used in link generation
        url: 'http://localhost/CPPG',
        //database connection settings
        database: {
            host:   'localhost',
            port:   '3306',
            user:   'cppg',
            pass:   'cppg123',
            db:     'cppg'
        },
        //server details
        server: {
            host: 'localhost',
            port: '8000'
        }
    },
    production: {
        //url to be used in link generation
        url: 'http://200.18.128.48/CPPG',
        //database connection settings
        database: {
            host: 'localhost',
            port: '3306',
            user:   'root',
            pass:   'root',
            db:     'cppg'
        },
        //server details
        server: {
            host:   '200.18.128.48',
            port:   '80'
        }
    }
    };
    module.exports = config;