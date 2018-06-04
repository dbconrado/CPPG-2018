var config = {
    development: {
        //url to be used in link generation
        url: 'http://localhost:8000/',
        //database connection settings
        database: {
            host:   'localhost',
            port:   '3306',
            user:   'root',
            pass:   'root',
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
        url: 'http://localhost:8000/',
        //database connection settings
        database: {
            host: '127.0.0.1',
            port: '27017',
            db:     'site'
        },
        //server details
        server: {
            host:   '127.0.0.1',
            port:   '3421'
        }
    }
    };
    module.exports = config;