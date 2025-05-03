/**
 * Black Armor AI Custom Chatbot Commands
 * This file defines custom commands for each page of the website
 */

// Global commands available on all pages
const globalCommands = [
  { command: 'help', label: 'Help', color: '#4285F4' },
  { command: 'contact_sales', label: 'Contact Sales', color: '#0F9D58' },
  { command: 'request_demo', label: 'Request Demo', color: '#DB4437' }
];

// Global responses available on all pages
const globalResponses = {
  'help': 'I can answer questions about Black Armor AI drone security solutions. Try asking about specific features, pricing, implementation details, or technical requirements.',
  'contact_sales': 'I\'ll connect you with our sales team. Please provide your name, email, and company name, and a representative will contact you within 24 hours.',
  'request_demo': 'I\'d be happy to arrange a demonstration of our drone security system. Please provide your contact information and preferred date, and we\'ll schedule a personalized demo for your organization.',
  'default_message': 'Welcome to Black Armor AI. How can I assist you with our drone security solutions today?'
};

// SOLUTION JOURNEY PAGES
const solutionJourneyCommands = {
  // 01_Solution_Overview.html
  'solution_overview': [
    ...globalCommands,
    { command: 'key_features', label: 'Key Features', color: '#4285F4' },
    { command: 'use_cases', label: 'Use Cases', color: '#0F9D58' },
    { command: 'solution_benefits', label: 'Solution Benefits', color: '#DB4437' }
  ],
  
  // 02_Security_Challenges.html
  'security_challenges': [
    ...globalCommands,
    { command: 'common_vulnerabilities', label: 'Common Vulnerabilities', color: '#4285F4' },
    { command: 'threat_landscape', label: 'Threat Landscape', color: '#0F9D58' },
    { command: 'industry_challenges', label: 'Industry Challenges', color: '#DB4437' }
  ],
  
  // 03_Target_Customers.html
  'target_customers': [
    ...globalCommands,
    { command: 'ideal_customer_profile', label: 'Ideal Customer Profile', color: '#4285F4' },
    { command: 'customer_success_stories', label: 'Success Stories', color: '#0F9D58' },
    { command: 'industry_applications', label: 'Industry Applications', color: '#DB4437' }
  ],
  
  // 04_Technical_Architecture.html
  'technical_architecture': [
    ...globalCommands,
    { command: 'drone_specifications', label: 'Drone Specifications', color: '#4285F4' },
    { command: 'ai_capabilities', label: 'AI Capabilities', color: '#0F9D58' },
    { command: 'integration_options', label: 'Integration Options', color: '#DB4437' }
  ],
  
  // 05_ROI_Analysis.html
  'roi_analysis': [
    ...globalCommands,
    { command: 'cost_savings', label: 'Cost Savings', color: '#4285F4' },
    { command: 'roi_calculator', label: 'ROI Calculator', color: '#0F9D58' },
    { command: 'investment_timeline', label: 'Investment Timeline', color: '#DB4437' }
  ],
  
  // 06_Implementation_Process.html
  'implementation_process': [
    ...globalCommands,
    { command: 'implementation_phases', label: 'Implementation Phases', color: '#4285F4' },
    { command: 'deployment_timeline', label: 'Deployment Timeline', color: '#0F9D58' },
    { command: 'customer_responsibilities', label: 'Customer Responsibilities', color: '#DB4437' }
  ],
  
  // 07_Next_Steps.html
  'next_steps': [
    ...globalCommands,
    { command: 'getting_started', label: 'Getting Started', color: '#4285F4' },
    { command: 'assessment_process', label: 'Assessment Process', color: '#0F9D58' },
    { command: 'pilot_program', label: 'Pilot Program', color: '#DB4437' }
  ],
  
  // 08_BANT_Assessment.html
  'bant_assessment': [
    ...globalCommands,
    { command: 'bant_framework_details', label: 'BANT Framework Details', color: '#4285F4' },
    { command: 'qualification_criteria', label: 'Qualification Criteria', color: '#0F9D58' },
    { command: 'implementation_strategies', label: 'Implementation Strategies', color: '#DB4437' }
  ],
  
  // 09_Business_Model_Canvas.html
  'business_model_canvas': [
    ...globalCommands,
    { command: 'value_propositions', label: 'Value Propositions', color: '#4285F4' },
    { command: 'revenue_streams', label: 'Revenue Streams', color: '#0F9D58' },
    { command: 'key_partnerships', label: 'Key Partnerships', color: '#DB4437' }
  ],
  
  // 10_Customer_Journey.html
  'customer_journey': [
    ...globalCommands,
    { command: 'journey_stages', label: 'Journey Stages', color: '#4285F4' },
    { command: 'pain_points', label: 'Pain Points', color: '#0F9D58' },
    { command: 'success_metrics', label: 'Success Metrics', color: '#DB4437' }
  ],
  
  // 11_Journey_Presentation.html
  'journey_presentation': [
    ...globalCommands,
    { command: 'presentation_highlights', label: 'Presentation Highlights', color: '#4285F4' },
    { command: 'key_messages', label: 'Key Messages', color: '#0F9D58' },
    { command: 'audience_takeaways', label: 'Audience Takeaways', color: '#DB4437' }
  ],
  
  // 12_Business_Model_Framework.html
  'business_model_framework': [
    ...globalCommands,
    { command: 'framework_components', label: 'Framework Components', color: '#4285F4' },
    { command: 'market_validation', label: 'Market Validation', color: '#0F9D58' },
    { command: 'growth_strategy', label: 'Growth Strategy', color: '#DB4437' }
  ]
};

