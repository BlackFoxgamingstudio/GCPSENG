#!/bin/bash

# Script to fix chatbot paths in all HTML files
echo "Fixing chatbot paths in all HTML files..."

# Function to fix chatbot paths in a file
fix_chatbot_paths() {
    local file=$1
    local dir_level=$2
    
    # Check if file exists
    if [ ! -f "$file" ]; then
        echo "File $file does not exist. Skipping."
        return
    fi
    
    echo "Processing $file..."
    
    # Fix CSS path
    sed -i '' "s|href=\"chatbot.css\"|href=\"$dir_level/chatbot.css\"|g" "$file"
    
    # Fix JS path
    sed -i '' "s|src=\"chatbot.js\"|src=\"$dir_level/chatbot.js\"|g" "$file"
    
    echo "Updated chatbot paths in $file"
}

# Process files in subdirectories - they need "../" path prefix
echo "Fixing paths in solution_journey directory..."
for file in solution_journey/*.html; do
    fix_chatbot_paths "$file" ".."
done

echo "Fixing paths in client_presentations directory..."
for file in client_presentations/*.html; do
    fix_chatbot_paths "$file" ".."
done

echo "Fixing paths in resources_tools directory..."
for file in resources_tools/*.html; do
    fix_chatbot_paths "$file" ".."
done

echo "Fixing paths in discovery_assets directory..."
for file in discovery_assets/*.html; do
    fix_chatbot_paths "$file" ".."
done

echo "Done! Chatbot paths have been fixed in all HTML files." 