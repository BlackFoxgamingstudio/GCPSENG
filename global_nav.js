/**
 * Black Armor AI Global Navigation
 * This script adds consistent navigation controls to all pages
 */

// Map of page relationships for navigation
const pageMap = {
  // Neo Slides
  'neo_slide_1.html': { prev: 'index.html', next: 'neo_slide_2.html' },
  'neo_slide_2.html': { prev: 'neo_slide_1.html', next: 'neo_slide_3.html' },
  'neo_slide_3.html': { prev: 'neo_slide_2.html', next: 'neo_slide_4.html' },
  'neo_slide_4.html': { prev: 'neo_slide_3.html', next: 'neo_slide_5.html' },
  'neo_slide_5.html': { prev: 'neo_slide_4.html', next: 'neo_slide_6.html' },
  'neo_slide_6.html': { prev: 'neo_slide_5.html', next: 'neo_slide_7.html' },
  'neo_slide_7.html': { prev: 'neo_slide_6.html', next: 'neo_slide_8_bant.html' },
  'neo_slide_8_bant.html': { prev: 'neo_slide_7.html', next: 'neo_slide_8_bmc.html' },
  'neo_slide_8_bmc.html': { prev: 'neo_slide_8_bant.html', next: 'neo_slide_8_journey.html' },
  'neo_slide_8_journey.html': { prev: 'neo_slide_8_bmc.html', next: 'neo_slide_8_journey_presentation.html' },
  'neo_slide_8_journey_presentation.html': { prev: 'neo_slide_8_journey.html', next: 'neo_slide_9_bmc.html' },
  'neo_slide_9_bmc.html': { prev: 'neo_slide_8_journey_presentation.html', next: 'neo_slide_integrated_1.html' },
  
  // Integrated Slides
  'neo_slide_integrated_1.html': { prev: 'index.html', next: 'neo_slide_integrated_2.html' },
  'neo_slide_integrated_2.html': { prev: 'neo_slide_integrated_1.html', next: 'neo_slide_integrated_3.html' },
  'neo_slide_integrated_3.html': { prev: 'neo_slide_integrated_2.html', next: 'neo_slide_integrated_4.html' },
  'neo_slide_integrated_4.html': { prev: 'neo_slide_integrated_3.html', next: 'neo_slide_integrated_5.html' },
  'neo_slide_integrated_5.html': { prev: 'neo_slide_integrated_4.html', next: 'neo_slide_integrated_6.html' },
  'neo_slide_integrated_6.html': { prev: 'neo_slide_integrated_5.html', next: 'neo_slide_integrated_7.html' },
  'neo_slide_integrated_7.html': { prev: 'neo_slide_integrated_6.html', next: 'neo_slide_integrated_8.html' },
  'neo_slide_integrated_8.html': { prev: 'neo_slide_integrated_7.html', next: 'neo_slide_integrated_9.html' },
  'neo_slide_integrated_9.html': { prev: 'neo_slide_integrated_8.html', next: 'index.html' },
  
  // Tools & Templates
  'value_metrics_handbook.html': { prev: 'index.html', next: 'tco_calculator.html' },
  'tco_calculator.html': { prev: 'value_metrics_handbook.html', next: 'implementation_guide.html' },
  'implementation_guide.html': { prev: 'tco_calculator.html', next: 'migration_journey_map.html' },
  'migration_journey_map.html': { prev: 'implementation_guide.html', next: 'index.html' },
  
  // Assessments
  'customer_discovery_questionnaire.html': { prev: 'index.html', next: 'onboarding_progress_tracker.html' },
  'onboarding_progress_tracker.html': { prev: 'customer_discovery_questionnaire.html', next: 'qualification_workbook.html' },
  'qualification_workbook.html': { prev: 'onboarding_progress_tracker.html', next: 'assessment_template.html' },
  'assessment_template.html': { prev: 'qualification_workbook.html', next: 'index.html' }
};

// Function to create and add navigation controls
function addGlobalNavigation() {
  // Check if navigation already exists
  if (document.querySelector('.global-nav-buttons')) {
    return;
  }
  
  // Create navigation HTML
  const navHTML = `
    <div class="global-nav-buttons">
      <button class="global-nav-button home-button" title="Home">
        <i class="fas fa-home"></i>
      </button>
      <button class="global-nav-button previous-button" title="Previous">
        <i class="fas fa-arrow-left"></i>
      </button>
      <button class="global-nav-button next-button" title="Next">
        <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  `;
  
  // Create navigation style
  const navStyle = document.createElement('style');
  navStyle.textContent = `
    .global-nav-buttons {
      position: fixed;
      bottom: 20px;
      display: flex;
      gap: 10px;
      z-index: 9997;
    }
    
    .global-nav-button {
      background-color: #4285F4;
      color: white;
      border: none;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2rem;
      cursor: pointer;
      box-shadow: 0 3px 6px rgba(0,0,0,0.2);
      transition: all 0.2s ease;
    }
    
    .global-nav-button:hover {
      transform: translateY(-3px);
      box-shadow: 0 6px 10px rgba(0,0,0,0.3);
    }
    
    .global-nav-button:active {
      transform: translateY(-1px);
      box-shadow: 0 3px 6px rgba(0,0,0,0.2);
    }
    
    .global-nav-button.home-button {
      background-color: #0F9D58;
    }
    
    .global-nav-button.previous-button {
      background-color: #F4B400;
    }
  `;
  
  // Add style to head
  document.head.appendChild(navStyle);
  
  // Create container and add to body
  const navContainer = document.createElement('div');
  navContainer.innerHTML = navHTML;
  document.body.appendChild(navContainer);
  
  // Get current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Add event listeners
  const homeButton = document.querySelector('.global-nav-button.home-button');
  const prevButton = document.querySelector('.global-nav-button.previous-button');
  const nextButton = document.querySelector('.global-nav-button.next-button');
  
  homeButton.addEventListener('click', () => {
    window.location.href = 'index.html';
  });
  
  if (pageMap[currentPage]) {
    prevButton.addEventListener('click', () => {
      window.location.href = pageMap[currentPage].prev;
    });
    
    nextButton.addEventListener('click', () => {
      window.location.href = pageMap[currentPage].next;
    });
  } else {
    // If page not in map, disable navigation buttons
    prevButton.disabled = true;
    prevButton.style.opacity = 0.5;
    prevButton.style.cursor = 'not-allowed';
    
    nextButton.disabled = true;
    nextButton.style.opacity = 0.5;
    nextButton.style.cursor = 'not-allowed';
  }
}

// Add Font Awesome if not already present
function addFontAwesome() {
  if (!document.querySelector('link[href*="font-awesome"]')) {
    const fontAwesome = document.createElement('link');
    fontAwesome.rel = 'stylesheet';
    fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css';
    document.head.appendChild(fontAwesome);
  }
}

// Initialize global navigation
document.addEventListener('DOMContentLoaded', function() {
  addFontAwesome();
  addGlobalNavigation();
}); 