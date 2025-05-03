#!/bin/bash

# Script to add chatbot command references to all HTML files
echo "Adding chatbot command references to HTML files in all directories..."

# Function to add chatbot command references to file if not already present
add_chatbot_commands() {
    local file=$1
    local js_ref=$2
    
    # Check if file exists
    if [ ! -f "$file" ]; then
        echo "File $file does not exist. Skipping."
        return
    fi
    
    echo "Processing $file..."
    
    # Check if chatbot_commands.js reference already exists
    if grep -q "chatbot_commands.js" "$file"; then
        echo "Chatbot commands JS reference already exists in $file."
    else
        # Add chatbot_commands.js reference before chatbot.js include
        if grep -q "chatbot.js" "$file"; then
            # More careful replacement that won't corrupt the tags
            sed -i '' "s|<script src=\"\\(.*\\)chatbot.js\"></script>|$js_ref\n<script src=\"\\1chatbot.js\"></script>|" "$file"
            echo "Added chatbot commands JS reference to $file"
        else
            echo "Warning: chatbot.js reference not found in $file. Cannot add chatbot_commands.js."
        fi
    fi
}

# Process files in root directory
ROOT_JS_REF='<script src="chatbot_commands.js"></script>'

echo "Processing root directory HTML files..."
for file in *.html; do
    if [ -f "$file" ]; then
        add_chatbot_commands "$file" "$ROOT_JS_REF"
    fi
done

# Process files in subdirectories
SUB_JS_REF='<script src="../chatbot_commands.js"></script>'

echo "Processing solution_journey directory..."
for file in solution_journey/*.html; do
    add_chatbot_commands "$file" "$SUB_JS_REF"
done

echo "Processing client_presentations directory..."
for file in client_presentations/*.html; do
    add_chatbot_commands "$file" "$SUB_JS_REF"
done

echo "Processing resources_tools directory..."
for file in resources_tools/*.html; do
    add_chatbot_commands "$file" "$SUB_JS_REF"
done

echo "Processing discovery_assets directory..."
for file in discovery_assets/*.html; do
    add_chatbot_commands "$file" "$SUB_JS_REF"
done

echo "Done! Chatbot command references have been added to all HTML files." 