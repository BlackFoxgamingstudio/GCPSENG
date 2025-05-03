/**
 * Black Armor AI Main Navigation Bar
 * This script adds the main navigation bar to all pages
 */

// Function to create and insert the navbar
function createNavbar() {
  // Check for existing navbar - more thorough check
  // This will help with index.html that might have its own header navigation
  if (document.querySelector('.main-navbar') || 
      (document.querySelector('.header-container') && 
       document.querySelector('.nav-links') && 
       document.location.pathname.endsWith('index.html'))) {
    // Remove any dynamically added navbar if we're on index.html that has its own navigation
    if (document.location.pathname.endsWith('index.html')) {
      const existingDynamicNavbar = document.querySelector('.main-navbar');
      if (existingDynamicNavbar) {
        existingDynamicNavbar.remove();
      }
      return;
    }
    return;
  }

  // Get path prefix based on current directory
  const pathPrefix = getPathPrefix();
  
  // Create the navbar HTML
  const navbarHTML = `
    <nav class="main-navbar">
      <a href="${pathPrefix}index.html" class="navbar-brand">
        <i class="fas fa-shield-alt"></i>
        <span class="navbar-brand-text">Black Armor AI</span>
      </a>
      
      <div class="navbar-links">
        <a href="${pathPrefix}solution_journey/01_Solution_Overview.html" class="navbar-link" data-section="solution-journey">Solution Journey</a>
        <a href="${pathPrefix}client_presentations/Executive_Briefing.html" class="navbar-link" data-section="client-presentations">Client Presentations</a>
        <a href="${pathPrefix}gcp_implementation_slides/index.html" class="navbar-link" data-section="gcp-implementation">GCP Implementation</a>
        <a href="${pathPrefix}resources_tools/Value_Calculator.html" class="navbar-link" data-section="resources-tools">Resources & Tools</a>
        <a href="${pathPrefix}discovery_assets/Security_Assessment_Questionnaire.html" class="navbar-link" data-section="discovery-assets">Discovery Assets</a>
      </div>
    </nav>
  `;

  // Create container and add to the beginning of the body
  const navbarContainer = document.createElement('div');
  navbarContainer.innerHTML = navbarHTML;
  
  // Insert at the top of the body
  document.body.insertBefore(navbarContainer.firstElementChild, document.body.firstChild);
  
  // Update body padding to account for navbar
  adjustBodyPadding();
  
  // Handle active state
  setActiveNavLink();
}

// Function to get the path prefix based on current directory
function getPathPrefix() {
  const path = window.location.pathname;
  
  // If in root directory
  if (path.endsWith('index.html') || 
      !path.includes('solution_journey') && 
      !path.includes('client_presentations') && 
      !path.includes('resources_tools') && 
      !path.includes('discovery_assets') &&
      !path.includes('gcp_implementation_slides')) {
    return '';
  }
  
  // If in a subdirectory
  return '../';
}

// Function to determine and set the active navigation link
function setActiveNavLink() {
  const path = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-link');
  
  // Remove active class from all links
  navLinks.forEach(link => {
    link.classList.remove('active');
  });
  
  // Set active based on current page patterns
  if (path.endsWith('index.html')) {
    // No active link on homepage
    return;
  } else if (path.includes('solution_journey')) {
    const journeyLink = document.querySelector('.navbar-link[data-section="solution-journey"]');
    if (journeyLink) journeyLink.classList.add('active');
  } else if (path.includes('client_presentations')) {
    const presentationsLink = document.querySelector('.navbar-link[data-section="client-presentations"]');
    if (presentationsLink) presentationsLink.classList.add('active');
  } else if (path.includes('resources_tools')) {
    const resourcesLink = document.querySelector('.navbar-link[data-section="resources-tools"]');
    if (resourcesLink) resourcesLink.classList.add('active');
  } else if (path.includes('discovery_assets')) {
    const discoveryLink = document.querySelector('.navbar-link[data-section="discovery-assets"]');
    if (discoveryLink) discoveryLink.classList.add('active');
  } else if (path.includes('gcp_implementation_slides')) {
    const gcpImplementationLink = document.querySelector('.navbar-link[data-section="gcp-implementation"]');
    if (gcpImplementationLink) gcpImplementationLink.classList.add('active');
  }
}

// Adjust body padding to account for navbar height
function adjustBodyPadding() {
  // Wait for navbar to render
  setTimeout(() => {
    const navbar = document.querySelector('.main-navbar');
    if (navbar) {
      const navbarHeight = navbar.offsetHeight;
      
      // Don't adjust padding on index.html
      if (!document.location.pathname.endsWith('index.html')) {
        document.body.style.paddingTop = navbarHeight + 'px';
      }
    }
  }, 100);
}

