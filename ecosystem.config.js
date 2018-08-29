module.exports = {
  apps : [{
    name      : 'CPPG-Inst',
    script    : 'bin/www',
    env: {
      NODE_ENV: 'development'
    },
    watch: true,
    ignore_watch: ['public','node-modules'],
    followAllRedirects: true,
    env_production : {
      NODE_ENV: 'production'
    }
  }],

  deploy : {
    production : {
      user : 'josecarmo',
      host : '200.18.128.48',
      ref  : 'origin/master',
      repo : 'joseluiz98@github.com:CPPG-2018.git',
      path : '/var/www/html/CPPG/'
    }
  }
};