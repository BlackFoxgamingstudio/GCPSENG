#!/bin/bash

# Script to fix duplicate script references
echo "Fixing duplicate script references across all HTML files..."

# Function to fix duplicate script references in a file
fix_duplicate_scripts() {
  local file=$1
  
  # Check if file exists
  if [ ! -f "$file" ]; then
    echo "File $file does not exist. Skipping."
    return
  fi
  
  echo "Processing $file..."
  
  # Fix duplicate chatbot_enhanced.js references
  if grep -q "<script src=\"chatbot_enhanced.js\"></script><script src=\"chatbot_enhanced.js\"></script>" "$file"; then
    sed -i.bak 's|<script src="chatbot_enhanced.js"></script><script src="chatbot_enhanced.js"></script>|<script src="chatbot_enhanced.js"></script>|g' "$file"
    echo "Fixed duplicate chatbot_enhanced.js in $file"
  fi
  
  if grep -q "<script src=\"../chatbot_enhanced.js\"></script><script src=\"../chatbot_enhanced.js\"></script>" "$file"; then
    sed -i.bak 's|<script src="../chatbot_enhanced.js"></script><script src="../chatbot_enhanced.js"></script>|<script src="../chatbot_enhanced.js"></script>|g' "$file"
    echo "Fixed duplicate ../chatbot_enhanced.js in $file"
  fi
  
  # Fix missing chatbot scripts (check if enhanced exists but regular doesn't)
  if grep -q "chatbot_enhanced.js" "$file" && ! grep -q "<script src=\"chatbot.js\"></script>" "$file" && ! grep -q "<script src=\"../chatbot.js\"></script>" "$file"; then
    # Check if it's a root or subfolder file
    if grep -q "<script src=\"chatbot_enhanced.js\"></script>" "$file"; then
      sed -i.bak 's|<script src="chatbot_enhanced.js"></script>|<script src="chatbot_enhanced.js"></script>\n<script src="chatbot.js"></script>|g' "$file"
      echo "Added missing chatbot.js in $file"
    elif grep -q "<script src=\"../chatbot_enhanced.js\"></script>" "$file"; then
      sed -i.bak 's|<script src="../chatbot_enhanced.js"></script>|<script src="../chatbot_enhanced.js"></script>\n<script src="../chatbot.js"></script>|g' "$file"
      echo "Added missing ../chatbot.js in $file"
    fi
  fi

  # Also fix odd cases where there's a missing chatbot_commands.js
  if ! grep -q "chatbot_commands.js" "$file" && (grep -q "chatbot_enhanced.js" "$file" || grep -q "chatbot.js" "$file"); then
    # Check if it's a root or subfolder file
    if grep -q "<script src=\"chatbot_enhanced.js\"></script>" "$file"; then
      sed -i.bak 's|<script src="chatbot_enhanced.js"></script>|<script src="chatbot_commands.js"></script>\n<script src="chatbot_enhanced.js"></script>|g' "$file"
      echo "Added missing chatbot_commands.js in $file"
    elif grep -q "<script src=\"../chatbot_enhanced.js\"></script>" "$file"; then
      sed -i.bak 's|<script src="../chatbot_enhanced.js"></script>|<script src="../chatbot_commands.js"></script>\n<script src="../chatbot_enhanced.js"></script>|g' "$file"
      echo "Added missing ../chatbot_commands.js in $file"
    fi
  fi
  
  # Fix index page
  # Special case for index page
  if [[ "$file" == "index.html" ]]; then
    # Check if the scripts are missing
    if ! grep -q "chatbot_enhanced.js" "$file"; then
      # Insert scripts in correct order after chatbot_commands.js
      sed -i.bak 's|<script src="chatbot_commands.js"></script>|<script src="chatbot_commands.js"></script>\n<script src="chatbot_enhanced.js"></script>\n<script src="chatbot.js"></script>|g' "$file"
      echo "Added missing chatbot scripts to index.html"
    fi
  fi
  
  # Clean up backup files
  rm -f "${file}.bak"
}

# Process files in root directory
echo "Processing root directory HTML files..."
for file in *.html; do
  if [ -f "$file" ]; then
    fix_duplicate_scripts "$file"
  fi
done

# Process files in subdirectories
echo "Processing solution_journey directory..."
for file in solution_journey/*.html; do
  fix_duplicate_scripts "$file"
done

echo "Processing client_presentations directory..."
for file in client_presentations/*.html; do
  fix_duplicate_scripts "$file"
done

echo "Processing resources_tools directory..."
for file in resources_tools/*.html; do
  fix_duplicate_scripts "$file"
done

echo "Processing discovery_assets directory..."
for file in discovery_assets/*.html; do
  fix_duplicate_scripts "$file"
done

echo "Done! Duplicate script references have been fixed." 