#!/bin/bash

# Script to add main navigation bar to all HTML files
# This script adds the navbar.js script reference to all HTML files

echo "Adding main navigation bar to HTML files..."

# Find all HTML files
HTML_FILES=$(find . -name "*.html")

# Counter for modified files
MODIFIED=0

for FILE in $HTML_FILES; do
  # Check if file already has the navbar.js script
  if ! grep -q "navbar.js" "$FILE"; then
    # Add the script reference before the closing head tag
    sed -i '' -e 's|</head>|<link rel="stylesheet" href="navbar.css">\n<script src="navbar.js"></script>\n</head>|g' "$FILE"
    echo "Added navbar to $FILE"
    ((MODIFIED++))
  fi
done

echo "Done! Modified $MODIFIED HTML files."

echo ""
echo "Ensuring both navbar and global navigation are correctly ordered..."

# Rerun add_global_nav.sh to ensure both navigations are present and properly ordered
if [ -f "./add_global_nav.sh" ]; then
  chmod +x ./add_global_nav.sh
  ./add_global_nav.sh
fi 