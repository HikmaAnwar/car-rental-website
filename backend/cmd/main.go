package main

import (
	"log"
	"net/http"
	"os"
	"strings"
	"time"

	"Web-app/backend/internal/config"
	"Web-app/backend/internal/database"
	"Web-app/backend/internal/models"
	"Web-app/backend/internal/routes"
	docs "Web-app/backend/docs" // generated docs

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	swaggerFiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

// @title           Web App API
// @version         1.0
// @description     This is a sample server for a web app.
// @termsOfService  http://swagger.io/terms/

// @contact.name   API Support
// @contact.url    http://www.swagger.io/support
// @contact.email  support@swagger.io

// @license.name  Apache 2.0
// @license.url   http://www.apache.org/licenses/LICENSE-2.0.html

// @host      localhost:8088
// @BasePath  /

// @securityDefinitions.apikey BearerAuth
// @in header
// @name Authorization
// @description Type "Bearer <your_token>"

func main() {
	// Load environment variables from .env if present
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using system environment variables")
	}

	// Load configuration
	cfg := config.Load()

	// Initialize Swagger docs
	docs.SwaggerInfo.Title = "Web App API"
	docs.SwaggerInfo.Description = "A comprehensive API for a web app."
	docs.SwaggerInfo.Version = "1.0"
	docs.SwaggerInfo.Host = "localhost:" + cfg.Port
	docs.SwaggerInfo.BasePath = "/"
	docs.SwaggerInfo.Schemes = []string{"http", "https"}

	// Initialize database connection
	db, err := database.Connect()
	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

	// Get underlying sql.DB to close it properly
	sqlDB, err := db.DB()
	if err == nil {
		defer sqlDB.Close()
	}

	db.AutoMigrate(&models.Car{})


	// Initialize Gin router
	r := gin.Default()

	// Configure CORS
	allowedOrigins := []string{
		"http://localhost:3000",
		"http://localhost:3001",
		"http://localhost:3003",
		"http://localhost:" + cfg.Port,
	}

	// Add origins from environment variable if set
	if envOrigins := os.Getenv("ALLOWED_ORIGINS"); envOrigins != "" {
		for _, origin := range strings.Split(envOrigins, ",") {
			if trimmed := strings.TrimSpace(origin); trimmed != "" {
				allowedOrigins = append(allowedOrigins, trimmed)
			}
		}
	}

	// Add CORS middleware
	r.Use(cors.New(cors.Config{
		AllowOrigins:     allowedOrigins,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Content-Length", "Accept-Encoding", "X-CSRF-Token", "Authorization", "Accept", "Cache-Control"},
		ExposeHeaders:    []string{"Content-Length", "Authorization"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Initialize routes
	routes.SetupRoutes(r, db)

	// Add Swagger documentation
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerFiles.Handler))

	// Health check endpoint
	r.GET("/health", healthCheck)

	log.Printf("🚀 Web App API starting on port %s", cfg.Port)
	log.Printf("📚 Swagger documentation available at: http://localhost:%s/swagger/index.html", cfg.Port)
	log.Printf("🏥 Health check available at: http://localhost:%s/health", cfg.Port)

	if err := r.Run(":" + cfg.Port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}

// HealthCheck godoc
// @Summary      Health Check
// @Description  Check if the server is up and running
// @Tags         health
// @Produce      plain
// @Success      200  {string}  string  "OK"
// @Router       /health [get]
func healthCheck(c *gin.Context) {
	c.String(http.StatusOK, "OK")
}


