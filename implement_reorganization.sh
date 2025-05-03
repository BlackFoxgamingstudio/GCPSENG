#!/bin/bash

# Script to implement file reorganization while preserving links
echo "Implementing file reorganization with link preservation..."

# Create directories if they don't exist
mkdir -p solution_journey client_presentations resources_tools discovery_assets

# First, let's update links in all HTML files
echo "Updating links in all HTML files..."

# Index page links update
if [ -f index.html ]; then
  echo "Updating links in index.html..."
  sed -i '' \
    -e 's|neo_slide_1.html|solution_journey/01_Solution_Overview.html|g' \
    -e 's|neo_slide_2.html|solution_journey/02_Security_Challenges.html|g' \
    -e 's|neo_slide_3.html|solution_journey/03_Target_Customers.html|g' \
    -e 's|neo_slide_4.html|solution_journey/04_Technical_Architecture.html|g' \
    -e 's|neo_slide_5.html|solution_journey/05_ROI_Analysis.html|g' \
    -e 's|neo_slide_6.html|solution_journey/06_Implementation_Process.html|g' \
    -e 's|neo_slide_7.html|solution_journey/07_Next_Steps.html|g' \
    -e 's|neo_slide_8_bant.html|solution_journey/08_BANT_Assessment.html|g' \
    -e 's|neo_slide_8_bmc.html|solution_journey/09_Business_Model_Canvas.html|g' \
    -e 's|neo_slide_8_journey.html|solution_journey/10_Customer_Journey.html|g' \
    -e 's|neo_slide_8_journey_presentation.html|solution_journey/11_Journey_Presentation.html|g' \
    -e 's|neo_slide_9_bmc.html|solution_journey/12_Business_Model_Framework.html|g' \
    -e 's|neo_slide_integrated_1.html|client_presentations/Executive_Briefing.html|g' \
    -e 's|neo_slide_integrated_2.html|client_presentations/Security_Assessment.html|g' \
    -e 's|neo_slide_integrated_3.html|client_presentations/Technical_Deep_Dive.html|g' \
    -e 's|neo_slide_integrated_4.html|client_presentations/Solution_Architecture.html|g' \
    -e 's|neo_slide_integrated_5.html|client_presentations/Financial_Impact.html|g' \
    -e 's|neo_slide_integrated_6.html|client_presentations/Implementation_Roadmap.html|g' \
    -e 's|neo_slide_integrated_7.html|client_presentations/Operational_Integration.html|g' \
    -e 's|neo_slide_integrated_8.html|client_presentations/BANT_Framework.html|g' \
    -e 's|neo_slide_integrated_9.html|client_presentations/Next_Steps.html|g' \
    -e 's|value_metrics_handbook.html|resources_tools/Value_Calculator.html|g' \
    -e 's|tco_calculator.html|resources_tools/TCO_Calculator.html|g' \
    -e 's|implementation_guide.html|resources_tools/Implementation_Guide.html|g' \
    -e 's|migration_journey_map.html|resources_tools/Migration_Planner.html|g' \
    -e 's|customer_discovery_questionnaire.html|discovery_assets/Security_Assessment_Questionnaire.html|g' \
    -e 's|onboarding_progress_tracker.html|discovery_assets/Deployment_Readiness_Checklist.html|g' \
    -e 's|qualification_workbook.html|discovery_assets/Success_Metrics_Framework.html|g' \
    -e 's|assessment_template.html|discovery_assets/Stakeholder_Analysis_Template.html|g' \
    index.html
fi

