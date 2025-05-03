#!/bin/bash

# Script to fix all chatbot issues across all pages
echo "Starting comprehensive chatbot repair across all pages..."

# Copy our fixed files to the main directory
echo "Copying fixed chatbot files to main directory..."
cp fixed_chatbot.css chatbot.css
cp fixed_chatbot.js chatbot_enhanced.js

# Function to fix chatbot scripts and structure in HTML files
fix_chatbot_in_file() {
  local file=$1
  
  # Check if file exists
  if [ ! -f "$file" ]; then
    echo "File $file does not exist. Skipping."
    return
  fi
  
  echo "Processing $file..."
  
  # First, fix any corrupted script tags
  # This fixes lines like '<script src="chatbot_commands.js"></script><script src="0'
  sed -i.bak 's|<script src="chatbot_commands.js"></script>\s*<script src="0|<script src="chatbot_commands.js"></script>\n<script src="chatbot.js"></script>|g' "$file"
  sed -i.bak 's|<script src="../chatbot_commands.js"></script>\s*<script src="0|<script src="../chatbot_commands.js"></script>\n<script src="../chatbot.js"></script>|g' "$file"
  
  # Add enhanced chatbot script before chatbot.js
  # For root directory
  sed -i.bak 's|<script src="chatbot.js"></script>|<script src="chatbot_enhanced.js"></script>\n<script src="chatbot.js"></script>|g' "$file"
  # For subdirectories
  sed -i.bak 's|<script src="../chatbot.js"></script>|<script src="../chatbot_enhanced.js"></script>\n<script src="../chatbot.js"></script>|g' "$file"
  
  # Ensure proper chatbot HTML structure at end of body
  if ! grep -q "id=\"chatbot-container\"" "$file"; then
    # Add proper chatbot HTML structure before closing body tag
    if grep -q "</body>" "$file"; then
      # Determine correct path prefix based on file location
      local path_prefix=""
      if [[ "$file" == *"/"* ]]; then
        path_prefix="../"
      fi
      
      # Create chatbot structure to insert
      local chatbot_html="  <!-- Chatbot Container -->\n  <div id=\"chatbot-container\" class=\"closed\">\n    <div class=\"chatbot-header\">\n      <div class=\"chatbot-title\">\n        <i class=\"fas fa-robot\"></i>\n        <span>Black Armor AI Assistant</span>\n      </div>\n      <div class=\"chatbot-actions\">\n        <button id=\"chatbot-minimize\" class=\"chatbot-action-btn\">\n          <i class=\"fas fa-minus\"></i>\n        </button>\n        <button id=\"chatbot-close\" class=\"chatbot-action-btn\">\n          <i class=\"fas fa-times\"></i>\n        </button>\n      </div>\n    </div>\n    <div id=\"chatbot-messages\"></div>\n    <div class=\"chatbot-input-container\">\n      <textarea id=\"chatbot-input\" placeholder=\"Type your message...\" rows=\"1\"></textarea>\n      <button id=\"chatbot-send\">\n        <i class=\"fas fa-paper-plane\"></i>\n      </button>\n    </div>\n  </div>\n\n  <button id=\"chatbot-toggle\" class=\"chatbot-toggle-btn\">\n    <i class=\"fas fa-comment\"></i>\n  </button>"
      
      # Insert chatbot structure before closing body tag
      sed -i.bak "s|</body>|${chatbot_html}\n</body>|g" "$file"
    fi
  fi
  
  # Ensure chatbot.css is properly included in head
  if ! grep -q "chatbot.css" "$file"; then
    if grep -q "</head>" "$file"; then
      # Determine correct path prefix based on file location
      local path_prefix=""
      if [[ "$file" == *"/"* ]]; then
        path_prefix="../"
      fi
      
      # Add chatbot CSS link before closing head tag
      sed -i.bak "s|</head>|<link rel=\"stylesheet\" href=\"${path_prefix}chatbot.css\">\n</head>|g" "$file"
    fi
  fi
  
  # Clean up backup files
  rm -f "${file}.bak"
  
  echo "Fixed chatbot in $file"
}

# Process files in root directory
echo "Processing root directory HTML files..."
for file in *.html; do
  if [ -f "$file" ]; then
    fix_chatbot_in_file "$file"
  fi
done

# Process files in subdirectories
echo "Processing solution_journey directory..."
for file in solution_journey/*.html; do
  fix_chatbot_in_file "$file"
done

echo "Processing client_presentations directory..."
for file in client_presentations/*.html; do
  fix_chatbot_in_file "$file"
done

echo "Processing resources_tools directory..."
for file in resources_tools/*.html; do
  fix_chatbot_in_file "$file"
done

echo "Processing discovery_assets directory..."
for file in discovery_assets/*.html; do
  fix_chatbot_in_file "$file"
done

echo "Done! Chatbot UI has been fixed on all pages." 