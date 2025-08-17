# Reserve Surf Production

A full-stack web application built with modern technologies for optimal performance and developer experience.

## 🛠 Technology Stack

### Frontend

- **React 18.3.1** - Modern React with hooks and concurrent features
- **TypeScript** - Type-safe JavaScript development
- **Vite 7.1.2** - Lightning-fast build tool and development server
- **Tailwind CSS 4.1** - Utility-first CSS framework with latest features
- **ShadCN UI** - Beautiful, accessible components built on Radix UI

### Backend

- **Django 5.2** - High-level Python web framework
- **Django REST Framework 3.16** - Powerful toolkit for building APIs
- **Python 3.12** - Latest stable Python version
- **PostgreSQL/SQLite** - Robust database options
- **Redis** - In-memory data structure store for caching and Celery
- **Celery** - Distributed task queue for background jobs

### Development Tools

- **uv** - Fast Python package manager and virtual environment tool
- **ESLint + Prettier** - Code linting and formatting
- **Pre-commit hooks** - Automated code quality checks

## 🚀 Quick Start

### Prerequisites

- Python 3.12+
- Node.js 20.19+ or 22.12+
- uv (Python package manager)
- PostgreSQL (optional, SQLite is used by default)
- Redis (optional, for caching and Celery)

### Installation

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd reserve-surf-production
   ```

2. **Install all dependencies:**

   ```bash
   npm install
   ```

3. **Set up the database:**

   ```bash
   npm run backend:migrate
   ```

4. **Create a superuser (optional):**
   ```bash
   npm run backend:createsuperuser
   ```

### Development

**Start both frontend and backend simultaneously:**

```bash
npm run dev
```

**Or run them separately:**

Backend only:

```bash
npm run dev:backend
```

Frontend only:

```bash
npm run dev:frontend
```

The application will be available at:

- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Django Admin: http://localhost:8000/admin

## 📁 Project Structure

```
reserve-surf-production/
├── backend/                 # Django backend
│   ├── apps/               # Django applications
│   │   ├── api/           # API endpoints
│   │   ├── core/          # Core functionality
│   │   └── users/         # User management
│   ├── config/            # Django settings and configuration
│   ├── static/            # Static files
│   ├── media/             # Media uploads
│   ├── templates/         # Django templates
│   ├── .env               # Environment variables
│   └── manage.py          # Django management script
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   │   └── ui/       # ShadCN UI components
│   │   ├── lib/          # Utility functions
│   │   └── assets/       # Static assets
│   ├── public/           # Public files
│   └── package.json      # Frontend dependencies
└── package.json          # Root package.json with scripts
```

## 🔧 Available Scripts

### Root Level Scripts

- `npm run dev` - Start both frontend and backend
- `npm run build` - Build frontend for production
- `npm run preview` - Preview production build
- `npm install` - Install all dependencies

### Backend Scripts

- `npm run dev:backend` - Start Django development server
- `npm run backend:migrate` - Run database migrations
- `npm run backend:createsuperuser` - Create Django superuser
- `npm run backend:shell` - Open Django shell

### Frontend Scripts

- `npm run dev:frontend` - Start Vite development server

## 🌱 Environment Configuration

### Backend Environment Variables

Copy `backend/env.example` to `backend/.env` and configure:

```env
# Django Configuration
SECRET_KEY=your-secret-key-here
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1

# Database (PostgreSQL)
DB_NAME=reserve_surf_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432

# Use SQLite for development
USE_SQLITE=True

# Redis
REDIS_URL=redis://localhost:6379/0
```

## 🎨 Design System

The frontend uses a **colorless design system** as requested:

- Black and white color scheme
- Clean, minimalist interface
- Focus on typography and spacing
- Colors can be added later as needed

## 🔌 API Integration

The frontend is pre-configured to proxy API requests to the Django backend:

- API calls to `/api/*` are automatically forwarded to `http://localhost:8000`
- CORS is properly configured for cross-origin requests
- Authentication ready for implementation

## 🧪 Testing

### Backend Testing

```bash
cd backend
uv run pytest
```

### Frontend Testing

```bash
cd frontend
npm run test
```

## 🚀 Production Deployment

### Frontend Build

```bash
npm run build
```

### Backend Configuration

- Set `DEBUG=False` in production environment
- Configure proper database (PostgreSQL recommended)
- Set up Redis for caching and Celery
- Configure static file serving
- Set proper `ALLOWED_HOSTS`

## 📚 Documentation

- [Django Documentation](https://docs.djangoproject.com/)
- [Django REST Framework](https://www.django-rest-framework.org/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.com/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Reserve Surf Production** - Ready for development! 🏄‍♂️
