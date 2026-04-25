module.exports = {
  apps: [{
    name: 'civicstate-api',
    script: './dist/index.js',
    exec_mode: 'fork',
    instances: 1,
    max_memory_restart: '512M',
    env: { NODE_ENV: 'production' },
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
  }],
};
