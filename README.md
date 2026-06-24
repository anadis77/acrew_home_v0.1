# A·CREW Homepage

A·CREW 홈페이지와 7월 강의 상세 페이지입니다. 정적 HTML로 구성되어 있으며, 문의폼은 Google Apps Script 웹앱을 통해 Google Sheets와 이메일 알림으로 연결됩니다.

## Pages

- `index.html` - Korean homepage
- `index-en.html` - English homepage
- `class-detail.html` - Korean class detail page
- `class-detail-en.html` - English class detail page

## Assets

- `athena-hero.png` - Hero section illustration
- `kai-profile.png` - Kai profile image
- `remo-profile.png` - Remo profile image
- `athena-profile.png` - Athena profile image

## Contact Form Setup

The real contact endpoint is intentionally kept out of Git.

1. Copy the example config file.

```bash
cp config.example.js config.js
```

2. Open `config.js` and replace the placeholder with your Google Apps Script web app URL.

```js
window.ACREW_CONTACT_ENDPOINT = 'YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL';
```

3. Open `index.html` locally or deploy it to a static host.

## Google Apps Script Setup

1. Create or open the inquiry Google Spreadsheet.
2. Open `Extensions > Apps Script`.
3. Copy `Code.gs.example` into Apps Script.
4. Replace:

```js
var INTERNAL_EMAIL = 'your-email@example.com';
var SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID';
```

5. Deploy as a web app.

Recommended deployment settings:

- Execute as: `Me`
- Who has access: `Anyone`

6. Copy the web app URL into `config.js`.

## Vercel Deployment

Vercel is the recommended deployment option when the GitHub repository is public.

1. Push this repository to GitHub.
2. Import the GitHub repository from Vercel.
3. Add this environment variable in Vercel.

```text
ACREW_CONTACT_ENDPOINT=https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec
```

4. Deploy.

During the Vercel build, `scripts/create-config.js` creates `config.js` from the environment variable. The real endpoint stays out of Git.

Important: because this is a browser-based contact form, the deployed `config.js` can still be viewed in the browser. The environment variable mainly keeps the endpoint out of the GitHub source history and makes it easier to change per deployment.

## Google Sheets Access

The inquiry spreadsheet does not need to be public.

Recommended sharing:

- Keep the Google Spreadsheet private.
- Share it only with approved A·CREW members.
- Deploy Apps Script with:
  - Execute as: `Me`
  - Who has access: `Anyone`

Visitors submit the website form to Apps Script. They do not need direct access to the spreadsheet.

## GitHub Pages

This site can be hosted with GitHub Pages because it is static HTML.

If you publish this repo publicly, do not commit `config.js` or the real Apps Script file. The repository includes `.gitignore` rules for those files.

For GitHub Pages, you must either commit a real `config.js` or use another deployment process to generate it. Vercel is simpler for keeping `config.js` out of Git.
