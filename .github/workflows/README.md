# GitHub Workflows

This directory contains automated deployment workflows for the Nerox website.

## Available Workflows

### 1. `deploy.yml` - GitHub Pages Deployment
Automatically deploys the website to GitHub Pages when you push to the main/master branch.

**How to enable:**
1. Go to your repository on GitHub
2. Navigate to Settings → Pages
3. Under "Source", select "GitHub Actions"
4. Push changes to main/master branch

Your website will be available at: `https://<username>.github.io/<repository>/`

### 2. `deploy-ftp.yml` - FTP Server Deployment
Deploys the website to your custom server (nerox.novacloud.tech) via FTP.

**How to enable:**
1. Go to your repository on GitHub
2. Navigate to Settings → Secrets and variables → Actions
3. Click "New repository secret" and add:
   - **Name:** `FTP_SERVER`  
     **Value:** Your FTP server address (e.g., `ftp.novacloud.tech`)
   
   - **Name:** `FTP_USERNAME`  
     **Value:** Your FTP username
   
   - **Name:** `FTP_PASSWORD`  
     **Value:** Your FTP password

4. (Optional) Edit `deploy-ftp.yml` and change the `server-dir` value if your files need to go in a specific directory like `/public_html/` or `/www/`

5. The workflow will automatically run when you push to main/master

**Note:** If you only want to use one deployment method, you can disable the other workflow by:
- Renaming the file with `.disabled` extension (e.g., `deploy-ftp.yml.disabled`)
- Or deleting the workflow file you don't need

## Custom Domain Setup (nerox.novacloud.tech)

If using GitHub Pages with a custom domain:
1. Create a file named `CNAME` in the root of the repository
2. Add your domain: `nerox.novacloud.tech`
3. In your DNS settings, add a CNAME record:
   - Type: `CNAME`
   - Name: `nerox`
   - Value: `<username>.github.io`

If using FTP deployment:
1. Use the `deploy-ftp.yml` workflow
2. Configure your web server to serve from the deployment directory
3. Ensure your DNS points to your server IP

## Manual Trigger

Both workflows can be manually triggered:
1. Go to Actions tab in your repository
2. Select the workflow you want to run
3. Click "Run workflow"
4. Choose the branch and click "Run workflow"

## Workflow Status

You can check the deployment status:
1. Go to the "Actions" tab in your repository
2. Click on the latest workflow run to see details
3. Green checkmark = successful deployment
4. Red X = failed deployment (check logs for details)
