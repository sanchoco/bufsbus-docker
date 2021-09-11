module.exports = {
  apps : [{
    name   : "bufsbus-server",
    script : "index.js",
    watch: false,
    exec_mode: 'cluster',
    instances: 2
  }]
}
