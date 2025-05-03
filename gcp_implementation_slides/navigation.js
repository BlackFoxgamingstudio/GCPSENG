/**
 * Navigation script for GCP Implementation Slides
 * This script adds consistent navigation between GCP implementation slides
 */

// Setup slide navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Get current slide number from filename
  const currentPath = window.location.pathname;
  const filename = currentPath.split('/').pop();
  
  // Parse slide number from filename (slide1_architecture_value.html -> 1)
  const slideMatch = filename.match(/^slide(\d+)_/);
  
  if (slideMatch) {
    const currentSlide = parseInt(slideMatch[1], 10);
    
    // Create navigation container
    const navContainer = document.createElement('div');
    navContainer.className = 'slide-navigation';
    
    // Add navigation HTML
    let navHTML = `
      <div class="slide-nav-wrapper">
        <a href="../index.html" class="slide-nav-button home-button" title="Home">
          <i class="fas fa-home"></i>
        </a>
        <a href="index.html" class="slide-nav-button index-button" title="GCP Implementation Home">
          <i class="fas fa-th-large"></i>
        </a>
    `;
    
    // Add previous button if not first slide
    if (currentSlide > 1) {
      const prevSlide = getSlideLink(currentSlide - 1);
      navHTML += `
        <a href="${prevSlide}" class="slide-nav-button prev-button" title="Previous Slide">
          <i class="fas fa-chevron-left"></i>
        </a>
      `;
    }
    
    // Add next button if not last slide
    if (currentSlide < 7) {
      const nextSlide = getSlideLink(currentSlide + 1);
      navHTML += `
        <a href="${nextSlide}" class="slide-nav-button next-button" title="Next Slide">
          <i class="fas fa-chevron-right"></i>
        </a>
      `;
    }
    
    // Close wrapper
    navHTML += `</div>`;
    
    // Add slide indicators
    navHTML += `<div class="slide-indicators">`;
    
    for (let i = 1; i <= 7; i++) {
      navHTML += `
        <a href="${getSlideLink(i)}" class="slide-indicator ${i === currentSlide ? 'active' : ''}" title="${getSlideTitle(i)}">
          <span>${i}</span>
        </a>
      `;
    }
    
    navHTML += `</div>`;
    
    // Add to container
    navContainer.innerHTML = navHTML;
    
    // Add navigation styles
    const navStyle = document.createElement('style');
    navStyle.textContent = `
      .slide-navigation {
        position: fixed;
        bottom: 20px;
        left: 20px;
        z-index: 1000;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      
      .slide-nav-wrapper {
        display: flex;
        gap: 10px;
      }
      
      .slide-nav-button {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background: rgba(66, 133, 244, 0.9);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        transition: all 0.3s ease;
      }
      
      .slide-nav-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
      }
      
      .slide-nav-button.home-button {
        background: rgba(15, 157, 88, 0.9);
      }
      
      .slide-nav-button.index-button {
        background: rgba(161, 66, 244, 0.9);
      }
      
      .slide-indicators {
        display: flex;
        gap: 5px;
      }
      
      .slide-indicator {
        width: 25px;
        height: 25px;
        border-radius: 50%;
        background: rgba(0,0,0,0.2);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        text-decoration: none;
        font-size: 0.8rem;
        transition: all 0.3s ease;
      }
      
      .slide-indicator:hover {
        background: rgba(66, 133, 244, 0.9);
      }
      
      .slide-indicator.active {
        background: rgba(66, 133, 244, 0.9);
        font-weight: bold;
      }
    `;
    
    document.head.appendChild(navStyle);
    document.body.appendChild(navContainer);
  }
});

// Helper function to get slide link based on slide number
function getSlideLink(slideNumber) {
  const slideNames = {
    1: 'architecture_value',
    2: 'project_security',
    3: 'data_pipeline',
    4: 'game_mechanics',
    5: 'deployment',
    6: 'cost_optimization',
    7: 'conclusion'
  };
  
  return `slide${slideNumber}_${slideNames[slideNumber]}.html`;
}

// Helper function to get slide title based on slide number
function getSlideTitle(slideNumber) {
  const slideTitles = {
    1: 'Architecture & Value',
    2: 'Project Security',
    3: 'Data Pipeline',
    4: 'Game Mechanics',
    5: 'Deployment',
    6: 'Cost Optimization',
    7: 'Conclusion'
  };
  
  return slideTitles[slideNumber] || '';
} 