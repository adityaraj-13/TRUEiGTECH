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
git clone (https://github.com/adityaraj-13/TRUEiGTECH.git)
cd frontend/fitplan

### Backend
cd backend
npm install

# PORT=8080
# DB_URL=mongodb://localhost/fitplan

npm run dev

### Frontend
cd Frontend/fitplan
npm install
npm run dev

*** User login and SignIn
Role,        Email,                Password,        Access
Trainer,    trainer@test.com,    password123,       "Can Create/Edit Plans, View Dashboard"
User,       user@test.com,       password123,       "Can Buy Plans, Follow Trainers, View Feed"

### *** User Login and SignIn

| Role | Email | Password | Access Rights |
| :--- | :--- | :--- | :--- |
| **Trainer** | `trainer@test.com` | `password123` | Can Create/Edit Plans, View Dashboard |
| **User** | `user@test.com` | `password123` | Can Buy Plans, Follow Trainers, View Feed |

---
## How to Test the Logic

1. signup as a trainer then login go to dashboard
2. at dashboard a trainer gets create plan button click on it make a plan & create
3. you can have multiple trainer in same way and each can post their multiple plan along with premium content
4. then you can see the all listed plans in the market place
5. Now Signup & login as a new user you can see the marketplace with all the plans
6. A user can veiw but have to purchase the plan to get access to the premium content
7. user can follow and unfollow the trainer
8. My feed Section bring the related feed for the user
9. At home Purchased plans are seperated from the remaining
     
Login as Trainer: Go to the Dashboard and create a plan (e.g., "30 Day Abs"). Add some text in the "Premium Content" box.

Login as User: Go to the Marketplace. You will see the plan, but the content will be LOCKED 🔒.

Simulate Payment: Click the "Unlock Access" button.

Verify: The page will refresh, the lock will vanish, and the premium content will be visible!

## I have used MongoDB as database so Sir you have to add data to through frontend by connecting with local MongoDB it has two user Trainer & User 
# Trainer can login/signup goes to dashboard create a plan and edit it & delete it 
# user can view the Marketplace and check for the plan if want to purchase buy it and get the premium plan
## Images:
<img width="1351" height="632" alt="image" src="https://github.com/user-attachments/assets/c56ca33d-1b19-4bc9-84b8-c53ed882a7f9" />
<img width="1350" height="634" alt="image" src="https://github.com/user-attachments/assets/8e7d0ad9-75cc-4118-b8d5-ac6df77661dc" />

