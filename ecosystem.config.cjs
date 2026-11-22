module.exports = {
  apps: [
    {
      name: "luggage-storage-service",
      script: "./dist/server.js",
      cwd: __dirname,
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "500M",
      env: {
        NODE_ENV: "production",
        PORT: 3020,
        HOST: "127.0.0.1"
      }
    }
  ]
};