# Update links in all HTML files
for file in *.html; do
  if [ -f "$file" ] && [ "$file" != "index.html" ]; then
    echo "Updating links in $file..."
    sed -i '' \
      -e 's|neo_slide_1.html|solution_journey/01_Solution_Overview.html|g' \
      -e 's|neo_slide_2.html|solution_journey/02_Security_Challenges.html|g' \
      -e 's|neo_slide_3.html|solution_journey/03_Target_Customers.html|g' \
      -e 's|neo_slide_4.html|solution_journey/04_Technical_Architecture.html|g' \
      -e 's|neo_slide_5.html|solution_journey/05_ROI_Analysis.html|g' \
      -e 's|neo_slide_6.html|solution_journey/06_Implementation_Process.html|g' \
      -e 's|neo_slide_7.html|solution_journey/07_Next_Steps.html|g' \
      -e 's|neo_slide_8_bant.html|solution_journey/08_BANT_Assessment.html|g' \
      -e 's|neo_slide_8_bmc.html|solution_journey/09_Business_Model_Canvas.html|g' \
      -e 's|neo_slide_8_journey.html|solution_journey/10_Customer_Journey.html|g' \
      -e 's|neo_slide_8_journey_presentation.html|solution_journey/11_Journey_Presentation.html|g' \
      -e 's|neo_slide_9_bmc.html|solution_journey/12_Business_Model_Framework.html|g' \
      -e 's|neo_slide_integrated_1.html|client_presentations/Executive_Briefing.html|g' \
      -e 's|neo_slide_integrated_2.html|client_presentations/Security_Assessment.html|g' \
      -e 's|neo_slide_integrated_3.html|client_presentations/Technical_Deep_Dive.html|g' \
      -e 's|neo_slide_integrated_4.html|client_presentations/Solution_Architecture.html|g' \
      -e 's|neo_slide_integrated_5.html|client_presentations/Financial_Impact.html|g' \
      -e 's|neo_slide_integrated_6.html|client_presentations/Implementation_Roadmap.html|g' \
      -e 's|neo_slide_integrated_7.html|client_presentations/Operational_Integration.html|g' \
      -e 's|neo_slide_integrated_8.html|client_presentations/BANT_Framework.html|g' \
      -e 's|neo_slide_integrated_9.html|client_presentations/Next_Steps.html|g' \
      -e 's|value_metrics_handbook.html|resources_tools/Value_Calculator.html|g' \
      -e 's|tco_calculator.html|resources_tools/TCO_Calculator.html|g' \
      -e 's|implementation_guide.html|resources_tools/Implementation_Guide.html|g' \
      -e 's|migration_journey_map.html|resources_tools/Migration_Planner.html|g' \
      -e 's|customer_discovery_questionnaire.html|discovery_assets/Security_Assessment_Questionnaire.html|g' \
      -e 's|onboarding_progress_tracker.html|discovery_assets/Deployment_Readiness_Checklist.html|g' \
      -e 's|qualification_workbook.html|discovery_assets/Success_Metrics_Framework.html|g' \
      -e 's|assessment_template.html|discovery_assets/Stakeholder_Analysis_Template.html|g' \
      "$file"
  fi
done

# Update navigation labels in index.html
if [ -f index.html ]; then
  echo "Updating navigation labels in index.html..."
  sed -i '' \
    -e 's|<a href="neo_slide_1.html" class="nav-link">Neo Slides</a>|<a href="solution_journey/01_Solution_Overview.html" class="nav-link">Solution Journey</a>|g' \
    -e 's|<a href="neo_slide_integrated_1.html" class="nav-link">Integrated Slides</a>|<a href="client_presentations/Executive_Briefing.html" class="nav-link">Client Presentations</a>|g' \
    -e 's|<a href="value_metrics_handbook.html" class="nav-link">Tools & Templates</a>|<a href="resources_tools/Value_Calculator.html" class="nav-link">Resources & Tools</a>|g' \
    -e 's|<a href="customer_discovery_questionnaire.html" class="nav-link">Assessments</a>|<a href="discovery_assets/Security_Assessment_Questionnaire.html" class="nav-link">Discovery Assets</a>|g' \
    index.html
fi

