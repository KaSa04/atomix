# ⚛️ Atomix

A chemistry toolkit for exploring elements, calculating bond types, and visualizing how atoms connect — built as a single hub with three interactive tools: an Interactive Periodic Table, an Electronegativity Calculator, and a Bond Simulator.


## Demo

[View live project](https://kasa04.github.io/atomix/)

<img width="1815" height="950" alt="image" src="https://github.com/user-attachments/assets/f26c1885-fc3d-41bf-bf40-d3342be3a2c7" />
<img width="1839" height="946" alt="image" src="https://github.com/user-attachments/assets/0911a068-5430-48e2-96d2-cecc79e858e8" />

## The Tools

| Tool | What it does |
|---|---|
|  **Interactive Periodic Table** | Explore every element with an image and description, plus detailed data in a collapsible "Specific Information" section |
|  **Electronegativity Calculator** | Pick two elements and get their electronegativity difference and predicted bond type (ionic / polar covalent / nonpolar covalent), with a quick-theory sidebar |
|  **Bond Simulator** *(beta)* | Pick two elements and watch the electron transfer between Bohr-style atom diagrams, with the resulting compound formula and common name |


## Getting Started

**Requirements:** [Node.js](https://nodejs.org/) 18 or higher.

```bash
# 1. Clone the repository
git clone https://github.com/kasa04/atomix.git
cd atomix

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Open the local address shown in the terminal (usually `http://localhost:5173`).

To create a production build:

```bash
npm run build
```

**How to use it**
1. From the landing page, choose a tool.
2. **Periodic Table:** click any element to open its card; expand *Specific Information* for detailed data.
3. **Calculator:** select two elements to see their electronegativity difference and bond type.
4. **Simulator:** select two elements on one side and watch the bond form on the other.


## Project Evolution

Development was done incrementally, growing from a single-page periodic table into a full multi-tool hub with client-side routing and a dedicated visual identity. Every phase is documented in the [commit history](../../commits/main):

1. **Landing + Periodic Table** — includes GitHub Pages routing support. The existing Interactive Periodic Table was migrated into `/periodic-table`, alongside a landing page linking to all planned tools.
2. **Electronegativity Calculator** — Users pick two elements and get their electronegativity difference, predicted bond type (ionic / polar covalent / nonpolar covalent), and a quick-theory sidebar explaining the underlying rule and its known exceptions.
3. **Ionic Bond Simulator** — Users pick two elements and see whether they form a supported 1:1 ionic bond, with an animated electron transfer between Bohr-style atom diagrams, the resulting compound formula, and its common name when available. Limited to a curated set of elements with simple, fixed valence (beta).
4. **UI redesign** — full visual redesign: light color theme, shared navbar across all pages, a collapsible "Specific Information" section on the element modal to keep the default view simple.
5. **Mobile design + Dark Mode** — Full mobile responsiveness pass across all four pages and dark mode theme enabled.


## Technologies Used

* **React** (components, hooks, client-side routing with `react-router-dom`)
* **Vite** (development environment and build)
* **JavaScript (ES6+)**
* **CSS3** (Grid + Flexbox, CSS custom properties for theming, no styling frameworks)


## Deployment and Version Control

The repository uses a workflow based on two main branches:
* **`main`**: Contains the application's source code, React components, Vite configuration, and development logic.
* **`gh-pages`**: Contains only the compiled (`build`) files optimized for production, which GitHub Pages uses to automatically serve the application live.


## AI Usage

Part of the development process was done with the assistance of Claude and Gemini. The project's design, product decisions, and final review are my own.


## License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.


## Author

**Sara** — [GitHub](https://github.com/kasa04) · [LinkedIn](https://www.linkedin.com/in/karla-cantu-67075542a)
