# CMS

Content management system that can be connected to arbitrary chosen website / webapplication etc.

## API

How to run:

```
go run main.go
```

How to run tests

# All tests

```
cd api && go test ./...
```

# Specific test

```
cd api && go test -v ./middlewares
cd api && go test -v ./services
cd api && go test -v ./handlers/website/validation
```
