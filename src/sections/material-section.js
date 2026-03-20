class MaterialSection {
    constructor() {
        this.container = document.createElement('div');
        this.container.className = 'material-section';
    }

    renderBio() {
        const bio = document.createElement('div');
        bio.className = 'bio';
        bio.innerHTML = `
            <h2>Matias Duarte</h2>
            <p>Matias Duarte is a renowned designer known for his work on Material Design, emphasizing clean, modern aesthetics and user-friendly interfaces.</p>
        `;
        this.container.appendChild(bio);
    }

    renderPrinciples() {
        const principles = document.createElement('div');
        principles.className = 'principles';
        principles.innerHTML = `
            <h3>Material Design Principles</h3>
            <ul>
                <li>Material is the metaphor</li>
                <li>Bold, graphic, intentional</li>
                <li>Motion provides meaning</li>
            </ul>
        `;
        this.container.appendChild(principles);
    }

    setupInteractions() {
        // Example of setting up a ripple effect
        const button = document.createElement('button');
        button.className = 'fab';
        button.innerText = 'Click Me';
        button.addEventListener('click', this.createRipple);
        this.container.appendChild(button);
    }

    createRipple(event) {
        const ripple = document.createElement('span');
        ripple.className = 'ripple';
        this.appendChild(ripple);
        
        const rect = this.getBoundingClientRect();
        ripple.style.left = `${event.clientX - rect.left}px`;
        ripple.style.top = `${event.clientY - rect.top}px`;
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    }

    render() {
        this.renderBio();
        this.renderPrinciples();
        this.setupInteractions();
        return this.container;
    }
}

export default MaterialSection;