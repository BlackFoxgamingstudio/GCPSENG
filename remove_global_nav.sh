#!/bin/bash

# Script to remove global_nav.js script tag from all HTML files
echo "Removing global_nav.js script tag from all HTML files..."

# Function to remove global_nav.js script tag from a file
remove_global_nav() {
    local file=$1
    
    # Check if file exists
    if [ ! -f "$file" ]; then
        echo "File $file does not exist. Skipping."
        return
    fi
    
    echo "Processing $file..."
    
    # Remove global_nav.js script tag
    sed -i '' 's|<script src="global_nav.js"></script>||g' "$file"
    
    echo "Removed global_nav.js script tag from $file"
}

# Process files in subdirectories
echo "Processing solution_journey directory..."
for file in solution_journey/*.html; do
    remove_global_nav "$file"
done

echo "Processing client_presentations directory..."
for file in client_presentations/*.html; do
    remove_global_nav "$file"
done

echo "Processing resources_tools directory..."
for file in resources_tools/*.html; do
    remove_global_nav "$file"
done

echo "Processing discovery_assets directory..."
for file in discovery_assets/*.html; do
    remove_global_nav "$file"
done

echo "Done! global_nav.js script tag has been removed from all HTML files." 