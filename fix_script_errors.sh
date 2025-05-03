#!/bin/bash

# Script to fix script tag errors and fix the chatbot
echo "Fixing broken script tags and chatbot issues..."

# Create a proper chatbot_commands.js file if it doesn't exist
if [ ! -f "chatbot_commands.js" ]; then
  echo "Creating a new chatbot_commands.js file..."
  cat > chatbot_commands.js << 'EOF'
/**
 * Black Armor AI Custom Chatbot Commands
 * This file defines custom commands for each page of the website
 */

// Global commands available on all pages
const globalCommands = [
  { command: 'help', label: 'Help', color: '#4285F4' },
  { command: 'contact_sales', label: 'Contact Sales', color: '#0F9D58' },
  { command: 'request_demo', label: 'Request Demo', color: '#DB4437' }
];

// Global responses available on all pages
const globalResponses = {
  'help': 'I can answer questions about Black Armor AI drone security solutions. Try asking about specific features, pricing, implementation details, or technical requirements.',
  'contact_sales': 'I\'ll connect you with our sales team. Please provide your name, email, and company name, and a representative will contact you within 24 hours.',
  'request_demo': 'I\'d be happy to arrange a demonstration of our drone security system. Please provide your contact information and preferred date, and we\'ll schedule a personalized demo for your organization.',
  'default_message': 'Welcome to Black Armor AI. How can I assist you with our drone security solutions today?'
};

// Define commands for different pages
const pageCommandsMap = {
  'index': [
    ...globalCommands,
    { command: 'product_overview', label: 'Product Overview', color: '#4285F4' },
    { command: 'pricing', label: 'Pricing', color: '#0F9D58' }
  ],
  'solution_overview': [
    ...globalCommands,
    { command: 'features', label: 'Features', color: '#4285F4' },
    { command: 'benefits', label: 'Benefits', color: '#0F9D58' }
  ]
};

// Define responses for different commands
const pageResponsesMap = {
  ...globalResponses,
  'product_overview': 'Black Armor AI offers autonomous drone security solutions that provide continuous surveillance for facility protection, leveraging AI for threat detection and automated response.',
  'pricing': 'Our pricing is customized based on your facility size and security needs. Enterprise solutions typically start at $75,000 with annual subscription options.',
  'features': 'Key features include AI-powered threat detection, autonomous flight paths, thermal imaging, and seamless integration with existing security systems.',
  'benefits': 'Benefits include reduced security personnel costs, 24/7 coverage, elimination of blind spots, faster response times, and detailed security analytics.'
};
EOF
fi

# Function to fix broken script tags and chatbot issues
fix_script_tags() {
  local file=$1
  
  # Check if file exists
  if [ ! -f "$file" ]; then
    echo "File $file does not exist. Skipping."
    return
  fi
  
  echo "Processing $file..."
  
  # Fix broken script tags with <script src="0
  if grep -q "<script src=\"0" "$file" || grep -q "<script src=\"../chatbot.js\"></script>" "$file"; then
    # Create a backup
    cp "$file" "${file}.bak"
    
    # Fix the broken script tag
    sed -i '' 's|<script src="0|<script src="../chatbot.js"></script>|g' "$file"
    sed -i '' 's|<script src="chatbot_commands.js"></script>.*<script src="0|<script src="chatbot_commands.js"></script>\n<script src="chatbot.js"></script>|g' "$file"
    sed -i '' 's|<script src="../chatbot_commands.js"></script>.*<script src="0|<script src="../chatbot_commands.js"></script>\n<script src="../chatbot.js"></script>|g' "$file"
    
    # Add the enhanced chatbot script
    sed -i '' 's|<script src="../chatbot_commands.js"></script>|<script src="../chatbot_commands.js"></script>\n<script src="../chatbot_enhanced.js"></script>|g' "$file"
    sed -i '' 's|<script src="chatbot_commands.js"></script>|<script src="chatbot_commands.js"></script>\n<script src="chatbot_enhanced.js"></script>|g' "$file"
    
    echo "Fixed broken script tags in $file"
  fi
}

# Process all HTML files in root and subdirectories
find . -name "*.html" -type f | while read file; do
  fix_script_tags "$file"
done

echo "Creating links to ensure all required files are present..."

# Make sure the chatbot_enhanced.js is properly linked
if [ ! -f "chatbot_enhanced.js" ]; then
  if [ -f "fixed_chatbot.js" ]; then
    cp "fixed_chatbot.js" "chatbot_enhanced.js"
  else
    # Create a basic enhanced chatbot file
    cat > chatbot_enhanced.js << 'EOF'
