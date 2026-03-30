# CMS

Content management system that can be connected to arbitrary chosen website / webapplication etc.

## Running the project (Docker Compose)

Requirements:
- [Docker](https://www.docker.com/) and Docker Compose

Run the entire project (database, API, admin dashboard and example websites) with a single command:

```
docker-compose up --build
```

Once running, the following services are available:

| Service | Address |
|---|---|
| API | http://localhost:3000 |
| Admin dashboard | http://localhost:5173 |
| Example website 1 | http://localhost:8081 |
| Example website 2 | http://localhost:8082 |
| MongoDB | localhost:27017 |

To stop all containers:

```
docker-compose down
```

To stop containers and remove database data:

```
docker-compose down -v
```

## API

Running locally (without Docker):

```
cd api && go run main.go
```

### Tests

All tests:

```
cd api && go test ./...
```

Specific tests:

```
cd api && go test -v ./middlewares
cd api && go test -v ./services
cd api && go test -v ./handlers/website/validation
```
