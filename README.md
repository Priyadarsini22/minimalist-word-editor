📝 minimalist-word-editor
A clean and lightweight web-based word editor built with React (frontend) and Django (backend).
Easily write, edit, save, and manage documents — with options to download them as TXT or PDF, and mark them as public/private.


✨ Features
✅ Create, edit, delete documents
✅ Auto-save with debounce to avoid too many updates
✅ Toggle document visibility (public/private)
✅ Search and sort documents by title or date
✅ Download documents as .txt or .pdf
✅ Simple, distraction-free interface


🚀 Project Structure
plaintext
Copy code
minimalist-word-editor/
├── backend/           # Django REST API
├── src/               # React frontend
│   ├── components/    # Editor, Toolbar, Timer, etc.
│   ├── pages/         # Dashboard, Login, Register, etc.
│   ├── context/       # Auth context
│   └── api/           # Axios setup
├── package.json       # React project config
├── README.md          # Project README
└── ...                # Other config files


🛠 Installation & Setup
1️⃣ Clone the repository


bash
Copy code
git clone https://github.com/Priyadarsini22/minimalist-word-editor.git
cd minimalist-word-editor
2️⃣ Install frontend dependencies


bash
Copy code
npm install
3️⃣ Run the React frontend

bash
Copy code
npm start
4️⃣ (Optional) Run the Django backend


bash
Copy code
cd backend
pip install -r requirements.txt
python manage.py runserver
Make sure to configure your backend URL in axios.js to match your local server or deployment.


📸 Screenshots

![WhatsApp Image 2025-07-11 at 11 34 38_769c73a0](https://github.com/user-attachments/assets/f260161f-db64-4ec0-96cd-6a702a3b3543)


![WhatsApp Image 2025-07-11 at 11 35 16_2d6f72ad](https://github.com/user-attachments/assets/a30f71d3-fa52-4ffa-8274-e95b31cdb240)



🧩 Technologies Used

Frontend: React, Axios, jsPDF

Backend: Django, Django REST Framework

Styling: CSS (with Tailwind, optional)

✅ Current Status
Fully functional dashboard for managing documents.

JWT authentication integrated.

Works with Django REST API.

✏ Next Plans (optional)
Rich text editing (e.g., Markdown)

Collaboration / sharing

User profile settings

Improved UI/UX