// Function to add the navbar CSS
function addNavbarCSS() {
  const pathPrefix = getPathPrefix();
  
  if (!document.querySelector('link[href*="navbar.css"]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `${pathPrefix}navbar.css`;
    document.head.appendChild(link);
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

// Add bottom-left navigation buttons
function addNavButtons() {
  // Get the current page path
  const currentPath = window.location.pathname;
  const pathParts = currentPath.split('/');
  
  // Determine if we're in a subdirectory
  const isSubdir = pathParts.length > 2 && pathParts[pathParts.length - 2] !== '';
  const currentDir = isSubdir ? pathParts[pathParts.length - 2] : '';
  const currentFile = pathParts[pathParts.length - 1];
  
  // Skip if we're on the index page
  if (currentFile === '' || currentFile === 'index.html') {
    return;
  }
  
  // Create the nav buttons container
  const navButtons = document.createElement('div');
  navButtons.className = 'nav-buttons';
  
  // Determine paths for navigation
  let homePath = isSubdir ? '../index.html' : 'index.html';
  
  // Add home button
  const homeButton = document.createElement('a');
  homeButton.href = homePath;
  homeButton.className = 'home';
  homeButton.innerHTML = '<i class="fas fa-home"></i>';
  homeButton.title = 'Home';
  navButtons.appendChild(homeButton);
  
  // Handle navigation based on directory
  if (currentDir === 'solution_journey') {
    addSolutionJourneyNavigation(navButtons, currentFile);
  } else if (currentDir === 'client_presentations') {
    addClientPresentationsNavigation(navButtons, currentFile);
  } else if (currentDir === 'resources_tools') {
    addResourcesToolsNavigation(navButtons, currentFile);
  } else if (currentDir === 'discovery_assets') {
    addDiscoveryAssetsNavigation(navButtons, currentFile);
  } else if (currentDir === 'gcp_implementation_slides') {
    addGCPImplementationNavigation(navButtons, currentFile);
  }
  
  // Append the nav buttons to the body
  document.body.appendChild(navButtons);
}

// Navigation for Solution Journey pages
function addSolutionJourneyNavigation(navButtons, currentFile) {
  // Extract the page number from the file name (e.g., 01_Solution_Overview.html -> 1)
  const match = currentFile.match(/^(\d+)_/);
  if (match) {
    const currentNum = parseInt(match[1], 10);
    
    if (currentNum > 1) {
      // Add previous button
      const prevNum = currentNum - 1;
      const prevNumStr = prevNum.toString().padStart(2, '0');
      const prevButton = document.createElement('a');
      prevButton.href = `./${prevNumStr}_${getSolutionJourneyPageName(prevNum)}.html`;
      prevButton.className = 'prev';
      prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
      prevButton.title = 'Previous';
      navButtons.appendChild(prevButton);
    }
    
    if (currentNum < 12) { // Assuming we have 12 pages in solution_journey
      // Add next button
      const nextNum = currentNum + 1;
      const nextNumStr = nextNum.toString().padStart(2, '0');
      const nextButton = document.createElement('a');
      nextButton.href = `./${nextNumStr}_${getSolutionJourneyPageName(nextNum)}.html`;
      nextButton.className = 'next';
      nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
      nextButton.title = 'Next';
      navButtons.appendChild(nextButton);
    }
  }
}

// Navigation for Client Presentations
function addClientPresentationsNavigation(navButtons, currentFile) {
  const pageNames = [
    'Executive_Briefing',
    'Solution_Architecture',
    'Technical_Deep_Dive',
    'Security_Assessment',
    'Implementation_Roadmap',
    'Financial_Impact',
    'Operational_Integration',
    'BANT_Framework',
    'Next_Steps'
  ];
  
  // Find current page index
  const currentName = currentFile.replace('.html', '');
  const currentIndex = pageNames.indexOf(currentName);
  
  if (currentIndex > 0) {
    // Add previous button
    const prevButton = document.createElement('a');
    prevButton.href = `./${pageNames[currentIndex - 1]}.html`;
    prevButton.className = 'prev';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.title = 'Previous';
    navButtons.appendChild(prevButton);
  }
  
  if (currentIndex < pageNames.length - 1 && currentIndex !== -1) {
    // Add next button
    const nextButton = document.createElement('a');
    nextButton.href = `./${pageNames[currentIndex + 1]}.html`;
    nextButton.className = 'next';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.title = 'Next';
    navButtons.appendChild(nextButton);
  }
}

// Navigation for Resources and Tools
function addResourcesToolsNavigation(navButtons, currentFile) {
  const pageNames = [
    'Implementation_Guide',
    'TCO_Calculator',
    'Value_Calculator',
    'Migration_Planner'
  ];
  
  // Find current page index
  const currentName = currentFile.replace('.html', '');
  const currentIndex = pageNames.indexOf(currentName);
  
  if (currentIndex > 0) {
    // Add previous button
    const prevButton = document.createElement('a');
    prevButton.href = `./${pageNames[currentIndex - 1]}.html`;
    prevButton.className = 'prev';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.title = 'Previous';
    navButtons.appendChild(prevButton);
  }
  
  if (currentIndex < pageNames.length - 1 && currentIndex !== -1) {
    // Add next button
    const nextButton = document.createElement('a');
    nextButton.href = `./${pageNames[currentIndex + 1]}.html`;
    nextButton.className = 'next';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.title = 'Next';
    navButtons.appendChild(nextButton);
  }
}

// Navigation for Discovery Assets
function addDiscoveryAssetsNavigation(navButtons, currentFile) {
  const pageNames = [
    'Security_Assessment_Questionnaire',
    'Deployment_Readiness_Checklist',
    'Stakeholder_Analysis_Template',
    'Success_Metrics_Framework'
  ];
  
  // Find current page index
  const currentName = currentFile.replace('.html', '');
  const currentIndex = pageNames.indexOf(currentName);
  
  if (currentIndex > 0) {
    // Add previous button
    const prevButton = document.createElement('a');
    prevButton.href = `./${pageNames[currentIndex - 1]}.html`;
    prevButton.className = 'prev';
    prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
    prevButton.title = 'Previous';
    navButtons.appendChild(prevButton);
  }
  
  if (currentIndex < pageNames.length - 1 && currentIndex !== -1) {
    // Add next button
    const nextButton = document.createElement('a');
    nextButton.href = `./${pageNames[currentIndex + 1]}.html`;
    nextButton.className = 'next';
    nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
    nextButton.title = 'Next';
    navButtons.appendChild(nextButton);
  }
}

// Helper function to get page name by number for solution journey
function getSolutionJourneyPageName(num) {
  const pageNames = {
    1: 'Solution_Overview',
    2: 'Security_Challenges',
    3: 'Target_Customers',
    4: 'Technical_Architecture',
    5: 'ROI_Analysis',
    6: 'Implementation_Process',
    7: 'Next_Steps',
    8: 'BANT_Assessment',
    9: 'Business_Model_Canvas',
    10: 'Customer_Journey',
    11: 'Journey_Presentation',
    12: 'Business_Model_Framework'
  };
  
  return pageNames[num] || '';
}

// Add the GCP Implementation navigation to the navigation function
function addGCPImplementationNavigation(navButtons, currentFile) {
  // Extract the slide number from the file name (e.g., slide1_architecture_value.html -> 1)
  const match = currentFile.match(/^slide(\d+)_/);
  if (match) {
    const currentNum = parseInt(match[1], 10);
    
    if (currentNum > 1) {
      // Add previous button
      const prevNum = currentNum - 1;
      const prevButton = document.createElement('a');
      prevButton.href = `./slide${prevNum}_${getGCPSlidePageName(prevNum)}.html`;
      prevButton.className = 'prev';
      prevButton.innerHTML = '<i class="fas fa-chevron-left"></i>';
      prevButton.title = 'Previous';
      navButtons.appendChild(prevButton);
    }
    
    if (currentNum < 7) { // We have 7 GCP implementation slides
      // Add next button
      const nextNum = currentNum + 1;
      const nextButton = document.createElement('a');
      nextButton.href = `./slide${nextNum}_${getGCPSlidePageName(nextNum)}.html`;
      nextButton.className = 'next';
      nextButton.innerHTML = '<i class="fas fa-chevron-right"></i>';
      nextButton.title = 'Next';
      navButtons.appendChild(nextButton);
    }
  }
}

// Get GCP slide names based on slide number
function getGCPSlidePageName(num) {
  const slideNames = {
    1: 'architecture_value',
    2: 'project_security',
    3: 'data_pipeline',
    4: 'game_mechanics',
    5: 'deployment',
    6: 'cost_optimization',
    7: 'conclusion'
  };
  
  return slideNames[num] || '';
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
  addFontAwesome();
  addNavbarCSS();
  createNavbar();
  
  // Handle window resize
  window.addEventListener('resize', adjustBodyPadding);
  
  // Add navigation buttons
  addNavButtons();
}); 