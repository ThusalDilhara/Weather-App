
# 🌤 Weather App

A full-stack weather application built with **React (frontend)** and **Express.js (backend)**.  
Users can log in, view real-time weather data, and authenticate securely using JWT.

---

## ✅ Features
- User authentication using AUth0
- Responsive UI (desktop + mobile)
- Weather information fetched from OpenWeatherMap API in real Time
- MFA enabled 

---

## 📂 Project Structure
```

weather-app/
│── backend/        # Express.js API
│   ├── package.json
│   ├── index.hs
│   └── Routes
│
│── frontend/       # React app
│   ├── package.json
│   ├── src/
│   └── components

````

---

## 🛠️ Tech Stack
- **Frontend:** React, Tailwind CSS, Auth0
- **Backend:** Node.js, Express.js, JWT Authentication
- **API:** OpenWeatherMap


---

## ⚙️ Setup Instructions

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/ThusalDilhara/Weather-App.git
````

---

### 2️⃣ Backend Setup (Express.js)

```bash
cd backend
npm install
```

* Create a `.env` file in `backend/`:

```env
OPENWEATHER_API_KEY=<your_openweathermap_api_key>
AUTH0_DOMAIN=<your_auth0_domain>
AUTH0_AUDIENCE=<your_auth0_audience>
```

* Run the backend locally:

```bash
npm start
```

> Backend will run at `http://localhost:5000`


### 3️⃣ Frontend Setup (React)

```bash
cd ../frontend
npm install
```
* Run the frontend locally:

```bash
npm run dev
```

> Frontend will run at `http://localhost:5173`


### 4️⃣ Access the App

* Open the **frontend URL** in your browser.
* Log in with your credentials
* enter the One time Password received to your authenticator app
* see real time weather information


---


## 📌 Notes

* Ensure environment variables are correctly set

---

## 👨‍💻 Author

Developed by **[Thusal Dilhara](https://github.com/ThusalDilhara)**

---




