# 🥗 Food Donation Platform - Frontend

**Live Website:** [https://deft-stroopwafel-641c61.netlify.app/](https://deft-stroopwafel-641c61.netlify.app/)

This is the **frontend** of a full-stack **Food Donation Platform** built with **React**. The platform supports **role-based access** for Admins, Restaurants, Charities, and Users, offering secure authentication, smooth UI, and dynamic food-sharing functionalities.

---

## 🚀 Features

- 🥗 Browse and request food donations
- 🏢 Role-based dashboards (Admin, Restaurant, Charity)
- 🔐 Authentication via Firebase
- ✅ Role verification system with admin approval
- ⭐ Feature donations on homepage
- 📦 Manage pickups and reviews
- 🎯 Real-time data management using React Query

---

## 🛠️ Tech Stack

- **React**
- **React Router DOM**
- **Tailwind CSS + DaisyUI**
- **Axios**
- **Firebase Auth**
- **SweetAlert2 & React Toastify**
- **TanStack React Query**

---


## 📦 Installation


🌐 Environment Variables
Create a .env file:

VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_SERVER_BASE_API=http://localhost:5000


| Role       | Permissions                          |
| ---------- | ------------------------------------ |
| Admin      | Verify roles, manage users/donations |
| Restaurant | Add/manage donations                 |
| Charity    | Request/receive food                 |
| User       | View donations, request charity role |

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/food-donation-platform-frontend.git
   cd food-donation-platform-frontend
   npm install
