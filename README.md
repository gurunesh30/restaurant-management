# 🍽️ Restaurant Website

A modern, full-stack restaurant website built with **React**, **TypeScript**, and **Express.js**. Features a beautiful dark-themed UI with smooth animations, online menu browsing, table reservations, a contact form, and a full admin dashboard for managing restaurant operations.

---

## 📸 Features

- **Home Page** — Hero section with scroll animations and a welcoming landing experience
- **Menu Page** — Browse dishes fetched from the database in real time
- **Reservations** — Book a table with date, time, and guest details
- **Contact** — Send inquiries through a contact form
- **Admin Panel** — Secure login and dashboard for managing menu items, reservations, and contacts
- **Dark Theme** — Sleek, modern dark UI throughout the app
- **Responsive Design** — Optimized for desktop and mobile devices
- **Animated Navigation** — Tubelight-style navbar with Framer Motion transitions

---

## 🛠️ Tech Stack

### Frontend (Client)

| Technology           | Purpose                        |
| -------------------- | ------------------------------ |
| React 19             | UI library                     |
| TypeScript           | Type-safe JavaScript           |
| Vite 7               | Build tool & dev server        |
| Tailwind CSS 4       | Utility-first styling          |
| Framer Motion        | Animations & transitions       |
| React Router DOM v6  | Client-side routing            |
| Axios                | HTTP client for API calls      |
| Lucide React         | Icon library                   |
| Bootstrap 5          | Layout utilities               |

### Backend (Server)

| Technology    | Purpose                          |
| ------------- | -------------------------------- |
| Node.js       | Runtime environment              |
| Express.js    | Web framework                    |
| MongoDB       | NoSQL database                   |
| Mongoose      | MongoDB ODM                      |
| dotenv        | Environment variable management  |
| CORS          | Cross-origin resource sharing    |

---

## 📁 Project Structure

```
restraunt-website/
├── client/                      # Frontend source
│   └── src/
│       ├── assets/              # Static assets (images, etc.)
│       ├── components/          # Reusable React components
│       │   ├── Footer.tsx
│       │   ├── Navigation.tsx
│       │   ├── RouteLoader.tsx
│       │   └── ui/              # UI primitives (shadcn-style)
│       │       ├── container-scroll-animation.tsx
│       │       ├── timeline.tsx
│       │       └── tubelight-navbar.tsx
│       ├── lib/                 # Utility functions
│       ├── pages/               # Page-level components
│       │   ├── Home.tsx
│       │   ├── Menu.tsx
│       │   ├── Reservation.tsx
│       │   ├── Contact.tsx
│       │   └── admin/
│       │       ├── Login.tsx
│       │       └── Dashboard.tsx
│       ├── App.tsx              # Root component with routes
│       ├── main.tsx             # Entry point
│       ├── App.css
│       └── index.css            # Global styles & CSS variables
├── server/                      # Backend source
│   ├── database/
│   │   ├── index.js             # Barrel export
│   │   ├── config.js            # DB configuration
│   │   └── connection.js        # MongoDB connection logic
│   ├── middleware/
│   │   └── asyncHandler.js      # Async error wrapper
│   ├── models/
│   │   ├── MenuItem.js          # Menu item schema
│   │   ├── Reservation.js       # Reservation schema
│   │   └── Contact.js           # Contact message schema
│   ├── routes/
│   │   ├── menuRoutes.js        # CRUD for menu items
│   │   ├── reservationRoutes.js # CRUD for reservations
│   │   └── contactRoutes.js     # CRUD for contact messages
│   ├── server.js                # Express app entry point
│   ├── package.json
│   └── .env                     # Environment variables (not tracked)
├── index.html                   # HTML entry point
├── package.json                 # Client dependencies & scripts
├── vite.config.ts               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── postcss.config.js            # PostCSS configuration
└── .gitignore
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js** (v18 or higher recommended) — [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (v6+) — [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/atlas)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd restraunt-website
```

### 2. Install Client Dependencies

From the project root directory:

```bash
npm install
```

### 3. Install Server Dependencies

```bash
cd server
npm install
cd ..
```

### 4. Configure Environment Variables

Create a `.env` file inside the `server/` directory:

```bash
# server/.env

# MongoDB Connection String
MONGO_URI=mongodb://<username>:<password>@127.0.0.1:27017/<database_name>?authSource=admin

# Express Server Port
PORT=5000
```

> **Note:** Replace `<username>`, `<password>`, and `<database_name>` with your actual MongoDB credentials. If running MongoDB locally without authentication, you can use:
> ```
> MONGO_URI=mongodb://127.0.0.1:27017/restaurantDB
> ```

### 5. Set Up MongoDB

#### Option A: Local MongoDB

1. Install and start MongoDB Community Server
2. (Optional) Create an authenticated user:
   ```js
   // In the MongoDB shell (mongosh)
   use admin
   db.createUser({
     user: "yourUsername",
     pwd: "yourPassword",
     roles: [{ role: "readWrite", db: "yourDatabaseName" }]
   })
   ```
3. Update `MONGO_URI` in `server/.env` accordingly

#### Option B: MongoDB Atlas (Cloud)

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Whitelist your IP address
3. Create a database user
4. Copy the connection string and paste it into `MONGO_URI` in `server/.env`

---

## ▶️ Running the Application

You need **two terminals** — one for the frontend and one for the backend.

### Start the Backend Server

```bash
cd server
npm run dev
```

The API server will start at **http://localhost:5000**

### Start the Frontend Dev Server

From the project root:

```bash
npm run dev
```

The Vite dev server will start at **http://localhost:5173** (default)

---

## 🔗 API Endpoints

| Method         | Endpoint              | Description                 |
| -------------- | --------------------- | --------------------------- |
| `GET / POST`   | `/api/menu`           | List all / Add a menu item  |
| `GET / PUT / DELETE` | `/api/menu/:id`  | Get / Update / Delete item  |
| `GET / POST`   | `/api/reservations`   | List / Create a reservation |
| `GET / PUT / DELETE` | `/api/reservations/:id` | Get / Update / Delete reservation |
| `GET / POST`   | `/api/contacts`       | List / Submit a message     |
| `PUT / DELETE`  | `/api/contacts/:id`  | Update / Delete a message   |
| `GET`          | `/api/health`         | Server health check         |

---

## 📜 Available Scripts

### Client (root `package.json`)

| Script          | Command            | Description                       |
| --------------- | ------------------ | --------------------------------- |
| `npm run dev`   | `vite`             | Start Vite development server     |
| `npm run build` | `tsc -b && vite build` | Type-check & build for production |
| `npm run lint`  | `eslint .`         | Run ESLint                        |
| `npm run preview` | `vite preview`   | Preview production build locally  |

### Server (`server/package.json`)

| Script          | Command                | Description                        |
| --------------- | ---------------------- | ---------------------------------- |
| `npm run dev`   | `node --watch server.js` | Start server with auto-reload    |
| `npm start`     | `node server.js`       | Start server (production)          |

---

## 🧩 Pages & Routes

| Route                | Page             | Description                    |
| -------------------- | ---------------- | ------------------------------ |
| `/`                  | Home             | Landing page with hero section |
| `/menu`              | Menu             | Browse restaurant menu         |
| `/reservation`       | Reservation      | Book a table                   |
| `/contact`           | Contact          | Send a message                 |
| `/admin`             | Admin Login      | Admin authentication           |
| `/admin/dashboard`   | Admin Dashboard  | Manage menu, reservations, contacts |

---

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is private and not currently licensed for public distribution.
