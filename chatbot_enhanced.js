/**
 * Black Armor AI Enhanced Chatbot
 * This script initializes the fixed version of the chatbot
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize event listeners for existing chatbot structure
  let chatbotToggle = document.getElementById('chatbot-toggle');
  let chatbotContainer = document.getElementById('chatbot-container');
  let chatbotClose = document.getElementById('chatbot-close');
  let chatbotMinimize = document.getElementById('chatbot-minimize');
  let chatbotInput = document.getElementById('chatbot-input');
  let chatbotSend = document.getElementById('chatbot-send');
  let chatbotMessages = document.getElementById('chatbot-messages');
  
  // Create chatbot elements if they don't exist
  if (!chatbotToggle || !chatbotContainer) {
    const elements = createChatbotHTML();
    chatbotToggle = elements.chatbotToggle;
    chatbotContainer = elements.chatbotContainer;
    chatbotClose = elements.chatbotClose;
    chatbotMinimize = elements.chatbotMinimize;
    chatbotInput = elements.chatbotInput;
    chatbotSend = elements.chatbotSend;
    chatbotMessages = elements.chatbotMessages;
  }
  
  // Load custom commands if available
  let pageCommands = [];
  let pageResponses = {};
  
  if (typeof pageCommandsMap !== 'undefined' && typeof pageResponsesMap !== 'undefined') {
    const currentPage = detectCurrentPage();
    console.log("Current page detected:", currentPage);
    
    pageCommands = pageCommandsMap[currentPage] || getDefaultCommands();
    pageResponses = {
      ...getDefaultResponses(),
      ...(pageResponsesMap || {})
    };
    
    // Display welcome message
    const welcomeMessage = getWelcomeMessage(currentPage, pageResponses);
    addMessage('assistant', welcomeMessage);
    
    // Add command chips
    displayCommandChips(pageCommands);
  } else {
    console.log("Custom commands not available, using defaults");
    pageCommands = getDefaultCommands();
    pageResponses = getDefaultResponses();
    
    // Display default welcome message
    addMessage('assistant', pageResponses.default_message);
    
    // Add default command chips
    displayCommandChips(pageCommands);
  }
  
  // Attach event listeners
  if (chatbotToggle) {
    chatbotToggle.addEventListener('click', toggleChatbot);
  }
  
  if (chatbotClose) {
    chatbotClose.addEventListener('click', function() {
      closeChatbot();
    });
  }
  
  if (chatbotMinimize) {
    chatbotMinimize.addEventListener('click', function() {
      minimizeChatbot();
    });
  }
  
  if (chatbotSend) {
    chatbotSend.addEventListener('click', sendMessage);
  }
  
  if (chatbotInput) {
    chatbotInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    });
    
    // Auto-resize textarea
    chatbotInput.addEventListener('input', function() {
      this.style.height = 'auto';
      this.style.height = (this.scrollHeight > 100 ? 100 : this.scrollHeight) + 'px';
    });
  }
  
  // Helper functions
  function detectCurrentPage() {
    const path = window.location.pathname;
    const filename = path.split('/').pop();
    
    console.log("Detecting page from path:", path);
    
    // Remove file extension if it exists
    let pageName = filename.replace(/\.html?$/, '');
    
    // If empty, assume index page
    if (!pageName) {
      return 'index';
    }
    
    // Special case for solution journey pages (numbered)
    if (path.includes('solution_journey') && pageName.match(/^\d+_/)) {
      // Format like "01_Solution_Overview" to match command map keys
      pageName = pageName.toLowerCase().replace(/^\d+_/, '').replace(/_/g, '_');
    }
    
    // Handle discovery assets
    if (path.includes('discovery_assets')) {
      pageName = pageName.toLowerCase().replace(/_/g, '_');
    }
    
    // Handle client presentations
    if (path.includes('client_presentations')) {
      pageName = pageName.toLowerCase().replace(/_/g, '_');
    }
    
    // Handle resources and tools
    if (path.includes('resources_tools')) {
      pageName = pageName.toLowerCase().replace(/_/g, '_');
    }
    
    console.log("Normalized page name:", pageName);
    return pageName;
  }
  
  function getDefaultCommands() {
    return [
      { command: 'help', label: 'Help', color: '#4285F4' },
      { command: 'contact_sales', label: 'Contact Sales', color: '#0F9D58' },
      { command: 'request_demo', label: 'Request Demo', color: '#DB4437' }
    ];
  }
  
  function getDefaultResponses() {
    return {
      'help': 'I can answer questions about Black Armor AI drone security solutions. Try asking about specific features, pricing, implementation details, or technical requirements.',
      'contact_sales': 'I\'ll connect you with our sales team. Please provide your name, email, and company name, and a representative will contact you within 24 hours.',
      'request_demo': 'I\'d be happy to arrange a demonstration of our drone security system. Please provide your contact information and preferred date, and we\'ll schedule a personalized demo for your organization.',
      'default_message': 'Welcome to Black Armor AI. How can I assist you with our drone security solutions today?'
    };
  }
  
  function getWelcomeMessage(currentPage, pageResponses) {
    // First check if we have a default message in our map
    if (pageResponses[currentPage] && pageResponses[currentPage].default_message) {
      return pageResponses[currentPage].default_message;
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
    return pageResponses.default_message || "Welcome to Black Armor AI. How can I assist you with our drone security solutions today?";
  }
  
  function toggleChatbot() {
    if (chatbotContainer) {
      chatbotContainer.classList.toggle('closed');
      
      if (!chatbotContainer.classList.contains('closed') && chatbotInput) {
        chatbotInput.focus();
      }
    }
  }
  
  function closeChatbot() {
    if (chatbotContainer) {
      chatbotContainer.classList.add('closed');
    }
  }
  
  function minimizeChatbot() {
    closeChatbot();
  }
  
  function displayCommandChips(commands) {
    if (!chatbotMessages) return;
    
    // Create or find command chips container
    let commandChipsContainer = chatbotMessages.querySelector('.chatbot-command-chips');
    if (!commandChipsContainer) {
      commandChipsContainer = document.createElement('div');
      commandChipsContainer.className = 'chatbot-command-chips';
      chatbotMessages.appendChild(commandChipsContainer);
    }
    
    // Clear existing chips
    commandChipsContainer.innerHTML = '';
    
    // Add chips
    commands.forEach(cmd => {
      const chip = document.createElement('div');
      chip.className = 'chatbot-command-chip';
      chip.textContent = cmd.label;
      
      // Store command as data attribute
      chip.dataset.command = cmd.command;
      
      if (cmd.color) {
        // Modify the color for better visibility
        chip.style.color = cmd.color;
        chip.style.borderColor = cmd.color;
        chip.style.backgroundColor = `${cmd.color}15`; // 15% opacity
      }
      
      // Add click event
      chip.addEventListener('click', function() {
        executeCommand(cmd.command, cmd.label);
      });
      
      commandChipsContainer.appendChild(chip);
    });
  }
  
  function sendMessage() {
    if (!chatbotInput || !chatbotInput.value.trim()) return;
    
    const message = chatbotInput.value.trim();
    chatbotInput.value = '';
    chatbotInput.style.height = 'auto';
    
    // Add user message
    addMessage('user', message);
    
    // Show typing indicator
    showTypingIndicator();
    
    // Process after a short delay to simulate thinking
    setTimeout(() => {
      const response = processMessage(message);
      
      // Hide typing indicator and show response
      hideTypingIndicator();
      addMessage('assistant', response);
      
      // Re-display command chips
      setTimeout(() => {
        displayCommandChips(pageCommands);
      }, 500);
    }, 1000);
  }
  
  function processMessage(message) {
    // Try running through custom handlers first
    for (const handler of customMessageHandlers) {
      try {
        const response = handler(message);
        if (response) {
          // If the handler returns a response, use it
          return response;
        }
      } catch (error) {
        console.error("Error in custom message handler:", error);
      }
    }
    
    // Default processing logic if no custom handler returned a response
    const lowerMsg = message.toLowerCase();
    
    // Command detection (explicit with / prefix)
    const commandMatch = /^\/([a-z_]+)/.exec(message);
    if (commandMatch) {
      const command = commandMatch[1];
      return executeCommand(command);
    }
    
    // Check for commands in natural language
    const currentPage = detectCurrentPage();
    for (const cmd of pageCommands) {
      const commandKeywords = cmd.keywords || [];
      if (commandKeywords.some(keyword => lowerMsg.includes(keyword.toLowerCase()))) {
        return executeCommand(cmd.command, cmd.label);
      }
    }
    
    // Check if the message matches some known patterns
    if (lowerMsg.includes('hello') || lowerMsg.includes('hi') || lowerMsg.includes('hey')) {
      return "Hello! How can I help you with Black Armor AI's drone security solutions today?";
    }
    
    if (lowerMsg.includes('thank')) {
      return "You're welcome! Feel free to ask if you have any other questions about our drone security solutions.";
    }
    
    if (lowerMsg.includes('bye') || lowerMsg.includes('goodbye')) {
      return "Goodbye! Feel free to come back if you have more questions about our security drone solutions.";
    }
    
    // Default response
    return "I'm here to help with questions about Black Armor AI drone security solutions. You can ask about features, implementation, technical details, or use the command chips below.";
  }
  
  function executeCommand(command, label) {
    // Add command as user message if triggered via chip
    if (label) {
      addMessage('user', label);
    }
    
    // Check if command exists in responses
    if (pageResponses[command]) {
      return pageResponses[command];
    }
    
    // Check if there's a page-specific response
    const currentPage = detectCurrentPage();
    if (pageResponses[currentPage] && pageResponses[currentPage][command]) {
      return pageResponses[currentPage][command];
    }
    
    // Default fallback response
    return "I don't have specific information about that topic yet. Please ask another question or use one of the suggestion chips below.";
  }
  
  function addMessage(role, content) {
    if (!chatbotMessages) return;
    
    const messageEl = document.createElement('div');
    messageEl.className = `chatbot-message ${role}`;
    
    // Add special classes based on content for styling
    if (role === 'assistant') {
      if (content.includes('implementation phases')) {
        messageEl.classList.add('implementation-phases');
      } else if (content.includes('risk management')) {
        messageEl.classList.add('risk-management');
      } else if (content.includes('success criteria')) {
        messageEl.classList.add('success-criteria');
      }
      
      try {
        // Format markdown-like syntax
        content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        content = content.replace(/\n\*\*(.*?):/g, '<br><strong>$1:</strong>');
        
        // Format bullet points
        content = content.replace(/^• (.*?)$/gm, '<li>$1</li>');
        content = content.replace(/\n• (.*?)(?=\n|$)/gm, '\n<li>$1</li>');
        
        // Wrap bullet points in ul tags
        if (content.includes('<li>')) {
          content = content.replace(/(<li>.*?<\/li>(\s*<li>.*?<\/li>)*)/g, '<ul>$1</ul>');
        }
        
        // Convert line breaks
        content = content.replace(/\n\n/g, '<br><br>');
        content = content.replace(/\n/g, '<br>');
      } catch (e) {
        console.error("Error formatting message:", e);
      }
    }
    
    messageEl.innerHTML = content;
    
    chatbotMessages.appendChild(messageEl);
    
    // Scroll to bottom
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  
  function showTypingIndicator() {
    if (!chatbotMessages) return;
    
    // Remove existing typing indicator if present
    hideTypingIndicator();
    
    const typingEl = document.createElement('div');
    typingEl.className = 'chatbot-typing';
    typingEl.id = 'chatbot-typing';
    typingEl.innerHTML = `
      <div class="chatbot-typing-dot"></div>
      <div class="chatbot-typing-dot"></div>
      <div class="chatbot-typing-dot"></div>
    `;
    
    chatbotMessages.appendChild(typingEl);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
  
  function hideTypingIndicator() {
    const typingEl = document.getElementById('chatbot-typing');
    if (typingEl) {
      typingEl.remove();
    }
  }
  
  function createChatbotHTML() {
    // Create chatbot HTML structure
    const chatbotHTML = `
      <div id="chatbot-container" class="closed">
        <div class="chatbot-header">
          <div class="chatbot-title">
            <i class="fas fa-robot"></i>
            <span>Black Armor AI Assistant</span>
          </div>
          <div class="chatbot-actions">
            <button id="chatbot-minimize" class="chatbot-action-btn">
              <i class="fas fa-minus"></i>
            </button>
            <button id="chatbot-close" class="chatbot-action-btn">
              <i class="fas fa-times"></i>
            </button>
          </div>
        </div>
        <div id="chatbot-messages"></div>
        <div class="chatbot-input-container">
          <textarea id="chatbot-input" placeholder="Type your message..." rows="1"></textarea>
          <button id="chatbot-send">
            <i class="fas fa-paper-plane"></i>
          </button>
        </div>
      </div>

      <button id="chatbot-toggle" class="chatbot-toggle-btn">
        <i class="fas fa-comment"></i>
      </button>
    `;
    
    // Append to body
    const chatbotWrapper = document.createElement('div');
    chatbotWrapper.innerHTML = chatbotHTML;
    document.body.appendChild(chatbotWrapper);
    
    // Re-get references to elements
    return {
      chatbotToggle: document.getElementById('chatbot-toggle'),
      chatbotContainer: document.getElementById('chatbot-container'),
      chatbotClose: document.getElementById('chatbot-close'),
      chatbotMinimize: document.getElementById('chatbot-minimize'),
      chatbotInput: document.getElementById('chatbot-input'),
      chatbotSend: document.getElementById('chatbot-send'),
      chatbotMessages: document.getElementById('chatbot-messages')
    };
  }
  
  // Custom message handler management
  let customMessageHandlers = [];
  
  function addChatbotMessageHandler(handler) {
    if (typeof handler === 'function') {
      customMessageHandlers.push(handler);
      console.log("Added custom message handler");
      return true;
    }
    return false;
  }
  
  function removeChatbotMessageHandler(handler) {
    const index = customMessageHandlers.indexOf(handler);
    if (index > -1) {
      customMessageHandlers.splice(index, 1);
      console.log("Removed custom message handler");
      return true;
    }
    return false;
  }
  
  // Expose these functions to the window object
  window.addChatbotMessage = addMessage;
  window.addChatbotMessageHandler = addChatbotMessageHandler;
  window.removeChatbotMessageHandler = removeChatbotMessageHandler;
}); 