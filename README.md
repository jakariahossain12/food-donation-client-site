
## website link : 
https://deft-stroopwafel-641c61.netlify.app/

# 🌍 Food Donation Platform — Frontend

This is the frontend my full-stack food donation platform that connects restaurants, charities, and users to reduce food waste and support communities. Built with **React**, **Vite**, **Firebase**, **Stripe**, and **Tanstack Query**, it supports secure authentication, role-based dashboards, donation management, and real-time analytics.

---

## 🚀 Features

### 🔐 Authentication
- Email/password registration and login via Firebase
- Google social login
- JWT token handling with Axios interceptor
- Role-based route protection

### 🧑‍💼 User Dashboard
- View profile and transaction history
- Request Charity role (Stripe payment)
- Save donations to favorites
- Submit reviews

### 🏪 Restaurant Dashboard
- Add, update, and delete donations
- View charity requests
- Track donation statistics (Recharts)

### 🧑‍🤝‍🧑 Charity Dashboard
- Request donations
- Confirm pickups
- Submit reviews
- View received donations and transaction history

### 🛡️ Admin Dashboard
- Manage donations, users, role requests, and charity requests
- Feature verified donations for homepage

---

## 🧰 Tech Stack

| Layer        | Tech Used                          |
|--------------|------------------------------------|
| Framework    | React + Vite                       |
| Auth         | Firebase Auth + JWT                |
| API Calls    | Axios with interceptors            |
| Data Fetching| Tanstack Query                     |
| Charts       | Recharts                           |
| Payments     | Stripe Checkout                    |
| Image Upload | ImgBB API                          |
| Routing      | React Router DOM                   |
| State Mgmt   | Context API      |

---

🔄 Axios Interceptor
- Automatically attaches JWT token to requests
- Handles 401 errors and redirects to login


## 🔑 Environment Variables

Create a `.env` file in the frontend root:

```env
VITE_apiKey=AIzaSyAfQ0utIfpo6MV9ocDqmP0W2j2qGHQPhDE
VITE_authDomain=assagment-12.firebaseapp.com
VITE_projectId=assagment-12
VITE_storageBucket=assagment-12.firebasestorage.app
VITE_messagingSenderId=790489930376
VITE_appId=1:790489930376:web:8c8c21684ec6b24ed9dd3d

VITE_IMAGEBB_KEY=c6bc58a5f62a3b356742c2a308bdd44d
VITE_SERVER_BASE_API=http://localhost:4000


# Install dependencies
npm install

# Start development server
npm run dev


