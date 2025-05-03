#!/bin/bash

# Script to fix chatbot UI issues across all pages
echo "Fixing chatbot UI issues across all pages..."

# Copy our fixed files to the main directory
echo "Copying fixed chatbot files to main directory..."
cp fixed_chatbot.css chatbot.css
cp fixed_chatbot.js chatbot_enhanced.js

# Function to fix chatbot structure in HTML files
fix_chatbot_markup() {
  local file=$1
  
  # Check if file exists
  if [ ! -f "$file" ]; then
    echo "File $file does not exist. Skipping."
    return
  fi
  
  echo "Processing $file..."
  
  # Check if the file already has the enhanced chatbot reference
  if grep -q "chatbot_enhanced.js" "$file"; then
    echo "File already has enhanced chatbot. Skipping."
    return
  fi
  
  # Add reference to enhanced chatbot script (after chatbot commands)
  sed -i '' 's|<script src="chatbot.js"></script>|<script src="chatbot_enhanced.js"></script><script src="chatbot.js"></script>|g' "$file"
  sed -i '' 's|<script src="../chatbot.js"></script>|<script src="../chatbot_enhanced.js"></script><script src="../chatbot.js"></script>|g' "$file"
  
  echo "Added enhanced chatbot script to $file"
}

# Process files in root directory
echo "Processing root directory HTML files..."
for file in *.html; do
  if [ -f "$file" ]; then
    fix_chatbot_markup "$file"
  fi
done

# Process files in subdirectories
echo "Processing solution_journey directory..."
for file in solution_journey/*.html; do
  fix_chatbot_markup "$file"
done

echo "Processing client_presentations directory..."
for file in client_presentations/*.html; do
  fix_chatbot_markup "$file"
done

echo "Processing resources_tools directory..."
for file in resources_tools/*.html; do
  fix_chatbot_markup "$file"
done

echo "Processing discovery_assets directory..."
for file in discovery_assets/*.html; do
  fix_chatbot_markup "$file"
done

echo "Done! Chatbot UI has been fixed on all pages." 