#!/bin/bash

# Get all HTML files in the current directory
ALL_HTML_FILES=$(find . -maxdepth 1 -name "*.html" -type f | sed 's/^\.\///')

# Files that already have chatbot integration
INTEGRATED_FILES=(
  "customer_discovery_questionnaire.html"
  "migration_journey_map.html"
  "onboarding_progress_tracker.html"
  "tco_calculator.html"
  "value_metrics_handbook.html"
)

# CSS reference to add
CSS_REF='<link rel="stylesheet" href="chatbot.css">'

# JS reference to add
JS_REF='<script src="chatbot.js"></script>'

echo "Starting chatbot integration..."

# Process each file
for file in $ALL_HTML_FILES; do
  # Skip files that already have chatbot integration
  if [[ " ${INTEGRATED_FILES[@]} " =~ " ${file} " ]]; then
    echo "Skipping $file (already integrated)"
    continue
  fi
  
  echo "Processing $file..."
  
  # Skip nav_template.html as it's likely just a template file
  if [[ "$file" == "nav_template.html" ]]; then
    echo "Skipping template file: $file"
    continue
  fi
  
  # Check if CSS reference already exists
  if grep -q 'chatbot.css' "$file"; then
    echo "CSS reference already exists in $file. Skipping CSS addition."
  else
    # Add CSS reference before </head>
    sed -i '' "s|</head>|$CSS_REF\n</head>|" "$file"
    echo "Added CSS reference to $file"
  fi
  
  # Check if JS reference already exists
  if grep -q 'chatbot.js' "$file"; then
    echo "JS reference already exists in $file. Skipping JS addition."
  else
    # Add JS reference before </body>
    sed -i '' "s|</body>|$JS_REF\n</body>|" "$file"
    echo "Added JS reference to $file"
  fi
done

echo "Done! Chatbot has been integrated into all HTML files." 