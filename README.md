# KRL Schedule Web Application

## Overview
This README provides a comprehensive guide for setting up and using the KRL (Commuterline) Schedule Web Application. This app offers up-to-date and accurate schedules for commuter trains between various stations, including Yogyakarta and Palur. The app is built with SvelteKit and leverages Tailwind CSS for styling and Svelte for state management.

### Features
- **Real-time Schedule Updates:** Fetches and displays the latest train schedules from the official Commuterline Indonesia API.
- **Dynamic Station Selection:** Users can choose their departure and arrival stations from a predefined list.
- **Favorites Management:** Users can save and manage their favorite routes for quick access.
- **Time Adjustment:** Option to view schedules based on current time or a predefined time frame.
- **Responsive Design:** Tailored to provide a seamless experience across various devices.

## Installation

### Prerequisites
- Node.js
- pnpm (Node Package Manager)
- Git (optional)

### Setup
1. **Clone the Repository (Optional)**
   ```bash
   git clone [repository URL]
   cd [repository name]
   ```
2. **Install Dependencies**
   ```bash
   pnpm install
   ```

### Running the Application
- **Development Mode**
  ```bash
  pnpm run dev
  ```
  This command runs the app in development mode. Open `http://localhost:3000` to view it in the browser.

- **Production Mode**
  ```bash
  pnpm run build
  pnpm run start
  ```
  This builds the app for production and serves the production build.

## Usage

### Selecting Stations
- Choose the departure and arrival stations from the dropdown lists.
- The schedule will update automatically based on your selection.

### Viewing and Managing Favorites
- Save frequently used routes as favorites for easy access.
- Manage and rearrange your favorites as needed.

### Adjusting Time
- Switch between current time and a custom time range to view different schedules.

### Accessibility
- The application is designed with accessibility in mind, ensuring a user-friendly experience for all.

## Contributing
Contributions to improve the application are welcome. Please follow these steps to contribute:
1. Fork the repository.
2. Create a new branch for your feature.
3. Make your changes.
4. Submit a pull request with a comprehensive description of your updates.

## Feedback and Support
For any feedback or support issues, please contact us via [Twitter](https://twitter.com/intent/tweet?screen_name=sarbeh_&text=Feedback).

## License
This project is licensed under the [MIT License](LICENSE.md).

---

### Additional Notes:
- This README assumes that the repository URL and other specifics will be filled in by the developer.
- Tailwind CSS, Svelte, and SvelteKit are assumed to be part of the tech stack as mentioned.
- Local storage is used for managing favorites, as indicated in the script.
