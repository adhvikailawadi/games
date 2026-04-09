# games
A simple static website starter for games.

## Run locally
1. Open `index.html` in your browser.
2. Or run a local web server from the repo root:

```bash
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy on GitHub Pages
1. Push this repository to GitHub.
2. In your repository settings, enable GitHub Pages from the `main` branch and root folder.
3. Your site will be available at `https://<your-username>.github.io/<repo-name>/`.

## Use a custom URL
If you want a custom domain like `www.example.com`:
1. Choose the domain you want to use.
2. Create a `CNAME` file in this repo containing only your domain name.
3. Configure your domain DNS to point to GitHub Pages.
4. In GitHub Pages settings, set the custom domain to your chosen URL.

If you tell me the exact URL, I can add the `CNAME` file for you.