// CLIENT PRESENTATIONS PAGES
const clientPresentationsCommands = {
  // Executive_Briefing.html
  'executive_briefing': [
    ...globalCommands,
    { command: 'executive_summary', label: 'Executive Summary', color: '#4285F4' },
    { command: 'business_impact', label: 'Business Impact', color: '#0F9D58' },
    { command: 'strategic_advantages', label: 'Strategic Advantages', color: '#DB4437' }
  ],
  
  // Financial_Impact.html
  'financial_impact': [
    ...globalCommands,
    { command: 'cost_analysis', label: 'Cost Analysis', color: '#4285F4' },
    { command: 'financial_benefits', label: 'Financial Benefits', color: '#0F9D58' },
    { command: 'budget_planning', label: 'Budget Planning', color: '#DB4437' }
  ],
  
  // Implementation_Roadmap.html
  'implementation_roadmap': [
    ...globalCommands,
    { command: 'roadmap_overview', label: 'Roadmap Overview', color: '#4285F4' },
    { command: 'milestone_planning', label: 'Milestone Planning', color: '#0F9D58' },
    { command: 'resource_requirements', label: 'Resource Requirements', color: '#DB4437' }
  ],
  
  // Next_Steps.html
  'next_steps': [
    ...globalCommands,
    { command: 'action_items', label: 'Action Items', color: '#4285F4' },
    { command: 'timeline_planning', label: 'Timeline Planning', color: '#0F9D58' },
    { command: 'stakeholder_roles', label: 'Stakeholder Roles', color: '#DB4437' }
  ],
  
  // Operational_Integration.html
  'operational_integration': [
    ...globalCommands,
    { command: 'integration_process', label: 'Integration Process', color: '#4285F4' },
    { command: 'operational_changes', label: 'Operational Changes', color: '#0F9D58' },
    { command: 'staff_training', label: 'Staff Training', color: '#DB4437' }
  ],
  
  // Security_Assessment.html
  'security_assessment': [
    ...globalCommands,
    { command: 'assessment_methodology', label: 'Assessment Methodology', color: '#4285F4' },
    { command: 'security_gaps', label: 'Security Gaps', color: '#0F9D58' },
    { command: 'recommendation_framework', label: 'Recommendation Framework', color: '#DB4437' }
  ],
  
  // Solution_Architecture.html
  'solution_architecture': [
    ...globalCommands,
    { command: 'architecture_overview', label: 'Architecture Overview', color: '#4285F4' },
    { command: 'system_components', label: 'System Components', color: '#0F9D58' },
    { command: 'data_flow', label: 'Data Flow', color: '#DB4437' }
  ],
  
  // Technical_Deep_Dive.html
  'technical_deep_dive': [
    ...globalCommands,
    { command: 'technical_specifications', label: 'Technical Specifications', color: '#4285F4' },
    { command: 'ai_algorithms', label: 'AI Algorithms', color: '#0F9D58' },
    { command: 'security_protocols', label: 'Security Protocols', color: '#DB4437' }
  ],
  
  // BANT_Framework.html
  'bant_framework': [
    ...globalCommands,
    { command: 'bant_methodology', label: 'BANT Methodology', color: '#4285F4' },
    { command: 'qualification_process', label: 'Qualification Process', color: '#0F9D58' },
    { command: 'decision_criteria', label: 'Decision Criteria', color: '#DB4437' }
  ]
};

