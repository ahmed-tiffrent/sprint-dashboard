# Sprint Dashboard

A React dashboard that turns a Scrum burndown spreadsheet into an interactive view of sprint progress. Built as MSc coursework at the University of Brighton.

<!-- Placeholder: add a screenshot of the dashboard here -->

## How it works

- `parser.cjs` reads the module's Excel template (`projectscrumburndownchart.xlsx`) with SheetJS and converts each sheet to JSON. The sprint and backlog data in the app was taken from it.
- The dashboard shows total, completed and remaining hours and a progress percentage for the selected sprint.
- A burndown chart compares the ideal line with actual remaining effort across the 10 working days of a sprint, recalculated whenever an hour is changed.
- Tasks can be edited in a daily hours table or moved between To Do, In Progress and Done on a drag-and-drop board.
- A product backlog view lists each item with its priority, planned sprint, estimate, status and notes.

## Tech

- JavaScript, React, Vite
- Recharts for the charts
- SheetJS (`xlsx`) for reading the spreadsheet

## Run it locally

```bash
npm install
npm run dev
```

To regenerate the data from a spreadsheet:

```bash
node parser.cjs projectscrumburndownchart.xlsx
```

---

Ahmed Amine Tiffrent · [Portfolio](https://www.aminetiffrent.com/portfolio)
