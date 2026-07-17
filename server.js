const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// View engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Static assets (css, js, images)
app.use(express.static(path.join(__dirname, 'public')));

// Parse form submissions
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const siteName = 'Sohaib Aluminium & Glass Works';
const projectImages = fs.readdirSync(path.join(__dirname, 'public', 'images'))
  .filter((file) => /\.(jpe?g|png|webp|avif)$/i.test(file))
  .sort()
  .map((file) => ({
    src: `/images/${file}`,
    alt: file.replace(/\.[^.]+$/, '').replace(/-/g, ' ').replace(/_/g, ' '),
  }));

app.get('/', (req, res) => {
  res.render('index', { title: `${siteName} — Islamabad`, page: 'home' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: `About Us — ${siteName}`, page: 'about' });
});

app.get('/services', (req, res) => {
  res.render('services', { title: `Services — ${siteName}`, page: 'services' });
});

app.get('/projects', (req, res) => {
  res.render('projects', {
    title: `Projects — ${siteName}`,
    page: 'projects',
    projectImages,
  });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: `Contact Us — ${siteName}`, page: 'contact' });
});

// Handle the contact form POST
app.post('/contact', (req, res) => {
  const { name, email, phone, message } = req.body;
  // TODO: send an email / save to a database here
  console.log('New enquiry:', { name, email, phone, message });
  res.render('contact', {
    title: `Contact Us — ${siteName}`,
    page: 'contact',
    sent: true,
  });
});

// 404
app.use((req, res) => {
  res.status(404).send('Page not found');
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