// RESOURCES TOOLS PAGES
const resourcesToolsCommands = {
  // Value_Calculator.html
  'value_calculator': [
    ...globalCommands,
    { command: 'calculator_instructions', label: 'Calculator Instructions', color: '#4285F4' },
    { command: 'value_metrics', label: 'Value Metrics', color: '#0F9D58' },
    { command: 'customization_options', label: 'Customization Options', color: '#DB4437' }
  ],
  
  // TCO_Calculator.html
  'tco_calculator': [
    ...globalCommands,
    { command: 'detailed_cost_breakdown', label: 'Detailed Cost Breakdown', color: '#4285F4' },
    { command: 'custom_roi_calculation', label: 'Custom ROI Calculation', color: '#0F9D58' },
    { command: 'infrastructure_savings_analysis', label: 'Infrastructure Savings Analysis', color: '#DB4437' }
  ],
  
  // Migration_Planner.html
  'migration_planner': [
    ...globalCommands,
    { command: 'migration_methodology', label: 'Migration Methodology', color: '#4285F4' },
    { command: 'planning_framework', label: 'Planning Framework', color: '#0F9D58' },
    { command: 'risk_mitigation', label: 'Risk Mitigation', color: '#DB4437' }
  ],
  
  // Implementation_Guide.html
  'implementation_guide': [
    ...globalCommands,
    { command: 'phase_by_phase_implementation', label: 'Phase-by-Phase Implementation', color: '#4285F4' },
    { command: 'best_practices_by_phase', label: 'Best Practices By Phase', color: '#0F9D58' },
    { command: 'implementation_resources', label: 'Implementation Resources', color: '#DB4437' }
  ]
};

// DISCOVERY ASSETS PAGES
const discoveryAssetsCommands = {
  // Security_Assessment_Questionnaire.html
  'security_assessment_questionnaire': [
    ...globalCommands,
    { command: 'questionnaire_guidance', label: 'Questionnaire Guidance', color: '#4285F4' },
    { command: 'assessment_categories', label: 'Assessment Categories', color: '#0F9D58' },
    { command: 'response_interpretation', label: 'Response Interpretation', color: '#DB4437' }
  ],
  
  // Stakeholder_Analysis_Template.html
  'stakeholder_analysis_template': [
    ...globalCommands,
    { command: 'stakeholder_identification', label: 'Stakeholder Identification', color: '#4285F4' },
    { command: 'influence_mapping', label: 'Influence Mapping', color: '#0F9D58' },
    { command: 'engagement_strategies', label: 'Engagement Strategies', color: '#DB4437' }
  ],
  
  // Success_Metrics_Framework.html
  'success_metrics_framework': [
    ...globalCommands,
    { command: 'metrics_categories', label: 'Metrics Categories', color: '#4285F4' },
    { command: 'measurement_methodology', label: 'Measurement Methodology', color: '#0F9D58' },
    { command: 'benchmarking_approach', label: 'Benchmarking Approach', color: '#DB4437' }
  ],
  
  // Deployment_Readiness_Checklist.html
  'deployment_readiness_checklist': [
    ...globalCommands,
    { command: 'readiness_criteria', label: 'Readiness Criteria', color: '#4285F4' },
    { command: 'preparation_steps', label: 'Preparation Steps', color: '#0F9D58' },
    { command: 'validation_process', label: 'Validation Process', color: '#DB4437' }
  ]
};

