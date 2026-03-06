# Use the official Golang image as a builder
FROM golang:1.26-alpine AS builder

# Set working directory
WORKDIR /app

# Copy go.mod and go.sum files
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the entire source code
COPY . .

# Build the application
RUN go build -o main ./cmd/main.go

# Use a minimal runtime image
FROM alpine:latest

WORKDIR /app

# Copy the binary from the builder
COPY --from=builder /app/main .

# Copy .env file (optional but useful if needed for fallback)
COPY .env .

# Expose the port
EXPOSE 8080

# Run the binary
CMD ["./main"]
