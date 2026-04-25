module.exports = {
  apps: [{
    name: 'civicstate-worker',
    script: './dist/index.js',
    exec_mode: 'fork',
    instances: 1,
    max_memory_restart: '1G',
    env: { NODE_ENV: 'production' },
    log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
    merge_logs: true,
  }],
};
