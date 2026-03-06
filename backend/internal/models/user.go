package models

import (
	"time"

	"gorm.io/gorm"
)

// User represents the database structure
type User struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	Username  string         `gorm:"uniqueIndex;not null" json:"username"`
	Email     string         `gorm:"uniqueIndex;not null" json:"email"`
	Password  string         `gorm:"not null" json:"-"` // "-" means never show password in JSON
	RefreshToken string         `json:"-"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
	TwoFASecret string         `json:"-"`         // The secret key for TOTP
	TwoFACode string         `json:"-"`        // Store the 6-digit number
	TwoFAExpiresAt time.Time `json:"-"` // When the code dies
	TwoFAEnabled bool           `json:"two_fa"`   // Is 2FA turned on for this user?
}


// RegisterRequest is what the user sends to sign up
type RegisterRequest struct {
	Username string `json:"username" binding:"required"`
	Email    string `json:"email" binding:"required,email"`
	Password string `json:"password" binding:"required,min=6"`
}

// LoginRequest is what the user sends to sign in
type LoginRequest struct {
	Email      string `json:"email" binding:"required,email"`
	Password   string `json:"password" binding:"required"`
	RememberMe bool   `json:"remember_me"`
}

// RefreshRequest is used to get a new access token
type RefreshRequest struct {
	RefreshToken string `json:"refresh_token" binding:"required"`
}

// Verify2FARequest is used to confirm 2FA setup
type Verify2FARequest struct {
	Code string `json:"code" binding:"required"`
}

// Login2FARequest is used for the final 2FA login step
type Login2FARequest struct {
	Email string `json:"email" binding:"required"`
	Code  string `json:"code" binding:"required"`
}


