# Quick Setup & Customization Guide

## 🚀 Getting Started

### Step 1: View the Website
```bash
cd /Users/sonukumaryadav/aayush/aayush-port
python3 -m http.server 8000
# Open http://localhost:8000 in your browser
```

### Step 2: Customize Content

#### Update Navigation Links
Edit the nav section to match your pages:
```html
<nav id="mainNav">
  <a href="#home">Home</a>
  <a href="#work">Work</a>
  <a href="#skills">Skills</a>
  <!-- Add/remove links as needed -->
</nav>
```

#### Update Hero Section
Find the hero section and personalize:
```html
<h1>
  Your Name Or
  <span>Your Headline</span>
</h1>
<p>Your professional tagline or elevator pitch</p>
```

#### Update Portfolio Projects
Replace placeholders with your projects:
```html
<article class="work-card reveal">
  <img src="your-project-image.jpg" alt="Project Name">
  <div class="work-card-details">
    <div class="work-card-category">Web Development</div>
    <div class="work-card-title">Your Project Name</div>
    <div class="work-card-tech">
      <span class="tech-badge">React</span>
      <span class="tech-badge">Node.js</span>
    </div>
    <div class="work-card-buttons">
      <a href="https://project-url.com" target="_blank">Live →</a>
      <a href="https://github.com/your-repo" target="_blank">Code</a>
    </div>
  </div>
</article>
```

#### Update Skills
```html
<div class="skill-item">
  <div class="skill-label">
    <h4>Your Skill</h4>
    <span class="skill-percent">85%</span>
  </div>
  <div class="skill-bar" style="--skill-percent: 85%;">
    <div class="skill-bar-fill"></div>
  </div>
</div>
```

#### Update Testimonials
```html
<a class="review-card reveal" href="#">
  <div class="review-content">
    <div class="review-stars">★★★★★</div>
    <p class="review-text">
      "Client testimonial here..."
    </p>
    <div class="review-user">
      <div class="review-avatar" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);"></div>
      <div class="review-info">
        <h4>Client Name</h4>
        <span>Client Company/Title</span>
      </div>
    </div>
  </div>
</a>
```

#### Update Pricing Plans
```html
<div class="pricing-card featured">
  <div class="pricing-header">
    <h3 class="pricing-name">Plan Name</h3>
    <p class="pricing-desc">Description</p>
    <div class="pricing-price">
      <span class="pricing-amount">$9,999</span>
      <span class="pricing-period">one-time</span>
    </div>
  </div>
  <div class="pricing-features">
    <div class="pricing-feature">Feature 1</div>
    <div class="pricing-feature">Feature 2</div>
  </div>
  <a class="pricing-cta" href="#contact">Get Started</a>
</div>
```

#### Update Contact Form
```html
<form class="contact-form" id="contactForm">
  <div class="contact-field">
    <label for="companyName">Company Name</label>
    <input id="companyName" name="companyName" type="text" placeholder="Your Company">
  </div>
  <!-- Update field names and placeholders -->
</form>
```

---

## 🎨 Customizing Colors

### Change Primary Color
Find the CSS variables section and update:
```css
:root {
  --primary: #6366f1;      /* Change this to your color */
  --primary-2: #8b5cf6;    /* Change gradient color */
}
```

### Change Text Colors
```css
:root {
  --text: #fafafa;           /* Main text */
  --text-dim: #a1a1aa;       /* Dimmed text */
  --text-soft: #71717a;      /* Softer text */
}
```

---

## 📱 Responsive Design

The site is fully responsive with breakpoints:
- **Desktop**: Full layout (1420px max width)
- **Tablet**: 980px - Grid adjusts to 2 columns
- **Mobile**: 680px - Single column layout
- **Small Mobile**: 380px - Extra small adjustments

No changes needed - it's all automatic!

---

## 🔗 Connect Services

### Contact Form Integration
Update the form to send to your email:

**Option 1: FormSubmit.co**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- Your form fields -->
</form>
```

**Option 2: Formspree**
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
  <!-- Your form fields -->
</form>
```

**Option 3: Netlify Forms**
```html
<form name="contact" method="POST" netlify>
  <!-- Your form fields -->
</form>
```

### Social Media Links
Update the social links:
```html
<a href="https://twitter.com/yourhandle" target="_blank">
  <svg><!-- Twitter icon --></svg>
  <span>Twitter</span>
</a>
```

---

## 📂 File Structure

```
aayush-port/
├── index.html              ← Main website (2,747 lines)
├── PORTFOLIO_FEATURES.md   ← Feature documentation
├── SETUP_GUIDE.md         ← This file
└── README.md              ← Original readme
```

---

## ✨ Feature Highlights

| Feature | Status | Details |
|---------|--------|---------|
| Responsive Design | ✅ | Mobile, tablet, desktop optimized |
| Dark Theme | ✅ | Modern glassmorphism aesthetic |
| Animations | ✅ | Smooth reveals, hover effects |
| Custom Cursor | ✅ | Desktop only, smooth tracking |
| Skill Bars | ✅ | Animated progress bars |
| Project Showcase | ✅ | 6 projects with details |
| Testimonials | ✅ | Client reviews with ratings |
| Pricing Plans | ✅ | 3 tiers with features |
| Contact Form | ✅ | Integrated form ready |
| SEO Optimized | ✅ | Meta tags, schema markup |
| Performance | ✅ | Fast loading, smooth scrolling |

---

## 🚀 Deployment

### Option 1: GitHub Pages (Free)
1. Create repo: `username.github.io`
2. Push `index.html`
3. View at `https://username.github.io`

### Option 2: Netlify (Free + Premium)
1. Connect your Git repo
2. Deploy automatically
3. Get custom domain options

### Option 3: Vercel (Free + Premium)
1. Push to GitHub
2. Import to Vercel
3. Auto-deploys on push

### Option 4: Traditional Hosting
1. Upload `index.html` to your host
2. Access via your domain
3. Done!

---

## 📊 Performance Tips

1. **Optimize Images**: Use tools like TinyPNG
2. **Lazy Load**: Images load as user scrolls
3. **Caching**: Browser caches CSS/JS
4. **Compression**: Files are minified
5. **CDN**: Use a CDN for images

---

## 🐛 Troubleshooting

### Images not showing?
- Replace `https://via.placeholder.com/` with your image URLs
- Ensure images are in correct directory

### Navigation not highlighting?
- Check that section IDs match navigation links
- Links should be: `#home`, `#work`, `#skills`, etc.

### Form not submitting?
- Integrate with FormSubmit.co or Formspree
- Update the form action URL

### Animations not smooth?
- Check browser compatibility
- Enable hardware acceleration
- Update to latest browser version

---

## 📚 Additional Resources

- **CSS Grid Guide**: https://css-tricks.com/snippets/css/complete-guide-grid/
- **Flexbox Guide**: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- **Web Animations**: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Animations
- **Responsive Design**: https://web.dev/responsive-web-design-basics/

---

## ✅ Checklist Before Launch

- [ ] Update hero with your name/title
- [ ] Add your portfolio projects
- [ ] Update skills with your expertise
- [ ] Add real client testimonials
- [ ] Customize pricing plans
- [ ] Connect contact form
- [ ] Add social media links
- [ ] Update footer year
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Optimize images
- [ ] Deploy to hosting

---

**Version**: 1.0  
**Last Updated**: May 2026  
**Status**: Ready to Customize ✅
