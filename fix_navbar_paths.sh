#!/bin/bash

# Script to fix navbar paths in all HTML files
echo "Fixing navbar paths in all HTML files..."

# Function to fix navbar paths in a file
fix_navbar_paths() {
    local file=$1
    local dir_level=$2
    
    # Check if file exists
    if [ ! -f "$file" ]; then
        echo "File $file does not exist. Skipping."
        return
    fi
    
    echo "Processing $file..."
    
    # Fix CSS path
    sed -i '' "s|href=\"navbar.css\"|href=\"$dir_level/navbar.css\"|g" "$file"
    
    # Fix JS path
    sed -i '' "s|src=\"navbar.js\"|src=\"$dir_level/navbar.js\"|g" "$file"
    
    echo "Updated navbar paths in $file"
}

# Process files in subdirectories - they need "../" path prefix
echo "Fixing paths in solution_journey directory..."
for file in solution_journey/*.html; do
    fix_navbar_paths "$file" ".."
done

echo "Fixing paths in client_presentations directory..."
for file in client_presentations/*.html; do
    fix_navbar_paths "$file" ".."
done

echo "Fixing paths in resources_tools directory..."
for file in resources_tools/*.html; do
    fix_navbar_paths "$file" ".."
done

echo "Fixing paths in discovery_assets directory..."
for file in discovery_assets/*.html; do
    fix_navbar_paths "$file" ".."
done

echo "Done! Navbar paths have been fixed in all HTML files." 