# Solution Journey (formerly Neo Slides)
echo "Moving files to solution_journey directory..."
[ -f neo_slide_1.html ] && mv neo_slide_1.html solution_journey/01_Solution_Overview.html
[ -f neo_slide_2.html ] && mv neo_slide_2.html solution_journey/02_Security_Challenges.html
[ -f neo_slide_3.html ] && mv neo_slide_3.html solution_journey/03_Target_Customers.html
[ -f neo_slide_4.html ] && mv neo_slide_4.html solution_journey/04_Technical_Architecture.html
[ -f neo_slide_5.html ] && mv neo_slide_5.html solution_journey/05_ROI_Analysis.html
[ -f neo_slide_6.html ] && mv neo_slide_6.html solution_journey/06_Implementation_Process.html
[ -f neo_slide_7.html ] && mv neo_slide_7.html solution_journey/07_Next_Steps.html
[ -f neo_slide_8_bant.html ] && mv neo_slide_8_bant.html solution_journey/08_BANT_Assessment.html
[ -f neo_slide_8_bmc.html ] && mv neo_slide_8_bmc.html solution_journey/09_Business_Model_Canvas.html
[ -f neo_slide_8_journey.html ] && mv neo_slide_8_journey.html solution_journey/10_Customer_Journey.html
[ -f neo_slide_8_journey_presentation.html ] && mv neo_slide_8_journey_presentation.html solution_journey/11_Journey_Presentation.html
[ -f neo_slide_9_bmc.html ] && mv neo_slide_9_bmc.html solution_journey/12_Business_Model_Framework.html

# Client Presentations (formerly Integrated Slides)
echo "Moving files to client_presentations directory..."
[ -f neo_slide_integrated_1.html ] && mv neo_slide_integrated_1.html client_presentations/Executive_Briefing.html
[ -f neo_slide_integrated_2.html ] && mv neo_slide_integrated_2.html client_presentations/Security_Assessment.html
[ -f neo_slide_integrated_3.html ] && mv neo_slide_integrated_3.html client_presentations/Technical_Deep_Dive.html
[ -f neo_slide_integrated_4.html ] && mv neo_slide_integrated_4.html client_presentations/Solution_Architecture.html
[ -f neo_slide_integrated_5.html ] && mv neo_slide_integrated_5.html client_presentations/Financial_Impact.html
[ -f neo_slide_integrated_6.html ] && mv neo_slide_integrated_6.html client_presentations/Implementation_Roadmap.html
[ -f neo_slide_integrated_7.html ] && mv neo_slide_integrated_7.html client_presentations/Operational_Integration.html
[ -f neo_slide_integrated_8.html ] && mv neo_slide_integrated_8.html client_presentations/BANT_Framework.html
[ -f neo_slide_integrated_9.html ] && mv neo_slide_integrated_9.html client_presentations/Next_Steps.html

# Resources & Tools (formerly Tools & Templates)
echo "Moving files to resources_tools directory..."
[ -f value_metrics_handbook.html ] && mv value_metrics_handbook.html resources_tools/Value_Calculator.html
[ -f tco_calculator.html ] && mv tco_calculator.html resources_tools/TCO_Calculator.html
[ -f implementation_guide.html ] && mv implementation_guide.html resources_tools/Implementation_Guide.html
[ -f migration_journey_map.html ] && mv migration_journey_map.html resources_tools/Migration_Planner.html

# Discovery Assets (formerly Assessments)
echo "Moving files to discovery_assets directory..."
[ -f customer_discovery_questionnaire.html ] && mv customer_discovery_questionnaire.html discovery_assets/Security_Assessment_Questionnaire.html
[ -f onboarding_progress_tracker.html ] && mv onboarding_progress_tracker.html discovery_assets/Deployment_Readiness_Checklist.html
[ -f qualification_workbook.html ] && mv qualification_workbook.html discovery_assets/Success_Metrics_Framework.html
[ -f assessment_template.html ] && mv assessment_template.html discovery_assets/Stakeholder_Analysis_Template.html

