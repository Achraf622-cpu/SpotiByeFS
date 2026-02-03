# 🎵 SpotiBye - Full-Stack Music Streaming Application

A modern, full-stack music streaming application built with **Angular 21** (frontend) and **Spring Boot 4** (backend).

## 📋 Project Structure

```
recovery/
├── SpotiByeV2.1/          # Angular 21 Frontend
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/      # Services, models, guards
│   │   │   ├── features/  # Feature modules (library, track)
│   │   │   ├── shared/    # Shared components, pipes
│   │   │   └── store/     # NgRx state management
│   │   └── ...
│   ├── Dockerfile
│   └── nginx.conf
│
├── SpotiByeBack2.1/       # Spring Boot 4 Backend
│   ├── src/
│   │   └── main/java/com/recovery/spotibyeback21/
│   │       ├── entity/         # JPA entities
│   │       ├── dto/            # Data Transfer Objects
│   │       ├── repository/     # Spring Data repositories
│   │       ├── service/        # Business logic
│   │       ├── controller/     # REST controllers
│   │       ├── mapper/         # Entity-DTO mappers
│   │       ├── config/         # CORS and other configs
│   │       └── exception/      # Exception handling
│   └── Dockerfile
│
└── docker-compose.yml     # Full stack orchestration
```

## 🚀 Quick Start

### Prerequisites
- **Java 21**
- **Node.js 21+**
- **Docker & Docker Compose**
- **PostgreSQL 16** (or use Docker)

### Option 1: Run with Docker (Recommended)

```bash
# From the recovery folder
docker-compose up --build
```

The application will be available at:
- **Frontend**: http://localhost
- **Backend API**: http://localhost:8080/api
- **Database**: localhost:5432

### Option 2: Run Locally

#### Backend
```bash
cd SpotiByeBack2.1

# Start PostgreSQL (or use Docker)
docker run -d -p 5432:5432 -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=spotibye postgres:16-alpine

# Run the backend
./mvnw spring-boot:run
```

#### Frontend
```bash
cd SpotiByeV2.1

# Install dependencies
npm install

# Run development server
npm start
```

Access at http://localhost:4200

## 🏗️ Architecture

### Frontend (Angular 21)
- **NgRx** for state management
- **Standalone components**
- **Lazy-loaded routes**
- **Reactive forms**
- **Service-based architecture**
- **TailwindCSS** for styling

### Backend (Spring Boot 4)
- **RESTful API** architecture
- **Spring Data JPA** for database access
- **Bean Validation** for input validation
- **Global exception handling**
- **CORS configuration** for Angular
- **PostgreSQL** database

## 📡 API Endpoints

### Tracks
- `GET /api/tracks` - Get all tracks
- `GET /api/tracks?category=pop` - Get tracks by category
- `GET /api/tracks?search=query` - Search tracks
- `GET /api/tracks?favorites=true` - Get favorite tracks
- `GET /api/tracks/{id}` - Get track by ID
- `POST /api/tracks` - Create new track
- `PUT /api/tracks/{id}` - Update track
- `DELETE /api/tracks/{id}` - Delete track
- `PATCH /api/tracks/{id}/favorite` - Toggle favorite

## 💾 Database Schema

```sql
CREATE TABLE tracks (
    id BIGSERIAL PRIMARY KEY,
    title VARCHAR(200) NOT NULL,
    artist VARCHAR(200) NOT NULL,
    category VARCHAR(50),
    description VARCHAR(1000),
    audio_url VARCHAR(255) NOT NULL,
    cover_image VARCHAR(255),
    duration INTEGER NOT NULL,
    is_favorite BOOLEAN DEFAULT false,
    created_at TIMESTAMP,
    updated_at TIMESTAMP
);
```

## 🐳 Docker Configuration

### Services
- **db**: PostgreSQL 16 database
- **backend**: Spring Boot API (port 8080)
- **frontend**: Angular app with Nginx (port 80)

### Volumes
- `postgres_data`: Persistent database storage

### Networks
- `spotibye_network`: Bridge network for all services

## 🧪 Testing

### Backend Tests
```bash
cd SpotiByeBack2.1
./mvnw test
```

### Frontend Tests
```bash
cd SpotiByeV2.1
npm test
```

## 📝 Development

### Backend Development
- Uses **Lombok** to reduce boilerplate
- **Layered architecture**: Controller → Service → Repository
- DTOs for data transfer
- Custom exception handling with @RestControllerAdvice

### Frontend Development
- **Feature-based modules** for organization
- **NgRx** effects for side effects
- **Signals** for reactive state (Angular 21)
- **Lazy loading** for optimal performance

## 🔧 Configuration

### Backend (application.yaml)
```yaml
spring:
  datasource:
    url: jdbc:postgresql://localhost:5432/spotibye
    username: postgres
    password: postgres
  jpa:
    hibernate:
      ddl-auto: update
```

### Frontend (environment.ts)
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080/api'
};
```

## 📦 Technologies Used

### Frontend
- Angular 21
- NgRx (State Management)
- RxJS
- TailwindCSS
- TypeScript

### Backend
- Spring Boot 4.0.2
- Spring Data JPA
- PostgreSQL
- Lombok
- Bean Validation
- Maven

### DevOps
- Docker
- Docker Compose
- Nginx

## 👨‍💻 Author

Built with ❤️ for the course project

## 📄 License

This project is for educational purposes.
