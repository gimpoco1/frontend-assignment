# Overview

This project is a Project Management App built using React with Chakra UI for styling and TypeScript for type safety. The app allows users to manage projects, filter them using a search bar, sort them based on various criteria, add new projects, and save projects in the browser's local storage for persistence. It also features light and dark modes for better user experience, and has been developed with unit tests to ensure reliability.

# Features

### Add Projects: 
You can add new projects using the "Add Project" button.

### Search Projects: 
Use the search bar to filter projects by name.

### Sort Projects: 
Sort projects by different criteria (alphabetical, by date, etc.).

### Remove Projects: 
You can remove projects by clicking on the delete button.

### Local Storage: 
Projects are saved to the browser's local storage, so they persist between page reloads.

### Light/Dark Mode: 
Switch between light and dark themes using the toggle button.

# Technologies Used

### React: 
JavaScript library for building user interfaces.
### Chakra UI: 
A simple and modular component library to style your React apps.
### TypeScript: 
A statically typed superset of JavaScript for improved developer experience and code reliability.
### React Testing Library: 
For unit testing of components and user interaction.
### Jest: 
Test framework for writing and running unit tests.
### Local Storage: 
Used for storing projects persistently in the browser.

# Prerequisites

### Node.js: 
Ensure you have Node.js installed on your machine.
npm or yarn: You will need either npm (comes with Node.js) or yarn as the package manager.

# Getting Started
1. Clone the Repository

git clone https://github.com/gimpoco1/frontend-assignment.git
cd project-management-app

2. Install Dependencies
Run the following command to install all necessary dependencies:

npm install
 or
yarn install

3. Start the Development Server
To start the development server, run the following command:

npm start
 or
yarn start

This will start the app and open it in your default browser. You can also manually visit http://localhost:3000 in your browser.

4. Build for Production
If you'd like to build the app for production, run:

npm run build
 or
yarn build

5. Testing
This project includes unit tests to ensure key functionality is working as expected. The testing suite is built with Jest and React Testing Library.

Running Tests
To run the test suite, execute the following command:

npm test
 or
yarn test



# Functionality

1. Adding a Project
Click on the "Add Project" button to add a new project.
Fill out the project details in the modal, and the project will appear in the list.
The project data is saved to localStorage for persistence.

2. Searching for a Project
Enter a search term in the search box to filter projects based on their name.

3. Sorting Projects
You can sort projects using the dropdown menu by various criteria like project name, creation date, etc.

4. Removing a Project
You can remove any project by clicking the delete icon on the project card.

5. Light/Dark Mode Toggle
Use the moon/sun icon in the top right corner to toggle between light and dark modes.

----------------------------------------------
Local Storage
Projects are automatically saved to the browser's local storage.
On page reload, the app retrieves projects from localStorage. If no data is found, default projects are loaded.
The sort order is also saved in localStorage.
### Troubleshooting
(Common Issues)
Missing Projects after Reload: Ensure that your browser supports local storage and that it hasn't been disabled. Check the browser's console for errors related to local storage.
Local Storage Corruption: If the data in local storage becomes corrupted, try clearing local storage by opening the browser console and running localStorage.clear().

Contributions
Feel free to fork the repository and submit pull requests for any improvements or bug fixes.

License
This project is licensed under the MIT License. See the LICENSE file for more details.