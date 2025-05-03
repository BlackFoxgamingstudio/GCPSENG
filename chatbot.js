// Black Armor AI Chatbot System
class ChatbotSystem {
  constructor(config = {}) {
    this.config = {
      title: config.title || 'Black Armor AI Assistant',
      welcomeMessage: config.welcomeMessage || "Hello! I'm your Black Armor AI assistant. How can I help you today?",
      pageCommandsMap: config.pageCommandsMap || {},
      pageResponsesMap: config.pageResponsesMap || {},
      defaultCommands: config.defaultCommands || [],
      defaultResponses: config.defaultResponses || {}
    };
    
    this.currentPage = this._detectCurrentPage();
    this.chatHistory = [];
    this.isTyping = false;
    
    // HTML Structure
    const chatbotHTML = `
      <button class="chatbot-toggle" id="chatbotToggle">
        <i class="fas fa-comment-dots"></i>
      </button>
      
      <div class="chatbot-container" id="chatbotContainer">
        <div class="chatbot-header">
          <h3 class="chatbot-title">${this.config.title}</h3>
          <div class="chatbot-close" id="chatbotClose">&times;</div>
        </div>
        <div class="chatbot-content" id="chatbotContent">
          <!-- Messages will be inserted here -->
        </div>
        <div class="chatbot-input-area">
          <input type="text" class="chatbot-input" id="chatbotInput" placeholder="Ask me anything..." />
          <button class="chatbot-send" id="chatbotSend">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>
    `;
    
    // Insert HTML to the page
    this._insertChatbotHTML(chatbotHTML);
    
    // Elements
    this.elements = {
      toggle: document.getElementById('chatbotToggle'),
      container: document.getElementById('chatbotContainer'),
      close: document.getElementById('chatbotClose'),
      content: document.getElementById('chatbotContent'),
      input: document.getElementById('chatbotInput'),
      send: document.getElementById('chatbotSend')
    };
    
    // Initialize
    this.init();
  }
  
  _detectCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    
    console.log("Detecting page from path:", path);
    console.log("Extracted filename:", filename);
    
    // Remove file extension if it exists
    let pageName = filename.replace(/\.html?$/, '');
    console.log("Page name after removing extension:", pageName);
    
    // If empty, assume index page
    if (!pageName) {
      console.log("Empty page name, assuming index");
      return 'index';
    }
    
    // Check if it's a neo slide integrated page
    if (pageName.match(/^neo_slide_integrated_\d+$/)) {
      console.log("Detected neo slide integrated page: " + pageName);
      return pageName;
    }
    
    // For files with absolute paths that include neo_slide_integrated pattern
    if (path.includes('neo_slide_integrated')) {
      const match = path.match(/neo_slide_integrated_(\d+)/);
      if (match) {
        pageName = `neo_slide_integrated_${match[1]}`;
        console.log("Extracted neo slide integrated page from path: " + pageName);
        return pageName;
      }
    }
    
    // Check if it's any neo slide page
    if (pageName.match(/^neo_slide_\d+/)) {
      console.log("Detected neo slide page: " + pageName);
      return pageName;
    }
    
    // Special case for value metrics handbook which might appear as value-metrics-handbook
    if (pageName.includes('value') && pageName.includes('metrics')) {
      console.log("Detected value metrics handbook page");
      return 'value_metrics_handbook';
    }
    
