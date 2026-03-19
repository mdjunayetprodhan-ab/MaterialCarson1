# Design Comparison SPA

This project is a single-page application (SPA) that compares the design approaches of Matias Duarte and David Carson. It features two distinct sections: one that embodies Material Design principles and another that showcases Carson's chaotic style.

## Project Structure

```
design-comparison-spa
├── src
│   ├── main.js                # Entry point of the application
│   ├── sections
│   │   ├── material-section.js # Contains MaterialSection class for Material Design
│   │   └── carson-section.js   # Contains CarsonSection class for chaotic style
│   ├── styles
│   │   ├── material.css        # CSS styles for Material Design section
│   │   └── carson.css          # CSS styles for Carson's chaotic section
│   └── data
│       └── designers.js        # Data about Matias Duarte and David Carson
├── index.html                  # Main HTML file for the SPA
├── package.json                # Configuration file for npm
├── vite.config.js              # Configuration for Vite
└── README.md                   # Documentation for the project
```

## Features

- **Material Design Section**: 
  - Displays Matias Duarte's biography and principles of Material Design.
  - Interactive elements such as Ripple effects and Floating Action Buttons (FAB).

- **Carson's Chaotic Style Section**: 
  - Showcases David Carson's design approach with a chaotic layout.
  - Implements horizontal scrolling effects and a customized mouse cursor.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd design-comparison-spa
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Start the development server:
   ```
   npm run dev
   ```

5. Open your browser and go to `http://localhost:3000` to view the application.

## Goals

- To provide an interactive comparison of two influential designers and their unique approaches to design.
- To educate users about Material Design and the chaotic style of David Carson through engaging visuals and interactions.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue for any suggestions or improvements.