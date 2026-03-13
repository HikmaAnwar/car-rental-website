package routes

import (
	"Web-app/backend/internal/controllers"
	"Web-app/backend/internal/middleware"
	"Web-app/backend/internal/repositories"
	"Web-app/backend/internal/services"

	"Web-app/backend/internal/graph"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)


// SetupRoutes initializes the API routes
func SetupRoutes(r *gin.Engine, db *gorm.DB) {
	// 1. Initialize Repository (Talks to DB)
	userRepo := &repositories.UserRepository{DB: db}

	// 2. Initialize Service (Handles Hashing/Logic)
	authService := &services.AuthService{
		Repo:  userRepo,
		TwoFA: &services.TwoFAService{},
		Email: &services.EmailService{},
	}



	// 3. Initialize Controller (Handles Requests)
	authCtrl := &controllers.AuthController{Service: authService}

	api := r.Group("/api")
	{
		// Public routes
		api.POST("/register", authCtrl.Register)
		api.POST("/login", authCtrl.Login)
		api.POST("/login/2fa", authCtrl.Login2FA) 
		api.POST("/refresh", authCtrl.Refresh)

		// Booking routes (REST pattern)
		bookingCtrl := &controllers.BookingController{DB: db}
		api.POST("/bookings", bookingCtrl.Create)
		api.GET("/bookings", bookingCtrl.List)

		// Car routes (REST pattern for search/filters)
		carCtrl := &controllers.CarController{DB: db}
		api.GET("/cars", carCtrl.List)

		// Protected routes
		protected := api.Group("/")
		protected.Use(middleware.AuthMiddleware())
		{
			protected.POST("/2fa/setup", authCtrl.Setup2FA) 
			protected.POST("/2fa/verify", authCtrl.Verify2FA) 
			protected.POST("/2fa/disable", authCtrl.Disable2FA) 
			protected.POST("/logout", authCtrl.Logout)
			protected.GET("/profile", authCtrl.GetProfile)
			protected.GET("/ping", func(c *gin.Context) {
				c.JSON(200, gin.H{
					"message": "pong",
				})
			})
		}
	}

	// GraphQL routes
	srv := handler.NewDefaultServer(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{DB: db}}))

	api.POST("/query", func(c *gin.Context) {
		srv.ServeHTTP(c.Writer, c.Request)
	})

	api.GET("/playground", func(c *gin.Context) {
		playground.Handler("GraphQL Playground", "/api/query").ServeHTTP(c.Writer, c.Request)
	})

	// Serve static files (Uploaded images)
	r.Static("/uploads", "./uploads")

	// Upload routes (REST)
	uploadCtrl := &controllers.UploadController{}
	api.POST("/upload", uploadCtrl.UploadFile)
}
