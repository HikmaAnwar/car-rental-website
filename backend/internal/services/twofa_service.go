package services

import (
	"time"

	"github.com/xlzd/gotp"
)

type TwoFAService struct{}

// GenerateSecret creates a new random secret key for a user
func (s *TwoFAService) GenerateSecret() string {
	return gotp.RandomSecret(16)
}

// GetProvisioningUri creates the URI that gets encoded into the QR code
func (s *TwoFAService) GetProvisioningUri(secret, email string) string {
	// "MyApp" is what the user will see in their Google Authenticator app
	return gotp.NewDefaultTOTP(secret).ProvisioningUri(email, "MyApp")
}

// VerifyCode checks if the 6-digit code from the user's phone is correct
func (s *TwoFAService) VerifyCode(secret, code string) bool {
	totp := gotp.NewDefaultTOTP(secret)
	now := time.Now().Unix()
	
	// Check a window of 3 intervals (90 seconds total) to account for time drift
	for i := -1; i <= 1; i++ {
		checkTime := now + int64(i*30)
		if totp.Verify(code, checkTime) {
			return true
		}
	}
	return false
}

