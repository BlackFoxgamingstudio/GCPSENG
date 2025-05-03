#!/bin/bash

# Script to fix navbar script positions and navigation paths in all pages
echo "Fixing navbar script positions and navigation paths..."

# Function to fix navbar script position in a file
fix_navbar_script_position() {
    local file=$1
    
    # Check if file exists
    if [ ! -f "$file" ]; then
        echo "File $file does not exist. Skipping."
        return
    fi
    
    echo "Processing $file..."
    
    # Check if navbar.js is in the head section
    if grep -q '</head>.*navbar\.js' "$file"; then
        # Move navbar.js from head to the end of body
        sed -i '' -e '/navbar\.js/d' "$file"
        sed -i '' -e 's|</body>|<script src="../navbar.js"></script>\n</body>|' "$file"
        echo "Moved navbar.js from head to body in $file"
    fi
    
    # Fix navigation paths in subdirectory files
    if [[ "$file" == *"/"* ]]; then
        # Fix links that don't have relative paths
        sed -i '' 's|window.location.href = '"'"'client_presentations/|window.location.href = '"'"'../client_presentations/|g' "$file"
        sed -i '' 's|window.location.href = '"'"'solution_journey/|window.location.href = '"'"'../solution_journey/|g' "$file"
        sed -i '' 's|window.location.href = '"'"'resources_tools/|window.location.href = '"'"'../resources_tools/|g' "$file"
        sed -i '' 's|window.location.href = '"'"'discovery_assets/|window.location.href = '"'"'../discovery_assets/|g' "$file"
        sed -i '' 's|href="client_presentations/|href="../client_presentations/|g' "$file"
        sed -i '' 's|href="solution_journey/|href="../solution_journey/|g' "$file"
        sed -i '' 's|href="resources_tools/|href="../resources_tools/|g' "$file"
        sed -i '' 's|href="discovery_assets/|href="../discovery_assets/|g' "$file"
        echo "Fixed navigation paths in $file"
    fi
}

# Process files in subdirectories
echo "Processing solution_journey directory..."
for file in solution_journey/*.html; do
    fix_navbar_script_position "$file"
done

echo "Processing client_presentations directory..."
for file in client_presentations/*.html; do
    fix_navbar_script_position "$file"
done

echo "Processing resources_tools directory..."
for file in resources_tools/*.html; do
    fix_navbar_script_position "$file"
done

echo "Processing discovery_assets directory..."
for file in discovery_assets/*.html; do
    fix_navbar_script_position "$file"
done

echo "Done! Navbar script positions and navigation paths have been fixed." 