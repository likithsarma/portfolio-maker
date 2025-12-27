# Portfolio Maker

Portfolio Maker is a full-stack platform that turns your plain resume into a live, shareable portfolio website — instantly.  
Users can upload their resume, review parsed content, choose a layout, and publish a stunning, personalized site in just a few clicks.

🔗 **Live Demo:** [https://portfolio-maker-ten.vercel.app](https://portfolio-maker-ten.vercel.app)

---

## ✨ Features

- **Upload your resume (PDF or DOCX)** — Quickly import your existing resume.  
- **Smart parsing engine** — Automatically extracts your details into neat, editable sections.  
- **Custom editing experience** — Review and tweak content before going live.  
- **Multiple portfolio templates** — Preview and choose the layout that fits your style.  
- **One-click publishing** — Generate a unique, shareable link instantly.  
- **Clean React UI + Django backend** — Built for speed, simplicity, and scalability.  
- **Completely free to use** — Perfect for students, freelancers, and job seekers.

---

## 🧠 Tech Stack

**Frontend:**  
- React  
- Vite  
- Axios  
- React Router  

**Backend:**  
- Django  
- Django REST Framework  
- SQLite (for development)  

---

## ⚙️ Product Flow

1. Upload your resume  
2. Backend extracts key details into structured JSON  
3. Edit the parsed data (optional)  
4. Choose your favorite portfolio template  
5. Publish and share your live portfolio  

---

## 🧩 API Overview

| Endpoint | Method | Purpose |
|-----------|---------|----------|
| `/api/upload-resume` | POST | Upload and parse resume |
| `/api/resume/:id` | GET / PUT | View or update parsed data |
| `/api/portfolio` | POST | Create new portfolio |
| `/api/portfolio/:slug` | GET | View public portfolio data |

---

## 🚀 Current Status

**✅ MVP Build Complete**

**Next Planned Updates:**
- More portfolio templates  
- Improved resume parsing accuracy  
- Custom theme colors and fonts  
- AI-powered summary rewriting  

---

## 🧰 Setup Instructions

### Clone the Repository
git clone https://github.com/yourname/portfolio-maker.git

### Backend Setup
cd backend
python -m venv venv
venv/Scripts/activate # For Windows
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver


### Frontend Setup
cd frontend
npm install
npm run dev



Then open your browser at [**http://localhost:5173**](http://localhost:5173)

---

## 👋 Contact

**Built by Likith Jandyala**  
- [LinkedIn](https://www.linkedin.com/in/likithjandyala)  
- ✉️ [likithjandhyala@gmail.com](mailto:likithjandhyala@gmail.com)

---

## 🪪 License

This project is open-source and free to use for learning or personal portfolio building.