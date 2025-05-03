#!/bin/bash

# Script to add chatbot HTML structure to all HTML files
echo "Adding chatbot HTML structure to all HTML files..."

# The chatbot HTML structure to add
CHATBOT_HTML='
  <!-- Chatbot Container -->
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
  </button>'

# Function to add chatbot HTML structure to file
add_chatbot_structure() {
    local file=$1
    
    # Check if file exists
    if [ ! -f "$file" ]; then
        echo "File $file does not exist. Skipping."
        return
    fi
    
    echo "Processing $file..."
    
    # Check if chatbot structure already exists
    if grep -q 'id="chatbot-container"' "$file"; then
        echo "Chatbot structure already exists in $file. Skipping."
        return
    fi
    
    # Add chatbot structure before </body>
    sed -i '' "s|</body>|$CHATBOT_HTML\n</body>|" "$file"
    
    echo "Added chatbot structure to $file"
}

# Process files in subdirectories
echo "Adding chatbot structure to solution_journey directory..."
for file in solution_journey/*.html; do
    add_chatbot_structure "$file"
done

echo "Adding chatbot structure to client_presentations directory..."
for file in client_presentations/*.html; do
    add_chatbot_structure "$file"
done

echo "Adding chatbot structure to resources_tools directory..."
for file in resources_tools/*.html; do
    add_chatbot_structure "$file"
done

echo "Adding chatbot structure to discovery_assets directory..."
for file in discovery_assets/*.html; do
    add_chatbot_structure "$file"
done

# Process index.html
if [ -f "index.html" ]; then
    echo "Processing index.html..."
    add_chatbot_structure "index.html"
fi

echo "Done! Chatbot structure has been added to all HTML files." 