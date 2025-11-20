SeriousERP Customer Intake Form
================================

WHAT'S INCLUDED:
----------------
1. customer-intake-form.html  - Complete form with all fields
2. form-styles.css           - All styling (colors, layout, animations)
3. form-navigation.js        - Step navigation and slider effects

FORM FIELDS:
------------
Step 1 - Contact Info:
  - First Name, Last Name
  - Work Email, Phone Number
  - Company Name, Job Title
  - Consent Checkbox

Step 2 - Current Software:
  - DME Software (multi-select)
  - CSRs, Billers, Dispatchers, Warehouse counts (sliders)
  - Equipment loss value (slider)
  - Pain points (textarea)

Step 3 - Business Info:
  - Rent equipment (radio)
  - Bill facilities (radio)
  - Bill insurance (radio)
  - Techs/drivers count (dropdown)
  - Patient census (dropdown)
  - Additional comments (textarea)

HOW TO INTEGRATE:
-----------------
1. Copy all 3 files to your project
2. Update form action: <form action="/your-submit-endpoint">
3. Add your form processing logic on the backend

CUSTOMIZATION:
--------------
- Colors: Edit form-styles.css (search for color codes like #667eea)
- Fields: Add/remove fields in customer-intake-form.html
- Validation: Add your own validation rules
- Steps: Currently 3 steps, easy to add more in HTML + JS

JAVASCRIPT:
-----------
The JS only handles:
  - Showing/hiding steps (visual transitions)
  - Updating slider value displays
  - Back/Next button visibility

No validation or data processing - your backend handles that.

TESTING:
--------
Open customer-intake-form.html in a browser to see the form in action.
Change the form action to your actual endpoint before deploying.