// HOME PAGE
const homePageCommands = [
  ...globalCommands,
  { command: 'product_overview', label: 'Product Overview', color: '#4285F4' },
  { command: 'how_it_works', label: 'How It Works', color: '#0F9D58' },
  { command: 'pricing_info', label: 'Pricing Information', color: '#DB4437' },
  { command: 'case_studies', label: 'Case Studies', color: '#AA00FF' }
];

// Combine all page commands
const pageCommandsMap = {
  'index': homePageCommands,
  
  // Map solution_journey page commands
  '01_solution_overview': solutionJourneyCommands.solution_overview,
  '02_security_challenges': solutionJourneyCommands.security_challenges,
  '03_target_customers': solutionJourneyCommands.target_customers,
  '04_technical_architecture': solutionJourneyCommands.technical_architecture,
  '05_roi_analysis': solutionJourneyCommands.roi_analysis,
  '06_implementation_process': solutionJourneyCommands.implementation_process,
  '07_next_steps': solutionJourneyCommands.next_steps,
  '08_bant_assessment': solutionJourneyCommands.bant_assessment,
  '09_business_model_canvas': solutionJourneyCommands.business_model_canvas,
  '10_customer_journey': solutionJourneyCommands.customer_journey,
  '11_journey_presentation': solutionJourneyCommands.journey_presentation,
  '12_business_model_framework': solutionJourneyCommands.business_model_framework,
  
  // Map client_presentations page commands
  'executive_briefing': clientPresentationsCommands.executive_briefing,
  'financial_impact': clientPresentationsCommands.financial_impact,
  'implementation_roadmap': clientPresentationsCommands.implementation_roadmap,
  'next_steps': clientPresentationsCommands.next_steps,
  'operational_integration': clientPresentationsCommands.operational_integration,
  'security_assessment': clientPresentationsCommands.security_assessment,
  'solution_architecture': clientPresentationsCommands.solution_architecture,
  'technical_deep_dive': clientPresentationsCommands.technical_deep_dive,
  'bant_framework': clientPresentationsCommands.bant_framework,
  
  // Map resources_tools page commands
  'value_calculator': resourcesToolsCommands.value_calculator,
  'tco_calculator': resourcesToolsCommands.tco_calculator,
  'migration_planner': resourcesToolsCommands.migration_planner,
  'implementation_guide': resourcesToolsCommands.implementation_guide,
  
  // Map discovery_assets page commands
  'security_assessment_questionnaire': discoveryAssetsCommands.security_assessment_questionnaire,
  'stakeholder_analysis_template': discoveryAssetsCommands.stakeholder_analysis_template,
  'success_metrics_framework': discoveryAssetsCommands.success_metrics_framework,
  'deployment_readiness_checklist': discoveryAssetsCommands.deployment_readiness_checklist
};

