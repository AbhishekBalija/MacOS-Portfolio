# MacOS-Style Portfolio Web Application with Interactive Dock Interface

A React-based web application that recreates the MacOS desktop experience with an interactive dock, featuring a terminal, file explorer, photo gallery, and browser integration. The application provides an intuitive and familiar interface for showcasing portfolio content through native-feeling MacOS-style applications.

This project combines modern React practices with PrimeReact components to deliver a responsive and interactive user experience. The dock interface provides quick access to various applications including a fully functional terminal with custom commands, a Finder-style file explorer, and a photo gallery. The application features realistic MacOS window management with minimize, maximize, and close functionality, along with a top menubar displaying system information.

## Repository Structure
```
.
├── src/                          # Source code directory
│   ├── App.jsx                   # Main application component with dock and window management
│   ├── DockDemo.css             # Styles for dock interface and window components
│   ├── main.jsx                 # Application entry point with React initialization
│   └── service/                 # Service layer for data management
│       ├── NodeService.jsx      # File system structure data provider
│       └── PhotoService.jsx     # Photo gallery data provider
├── index.html                   # HTML entry point
├── package.json                 # Project dependencies and scripts
├── vite.config.js              # Vite build configuration
└── eslint.config.js            # ESLint configuration for code quality
```

## Usage Instructions
### Prerequisites
- Node.js (version 14.0.0 or higher)
- npm (version 6.0.0 or higher)
- Modern web browser with ES2020 support

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd macos-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

### Quick Start
1. After starting the development server, open your browser to `http://localhost:5173`
2. The dock interface will be visible at the bottom of the screen
3. Click on different dock icons to launch applications:
   - Terminal: Access portfolio information through command line
   - Finder: Browse through project structure
   - Photos: View image gallery
   - Safari: Access web links

### More Detailed Examples
```javascript
// Terminal Commands
date       // Display current date
about      // Show professional summary
skills     // List technical skills
projects   // View project portfolio
contact    // Display contact information
help       // Show available commands
```

### Troubleshooting
Common issues and solutions:

1. **Blank screen after installation**
   - Error: White screen with no content
   - Solution: Check if JavaScript is enabled in your browser
   - Verify console for any error messages
   - Try clearing browser cache and refreshing

2. **Dock icons not loading**
   - Error: Missing dock icons or broken images
   - Check network tab for failed image requests
   - Verify image paths in `App.jsx`
   - Ensure proper internet connectivity for CDN resources

3. **Terminal commands not responding**
   - Error: Terminal input not processing
   - Check browser console for JavaScript errors
   - Verify TerminalService initialization in `App.jsx`
   - Ensure command handlers are properly registered

## Data Flow
The application manages state and data flow through React hooks and service layers, transforming user interactions into visual responses through the MacOS-style interface.

```ascii
User Input → Dock/Window Manager → Service Layer → UI Components
     ↑                                                  ↓
     └──────────────── State Updates ─────────────────┘
```

Component interactions:
- Dock component manages application launching and window state
- Terminal service processes commands and returns formatted responses
- Photo service handles image gallery data and presentation
- Node service manages file system structure for Finder
- Window manager coordinates application states and positioning
- MenuBar maintains system status and provides global navigation