/**
 * Black Armor AI Enhanced Chatbot
 * This script fixes issues with the chatbot and ensures it works correctly
 */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize chatbot elements
  const chatbotToggle = document.getElementById('chatbot-toggle');
  const chatbotContainer = document.getElementById('chatbot-container');
  const chatbotClose = document.getElementById('chatbot-close');
  const chatbotMinimize = document.getElementById('chatbot-minimize');
  const chatbotInput = document.getElementById('chatbot-input');
  const chatbotSend = document.getElementById('chatbot-send');
  const chatbotMessages = document.getElementById('chatbot-messages');
  
  if (chatbotToggle) {
    chatbotToggle.addEventListener('click', function() {
      if (chatbotContainer) {
        chatbotContainer.classList.toggle('closed');
      }
    });
  }
  
  if (chatbotClose) {
    chatbotClose.addEventListener('click', function() {
      if (chatbotContainer) {
        chatbotContainer.classList.add('closed');
      }
    });
  }
  
  if (chatbotMinimize) {
    chatbotMinimize.addEventListener('click', function() {
      if (chatbotContainer) {
        chatbotContainer.classList.add('closed');
      }
    });
  }
  
  // Add a simple message at startup if messages container exists
  if (chatbotMessages && typeof pageResponsesMap !== 'undefined') {
    const welcomeMessage = document.createElement('div');
    welcomeMessage.className = 'chatbot-message assistant';
    welcomeMessage.textContent = pageResponsesMap.default_message || "Welcome to Black Armor AI. How can I assist you with our drone security solutions today?";
    chatbotMessages.appendChild(welcomeMessage);
  }
  
  // Add a simple send message functionality
  if (chatbotSend && chatbotInput && chatbotMessages) {
    chatbotSend.addEventListener('click', function() {
      const message = chatbotInput.value.trim();
      if (message) {
        // Add user message
        const userMessage = document.createElement('div');
        userMessage.className = 'chatbot-message user';
        userMessage.textContent = message;
        chatbotMessages.appendChild(userMessage);
        
        // Clear input
        chatbotInput.value = '';
        
        // Add bot response after a short delay
        setTimeout(function() {
          const botMessage = document.createElement('div');
          botMessage.className = 'chatbot-message assistant';
          botMessage.textContent = "I'm sorry, I don't have a specific answer for that query. Please contact our sales team for more information about our drone security solutions.";
          chatbotMessages.appendChild(botMessage);
          
          // Scroll to bottom
          chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        }, 1000);
        
        // Scroll to bottom
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
      }
    });
    
    // Allow enter key to send message
    chatbotInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        chatbotSend.click();
      }
    });
  }
});
EOF
  fi
fi

# Make sure the CSS file is present
if [ ! -f "chatbot.css" ]; then
  if [ -f "fixed_chatbot.css" ]; then
    cp "fixed_chatbot.css" "chatbot.css"
  else
    # Create a basic chatbot CSS file
    cat > chatbot.css << 'EOF'
/* Chatbot styles */
#chatbot-container {
  position: fixed;
  bottom: 100px;
  right: 30px;
  width: 350px;
  height: 500px;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 5px 20px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  z-index: 9999;
  overflow: hidden;
  transition: all 0.3s ease;
}

#chatbot-container.closed {
  opacity: 0;
  visibility: hidden;
  transform: translateY(20px);
  pointer-events: none;
}

.chatbot-header {
  background: linear-gradient(90deg, #4285F4, #0F9D58);
  color: white;
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.chatbot-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.chatbot-actions {
  display: flex;
  gap: 10px;
}

.chatbot-action-btn {
  background: none;
  border: none;
  color: white;
  font-size: 16px;
  cursor: pointer;
}

#chatbot-messages {
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  background-color: #f5f5f5;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.chatbot-message {
  max-width: 80%;
  padding: 10px 15px;
  border-radius: 15px;
  margin-bottom: 5px;
}

.chatbot-message.user {
  background-color: #4285F4;
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 5px;
}

.chatbot-message.assistant {
  background-color: white;
  color: #333;
  align-self: flex-start;
  border-bottom-left-radius: 5px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.chatbot-input-container {
  padding: 10px;
  border-top: 1px solid #eee;
  display: flex;
  gap: 10px;
}

#chatbot-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
  resize: none;
}

#chatbot-send {
  background-color: #4285F4;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.chatbot-toggle-btn {
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #4285F4;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
  z-index: 999;
  transition: all 0.3s ease;
}

.chatbot-toggle-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 15px rgba(0,0,0,0.25);
}
EOF
  fi
fi

echo "Done fixing script tag errors and chatbot issues!" 