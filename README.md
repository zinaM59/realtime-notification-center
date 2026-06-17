# Realtime Notification Center.
A modern full-stack realtime notification and task management platform built with Next.js SSR/PWA, Socket.IO, Prisma, PostgreSQL, Docker, AWS, Push Notifications, and AI-assisted operations workflows.

# Features
## Authentication & Authorization
* Auth.js / NextAuth authentication
* JWT session strategy
* Protected routes
## Realtime Features
* Socket.IO realtime communication
* Realtime task synchronization
* Realtime notification delivery
## Push Notifications
* Browser Push API support
* Service Worker integration
* VAPID authentication
* Offline/background notifications
* Targeted push notifications per user
* PWA install support
## Task Management
* Create/edit/delete tasks
* Due dates
* Task status tracking
* Realtime task updates
## DevOps / Infrastructure
* Dockerized deployment
* AWS EC2 deployment
* GitHub Actions CI/CD
## Prisma ORM
* PostgreSQL database
* Production-ready environment variable management
## Testing & Quality
- Planned unit, component, API, and E2E tests
- CI validation with GitHub Actions
- Test coverage for auth, tasks, notifications, and AI workflows
# Technology Stack
## Frontend
* Next.js (App Router)
* React
* TypeScript
* TailwindCSS
* PWA / Service Workers
## Backend
* Next.js API Routes
* Socket.IO
* Prisma ORM
* PostgreSQL
## Authentication
* Auth.js / NextAuth
## DevOps
* Docker
* AWS EC2
* GitHub Actions
* Nginx / HTTPS deployment

# Architecture Overview
```
Client
  ├─ Next.js SSR/PWA
  ├─ Socket.IO Client
  └─ Push Notification
Server
  ├─ Next.js API
  ├─ Socket.IO Server
  ├─ Auth.js
  ├─ Prisma ORM
  └─ Push Notification Service
Infrastructure
  ├─ Docker
  ├─ AWS EC2
  ├─ GitHub Actions CI/CD
  └─ PostgreSQL
```

# Current Realtime Workflow
Users can assign tasks to selected users in realtime.

When a task is assigned:
- The task is stored in PostgreSQL.
- The selected user receives an in-app realtime notification via Socket.IO.
- A browser push notification is sent if push notifications are enabled.

When the assigned user updates the task status:
- The original sender receives a realtime notification.
- A browser push notification is also sent to the sender.
# Push Notification Flow
    User logs in
        ↓
    Service Worker registered
        ↓
    Push subscription created
        ↓
    Subscription stored in DB
        ↓
    User receives realtime/push notifications          
## Environment Variables
Create .env:
```
    DATABASE_URL=
    AUTH_SECRET=
    AUTH_URL=
    NEXT_PUBLIC_VAPID_PUBLIC_KEY=
    VAPID_PRIVATE_KEY=
    VAPID_SUBJECT=
```
# Local Development
## Install dependencies
    npm install
## Prisma
    npx prisma generate
    npx prisma migrate dev
# Start development server
    npm run build
    npm run dev
Application:
`http://localhost:3000`
# Docker
## Build image
`docker build \
  --build-arg DATABASE_URL=$DATABASE_URL \
  -t realtime-notification-center .`
## Run container
`docker run --env-file .env -p 3000:3000 realtime-notification-center`
# AWS Deployment
The project is designed for deployment on AWS EC2.
## Deployment Stack
* AWS EC2
* Docker
* GitHub Actions
* HTTPS domain
* PostgreSQL
## CI/CD Flow
    GitHub Push
        ↓
    GitHub Actions
        ↓
    Docker Build
        ↓
    Docker Push
        ↓
    AWS EC2 Deployment    
# Push Notification Requirements
Push notifications require:
```
✔ HTTPS
✔ Service Worker
✔ Notification permission
✔ Browser Push API support
```
# Windows / Chrome Push Notification Notes
On Windows, push notifications may require additional system settings.
## Check Windows notification settings
`Settings → System → Notifications`
Enable:
* Google Chrome notifications
* App notifications
* Notification banners
## Disable Focus / Do Not Disturb
`Settings → System → Focus Assist`
Set to:
'OFF'
## Chrome notification permissions
Open:
```
chrome://settings/content/notifications
```
Ensure the project domain is:
```
Allowed
```
## Service Worker verification
Chrome DevTools:
```
Application → Service Workers
```
Verify:
* Service Worker registered
* Active
* Running
# Security Notes
* User-specific push subscriptions
* Environment-based secrets
* JWT authentication strategy
* HTTPS required for Push API
# Testing & Quality
## Current Status
The project already includes a working GitHub Actions CI/CD pipeline for automated Docker build and deployment to AWS EC2.
Current deployment workflow:
```
Push to GitHub
    ↓
GitHub Actions
    ↓
Docker image build
    ↓
Docker deployment
    ↓
AWS EC2 update
```
## Planned Automated Testing
The next planned improvement is adding automated testing before deployment.
Planned testing stack:

* Unit tests
* API tests
* Component tests
* E2E tests (Playwright / Cypress)
Planned validation flow:
```
Push to GitHub
    ↓
Install dependencies
    ↓
Run lint
    ↓
Run automated tests
    ↓
Build Docker image
    ↓
Deploy to AWS
```
Example commands:
```
npm run lint
npm run test
npm run build
```
## Planned Test Coverage
### Authentication
* Protected routes
* Role-based access control
### Tasks
* Create/update/delete task
* Task validation
### Notifications
* Admin notification delivery
### AI Assistant
* Structured AI responses
* AI task generation
* AI notification summarization
# Planned Features / Roadmap
## AI Features
* Semantic search over tasks and notifications
* AI task prioritization
* AI notification summarization
* AI-assisted debugging workflows
* Embeddings/vector search
* RAG-based assistant
## Product Features
* USER / ADMIN role-based access
* Email notifications
* Mobile optimization
## Infrastructure
* Using Terraform in the CI/CD
* Kubernetes deployment (locally)
* Activity/audit logs
* Monitoring dashboard
* Advanced analytics
* File attachments
* Email notifications
* Mobile optimization
## Infrastructure
* ECS/Fargate deployment
* Terraform infrastructure
* Kubernetes deployment
* Observability stack
* Redis caching
# Screenshots
Planned screenshots:
* Dashboard
* Real-time task updates
* Push notifications
* Admin panel
* AI assistant
* Docker/AWS deployment
## Author
Full-stack developer project focused on:
* Realtime systems
* PWA architecture
* AI-assisted workflows
* Cloud deployment
* Modern DevOps practices
## License
MIT License