    // Return normalized page name
    console.log("Detected page: " + pageName);
    return pageName;
  }
  
  _insertChatbotHTML(html) {
    const div = document.createElement('div');
    div.innerHTML = html;
    document.body.appendChild(div);
  }
  
  init() {
    console.log("Initializing chatbot for page:", this.currentPage);
    
    // Use custom commands from the external file if available (globally defined in chatbot_commands.js)
    if (typeof pageCommandsMap !== 'undefined') {
      this.config.pageCommandsMap = pageCommandsMap; 
    }
    
    if (typeof pageResponsesMap !== 'undefined') {
      this.config.pageResponsesMap = pageResponsesMap;
    }
    
    // Add welcome message
    this.addMessage('assistant', this.getPageSpecificWelcome());
    
    // Add commands for current page
    this.showCommandChips();
    
    // Event listeners
    this.elements.toggle.addEventListener('click', () => this.toggleChatbot());
    this.elements.close.addEventListener('click', () => this.toggleChatbot(false));
    this.elements.send.addEventListener('click', () => this.sendMessage());
    this.elements.input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.sendMessage();
    });
    
    console.log("Chatbot initialized with page commands:", 
      this.config.pageCommandsMap[this.currentPage] || this.config.defaultCommands);
  }
  
  getPageSpecificWelcome() {
    // First check if we have a default message in our map
    const pageResponses = this.config.pageResponsesMap[this.currentPage] || this.config.defaultResponses;
    if (pageResponses.default_message) {
      return pageResponses.default_message;
    }
    
    // If not, try to analyze the page content to generate a relevant welcome
    try {
      // Try to find page title or main heading
      const pageTitle = document.title || '';
      const mainHeading = document.querySelector('h1')?.textContent || 
                        document.querySelector('h2')?.textContent || '';
      
      // If we found a title or heading, use it to customize the welcome message
      if (mainHeading || pageTitle) {
        const title = mainHeading || pageTitle;
        
        // Check for specific content keywords to customize further
        if (title.toLowerCase().includes('bant') || title.toLowerCase().includes('assessment')) {
          return `Welcome to the ${title}. I can provide detailed information about how we qualify and structure drone security implementations using Budget, Authority, Need, and Timeline analysis. What aspects would you like to explore?`;
        }
        
        if (title.toLowerCase().includes('continuous') || title.toLowerCase().includes('improvement')) {
          return `Welcome to the ${title} framework. I can help you understand how we continuously evolve and optimize your security implementation for long-term success. What specific aspects interest you?`;
        }
        
        // Generic but still customized welcome
        return `Welcome to the ${title} page. I can help answer questions specific to this content and provide deeper insights about Black Armor AI drone security solutions. What would you like to know?`;
      }
    } catch (e) {
      console.log("Error analyzing page content: ", e);
    }
    
    // Default fallback
    return this.config.welcomeMessage;
  }
  
  toggleChatbot(show = null) {
    if (show === null) {
      this.elements.container.classList.toggle('open');
    } else if (show) {
      this.elements.container.classList.add('open');
    } else {
      this.elements.container.classList.remove('open');
    }
    
    if (this.elements.container.classList.contains('open')) {
      this.elements.input.focus();
    }
  }
  
  showCommandChips() {
    // Create command chips container if it doesn't exist
    let commandChipsContainer = this.elements.content.querySelector('.chatbot-command-chips');
    if (!commandChipsContainer) {
      commandChipsContainer = document.createElement('div');
      commandChipsContainer.className = 'chatbot-command-chips';
      this.elements.content.appendChild(commandChipsContainer);
    }
    
    // Clear existing chips
    commandChipsContainer.innerHTML = '';
    
    // Get commands for current page
    const pageCommands = this.config.pageCommandsMap[this.currentPage] || this.config.defaultCommands;
    
    // Add chips
    pageCommands.forEach(cmd => {
      const chip = document.createElement('div');
      chip.className = 'chatbot-command-chip';
      chip.textContent = cmd.label;
      
      // Store command as data attribute to ensure it's properly referenced
      chip.dataset.command = cmd.command;
      
      if (cmd.color) {
        // Darker text color for better visibility
        const textColor = cmd.color.replace(')', ', 0.9)').replace('rgb', 'rgba');
        chip.style.color = textColor;
        // Higher opacity for border
        chip.style.borderColor = cmd.color.replace(')', ', 0.4)').replace('rgb', 'rgba');
        // Very light background
        chip.style.backgroundColor = cmd.color.replace(')', ', 0.15)').replace('rgb', 'rgba');
        // Add outline for better contrast
        chip.style.textShadow = '0 0 1px rgba(255, 255, 255, 0.9)';
      }
      
      // Add click event directly on the chip element
      chip.addEventListener('click', (e) => {
        const commandToExecute = e.currentTarget.dataset.command;
        if (commandToExecute) {
          this.executeCommand(commandToExecute);
        }
      });
      
      commandChipsContainer.appendChild(chip);
    });
  }
  
  addMessage(role, content) {
    const messageEl = document.createElement('div');
    messageEl.className = `chatbot-message ${role}`;
    
    // Add special classes based on content for styling purposes
    if (role === 'assistant') {
      if (content.includes('implementation phases')) {
        messageEl.classList.add('implementation-phases');
      } else if (content.includes('risk management')) {
        messageEl.classList.add('risk-management');
      } else if (content.includes('success criteria')) {
        messageEl.classList.add('success-criteria');
      }
      
      try {
        // Format bold text - handle both **text** and <b>text</b> formats
        content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        
        // Format sections - add proper spacing and styling
        content = content.replace(/\n\*\*(.*?):/g, '<br><strong>$1:</strong>');
        
        // Format bullet points and numbered lists
        // Convert bullet points with proper indentation
        content = content.replace(/^• (.*?)$/gm, '<li>$1</li>');
        content = content.replace(/\n• (.*?)(?=\n|$)/gm, '\n<li>$1</li>');
        
        // Wrap bullet points in ul tags
        let containsList = content.includes('<li>');
        if (containsList) {
          // Find groups of list items and wrap them in <ul> tags
          content = content.replace(/(<li>.*?<\/li>(\s*<li>.*?<\/li>)*)/g, '<ul>$1</ul>');
        }
        
        // Convert line breaks to <br> tags for proper spacing
        content = content.replace(/\n\n/g, '<br><br>');
        content = content.replace(/\n/g, '<br>');
      } catch (e) {
        console.error("Error parsing markdown:", e);
      }
    }
    
    messageEl.innerHTML = content;
    
    this.elements.content.appendChild(messageEl);
    this.elements.content.scrollTop = this.elements.content.scrollHeight;
    
    // Add to chat history
    this.chatHistory.push({ role, content });
  }
  
  showTypingIndicator() {
    if (this.isTyping) return;
    
    this.isTyping = true;
    const typingEl = document.createElement('div');
    typingEl.className = 'chatbot-typing';
    typingEl.id = 'chatbotTyping';
    typingEl.innerHTML = `
      <div class="chatbot-typing-dot"></div>
      <div class="chatbot-typing-dot"></div>
      <div class="chatbot-typing-dot"></div>
    `;
    
    this.elements.content.appendChild(typingEl);
    this.elements.content.scrollTop = this.elements.content.scrollHeight;
  }
  
  hideTypingIndicator() {
    const typingEl = document.getElementById('chatbotTyping');
    if (typingEl) {
      typingEl.remove();
    }
    this.isTyping = false;
  }
  
  sendMessage() {
    const message = this.elements.input.value.trim();
    if (!message || this.isTyping) return;
    
    // Clear input
    this.elements.input.value = '';
    
    // Add user message
    this.addMessage('user', message);
    
    // Show typing indicator
    this.showTypingIndicator();
    
    // Process message and get response
    setTimeout(() => {
      this.processMessage(message);
    }, 1000);
  }
  
  processMessage(message) {
    // Simple command detection
    const commandMatch = /^\/([a-z_]+)/.exec(message);
    
    // Get responses map for the current page
    const pageResponses = this.config.pageResponsesMap[this.currentPage] || this.config.defaultResponses;
    
    if (commandMatch && pageResponses[commandMatch[1]]) {
      this.executeCommand(commandMatch[1]);
      return;
    }
    
    // Check for keyword matches with commands
    const pageCommands = this.config.pageCommandsMap[this.currentPage] || this.config.defaultCommands;
    
    for (const cmd of pageCommands) {
      const keywords = cmd.label.toLowerCase().split(' ');
      const messageWords = message.toLowerCase().split(' ');
      
      if (keywords.some(keyword => messageWords.includes(keyword)) ||
          message.toLowerCase().includes(cmd.command.toLowerCase())) {
        this.executeCommand(cmd.command);
        return;
      }
    }
    
    // Generate contextual response based on current page
    let response = '';
    
    // Default fallback message based on current page
    if (pageResponses.default_message) {
      response = pageResponses.default_message;
    } else {
      response = `I'm here to help with any questions about Black Armor AI. What specific information are you looking for?`;
    }
    
    // Hide typing indicator and show response
    this.hideTypingIndicator();
    this.addMessage('assistant', response);
  }
  
  executeCommand(command) {
    console.log("Executing command: ", command);
    console.log("Current page:", this.currentPage);
    console.log("Available page responses:", this.config.pageResponsesMap[this.currentPage]);
    
    // Get responses map for the current page
    const pageResponses = this.config.pageResponsesMap[this.currentPage] || this.config.defaultResponses;
    
    if (!pageResponses[command]) {
      console.error("Command not recognized: ", command);
      console.error("Available responses for this page:", Object.keys(pageResponses));
      this.addMessage('assistant', `I'm sorry, that command is not recognized.`);
      return;
    }
    
    // Add as if user requested it
    const pageCommands = this.config.pageCommandsMap[this.currentPage] || this.config.defaultCommands;
    const commandLabel = pageCommands.find(cmd => cmd.command === command);
    
    const userMessage = commandLabel ? commandLabel.label : command;
    this.addMessage('user', userMessage);
    
    // Show typing
    this.showTypingIndicator();
    
    // Delayed response for realistic effect
    setTimeout(() => {
      this.hideTypingIndicator();
      this.addMessage('assistant', pageResponses[command]);
      
      // Re-display the command chips after providing a response
      setTimeout(() => {
        this.showCommandChips();
      }, 500);
    }, 1500);
  }
}

// Initialize chatbot when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize ChatbotSystem with default global commands if no custom ones are defined
  const defaultCommands = [
    { command: 'help', label: 'Help', color: '#4285F4' },
    { command: 'contact_sales', label: 'Contact Sales', color: '#0F9D58' },
    { command: 'request_demo', label: 'Request Demo', color: '#DB4437' }
  ];
  
  const defaultResponses = {
    'help': 'I can answer questions about Black Armor AI drone security solutions. Try asking about specific features, pricing, implementation details, or technical requirements.',
    'contact_sales': 'I\'ll connect you with our sales team. Please provide your name, email, and company name, and a representative will contact you within 24 hours.',
    'request_demo': 'I\'d be happy to arrange a demonstration of our drone security system. Please provide your contact information and preferred date, and we\'ll schedule a personalized demo for your organization.',
    'default_message': 'Welcome to Black Armor AI. How can I assist you with our drone security solutions today?'
  };
  
  new ChatbotSystem({
    defaultCommands: defaultCommands,
    defaultResponses: defaultResponses
  });
}); 