package routes

import (
	"Web-app/backend/internal/controllers"
	"Web-app/backend/internal/middleware"
	"Web-app/backend/internal/repositories"
	"Web-app/backend/internal/services"

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
}


