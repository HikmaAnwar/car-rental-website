package services

import (
	"Web-app/backend/internal/config"
	"Web-app/backend/internal/models"
	"Web-app/backend/internal/repositories"
	"time"
	"fmt"
	"math/rand"

	"github.com/golang-jwt/jwt/v5"
	"golang.org/x/crypto/bcrypt"
)


type AuthService struct {
	Repo *repositories.UserRepository
	TwoFA *TwoFAService 
	Email *EmailService 
}

func (s *AuthService) RegisterUser(req *models.RegisterRequest) error {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		return err
	}
	return s.Repo.Create(req, string(hashedPassword))
}

func (s *AuthService) LoginUser(req *models.LoginRequest) (string, string, bool, error) {
	hashedPassword, userId, err := s.Repo.FindByEmail(req.Email)
	if err != nil {
		return "", "", false, err
	}

	user, _ := s.Repo.FindByID(userId)

	err = bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(req.Password))
	if err != nil {
		return "", "", false, err
	}

	// IF 2FA ENABLED: Send code to email and stop
	if user.TwoFAEnabled {
		code := s.generateRandomCode()
		expiresAt := time.Now().Add(10 * time.Minute)

		// Save code to DB
		s.Repo.Update2FACode(userId, code, expiresAt)

		// Send Email
		go s.Email.Send2FACode(user.Email, code) // Done in background

		return "", "", true, nil
	}

	// 2. Generate Access Token (15 mins)
	accessToken, _ := s.GenerateToken(userId, 15*time.Minute)

	// 3. Generate Refresh Token (Based on RememberMe)
	refreshTTL := 24 * time.Hour
	if req.RememberMe {
		refreshTTL = 30 * 24 * time.Hour
	}
	refreshToken, _ := s.GenerateToken(userId, refreshTTL)
	s.Repo.UpdateRefreshToken(userId, refreshToken)

	return accessToken, refreshToken, false, nil
}

func (s *AuthService) GenerateToken(userId uint, TTL time.Duration) (string, error) {
	cfg := config.Load()
	secret := cfg.JWTSecret

	claims := jwt.MapClaims{
		"user_id": userId,
		"exp":     time.Now().Add(TTL).Unix(),
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

func (s *AuthService) GetProfile(userId uint) (*models.User, error) {
	return s.Repo.FindByID(userId)
}

func (s *AuthService) RefreshToken(tokenStr string) (string, error) {
	user, err := s.Repo.FindByRefreshToken(tokenStr)
	if err != nil {
		return "", err
	}
	return s.GenerateToken(user.ID, 15*time.Minute)
}

func (s *AuthService) LogoutUser(userId uint) error {
	return s.Repo.UpdateRefreshToken(userId, "")
}

// Setup2FA starts the process by creating a random 6-digit code and emailing it
func (s *AuthService) Setup2FA(userId uint) (string, string, error) {
	user, err := s.Repo.FindByID(userId)
	if err != nil {
		return "", "", err
	}

	code := s.generateRandomCode()
	expiresAt := time.Now().Add(10 * time.Minute)

	// Save code to DB but don't enable it yet
	err = s.Repo.Update2FACode(userId, code, expiresAt)
	if err != nil {
		return "", "", err
	}

	// Send Email
	err = s.Email.Send2FACode(user.Email, code)
	return "", "", err // No secret or URI needed for Email 2FA
}

// VerifyAndEnable2FA checks the code and turns 2FA on permanently
func (s *AuthService) VerifyAndEnable2FA(userId uint, code string) error {
	user, err := s.Repo.FindByID(userId)
	if err != nil {
		return err
	}

	if user.TwoFACode != code || time.Now().After(user.TwoFAExpiresAt) {
		return fmt.Errorf("invalid or expired verification code")
	}

	// Enable 2FA and clear the used code
	return s.Repo.Set2FAStatus(userId, true)
}

func (s *AuthService) Disable2FA(userId uint) error {
	return s.Repo.Set2FAStatus(userId, false)
}


// Final2FALogin is for the step AFTER entering the password
func (s *AuthService) Final2FALogin(email, code string) (string, string, error) {
	_, userId, _ := s.Repo.FindByEmail(email)
	user, _ := s.Repo.FindByID(userId)

	if user.TwoFACode != code || time.Now().After(user.TwoFAExpiresAt) {
		return "", "", fmt.Errorf("invalid or expired 2FA code")
	}

	// Generate real tokens
	access, _ := s.GenerateToken(userId, 15*time.Minute)
	refresh, _ := s.GenerateToken(userId, 7*24*time.Hour)

	s.Repo.UpdateRefreshToken(userId, refresh)
	s.Repo.Update2FACode(userId, "", time.Now()) // Clear code

	return access, refresh, nil
}

func (s *AuthService) generateRandomCode() string {
	rand.Seed(time.Now().UnixNano())
	return fmt.Sprintf("%06d", rand.Intn(1000000))
}

