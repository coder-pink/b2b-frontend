# 🏭 B2B Manufacturer Marketplace

A full-stack B2B marketplace web application to browse and manage manufacturers. Includes search, filter, product listings, and a secure admin panel for managing data.

---

## 🚀 Features

### 👤 Authentication

- JWT-based login/logout functionality
- Dummy credentials for basic auth

### 🏠 Home Page

- Displays a list of manufacturers (fetched from backend API)
- Search bar to filter by company name
- Dropdown to filter by industry category

### 🏢 Manufacturer Detail Page

- Click a manufacturer to view details:
  - Company Name
  - Category
  - City
  - Product List (name + price)

### 🛠️ Admin Panel

- Login-protected admin dashboard
- Create, update, delete manufacturer records
- Add/edit product lists per manufacturer
  **Manufacturer Management**
  - Add new manufacturers with details (name, category, city)
  - Add multiple products per manufacturer (name + price)
  - Edit existing manufacturer records
  - Delete manufacturers
- 🔍 **Data Display**
  - View all manufacturers in a responsive, styled list

---

## 🧰 Tech Stack

### Frontend

- React + Tailwind CSS
- React Router DOM
- Axios
- JWT Authentication
- Deployed on **Vercel/Netlify**

### Backend

- Node.js + Express
- MongoDB + Mongoose
- CORS + JWT for protected routes
- Deployed on **Render/Railway**

---

## 🛠️ Setup Instructions

### Frontend

1. Clone the repo:

```bash
  git clone https://github.com/coder-pink/b2b-frontend.git
  cd frontend
```

2. Install dependencies:

```bash
npm install

```

3. Create a .env file:

```bash
PORT=5000
```

4. Run the App:

```bash
npm run dev
```

### Backend

1. Clone the repo:

```bash
git clone https://github.com/coder-pink/b2b-backend.git
cd frontend

```

2. Install dependencies:

```bash
   npm install

```

3. Create a .env file:

```bash
  PORT=5000
  MONGO_URI=MONGO_DB_URI
  JWT_SECRET=JWT_KEY
```

4. Run the App:

```bash
   npm run dev
```
