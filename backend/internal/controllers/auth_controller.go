package controllers

import (
	"Web-app/backend/internal/models"
	"Web-app/backend/internal/services"
	"github.com/gin-gonic/gin"

	"net/http"
)



type AuthController struct {
	Service *services.AuthService
}

// Register godoc
// @Summary      Register a new user
// @Description  Create a new user account with email and password
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        request body models.RegisterRequest true "Registration Info"
// @Success      201  {string}  string "User created successfully"
// @Router       /api/register [post]
func (ctrl *AuthController) Register(c *gin.Context) {
	var req models.RegisterRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	err := ctrl.Service.RegisterUser(&req)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "User already exists or system error"})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "User registered successfully!"})
}

// Login godoc
// @Summary      Login user
// @Description  Authenticate user and return a message
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        request body models.LoginRequest true "Login Credentials"
// @Success      200  {string}  string "Login successful"
// @Router       /api/login [post]
func (ctrl *AuthController) Login(c *gin.Context) {
	var req models.LoginRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

		// 1. Call service (now returns 4 values)
	accessToken, refreshToken, is2FARequired, err := ctrl.Service.LoginUser(&req)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid email or password"})
		return
	}

	// 2. If 2FA is needed, don't give tokens! Tell the frontend to show the 2FA input.
	if is2FARequired {
		c.JSON(http.StatusOK, gin.H{
			"message": "2FA_REQUIRED",
			"email":   req.Email, // Frontend will need this for the next step
		})
		return
	}

    // 3. Normal login (no 2FA enabled)
	c.JSON(http.StatusOK, gin.H{
		"message": "Login successful!",
		"access_token":   accessToken,
		"refresh_token": refreshToken,
	})
}

// GetProfile godoc
// @Summary      Get user profile
// @Description  Get the profile of the currently logged-in user
// @Tags         auth
// @Accept       json
// @Produce      json
// @Security     BearerAuth
// @Success      200  {object}  models.User
// @Router       /api/profile [get]
func (ctrl *AuthController) GetProfile(c *gin.Context) {
	// userId is set in context by AuthMiddleware
	uid, exists := c.Get("user_id")
	if !exists {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User not found in context"})
		return
	}

	// jwt-go parses numbers as float64
	userIdFloat, ok := uid.(float64)
	if !ok {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Invalid user ID format"})
		return
	}

	user, err := ctrl.Service.GetProfile(uint(userIdFloat))
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch profile"})
		return
	}

	c.JSON(http.StatusOK, user)
}

// Refresh godoc
// @Summary      Refresh access token
// @Description  Get a new access token using a valid refresh token
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        request body models.RefreshRequest true "Refresh Token"
// @Success      200  {string}  string "New access token"
// @Router       /api/refresh [post]
func (ctrl *AuthController) Refresh(c *gin.Context) {
	var body struct {
		RefreshToken string `json:"refresh_token" binding:"required"`
	}

	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Refresh token is required"})
		return
	}

	newAccessToken, err := ctrl.Service.RefreshToken(body.RefreshToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid refresh token"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"access_token": newAccessToken,
	})
}

// Logout godoc
// @Summary      Logout user
// @Description  Invalidate the user's refresh token
// @Tags         auth
// @Security     BearerAuth
// @Success      200  {string}  string "Logged out successfully"
// @Router       /api/logout [post]
func (ctrl *AuthController) Logout(c *gin.Context) {
	// Get user_id from the context (set by AuthMiddleware)
	uid, _ := c.Get("user_id")
	userId := uint(uid.(float64))

	err := ctrl.Service.LogoutUser(userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to logout"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Logged out successfully"})
}

// Setup2FA generates a secret and QR code URI for the user
// Setup2FA godoc
// @Summary      Setup 2FA
// @Description  Generate a 2FA secret and QR code URI
// @Tags         auth
// @Security     BearerAuth
// @Produce      json
// @Success      200  {string}  string "Secret and QR URI"
// @Router       /api/2fa/setup [post]
func (ctrl *AuthController) Setup2FA(c *gin.Context) {
	uid, _ := c.Get("user_id")
	userId := uint(uid.(float64))

	_, _, err := ctrl.Service.Setup2FA(userId) // We don't need secret/uri anymore
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to send 2FA email"})
		return
	}
	c.JSON(http.StatusOK, gin.H{
		"message": "Verification code sent to your email!",
	})
}

// Verify2FA confirms the code and enables 2FA permanently
// Verify2FA godoc
// @Summary      Verify and Enable 2FA
// @Description  Confirm 2FA setup with a 6-digit code
// @Tags         auth
// @Security     BearerAuth
// @Accept       json
// @Param        request body models.Verify2FARequest true "2FA Code"
// @Success      200  {string}  string "2FA enabled successfully"
// @Router       /api/2fa/verify [post]
func (ctrl *AuthController) Verify2FA(c *gin.Context) {
	uid, _ := c.Get("user_id")
	userId := uint(uid.(float64))

	var body struct {
		Code string `json:"code" binding:"required"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Code is required"})
		return
	}

	err := ctrl.Service.VerifyAndEnable2FA(userId, body.Code)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "2FA enabled successfully"})
}

// Login2FA handles the final step: Password was correct, now checking 2FA code
// Login2FA godoc
// @Summary      Login with 2FA
// @Description  Complete login process with 2FA code
// @Tags         auth
// @Accept       json
// @Produce      json
// @Param        request body models.Login2FARequest true "Email and 2FA Code"
// @Success      200  {string}  string "Login tokens"
// @Router       /api/login/2fa [post]
func (ctrl *AuthController) Login2FA(c *gin.Context) {
	var body struct {
		Email string `json:"email" binding:"required"`
		Code  string `json:"code" binding:"required"`
	}
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Email and Code are required"})
		return
	}

	access, refresh, err := ctrl.Service.Final2FALogin(body.Email, body.Code)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid 2FA code"})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"access_token":  access,
		"refresh_token": refresh,
	})
}

// Disable2FA godoc
// @Summary      Disable 2FA
// @Description  Turn off 2FA for the current user
// @Tags         auth
// @Security     BearerAuth
// @Success      200  {string}  string "2FA disabled successfully"
// @Router       /api/2fa/disable [post]
func (ctrl *AuthController) Disable2FA(c *gin.Context) {
	uid, _ := c.Get("user_id")
	userId := uint(uid.(float64))

	err := ctrl.Service.Disable2FA(userId)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to disable 2FA"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "2FA disabled successfully"})
}




