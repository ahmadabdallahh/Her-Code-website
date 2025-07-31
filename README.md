# Her Code

Her Code is a simple multi-page website created with vanilla HTML, CSS and JavaScript. It can be used as a starting point for small organisations, clubs or personal projects.

## Preview

Open `Home/index.html` in your favourite browser or use the Live-Server extension in VS Code to get hot-reload while developing.

## Project Structure

```
Her Code Main/
├── Home/      # Landing page (index.html) and related assets
├── About/     # About-us page
├── Program/   # Our-program page
├── JoinUs/    # Join-us / sign-up page
├── Contact/   # Contact-us page
├── Image/     # Shared images / icons
└── ...        # Git & build related files (README, LICENSE, etc.)
```

Each sub-folder contains:

- an `.html` file for the markup
- a `style.css` file for page-specific styling
- a `main.js` or `script.js` file for page-specific interactions

## Getting Started

1. Clone or download the repository.
2. Open `Home/index.html` directly in the browser **or** run a small static server, e.g.:
   ```bash
   npx serve .
   ```
3. Navigate through the pages via the navigation links.

## Development

There is no build step – edit the HTML/CSS/JS files directly. Feel free to add a bundler or build pipeline if your project grows.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License – see the [LICENSE](LICENSE) file for details.
