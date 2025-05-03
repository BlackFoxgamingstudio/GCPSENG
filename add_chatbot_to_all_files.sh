#!/bin/bash

# Script to add chatbot HTML structure to all HTML files using the single-file script
echo "Adding chatbot HTML structure to all HTML files..."

# Process files in subdirectories
echo "Processing solution_journey directory..."
for file in solution_journey/*.html; do
    ./add_chatbot_to_file.sh "$file"
done

echo "Processing client_presentations directory..."
for file in client_presentations/*.html; do
    ./add_chatbot_to_file.sh "$file"
done

echo "Processing resources_tools directory..."
for file in resources_tools/*.html; do
    ./add_chatbot_to_file.sh "$file"
done

echo "Processing discovery_assets directory..."
for file in discovery_assets/*.html; do
    ./add_chatbot_to_file.sh "$file"
done

# Process index.html
if [ -f "index.html" ]; then
    echo "Processing index.html..."
    ./add_chatbot_to_file.sh "index.html"
fi

echo "Done! Chatbot structure has been added to all HTML files." 