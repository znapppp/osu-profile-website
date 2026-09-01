# Znap- osu! Setup

A static web application displaying hardware configurations and custom osu! skins for Znap-.

## Architecture

- **Structure**: Single-page HTML (`index.html`)
- **Styling**: Tailwind CSS (via CDN)
- **Logic**: Vanilla JavaScript
- **Content**: Managed through `js/config.js`

## File Structure

- `index.html`: Main document and layout.
- `js/config.js`: Configuration data (devices, skins, social links).
- `js/app.js`: Application logic and dynamic rendering.
- `picture/`: Local media assets.

## Configuration

Update `js/config.js` to modify the website content. The application will automatically parse and render the updated values upon loading.

## Development

Host the directory using a local HTTP server:

```bash
npx serve .
```

## Deployment

Deployable as a static site via GitHub Pages or any static file hosting service.