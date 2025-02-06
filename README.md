# SpaceX Launches - Frontend Homework Assignment

This is a Next.js project built with TypeScript that displays SpaceX launch data from the public SpaceX API. The app not only shows details about each launch but also lets you update the launch cost and payload type with optimistic UI updates. Plus, it supports multi-tab syncing and persists changes across page refreshes.

## Features

- **Launch List**: Displays a list of SpaceX launches with:

  - Mission name
  - Flight number
  - Launch date
  - Payload count (only counting Satellite payloads – always 1 or 0)
  - Time elapsed since launch (in hours)
  - Cost per launch

- **Total Cost**: Shows the total cost of all launches at the top.

- **Optimistic Updates**: Update launch cost and payload type with immediate UI feedback. If an update fails, you'll be prompted to confirm a rollback.

- **Multi-Tab Sync**: Changes are broadcast to other open tabs using the Broadcast Channel API.

- **Persistent Changes**: Updates are saved in local storage so that they remain even after a page refresh.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) installed on your machine.

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd <repository-folder>
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

### Running the Development Server

Start the server with:

```bash
npm run dev
# or
yarn dev
```

Then open http://localhost:3000 in your browser to see the app in action.

### Building for Production

Build the project:

```bash
npm run build
# or
yarn build
```

Run the production server:

```bash
npm start
# or
yarn start
```

## About the Assignment

This assignment was to create a frontend application that:

- Retrieves and displays SpaceX launch data (using https://api.spacexdata.com/v3/launches)
- Calculates and shows details such as mission name, flight number, launch date, payload count (only Satellite payloads), elapsed time in hours, and cost per launch
- Displays the total cost of all launches at the top
- Allows you to update launch cost and payload type. These updates use an optimistic update strategy so the UI responds immediately
- In our mocked API calls, updates take 5 seconds and then throw an error—at which point the app prompts you to revert the changes
- Keeps changes in sync across multiple browser tabs using the Broadcast Channel API
- Persists changes across page refreshes using the Web Storage API

## Learn More

- [Next.js Documentation](https://nextjs.org/docs) – Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) – A hands-on tutorial
- [SpaceX API Docs](https://github.com/r-spacex/SpaceX-API) – Details about the API used in this project

## Feedback

Feel free to open issues or submit pull requests if you have any suggestions or improvements.
