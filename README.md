# Disney Characters Dashboard (React)

## Project Overview

You have to create a new React project using the Disney REST API to build a dashboard application.

The dashboard should include the following UI components (you may add more if they improve the final result, such as buttons, ribbons, chips, unit tests, or documentation). Components can be custom-built or sourced from a UI library like Material UI.

### Required Technologies & Constraints

- Use **functional components only**
- Use an **external state management library** (e.g., Redux)

---

## Required UI Components

- Data Table
- Pie Chart (Highcharts)
- List of Elements
- Modal
- Form

---

## User Stories

### 1. Characters Table

**As a user**, I would like to be able to see and navigate through all Disney characters in a table.

#### Table Columns

- Character name
- Number of TV shows the character participates in
- Number of video games the character participates in
- Names of allies
- Names of enemies

#### Table Functionality

- The user should be able to select how many characters to display per page:
  - Options: **10, 20, 50, 100, 200, 500**
- Default display: **50 characters per page**
- The user should be able to:
  - Navigate to the next and previous pages
  - Search for a character across all available data
  - Filter characters by participation in a TV show
  - Sort characters by name (per page)

---

### 2. Character Details Modal

**As a user**, I would like to view detailed information about a character by selecting a row in the table.

#### Modal Contents

- Character name
- Character image
- List of TV shows the character appears in
- List of video games the character appears in

---

### 3. Pie Chart Visualization

**As a user**, I would like to see a pie chart representing the characters displayed in the current table page.

#### Chart Requirements

- Each slice represents the **number of films** a character participates in
- On hover:
  - Display the **percentage** of the slice
  - Display the **list of films**
- The user should be able to:
  - Export chart data as an **.xlsx file**
- The chart should:
  - Automatically update whenever the table view changes (pagination, filtering, search, etc.)

---

## Additional Notes

- You are encouraged to enhance the UI/UX with extra components (e.g., chips, filters, toolbars)
- Consider adding:
  - Unit tests
  - Documentation
  - Error handling
  - Loading states

---

## Goal

Deliver a clean, responsive, and user-friendly dashboard that effectively visualizes and manages Disney character data using modern React practices.

---

---

## Technical Notes

- Checkout the main branch, open a bash and navigate to folder. Run `npm install` before you start the application.
- How to start the application: `npm run dev`
- How to start the unit tests: `npx cypress run` AFTER you start the application. It listens to localhost:5173. Click on E2E testing on the browser window that opens, select your preffered browser, click on the HomePage available test and the tests will start automatically.

```

```
