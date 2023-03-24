# Pybo - A Simple Notice Board Application

Pybo is a simple notice board application built with a Flask backend and a Next.js frontend. Users can create, edit, and delete notices and reply to notices.

- Frontend: Next.js, React-Bootstrap
- Backend: Flask, SQLAlchemy
- Python v3.10.10

## Project Structure

This project is organized into two main directories: `backend` for the Flask API and `frontend` for the Next.js web application.

```text
.
├── README.md
├── backend
│ ├── README.md
│ ├── config.py
│ ├── migrations
│ ├── pybo
│ │ ├── auth
│ │ ├── database
│ │ └── views
│ ├── pybo.db
│ ├── pybo_test.db
│ ├── test_pybo.py
│ └── test_python.py
└── frontend
└── pybo
├── README.md
├── components
├── package-lock.json
├── package.json
├── pages
│ ├── api
│ └── notice
├── public
├── styles
└── utilsmarkdown
```

### Backend

The Flask backend is organized into several modules:

- `config.py` contains the configuration settings for the application.
- `migrations` contains the Alembic migration scripts for the database schema.
- `pybo` is the main application package with the following sub-packages:
  - `auth` contains the authentication logic, including the `AuthError` exception and related functions for token validation and permission checking.
  - `database` contains the database models and schema.
  - `views` contains the application's route handlers, organized by functionality (main, notice, and reply views).
- `pybo.db` and `pybo_test.db` are SQLite database files for the application and tests, respectively.
- `test_pybo.py` and `test_python.py` are test scripts for the application.

#### Backend Setup

1. Install the required dependencies:

```bash
pip install Flask
pip install flask-migrate
pip install black
pip install Flask-Cors
pip install python-jose requests
```Set the required environment variables and run the Flask server:bash
```bash
export FLASK_APP=pybo
export FLASK_ENV=development
# testing
# export FLASK_ENV="testing"
# product
# export FLASK_ENV="product"
export FLASK_DEBUG=true
flask run
```

Test the API with curl:bash
```bash
curl -X GET http://127.0.0.1:5000/api/board
```

Use the Udacity Partner API for notice board data:bash
```bash
https://api.udacitypartner.com/api/v1/information/notice/
```

Configure the Pybo application with Auth0.Frontend

The Next.js frontend is organized into several directories:```components``` contains reusable React components for the application's UI, such as the navigation bar, alert, notice card, notice list, and pagination.```pages``` contains the main application pages and their related API routes, organized by functionality.```public``` contains static assets, such as the favicon and example HTML files.```styles``` contains the CSS files for the application, organized by component and page.```utils``` contains utility functions used throughout the application.Frontend SetupInstall the required dependencies:bash
```bash
npm install
```
Run the Next.js development server:bash
```bash
npm run dev
```

This will start the Next.js development server, and you can view the frontend application in your browser at ```http://localhost:3000```.Contributing

Contributions to Pybo are welcome. If you find a bug or have an idea for a new feature, please open an issue or submit a pull request.License

This project is licensed under the MIT License. See the LICENSE file for details.


```bash
npm run dev
```

This will start the Next.js development server, and you can view the frontend application in your browser at ```http://localhost:3000```.Contributing

Contributions to Pybo are welcome. If you find a bug or have an idea for a new feature, please open an issue or submit a pull request.License

This project is licensed under the MIT License.