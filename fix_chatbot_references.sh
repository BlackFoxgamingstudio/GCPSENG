#!/bin/bash

# Script to fix corrupted chatbot script references in all HTML files
echo "Fixing corrupted chatbot script references in all HTML files..."

# Function to fix corrupted script tags
fix_chatbot_references() {
    local file=$1
    local directory=$2
    
    # Check if file exists
    if [ ! -f "$file" ]; then
        echo "File $file does not exist. Skipping."
        return
    fi
    
    echo "Processing $file..."
    
    # Define the path prefix based on directory level
    if [ "$directory" = "root" ]; then
        # Root directory
        sed -i '' 's|<script src="chatbot_commands.js"></script>\s*<script src="0|<script src="chatbot_commands.js"></script>\n<script src="chatbot.js"></script>|g' "$file"
    else
        # Subdirectory
        sed -i '' 's|<script src="../chatbot_commands.js"></script>\s*<script src="0|<script src="../chatbot_commands.js"></script>\n<script src="../chatbot.js"></script>|g' "$file"
    fi
}

# Process files in root directory
echo "Processing root directory HTML files..."
for file in *.html; do
    if [ -f "$file" ]; then
        fix_chatbot_references "$file" "root"
    fi
done

# Process files in subdirectories
echo "Processing solution_journey directory..."
for file in solution_journey/*.html; do
    fix_chatbot_references "$file" "subdirectory"
done

echo "Processing client_presentations directory..."
for file in client_presentations/*.html; do
    fix_chatbot_references "$file" "subdirectory"
done

echo "Processing resources_tools directory..."
for file in resources_tools/*.html; do
    fix_chatbot_references "$file" "subdirectory"
done

echo "Processing discovery_assets directory..."
for file in discovery_assets/*.html; do
    fix_chatbot_references "$file" "subdirectory"
done

echo "Done! Chatbot script references have been fixed in all HTML files." 