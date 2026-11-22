# Luggage Storage Marketplace — Demo API Distribution

This repository contains the standalone, portable production distribution of the **Luggage Storage Marketplace API** for team testing and remote demo deployment on AWS EC2.

> **DEMO DEPLOYMENT ONLY:** This deployment distribution is configured for demonstration and testing purposes. Do not use for production traffic or live payment transactions.

---

## 1. Runtime Requirements

- **Operating System:** Ubuntu 22.04 LTS or Ubuntu 24.04 LTS (or Linux x64)
- **Node.js:** Node.js 22 LTS (`v22.14.0` or higher)
- **Process Manager:** PM2 (`npm install -g pm2`)
- **Package Manager:** npm or pnpm
- **Reverse Proxy:** Nginx (listening on ports 80/443 with Let's Encrypt SSL)
- **External Database:** Supabase-managed PostgreSQL with PostGIS 3.3+ and pgcrypto

---

## 2. Package Architecture

```text
luggage-storage-demo-api/
├── dist/                              # Compiled Fastify API & business domains
│   ├── server.js                      # HTTP runtime entrypoint
│   ├── app.js                         # Application routes and middleware
│   └── infrastructure/
│       └── database/
│           ├── migrations/            # 20 Drizzle SQL migrations
│           └── seeds/                 # Idempotent demo database seeder
├── packages/
│   └── contracts/                     # Vendored compiled API contracts & DTOs
│       ├── package.json
│       └── dist/
├── certificates/
│   └── supabase-root-ca.crt          # Official Supabase Root 2021 CA certificate
├── ecosystem.config.cjs               # PM2 process configuration
├── package.json                       # Self-contained runtime dependencies
├── .env.example                       # Documented environment template
└── README.md                          # Operations and deployment guide
```

---

## 3. Installation & Local Verification

1. **Install Dependencies:**
   ```bash
   npm install --omit=dev
   ```
   *(Or using pnpm: `pnpm install --prod`)*

2. **Configure Environment:**
   ```bash
   cp .env.example .env
   # Edit .env and supply your Supabase pooler credentials and secrets
   chmod 600 .env
   ```

3. **Execute Database Migrations:**
   ```bash
   npm run db:migrate
   ```

4. **Optionally Seed Demo Data:**
   ```bash
   npm run db:seed
   ```

5. **Start the API:**
   ```bash
   npm start
   ```

6. **Verify Endpoints:**
   - `GET http://127.0.0.1:3020/health`
   - `GET http://127.0.0.1:3020/ready`
   - `GET http://127.0.0.1:3020/docs`

---

## 4. EC2 Deployment with PM2

### 4.1 Initial Deployment
```bash
# 1. Clone repository
git clone git@github.com:<org>/luggage-storage-demo-api.git /var/www/luggage-storage-demo-api
cd /var/www/luggage-storage-demo-api

# 2. Install production dependencies
npm install --omit=dev

# 3. Provision .env
cp .env.example .env
nano .env # configure Supabase connection and secrets
chmod 600 .env

# 4. Run database migrations
npm run db:migrate

# 5. Start with PM2
pm2 start ecosystem.config.cjs
pm2 save
```

### 4.2 Process Management Commands
- Check status: `pm2 status luggage-storage-api-demo`
- View logs: `pm2 logs luggage-storage-api-demo --lines 100`
- Restart: `pm2 restart luggage-storage-api-demo`
- Stop: `pm2 stop luggage-storage-api-demo`

---

## 5. Nginx Reverse Proxy Configuration

Create `/etc/nginx/sites-available/demo-api.conf`:

```nginx
server {
    server_name demo-api.yourdomain.com;

    location / {
        proxy_pass http://127.0.0.1:3020;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
        proxy_read_timeout 60s;
        proxy_connect_timeout 10s;
    }

    client_max_body_size 10M;
}
```

Enable and reload Nginx:
```bash
sudo ln -s /etc/nginx/sites-available/demo-api.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

Obtain HTTPS certificate via Certbot:
```bash
sudo certbot --nginx -d demo-api.yourdomain.com
```

---

## 6. Update & Rollback Procedures

### Update Procedure:
```bash
cd /var/www/luggage-storage-demo-api
git pull origin main
npm install --omit=dev
npm run db:migrate
pm2 reload luggage-storage-api-demo
```

### Rollback Procedure:
```bash
cd /var/www/luggage-storage-demo-api
git checkout <PREVIOUS_COMMIT_TAG>
npm install --omit=dev
pm2 reload luggage-storage-api-demo
```
