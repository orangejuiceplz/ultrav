class EnhancedBlackFlashEffect {
    constructor() {
      this.particles = [];
      this.lightningPaths = [];
      this.initializeStyles();
    }
  
    initializeStyles() {
      const style = document.createElement('style');
      style.textContent = `
        .black-flash-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 1000;
        }
  
        .black-flash-core {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(
            circle at center,
            rgba(255,0,0,0.4) 0%,
            rgba(0,0,0,0.9) 40%,
            rgba(0,0,0,1) 70%
          );
          transform: translate(-50%, -50%);
          animation: blackFlashCore 0.8s cubic-bezier(0.11, 0, 0.5, 0) forwards;
          box-shadow: 
            0 0 50px rgba(255,0,0,0.3),
            0 0 100px rgba(0,0,0,0.6),
            inset 0 0 60px rgba(255,0,0,0.2);
        }
  
        .lightning-path {
          position: absolute;
          background: linear-gradient(90deg, 
            rgba(255,0,0,0.9), 
            rgba(0,0,0,0.9) 70%,
            transparent
          );
          height: 3px;
          transform-origin: left center;
          filter: drop-shadow(0 0 5px rgba(255,0,0,0.6));
          animation: lightningFade 0.3s ease-out forwards;
        }
  
        .cursed-particle {
          position: absolute;
          background: radial-gradient(
            circle at center,
            rgba(255,0,0,0.9),
            rgba(0,0,0,0.9)
          );
          border-radius: 50%;
          filter: blur(1px) drop-shadow(0 0 2px rgba(255,0,0,0.4));
        }
  
        .void-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid rgba(255,0,0,0.4);
          transform: translate(-50%, -50%);
          animation: voidRingExpand 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
          filter: drop-shadow(0 0 8px rgba(255,0,0,0.3));
        }
  
        @keyframes blackFlashCore {
          0% {
            width: 20px;
            height: 20px;
            opacity: 1;
          }
          50% {
            width: 150px;
            height: 150px;
            opacity: 1;
          }
          100% {
            width: 300px;
            height: 300px;
            opacity: 0;
          }
        }
  
        @keyframes lightningFade {
          0% {
            opacity: 1;
            transform: scale(1);
          }
          100% {
            opacity: 0;
            transform: scale(0.95);
          }
        }
  
        @keyframes voidRingExpand {
          0% {
            width: 50px;
            height: 50px;
            opacity: 0.8;
          }
          100% {
            width: 400px;
            height: 400px;
            opacity: 0;
          }
        }
  
        @keyframes screenShake {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(-5px, 5px) rotate(-1deg); }
          50% { transform: translate(5px, -5px) rotate(1deg); }
          75% { transform: translate(-3px, -3px) rotate(-0.5deg); }
        }
      `;
      document.head.appendChild(style);
    }
  
    generateLightningPath(startX, startY, angle, length, complexity = 0.3) {
      const points = [[startX, startY]];
      let currentX = startX;
      let currentY = startY;
      const segments = 12;
      const segmentLength = length / segments;
      
      for (let i = 0; i < segments; i++) {
        const deviation = (Math.random() - 0.5) * length * complexity;
        currentX += Math.cos(angle) * segmentLength;
        currentY += Math.sin(angle) * segmentLength;
        points.push([currentX + deviation, currentY + deviation]);
  
        // Create branching lightning
        if (Math.random() < 0.3 && complexity > 0.1) {
          const branchAngle = angle + (Math.random() - 0.5) * Math.PI / 2;
          const branchPoints = this.generateLightningPath(
            currentX,
            currentY,
            branchAngle,
            length * 0.5,
            complexity * 0.5
          );
          points.push(...branchPoints);
        }
      }
      return points;
    }
  
    createLightningEffect(x, y) {
      const container = document.createElement('div');
      container.className = 'black-flash-container';
  
      // Create multiple lightning bolts
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2;
        const points = this.generateLightningPath(x, y, angle, 200);
        
        points.forEach((point, index) => {
          if (index < points.length - 1) {
            const [x1, y1] = point;
            const [x2, y2] = points[index + 1];
            
            const lightning = document.createElement('div');
            lightning.className = 'lightning-path';
            
            const length = Math.hypot(x2 - x1, y2 - y1);
            const angle = Math.atan2(y2 - y1, x2 - x1);
            
            lightning.style.cssText = `
              left: ${x1}px;
              top: ${y1}px;
              width: ${length}px;
              transform: rotate(${angle}rad);
              opacity: ${0.9 - index * 0.1};
              animation-delay: ${Math.random() * 0.2}s;
            `;
            
            container.appendChild(lightning);
            this.lightningPaths.push(lightning);
          }
        });
      }
  
      return container;
    }
  
    createCursedParticles(x, y, count = 40) {
      const particles = [];
      for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.className = 'cursed-particle';
        
        const size = 2 + Math.random() * 4;
        const angle = Math.random() * Math.PI * 2;
        const distance = 50 + Math.random() * 200;
        const duration = 0.5 + Math.random() * 0.5;
        
        particle.style.cssText = `
          width: ${size}px;
          height: ${size}px;
          left: ${x}px;
          top: ${y}px;
          transition: all ${duration}s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        `;
        
        requestAnimationFrame(() => {
          particle.style.transform = `
            translate(
              ${distance * Math.cos(angle)}px,
              ${distance * Math.sin(angle)}px
            )
          `;
          particle.style.opacity = '0';
        });
        
        particles.push(particle);
      }
      return particles;
    }
  
    trigger(x, y) {
      // Create main container
      const container = document.createElement('div');
      container.className = 'black-flash-container';
      
      // Add core flash effect
      const core = document.createElement('div');
      core.className = 'black-flash-core';
      core.style.left = `${x}px`;
      core.style.top = `${y}px`;
      container.appendChild(core);
      
      // Add void rings
      for (let i = 0; i < 3; i++) {
        const ring = document.createElement('div');
        ring.className = 'void-ring';
        ring.style.left = `${x}px`;
        ring.style.top = `${y}px`;
        ring.style.animationDelay = `${i * 0.2}s`;
        container.appendChild(ring);
      }
      
      // Add lightning effects
      const lightningContainer = this.createLightningEffect(x, y);
      container.appendChild(lightningContainer);
      
      // Add cursed particles
      const particles = this.createCursedParticles(x, y);
      particles.forEach(particle => container.appendChild(particle));
      
      // Add to document
      document.body.appendChild(container);
      
      // Screen shake effect
      document.body.style.animation = 'none';
      requestAnimationFrame(() => {
        document.body.style.animation = 'screenShake 0.5s cubic-bezier(0.36, 0.07, 0.19, 0.97)';
      });
      
      // Cleanup
      setTimeout(() => {
        container.remove();
        this.lightningPaths = [];
      }, 1500);
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    const blackFlash = new EnhancedBlackFlashEffect();
    document.addEventListener('click', (e) => {
      blackFlash.trigger(e.clientX, e.clientY);
    });
  });