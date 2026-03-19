import MaterialSection from './sections/material-section.js';
import CarsonSection from './sections/carson-section.js';

document.addEventListener('DOMContentLoaded', () => {
    const app = document.getElementById('app');

    const materialSection = new MaterialSection();
    const carsonSection = new CarsonSection();

    app.appendChild(materialSection.render());
    app.appendChild(carsonSection.render());

    materialSection.setupInteractions();
    carsonSection.setupScrollingEffects();
    carsonSection.setupCursor();
});