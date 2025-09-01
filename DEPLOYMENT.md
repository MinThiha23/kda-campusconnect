# 🚀 KD Academy Campus Connect - Deployment Guide

## 📋 **Deployment Options Overview**

### **1. GitHub Pages (Free & Easy) ⭐**
- **Cost**: Completely FREE
- **Domain**: `https://yourusername.github.io/kda-campusconnect`
- **Features**: Automatic deployment, SSL, custom domain support
- **Best for**: Frontend demo, testing, simple hosting

### **2. Vercel (Recommended) ⭐⭐⭐**
- **Cost**: FREE tier available
- **Domain**: `https://kda-campusconnect.vercel.app`
- **Features**: Automatic deployments, preview deployments, analytics, edge functions
- **Best for**: Production React apps, professional hosting

### **3. Netlify (Alternative) ⭐⭐**
- **Cost**: FREE tier available
- **Domain**: `https://kda-campusconnect.netlify.app`
- **Features**: Form handling, serverless functions, CDN
- **Best for**: Static sites with forms, CDN benefits

### **4. Full-Stack Deployment (Advanced)**
- **Cost**: Varies ($5-20/month)
- **Platforms**: Railway, Render, DigitalOcean, AWS
- **Features**: Backend hosting, database, full application
- **Best for**: Complete system with PHP backend

---

## 🎯 **Option 1: GitHub Pages (Recommended for Start)**

### **Step 1: Enable GitHub Pages**
1. Go to your GitHub repository: `https://github.com/MinThiha23/kda-campusconnect`
2. Click **Settings** tab
3. Scroll down to **Pages** section
4. Under **Source**, select **GitHub Actions**
5. Click **Save**

### **Step 2: Push Changes**
```bash
git add .
git commit -m "Add deployment configuration"
git push origin main
```

### **Step 3: Check Deployment**
- Go to **Actions** tab in your repository
- You should see the deployment workflow running
- Once complete, your site will be available at:
  `https://minthiha23.github.io/kda-campusconnect`

---

## 🚀 **Option 2: Vercel (Professional Deployment)**

### **Step 1: Connect to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign up with your GitHub account
3. Click **New Project**
4. Import your `kda-campusconnect` repository
5. Click **Deploy**

### **Step 2: Configure Build Settings**
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

### **Step 3: Environment Variables**
Add these in Vercel dashboard:
```
VITE_APP_TITLE=KD Academy Campus Connect
VITE_API_URL=https://your-backend-url.com
```

### **Step 4: Deploy**
- Click **Deploy**
- Your site will be available at: `https://kda-campusconnect.vercel.app`

---

## 🌐 **Option 3: Netlify**

### **Step 1: Connect to Netlify**
1. Go to [netlify.com](https://netlify.com)
2. Sign up with your GitHub account
3. Click **New site from Git**
4. Choose your repository
5. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### **Step 2: Deploy**
- Click **Deploy site**
- Your site will be available at: `https://random-name.netlify.app`

---

## 🔧 **Full-Stack Deployment (PHP Backend)**

### **Option A: Railway (Recommended)**
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub account
3. Create new project from repository
4. Add MySQL service
5. Configure environment variables
6. Deploy both frontend and backend

### **Option B: Render**
1. Go to [render.com](https://render.com)
2. Create new Web Service
3. Connect your repository
4. Configure build settings
5. Add MySQL database service

---

## 📱 **Custom Domain Setup**

### **For GitHub Pages:**
1. In repository Settings → Pages
2. Add custom domain (e.g., `campusconnect.kdacademy.edu.my`)
3. Update DNS records with your domain provider

### **For Vercel/Netlify:**
1. Go to domain settings
2. Add custom domain
3. Update DNS records
4. Wait for SSL certificate (automatic)

---

## 🔒 **Environment Variables**

### **Frontend (.env)**
```env
VITE_APP_TITLE=KD Academy Campus Connect
VITE_API_URL=https://your-backend-url.com
VITE_APP_VERSION=1.0.0
```

### **Backend (.env)**
```env
DB_HOST=localhost
DB_NAME=kda_campus_connect
DB_USER=root
DB_PASS=your_password
JWT_SECRET=your_jwt_secret
CORS_ORIGIN=https://your-frontend-url.com
```

---

## 📊 **Monitoring & Analytics**

### **Vercel Analytics**
- Built-in performance monitoring
- Real user metrics
- Core Web Vitals tracking

### **Google Analytics**
- Add tracking code to index.html
- Monitor user behavior
- Performance insights

---

## 🚨 **Troubleshooting**

### **Common Issues:**
1. **Build Failures**: Check Node.js version (use 18+)
2. **404 Errors**: Ensure proper routing configuration
3. **CORS Issues**: Update backend CORS settings
4. **Database Connection**: Verify environment variables

### **Debug Commands:**
```bash
# Local build test
npm run build

# Check build output
ls -la dist/

# Test local server
npm run preview
```

---

## 📞 **Support**

### **GitHub Issues**
- Create issue in your repository
- Include error logs and screenshots

### **Community Support**
- Stack Overflow
- GitHub Discussions
- Framework documentation

---

## 🎉 **Success Checklist**

- [ ] Repository pushed to GitHub
- [ ] GitHub Actions workflow created
- [ ] Build successful
- [ ] Site accessible via URL
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active
- [ ] Performance optimized
- [ ] Analytics tracking active

---

**🎯 Next Steps:**
1. Choose your preferred deployment option
2. Follow the step-by-step guide
3. Test your deployed application
4. Configure custom domain if needed
5. Set up monitoring and analytics

**Happy Deploying! 🚀**
