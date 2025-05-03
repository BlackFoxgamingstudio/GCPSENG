#!/bin/bash

# This script finds and fixes the duplicate chatbot HTML structure in all files

# Function to replace chatbot HTML with the dynamic version
fix_chatbot_html() {
  local file="$1"
  echo "Fixing $file..."
  
  # Use sed to replace the chatbot HTML block with the dynamic version comment
  sed -i '' '/<div id="chatbot-container" class="closed">/,/<button id="chatbot-toggle" class="chatbot-toggle-btn">/c\
  <!-- Chatbot is dynamically created by chatbot scripts -->' "$file"
}

# Find all HTML files with the chatbot container
find . -name "*.html" -type f -exec grep -l 'id="chatbot-container" class="closed"' {} \; | while read file; do
  # Skip chatbot_enhanced.js since it needs to keep the template
  if [[ "$file" != *"chatbot_enhanced.js"* ]]; then
    fix_chatbot_html "$file"
  fi
done

echo "Complete! Chatbot HTML blocks have been fixed in all files." 