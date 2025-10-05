# **App Name**: VisorVacaciones

## Core Features:

- Employee Leave Visualization: Display employee leave data on a calendar interface.
- Leave Request Creation: Allow HR to submit new leave requests for employees.
- Note Creation: Allow HR to add notes to specific days on the calendar.
- Employee Data Fetch: Fetch and display employee information (name, ID, color) from the /api/employees endpoint.
- Leave Data Fetch: Fetch and display leave data from the /api/leaves endpoint.
- Dynamic Calendar Rendering: Render calendar events with employee-specific colors and names.

## Style Guidelines:

- Background color: Very light blue (#F7FAFC), same hue as primary, almost fully desaturated, for a calm, professional feel.
- Primary color: Light Indigo (#4F46E5) as the main color, for trustworthiness.
- Accent color: Teal (#06B6D4) as a secondary accent, for contrast.
- Font: 'Inter' sans-serif for all text, modern and readable. Note: currently only Google Fonts are supported.
- Modern layout with rounded cards and vibrant employee colors.  Employ side-by-side split in calendar cells based on employee events, but implement stacking as a fallback, should the display of events not work as anticipated.
- Include topbar with a prominent search bar for searching employes.