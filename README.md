# Movie Grip - 🎬🍿 Online Movie Ticket Booking System

## Project Overview 🌐

**Movie Grip** is a sophisticated Online Movie Ticket Booking System developed using Angular. It provides users with a seamless and intuitive platform to browse, select, and book movie tickets. It focuses on delivering an exceptional user experience with responsive design and real-time updates.

## Technologies Used 🛠️

- **Angular:** 🎨 Frontend framework for building dynamic web applications.
- **HTML/CSS:** 🎨 Frontend design and styling.
- **TypeScript:** 💻 Superset of JavaScript, adding static types to the language.
- **JSON Server:** 📦 Backend emulation for storing user data and movie contents.

## Features ✨

- **User Authentication:** 🔒 Secure user authentication for personalized experiences.
- **Real-time Updates:** ⏱️ Implementing real-time data updates for a dynamic user interface.
- **Responsive Design:** 📱 Ensuring an intuitive and seamless user experience on various devices.

## How to Run ⚙️

1. **Install dependencies:** `npm install`
2. **Start the Angular development server:** `ng serve`
3. **Open a separate terminal and run the JSON Server:** `json-server --watch db.json`

Access the application at [http://localhost:4200](http://localhost:4200)

### Simplified Command
You can start both the Angular development server and the JSON Server concurrently with the following command:

```sh
npm start
```

This command is set up to run both servers using:

```json
"scripts": {
  "start": "concurrently \"npm run serve:angular\" \"npm run serve:json\"",
  "serve:angular": "ng serve",
  "serve:json": "json-server --watch db.json"
}
```

## Usage 🚀

- Click on the provided links to explore different sections of the application:
  - 🔐 Account creation and authentication.
  - 🎥 Browsing and selecting available movies.
  - 🔄 Real-time updates for an interactive experience.
  - 🎟️ Seamless booking process for a chosen movie.

## Note 📝

- Ensure that you have Node.js and Angular CLI installed.
- Customize the Angular components and styles based on your requirements.

Feel free to explore and enhance the application according to your needs! 🎉

You can access the live application 👉 [MovieTicketBooking](https://angular-movie-ticket-booking-e5jwfxeio-bhadrinath-ps-projects.vercel.app/).
