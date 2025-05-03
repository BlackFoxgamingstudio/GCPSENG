#!/bin/bash

# Script to add navbar references to all HTML files
echo "Adding navbar references to HTML files in all directories..."

# Function to add navbar references to file if not already present
add_navbar_references() {
    local file=$1
    local css_ref=$2
    local js_ref=$3
    
    # Check if file exists
    if [ ! -f "$file" ]; then
        echo "File $file does not exist. Skipping."
        return
    fi
    
    echo "Processing $file..."
    
    # Check if navbar.css reference already exists
    if grep -q "navbar.css" "$file"; then
        echo "Navbar CSS reference already exists in $file."
    else
        # Add navbar.css reference before </head>
        sed -i '' "s|</head>|$css_ref\n</head>|" "$file"
        echo "Added navbar CSS reference to $file"
    fi
    
    # Check if navbar.js reference already exists
    if grep -q "navbar.js" "$file"; then
        echo "Navbar JS reference already exists in $file."
    else
        # Add navbar.js reference before </body>
        sed -i '' "s|</body>|$js_ref\n</body>|" "$file"
        echo "Added navbar JS reference to $file"
    fi
}

# Process files in root directory
ROOT_CSS_REF='<link rel="stylesheet" href="navbar.css">'
ROOT_JS_REF='<script src="navbar.js"></script>'

echo "Processing root directory HTML files..."
for file in *.html; do
    if [ -f "$file" ]; then
        add_navbar_references "$file" "$ROOT_CSS_REF" "$ROOT_JS_REF"
    fi
done

# Process files in subdirectories
SUB_CSS_REF='<link rel="stylesheet" href="../navbar.css">'
SUB_JS_REF='<script src="../navbar.js"></script>'

echo "Processing solution_journey directory..."
for file in solution_journey/*.html; do
    add_navbar_references "$file" "$SUB_CSS_REF" "$SUB_JS_REF"
done

echo "Processing client_presentations directory..."
for file in client_presentations/*.html; do
    add_navbar_references "$file" "$SUB_CSS_REF" "$SUB_JS_REF"
done

echo "Processing resources_tools directory..."
for file in resources_tools/*.html; do
    add_navbar_references "$file" "$SUB_CSS_REF" "$SUB_JS_REF"
done

echo "Processing discovery_assets directory..."
for file in discovery_assets/*.html; do
    add_navbar_references "$file" "$SUB_CSS_REF" "$SUB_JS_REF"
done

echo "Done! Navbar references have been added to all HTML files." 