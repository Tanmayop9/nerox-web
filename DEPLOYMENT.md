# Nerox Website Deployment Guide

## Overview
This is a modern, static, responsive website for the Nerox Discord bot. The website is fully static (HTML, CSS, JavaScript) and can be hosted on any web server.

## Files
- `index.html` - Main HTML file
- `styles.css` - Stylesheet with modern animations and responsive design
- `script.js` - JavaScript for interactivity and animations

## GitHub Actions Workflows

This repository includes two deployment workflows:

### 1. GitHub Pages Deployment (`.github/workflows/deploy.yml`)
Automatically deploys to GitHub Pages on every push to main/master branch.

**Setup:**
1. Go to repository Settings → Pages
2. Under "Source", select "GitHub Actions"
3. The workflow will automatically deploy on push

**Access:** Your site will be available at `https://<username>.github.io/<repository>/`

### 2. FTP Deployment (`.github/workflows/deploy-ftp.yml`)
Deploys to your custom domain (nerox.novacloud.tech) via FTP.

**Setup:**
1. Go to repository Settings → Secrets and variables → Actions
2. Add these repository secrets:
   - `FTP_SERVER`: Your FTP server (e.g., `ftp.novacloud.tech`)
   - `FTP_USERNAME`: Your FTP username
   - `FTP_PASSWORD`: Your FTP password
3. Edit `.github/workflows/deploy-ftp.yml` and adjust `server-dir` if needed
4. Enable the workflow by pushing to main/master branch

**Note:** You can disable the workflow you don't need by deleting the corresponding file.

## Manual Deployment to nerox.novacloud.tech

### Option 1: Direct File Upload
1. Upload the following files to your web server:
   - `index.html`
   - `styles.css`
   - `script.js`

2. Configure your web server to serve `index.html` as the default page

### Option 2: Using GitHub Pages (Alternative)
1. Go to repository Settings → Pages
2. Set source to deploy from branch
3. Select the branch containing these files
4. GitHub will provide a URL (you can use a custom domain)

### Option 3: Using Nginx (Recommended for subdomain)
1. Copy files to your web server directory:
   ```bash
   sudo mkdir -p /var/www/nerox.novacloud.tech
   sudo cp index.html styles.css script.js /var/www/nerox.novacloud.tech/
   ```

2. Create Nginx configuration:
   ```nginx
   server {
       listen 80;
       server_name nerox.novacloud.tech;
       
       root /var/www/nerox.novacloud.tech;
       index index.html;
       
       location / {
           try_files $uri $uri/ =404;
       }
       
       # Enable gzip compression
       gzip on;
       gzip_types text/css application/javascript text/html;
       
       # Cache static files
       location ~* \.(css|js|jpg|jpeg|png|gif|webp|svg)$ {
           expires 30d;
           add_header Cache-Control "public, immutable";
       }
   }
   ```

3. Enable SSL with Let's Encrypt:
   ```bash
   sudo certbot --nginx -d nerox.novacloud.tech
   ```

4. Reload Nginx:
   ```bash
   sudo systemctl reload nginx
   ```

### Option 4: Using Apache
1. Copy files to document root:
   ```bash
   sudo mkdir -p /var/www/nerox.novacloud.tech
   sudo cp index.html styles.css script.js /var/www/nerox.novacloud.tech/
   ```

2. Create virtual host configuration:
   ```apache
   <VirtualHost *:80>
       ServerName nerox.novacloud.tech
       DocumentRoot /var/www/nerox.novacloud.tech
       
       <Directory /var/www/nerox.novacloud.tech>
           Options Indexes FollowSymLinks
           AllowOverride All
           Require all granted
       </Directory>
       
       ErrorLog ${APACHE_LOG_DIR}/nerox_error.log
       CustomLog ${APACHE_LOG_DIR}/nerox_access.log combined
   </VirtualHost>
   ```

3. Enable SSL with Let's Encrypt:
   ```bash
   sudo certbot --apache -d nerox.novacloud.tech
   ```

4. Restart Apache:
   ```bash
   sudo systemctl restart apache2
   ```

## DNS Configuration
Add an A record or CNAME for the subdomain:
- Type: `A` or `CNAME`
- Name: `nerox`
- Value: Your server IP or main domain
- TTL: `3600` (or automatic)

## Features
- ✅ Fully responsive (mobile, tablet, desktop)
- ✅ Smooth animations and transitions
- ✅ Modern gradient UI design
- ✅ Interactive command tabs
- ✅ Mobile-friendly navigation
- ✅ Optimized performance
- ✅ SEO-friendly
- ✅ No external dependencies (except Google Fonts)

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Performance Optimizations
- Minimal CSS and JavaScript
- Lazy loading for images
- GPU-accelerated animations
- Optimized asset loading
- Gzip compression ready

## Maintenance
To update the website:
1. Edit the HTML, CSS, or JS files
2. Upload the modified files to your server
3. Clear browser cache or use cache busting

## Support
For issues or questions, contact:
- Owner: CASINO (Discord ID: 1056087251068649522)
- Developer: Tanmay (Discord ID: 991517803700027443)

## License
No license specified.
