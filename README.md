# Salini J — Portfolio

A static, responsive personal portfolio built from Salini J's resume, in plain HTML/CSS/JavaScript.

## File structure

```
portfolio/
├── index.html
├── style.css
├── script.js
├── assets/
│   ├── resume.pdf      ← your actual resume, used by "View resume" / "Download resume"
│   └── favicon.svg      ← initials-based favicon (SJ)
└── README.md
```

## 1. Run it locally

No build step is required.

- **Quickest:** double-click `index.html` to open it in a browser. (The contact form still needs the setup in step 2 to actually send mail — file:// pages can also block `fetch`, see below.)
- **Recommended:** serve it with a tiny local server so paths and `fetch` behave exactly like production:
  ```bash
  cd portfolio
  python3 -m http.server 8000
  ```
  Then open `http://localhost:8000` in your browser.

## 2. Set up the contact form (Formspree)

The form is wired to submit via [Formspree](https://formspree.io), a service that forwards form
submissions from a static site straight to your inbox — no backend or SMTP password needed, and
nothing secret is exposed in the frontend JavaScript.

1. Go to [formspree.io](https://formspree.io) and create a free account using
   **salinijothiraj3@gmail.com**.
2. Click **New Form**, give it a name (e.g. "Portfolio contact form"), and copy the endpoint URL
   it gives you — it looks like `https://formspree.io/f/abcdwxyz`.
3. Open `index.html`, find this line inside the `<form id="contactForm">` element:
   ```html
   <input type="hidden" id="formEndpoint" value="https://formspree.io/f/YOUR_FORM_ENDPOINT">
   ```
4. Replace `https://formspree.io/f/YOUR_FORM_ENDPOINT` with the real endpoint from step 2, e.g.:
   ```html
   <input type="hidden" id="formEndpoint" value="https://formspree.io/f/abcdwxyz">
   ```
5. Save the file, redeploy (or refresh locally), and submit the form once yourself. Formspree
   sends a one-time confirmation email the first time — click the link inside it to activate the
   form. After that, every submission is emailed straight to your inbox.

If you'd rather use **Web3Forms** or **EmailJS** instead, the same pattern applies: get an
endpoint/access key from that service, and either drop it into `formEndpoint`, or swap the
`fetch()` call in `script.js` for that service's documented request format.

## 3. Replace or update your resume

Just overwrite `assets/resume.pdf` with a newer file **using the exact same filename**. The "View
resume" and "Download resume" buttons already point at `assets/resume.pdf`, so nothing else needs
to change.

## 4. Test the contact form

1. Fill out the form on the live or local site with a test message.
2. Click **Send message**.
3. Confirm you see "Message sent — thank you!" on the page.
4. Check the inbox for **salinijothiraj3@gmail.com** for the notification email from Formspree.
5. If you see an error message instead, re-check step 2 above — the most common cause is the
   endpoint placeholder not being replaced, or the one-time confirmation email not being clicked.

## 5. Deployment

Any static host works. Three good free options:

### GitHub Pages
1. Create a new GitHub repository and push this `portfolio/` folder's contents to it.
2. In the repo, go to **Settings → Pages**.
3. Under **Source**, choose the `main` branch and `/ (root)` folder, then save.
4. Your site will be live at `https://<your-username>.github.io/<repo-name>/` within a minute or two.

### Netlify
1. Go to [netlify.com](https://netlify.com) and sign in.
2. Drag and drop the `portfolio` folder onto the Netlify dashboard ("Deploys" tab), or connect
   your GitHub repo for automatic deploys on every push.
3. Netlify gives you a live URL immediately; you can rename it or attach a custom domain under
   **Site settings → Domain management**.

### Vercel
1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **New Project**, import your GitHub repo (or drag-and-drop the folder using the CLI:
   `npx vercel`).
3. Leave the framework preset as "Other" (no build command needed) and deploy.

**Recommendation:** for a simple static portfolio like this, **Netlify** is the easiest — drag,
drop, done, with free HTTPS and easy custom-domain setup. GitHub Pages is a close second and is
convenient if you're already hosting the code on GitHub.

After deploying, update the two placeholder URLs in `index.html`
(`https://YOUR-DOMAIN-HERE.com/`, used in the canonical link and Open Graph tags) with your real
deployed URL.

## 6. Final testing checklist

- [ ] "View resume" opens `assets/resume.pdf` in a new tab
- [ ] "Download resume" downloads `assets/resume.pdf`
- [ ] Contact form sends a real email (see step 4)
- [ ] Hamburger menu opens/closes correctly on mobile widths
- [ ] Dark/light mode toggle works and persists after a page reload
- [ ] All nav links smooth-scroll to the correct section
- [ ] LinkedIn and GitHub links open the correct profiles
- [ ] No broken links or console errors
- [ ] No horizontal scrolling at 320px, 375px, 768px, 1024px, 1440px widths
- [ ] Title, meta description, and Open Graph tags are present and accurate
- [ ] Keyboard-only navigation reaches every link/button with a visible focus ring

## 7. Future enhancements

Reasonable next steps, roughly in order of effort:

- **Project filtering** — tag projects (web / embedded / AI) and let visitors filter the grid.
- **GitHub API integration** — pull live repo stats (stars, last-updated) onto project cards.
- **Blog** — a lightweight markdown-driven blog for write-ups on projects or the patent work.
- **More case studies** — expand 1–2 flagship projects (e.g. the Runbook-Following Agent) into
  full case-study pages with architecture diagrams and screenshots.
- **Visitor analytics** — a privacy-respecting tool like Plausible or GoatCounter, to see which
  sections recruiters spend time on.
- **Testimonials** — short quotes from internship mentors or professors, once available.

Avoid adding heavier frameworks or client-side routing unless the content genuinely outgrows a
single-page static site — it will only slow the site down.
