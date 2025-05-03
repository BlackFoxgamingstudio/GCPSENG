#!/bin/bash

# Script to rename files according to the new naming convention
echo "Renaming files to create a better visual story..."

# Create directories if they don't exist
mkdir -p solution_journey client_presentations resources_tools discovery_assets

# Solution Journey (formerly Neo Slides)
mv neo_slide_1.html solution_journey/01_Solution_Overview.html
mv neo_slide_2.html solution_journey/02_Security_Challenges.html
mv neo_slide_3.html solution_journey/03_Target_Customers.html
mv neo_slide_4.html solution_journey/04_Technical_Architecture.html
mv neo_slide_5.html solution_journey/05_ROI_Analysis.html
mv neo_slide_6.html solution_journey/06_Implementation_Process.html
mv neo_slide_7.html solution_journey/07_Next_Steps.html
mv neo_slide_8_bant.html solution_journey/08_BANT_Assessment.html
mv neo_slide_8_bmc.html solution_journey/09_Business_Model_Canvas.html
mv neo_slide_8_journey.html solution_journey/10_Customer_Journey.html
mv neo_slide_8_journey_presentation.html solution_journey/11_Journey_Presentation.html
mv neo_slide_9_bmc.html solution_journey/12_Business_Model_Framework.html

# Client Presentations (formerly Integrated Slides)
mv neo_slide_integrated_1.html client_presentations/Executive_Briefing.html
mv neo_slide_integrated_2.html client_presentations/Security_Assessment.html
mv neo_slide_integrated_3.html client_presentations/Technical_Deep_Dive.html
mv neo_slide_integrated_4.html client_presentations/Solution_Architecture.html
mv neo_slide_integrated_5.html client_presentations/Financial_Impact.html
mv neo_slide_integrated_6.html client_presentations/Implementation_Roadmap.html
mv neo_slide_integrated_7.html client_presentations/Operational_Integration.html
mv neo_slide_integrated_8.html client_presentations/BANT_Framework.html
mv neo_slide_integrated_9.html client_presentations/Next_Steps.html

# Resources & Tools (formerly Tools & Templates)
mv value_metrics_handbook.html resources_tools/Value_Calculator.html
mv tco_calculator.html resources_tools/TCO_Calculator.html
mv implementation_guide.html resources_tools/Implementation_Guide.html
mv migration_journey_map.html resources_tools/Migration_Planner.html

# Discovery Assets (formerly Assessments)
mv customer_discovery_questionnaire.html discovery_assets/Security_Assessment_Questionnaire.html
mv onboarding_progress_tracker.html discovery_assets/Deployment_Readiness_Checklist.html
mv qualification_workbook.html discovery_assets/Success_Metrics_Framework.html
mv assessment_template.html discovery_assets/Stakeholder_Analysis_Template.html

echo "Files renamed successfully!" 