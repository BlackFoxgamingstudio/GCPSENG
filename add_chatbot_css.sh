#!/bin/bash

# This script adds custom CSS for chatbot positioning to all HTML files

# Function to add custom CSS for chatbot positioning
add_chatbot_css() {
  local file="$1"
  echo "Adding chatbot CSS to $file..."
  
  # Check if the file already has the custom CSS
  if grep -q "Custom chatbot positioning" "$file"; then
    echo "  CSS already exists in $file, skipping..."
    return
  fi
  
  # Add custom CSS after the closing </style> tag or after </head> if no style tag
  if grep -q "</style>" "$file"; then
    # There's a style tag, add after it
    sed -i '' '/<\/style>/a\
<style>\
  /* Custom chatbot positioning for this page */\
  #chatbot-toggle {\
    position: fixed !important;\
    bottom: 20px !important;\
    right: 20px !important;\
    z-index: 1000 !important;\
  }\
  \
  #chatbot-container {\
    position: fixed !important;\
    bottom: 20px !important;\
    right: 20px !important;\
    z-index: 1001 !important;\
    width: 350px !important;\
    max-height: 500px !important;\
  }\
</style>' "$file"
  else
    # No style tag, add before </head>
    sed -i '' '/<\/head>/i\
<style>\
  /* Custom chatbot positioning for this page */\
  #chatbot-toggle {\
    position: fixed !important;\
    bottom: 20px !important;\
    right: 20px !important;\
    z-index: 1000 !important;\
  }\
  \
  #chatbot-container {\
    position: fixed !important;\
    bottom: 20px !important;\
    right: 20px !important;\
    z-index: 1001 !important;\
    width: 350px !important;\
    max-height: 500px !important;\
  }\
</style>' "$file"
  fi
}

# Find all HTML files
find . -name "*.html" -type f | while read file; do
  # Skip files that are templates or don't need the CSS
  if [[ "$file" != *"template"* ]] && [[ "$file" != *"/partials/"* ]]; then
    add_chatbot_css "$file"
  fi
done

echo "Complete! Chatbot CSS has been added to all HTML files." 