#!/bin/bash

# Script to add global navigation to all HTML files
# This script adds the global_nav.js script reference to all HTML files

echo "Adding global navigation to HTML files..."

# Find all HTML files
HTML_FILES=$(find . -name "*.html")

# Counter for modified files
MODIFIED=0

for FILE in $HTML_FILES; do
  # Check if file already has the global_nav.js script
  if ! grep -q "global_nav.js" "$FILE"; then
    # Add the script reference before the closing body tag
    sed -i '' -e 's|</body>|<script src="global_nav.js"></script>\n</body>|g' "$FILE"
    echo "Added navigation to $FILE"
    ((MODIFIED++))
  fi
done

echo "Done! Modified $MODIFIED HTML files." 