// Default responses for each page's commands
const pageResponsesMap = {
  // Global responses available to all pages
  ...globalResponses,
  
  // HOME PAGE RESPONSES
  'product_overview': 'Black Armor AI offers an autonomous drone security solution that provides continuous aerial surveillance for enterprise facilities. Our system combines AI-powered threat detection, autonomous flight paths, and seamless integration with existing security infrastructure to deliver comprehensive protection with significantly reduced personnel costs.',
  'how_it_works': 'Our drone security system operates through a network of autonomous drones that patrol your facility according to programmed flight paths. Each drone is equipped with HD cameras, thermal imaging, and AI detection algorithms that identify potential threats. When a threat is detected, the system alerts security personnel and provides real-time video feeds and location data to enable rapid response.',
  'pricing_info': 'Black Armor AI solutions are customized based on your facility size, security requirements, and integration needs. Our enterprise packages typically start at $75,000 for initial implementation with annual subscription options for ongoing support and updates. We'd be happy to provide a detailed quote based on your specific requirements.',
  'case_studies': 'We've successfully implemented Black Armor AI drone security solutions across various industries. For example, a manufacturing client reduced security incidents by 87% while cutting security costs by 35%. A logistics company eliminated blind spots in their 120-acre facility, preventing inventory losses estimated at $450,000 annually. We can provide detailed case studies relevant to your specific industry upon request.',
  
  // Add all other page-specific responses here
  // For brevity, I've only included a few key examples. You would need to expand this with all responses.
  
  // ROI ANALYSIS PAGE
  'cost_savings': 'Black Armor AI drone security solutions typically deliver cost savings in three key areas: (1) Reduced security personnel requirements - clients average 35-60% reduction in guard staffing needs; (2) Infrastructure savings - elimination of fixed camera installations and associated maintenance; (3) Incident reduction - average 72% decrease in security incidents and associated costs. For your specific facility, we can calculate precise savings based on your current security expenses.',
  'roi_calculator': 'Our ROI calculator takes into account your current security costs, facility size, incident history, and specific security requirements to generate a detailed financial analysis. Most clients see positive ROI within 12-18 months, with 5-year ROI typically exceeding 300% for large facilities. Would you like me to walk you through the calculator inputs for your organization?',
  'investment_timeline': 'A typical Black Armor AI implementation follows this investment timeline: Initial assessment and planning (minimal investment), hardware deployment and integration (primary capital expenditure), and ongoing subscription for software updates, AI improvements, and support. We offer flexible financing options including leasing, which allows you to convert the investment entirely to operational expenses if preferred.',
  
  // IMPLEMENTATION PROCESS PAGE
  'implementation_phases': 'The Black Armor AI implementation follows this detailed phase-by-phase approach:\n\n**Phase 1: Assessment & Planning (2-3 weeks)**\n• Day 1-5: Site survey and environment mapping\n• Day 6-12: Flight path configuration and obstruction analysis\n• Day 13-15: Review of regulatory requirements specific to your location\n\n**Phase 2: Technical Setup (3-4 weeks)**\n• Week 1: Hardware installation and charging station deployment\n• Week 2: Network integration and security protocol configuration\n• Week 3-4: AI training for site-specific visual recognition models\n\n**Phase 3: Testing & Validation (2 weeks)**\n• Week 1: Controlled flight pattern testing and calibration\n• Week 2: Simulated threat scenarios and response validation\n\n**Phase 4: Training & Deployment (2-3 weeks)**\n• Week 1: Security team training and operational handoff\n• Week 2: Phased operational deployment with supervised flights\n• Week 3: Full operational capability and optimization\n\nPost-implementation, we provide quarterly system optimization and AI model updates specific to your evolving threat landscape.',
  'deployment_timeline': 'The typical deployment timeline for a Black Armor AI drone security solution spans 10-14 weeks from initial assessment to full operational capability. This timeline can be accelerated for urgent security needs or extended for complex integrations with legacy systems. Key factors affecting timeline include facility size, complexity of integration requirements, and regulatory approval processes for your specific location.',
  'customer_responsibilities': 'For a successful implementation, customers are responsible for: (1) Providing facility access and documentation for initial assessment; (2) Identifying key stakeholders from security, IT, and operations teams; (3) Ensuring network infrastructure meets minimum requirements; (4) Facilitating integration with existing security systems; and (5) Allocating staff time for training on the new system. Our implementation team will guide you through each step with detailed checklists and support.',
  
  // Add more responses for other pages and commands as needed
}; 