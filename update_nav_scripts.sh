#!/bin/bash

# This script adds the navigation.js script to all GCP implementation slides

# Function to add navigation script to a file
add_navigation_script() {
  local file="$1"
  echo "Adding navigation script to $file..."
  
  # Check if the file already has the navigation script
  if grep -q "navigation.js" "$file"; then
    echo "  Navigation script already exists in $file, skipping..."
    return
  fi
  
  # Add the navigation script before the chatbot container comment
  sed -i '' 's/<script src="..\/navbar.js"><\/script>/<script src="..\/navbar.js"><\/script>\n<script src="navigation.js"><\/script>/g' "$file"
}

# Find all HTML files in the gcp_implementation_slides directory
find ./gcp_implementation_slides -name "slide*.html" -type f | while read file; do
  add_navigation_script "$file"
done

echo "Complete! Navigation script has been added to all GCP implementation slides." 