# Create symlinks for backward compatibility (optional)
# This helps if there are any links we missed
echo "Creating symlinks for backward compatibility..."
for old_file in neo_slide_*.html value_metrics_handbook.html tco_calculator.html implementation_guide.html migration_journey_map.html customer_discovery_questionnaire.html onboarding_progress_tracker.html qualification_workbook.html assessment_template.html; do
  if [ ! -f "$old_file" ]; then
    case "$old_file" in
      neo_slide_1.html) ln -sf solution_journey/01_Solution_Overview.html "$old_file" ;;
      neo_slide_2.html) ln -sf solution_journey/02_Security_Challenges.html "$old_file" ;;
      neo_slide_3.html) ln -sf solution_journey/03_Target_Customers.html "$old_file" ;;
      neo_slide_4.html) ln -sf solution_journey/04_Technical_Architecture.html "$old_file" ;;
      neo_slide_5.html) ln -sf solution_journey/05_ROI_Analysis.html "$old_file" ;;
      neo_slide_6.html) ln -sf solution_journey/06_Implementation_Process.html "$old_file" ;;
      neo_slide_7.html) ln -sf solution_journey/07_Next_Steps.html "$old_file" ;;
      neo_slide_8_bant.html) ln -sf solution_journey/08_BANT_Assessment.html "$old_file" ;;
      neo_slide_8_bmc.html) ln -sf solution_journey/09_Business_Model_Canvas.html "$old_file" ;;
      neo_slide_8_journey.html) ln -sf solution_journey/10_Customer_Journey.html "$old_file" ;;
      neo_slide_8_journey_presentation.html) ln -sf solution_journey/11_Journey_Presentation.html "$old_file" ;;
      neo_slide_9_bmc.html) ln -sf solution_journey/12_Business_Model_Framework.html "$old_file" ;;
      neo_slide_integrated_1.html) ln -sf client_presentations/Executive_Briefing.html "$old_file" ;;
      neo_slide_integrated_2.html) ln -sf client_presentations/Security_Assessment.html "$old_file" ;;
      neo_slide_integrated_3.html) ln -sf client_presentations/Technical_Deep_Dive.html "$old_file" ;;
      neo_slide_integrated_4.html) ln -sf client_presentations/Solution_Architecture.html "$old_file" ;;
      neo_slide_integrated_5.html) ln -sf client_presentations/Financial_Impact.html "$old_file" ;;
      neo_slide_integrated_6.html) ln -sf client_presentations/Implementation_Roadmap.html "$old_file" ;;
      neo_slide_integrated_7.html) ln -sf client_presentations/Operational_Integration.html "$old_file" ;;
      neo_slide_integrated_8.html) ln -sf client_presentations/BANT_Framework.html "$old_file" ;;
      neo_slide_integrated_9.html) ln -sf client_presentations/Next_Steps.html "$old_file" ;;
      value_metrics_handbook.html) ln -sf resources_tools/Value_Calculator.html "$old_file" ;;
      tco_calculator.html) ln -sf resources_tools/TCO_Calculator.html "$old_file" ;;
      implementation_guide.html) ln -sf resources_tools/Implementation_Guide.html "$old_file" ;;
      migration_journey_map.html) ln -sf resources_tools/Migration_Planner.html "$old_file" ;;
      customer_discovery_questionnaire.html) ln -sf discovery_assets/Security_Assessment_Questionnaire.html "$old_file" ;;
      onboarding_progress_tracker.html) ln -sf discovery_assets/Deployment_Readiness_Checklist.html "$old_file" ;;
      qualification_workbook.html) ln -sf discovery_assets/Success_Metrics_Framework.html "$old_file" ;;
      assessment_template.html) ln -sf discovery_assets/Stakeholder_Analysis_Template.html "$old_file" ;;
    esac
  fi
done

echo "File reorganization completed successfully!"
echo "All links have been updated to point to the new file locations."
echo "Symlinks for backward compatibility have been created to prevent broken links." 