#!/bin/bash

# Script to add chatbot to all pages in the reorganized directory structure
echo "Adding chatbot to all pages in the new directory structure..."

# CSS reference to add
CSS_REF='<link rel="stylesheet" href="../chatbot.css">'
ROOT_CSS_REF='<link rel="stylesheet" href="chatbot.css">'

# JS reference to add
JS_REF='<script src="../chatbot.js"></script>'
ROOT_JS_REF='<script src="chatbot.js"></script>'

# Function to add chatbot to file
add_chatbot_to_file() {
    local file=$1
    local css_ref=$2
    local js_ref=$3
    
    # Check if file exists
    if [ ! -f "$file" ]; then
        echo "File $file does not exist. Skipping."
        return
    fi
    
    echo "Processing $file..."
    
    # Check if CSS reference already exists
    if grep -q 'chatbot.css' "$file"; then
        echo "CSS reference already exists in $file. Skipping CSS addition."
    else
        # Add CSS reference before </head>
        sed -i '' "s|</head>|$css_ref\n</head>|" "$file"
        echo "Added CSS reference to $file"
    fi
    
    # Check if JS reference already exists
    if grep -q 'chatbot.js' "$file"; then
        echo "JS reference already exists in $file. Skipping JS addition."
    else
        # Add JS reference before </body>
        sed -i '' "s|</body>|$js_ref\n</body>|" "$file"
        echo "Added JS reference to $file"
    fi
}

# Process all HTML files in the solution_journey directory
echo "Processing solution_journey directory..."
for file in solution_journey/*.html; do
    add_chatbot_to_file "$file" "$CSS_REF" "$JS_REF"
done

# Process all HTML files in the client_presentations directory
echo "Processing client_presentations directory..."
for file in client_presentations/*.html; do
    add_chatbot_to_file "$file" "$CSS_REF" "$JS_REF"
done

# Process all HTML files in the resources_tools directory
echo "Processing resources_tools directory..."
for file in resources_tools/*.html; do
    add_chatbot_to_file "$file" "$CSS_REF" "$JS_REF"
done

# Process all HTML files in the discovery_assets directory
echo "Processing discovery_assets directory..."
for file in discovery_assets/*.html; do
    add_chatbot_to_file "$file" "$CSS_REF" "$JS_REF"
done

# Check and update index.html if needed
if [ -f "index.html" ]; then
    echo "Processing index.html..."
    add_chatbot_to_file "index.html" "$ROOT_CSS_REF" "$ROOT_JS_REF"
fi

echo "Done! Chatbot has been integrated into all HTML files in the new directory structure." 