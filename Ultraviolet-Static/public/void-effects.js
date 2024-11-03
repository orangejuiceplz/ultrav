class InfiniteVoidEffect {
  constructor() {
    this.initializeVoid();
    this.bindEvents();
    this.createVoidElements();
    this.startAnimation();
  }

  initializeVoid() {
    this.container = document.querySelector('.infinite-void-container');
    this.voidCenter = document.querySelector('.central-void');
    this.cursedEnergyLayer = document.createElement('div');
    this.cursedEnergyLayer.className = 'cursed-energy-layer';
    this.container.appendChild(this.cursedEnergyLayer);
  }

  createVoidElements() {
    // Create infinite void circles
    for (let i = 0; i < 5; i++) {
      const voidCircle = document.createElement('div');
      voidCircle.className = 'void-circle';
      voidCircle.style.cssText = `
        position: absolute;
        border-radius: 50%;
        border: 2px solid rgba(255,0,0,${0.1 + i * 0.05});
        width: ${300 + i * 100}px;
        height: ${300 + i * 100}px;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        animation: voidPulse ${6 + i}s ease-in-out infinite;
        filter: blur(${1 + i}px);
      `;
      this.container.appendChild(voidCircle);
    }

    // Create cursed energy particles
    for (let i = 0; i < 100; i++) {
      const particle = document.createElement('div');
      particle.className = 'cursed-energy-particle';
      particle.style.cssText = `
        position: absolute;
        width: ${2 + Math.random() * 2}px;
        height: ${2 + Math.random() * 2}px;
        background: radial-gradient(circle at center,
          rgba(255,0,0,${0.3 + Math.random() * 0.4}),
          rgba(0,0,0,0.8)
        );
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        filter: blur(1px);
        animation: particleFloat ${3 + Math.random() * 4}s ease-in-out infinite;
      `;
      this.cursedEnergyLayer.appendChild(particle);
    }

    // Create reality distortion effect
    const distortion = document.createElement('div');
    distortion.className = 'reality-distortion';
    distortion.style.cssText = `
      position: absolute;
      width: 200%;
      height: 200%;
      top: -50%;
      left: -50%;
      background: repeating-conic-gradient(
        from 0deg,
        rgba(0,0,0,0.9) 0deg,
        rgba(255,0,0,0.1) 1deg,
        rgba(0,0,0,0.9) 2deg
      );
      animation: distortionSpin 30s linear infinite;
      opacity: 0.5;
    `;
    this.container.appendChild(distortion);
  }

  startAnimation() {
    requestAnimationFrame(() => this.animate());
  }

  animate() {
    const particles = this.cursedEnergyLayer.querySelectorAll('.cursed-energy-particle');
    particles.forEach(particle => {
      const x = parseFloat(particle.style.left);
      const y = parseFloat(particle.style.top);
      
      particle.style.left = `${x + (Math.random() - 0.5) * 0.5}%`;
      particle.style.top = `${y + (Math.random() - 0.5) * 0.5}%`;
      
      if (x < 0) particle.style.left = '100%';
      if (x > 100) particle.style.left = '0%';
      if (y < 0) particle.style.top = '100%';
      if (y > 100) particle.style.top = '0%';
    });
    
    requestAnimationFrame(() => this.animate());
  }

  handleMouseMove(e) {
    const rect = this.container.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    const centerX = x - 0.5;
    const centerY = y - 0.5;
    const distance = Math.sqrt(centerX * centerX + centerY * centerY);
    const maxOffset = 50;
    
    // Apply transform to void center with parallax effect
    this.voidCenter.style.transform = `
      translate(
        calc(-50% + ${centerX * maxOffset}px),
        calc(-50% + ${centerY * maxOffset}px)
      )
      scale(${1 + distance * 0.3})
    `;
    
    // Move cursed energy particles
    const particles = this.cursedEnergyLayer.querySelectorAll('.cursed-energy-particle');
    particles.forEach((particle, index) => {
      const speed = 0.5 + (index % 3) * 0.2;
      particle.style.transform = `
        translate(
          ${-centerX * maxOffset * speed}px,
          ${-centerY * maxOffset * speed}px
        )
      `;
    });
  }

  bindEvents() {
    document.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new InfiniteVoidEffect();
});