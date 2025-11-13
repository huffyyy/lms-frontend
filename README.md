# LMS Frontend

A clean, modern, and modular Learning Management System (LMS) Frontend, built using React + Vite.
This project is part of a full-stack LMS built with the MERN architecture (MongoDB, Express.js, React, Node.js), designed for scalability, reusability, and seamless learning workflows.

Fully responsive, fast, and production-ready.
Deployed Demo (frontend-only): https://demo-fe-lms.vercel.app/

---

## Preview

> ![App Preview](/public/assets/images/preview/image%209.png)  
> ![App Preview](/public/assets/images/preview/image%2011.png) > ![App Preview](/public/assets/images/preview/image%2010.png) > ![App Preview](/public/assets/images/preview/image%207.png) > ![App Preview](/public/assets/images/preview/image%208.png)

---

## Tech Stack

- React
- Vite
- TailwindCSS
- JavaScript (ES6+)

---

## Development Tools

- Git & GitHub
- Visual Studio Code
- Postman
- Figma

## Features

- **Learning Management Features**
  - Browse courses with thumbnails, categories, and descriptions
  - Detailed course page (video + text content)
  - Students list per course
  - Add/edit course content
- **Manager Dashboard**
  - Overview stats (students, courses)
  - Manage courses
  - Manage students
- **Student Dashboard**
  - View enrolled courses
  - Course preview (read/watch)
- **General Features**
  - Fully responsive dashboard layout
  - Clean UI components with Tailwind
  - Modular architecture for easy extension
  - Smooth navigation with React Router
  - Reusable components: cards, modals, inputs, layout wrappers
- **Performance**
  - Component-level code splitting
  - Instant HMR via Vite

---

## 🛠 Installation

```bash
# Clone the repository
git clone https://github.com/your-username/lms-frontend.git

# Navigate into the folder
cd lms-frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

## Project Structures

```bash
lms-frontend/
│
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Main pages
│   ├── layouts/           # Layout wrappers (dashboard, etc)
│   ├── routes/            # App routing
│   ├── assets/            # Images, icons, static assets
│   └── main.jsx           # Application entry point
│
├── public/
├── package.json
└── vite.config.js
```

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview the production build locally
```

## Roadmap (Planned Imporvements)

- Add role-based authentication (manager/student)
- Course enrollment flow
- Quiz and assignment pages
- User profile management
- API integration with backend service
- UI polish and accessibility improvements
