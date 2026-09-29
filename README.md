# ⚛️ Atomix

A chemistry toolkit for exploring elements, calculating bond types, and visualizing how atoms connect — built as a single hub with three interactive tools: an Interactive Periodic Table, an Electronegativity Calculator, and a Bond Simulator.

---

## 🔗 Demo

[View live project](https://kasa04.github.io/atomix/)

---

## 📂 Project Evolution

Development was done incrementally, growing from a single-page periodic table into a full multi-tool hub with client-side routing and a dedicated visual identity. Every phase is documented in the [commit history](../../commits/main):

1. **Landing + Periodic Table** — includes GitHub Pages routing support. The existing Interactive Periodic Table was migrated into `/periodic-table`, alongside a landing page linking to all planned tools.
2. **Electronegativity Calculator** — Users pick two elements and get their electronegativity difference, predicted bond type (ionic / polar covalent / nonpolar covalent), and a quick-theory sidebar explaining the underlying rule and its known exceptions.
3. **Ionic Bond Simulator** — Users pick two elements and see whether they form a supported 1:1 ionic bond, with an animated electron transfer between Bohr-style atom diagrams, the resulting compound formula, and its common name when available. Limited to a curated set of elements with simple, fixed valence (beta).
4. **UI redesign** — full visual redesign: light color theme, shared navbar across all pages, a collapsible "Specific Information" section on the element modal to keep the default view simple.
5. **Mobile design + Dark Mode** - Full mobile responsiveness pass across all four pages and dark mode theme enabled.

---

## 🛠️ Technologies Used

* **React** (components, hooks, client-side routing with `react-router-dom`)
* **Vite** (development environment and build)
* **JavaScript (ES6+)**
* **CSS3** (Grid + Flexbox, CSS custom properties for theming, no styling frameworks)

---

## 🤖 AI Usage

Part of the development process was done with the assistance of Claude and Gemini. The project's design, product decisions, and final review are my own.

---

## 📄 License

This project is licensed under the MIT License. See [LICENSE](./LICENSE) for details.
