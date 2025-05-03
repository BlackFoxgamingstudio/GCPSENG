#!/bin/bash

# Script to add chatbot HTML structure to a specific file
if [ $# -ne 1 ]; then
    echo "Usage: $0 <file_path>"
    exit 1
fi

FILE="$1"

if [ ! -f "$FILE" ]; then
    echo "File does not exist: $FILE"
    exit 1
fi

echo "Adding chatbot structure to $FILE..."

# Check if chatbot structure already exists
if grep -q 'id="chatbot-container"' "$FILE"; then
    echo "Chatbot structure already exists in $FILE. Skipping."
    exit 0
fi

# Create a temporary file
temp_file=$(mktemp)

# Copy the file content to the temporary file, adding chatbot structure before </body>
awk '
    /<\/body>/ {
        print "  <!-- Chatbot Container -->"
        print "  <div id=\"chatbot-container\" class=\"closed\">"
        print "    <div class=\"chatbot-header\">"
        print "      <div class=\"chatbot-title\">"
        print "        <i class=\"fas fa-robot\"></i>"
        print "        <span>Black Armor AI Assistant</span>"
        print "      </div>"
        print "      <div class=\"chatbot-actions\">"
        print "        <button id=\"chatbot-minimize\" class=\"chatbot-action-btn\">"
        print "          <i class=\"fas fa-minus\"></i>"
        print "        </button>"
        print "        <button id=\"chatbot-close\" class=\"chatbot-action-btn\">"
        print "          <i class=\"fas fa-times\"></i>"
        print "        </button>"
        print "      </div>"
        print "    </div>"
        print "    <div id=\"chatbot-messages\"></div>"
        print "    <div class=\"chatbot-input-container\">"
        print "      <textarea id=\"chatbot-input\" placeholder=\"Type your message...\" rows=\"1\"></textarea>"
        print "      <button id=\"chatbot-send\">"
        print "        <i class=\"fas fa-paper-plane\"></i>"
        print "      </button>"
        print "    </div>"
        print "  </div>"
        print ""
        print "  <button id=\"chatbot-toggle\" class=\"chatbot-toggle-btn\">"
        print "    <i class=\"fas fa-comment\"></i>"
        print "  </button>"
    }
    { print }
' "$FILE" > "$temp_file"

# Replace the original file with the modified one
mv "$temp_file" "$FILE"

echo "Chatbot structure added to $FILE" 