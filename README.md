# FitPlan Hub - MERN Stack Assessment

> A comprehensive fitness marketplace platform connecting certified trainers with users seeking professional workout plans.

FitPlan Hub is a full-stack web application that demonstrates complex business logic, including Role-Based Access Control (RBAC), subscription-based content locking, and a personalized social feed.


---

## 🚀 Key Features

### 🔐 Authentication & Security
- **Role-Based Auth:** Distinct dashboards and permissions for **Trainers** vs. **Users**.
- **Secure Access:** JWT-based authentication with protected routes.
- **Password Security:** All passwords are hashed using Bcrypt.

### 💼 For Trainers (CMS)
- **Dashboard:** Create, Edit, and Delete fitness plans.
- **Content Management:** Manage "Public Preview" data vs. "Premium Hidden" content.
- **Analytics:** View and manage their portfolio of workout protocols.

### 🛒 For Users (Marketplace)
- **Subscription Model:** Users can view previews of plans but must "Subscribe" (Simulated Payment) to unlock the full workout content.
- **Social Feed:** Follow favorite trainers to see their latest plans in a personalized feed.
- **Smart Access:** Content instantly unlocks upon successful subscription without page reloads.

---

## 🛠 Tech Stack

**Frontend:**
- React.js (Vite)
- Tailwind CSS (Styling)
- Axios (API Communication)
- React Router DOM (Navigation)

**Backend:**
- Node.js & Express.js
- MongoDB & Mongoose (Database)
- JWT (JSON Web Tokens)
- Bcrypt.js (Encryption)

---

## ⚙️ Installation & Setup Guide

Follow these steps to run the project locally.

### 1. Clone the Repository
git clone [[https://github.com/YOUR_USERNAME/FitPlanHub.git]](https://github.com/adityaraj-13/TRUEiGTECH.git)
cd FitPlanHub

### Backend
cd backend
npm install

# Create a .env file in the server folder (Optional, defaults used in code)
# PORT=8080
# DB_URL=your_mongodb_connection_string

npm run dev

### Frontend
cd Frontend/fitplan
npm install
npm run dev

*** User login and SignIn
Role,        Email,                Password,        Access
Trainer,    trainer@test.com,    password123,       "Can Create/Edit Plans, View Dashboard"
User,       user@test.com,       password123,       "Can Buy Plans, Follow Trainers, View Feed"

How to Test the Logic
Login as Trainer: Go to the Dashboard and create a plan (e.g., "30 Day Abs"). Add some text in the "Premium Content" box.

Login as User: Go to the Marketplace. You will see the plan, but the content will be LOCKED 🔒.

Simulate Payment: Click the "Unlock Access" button.

Verify: The page will refresh, the lock will vanish, and the premium content will be visible!

