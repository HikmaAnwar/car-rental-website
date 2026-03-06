package repositories

import (
	"Web-app/backend/internal/models"
	"time"

	"gorm.io/gorm"
)


type UserRepository struct {
	DB *gorm.DB
}

func (r *UserRepository) Create(user *models.RegisterRequest, hashedPassword string) error {
	newUser := models.User{
		Username: user.Username,
		Email:    user.Email,
		Password: hashedPassword,
	}
	return r.DB.Create(&newUser).Error
}

func (r *UserRepository) FindByEmail(email string) (string, uint, error) {
	var user models.User
	err := r.DB.Where("email = ?", email).First(&user).Error
	if err != nil {
		return "", 0, err
	}
	return user.Password, user.ID, nil
}

func (r *UserRepository) FindByID(id uint) (*models.User, error) {
	var user models.User
	err := r.DB.First(&user, id).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

// UpdateRefreshToken saves the token to the user record
func (r *UserRepository) UpdateRefreshToken(userId uint, token string) error {
	return r.DB.Model(&models.User{}).Where("id = ?", userId).Update("refresh_token", token).Error
}

// FindByRefreshToken finds a user by their token (used for the /refresh endpoint)
func (r *UserRepository) FindByRefreshToken(token string) (*models.User, error) {
	var user models.User
	err := r.DB.Where("refresh_token = ?", token).First(&user).Error
	return &user, err
}

func (r *UserRepository) Update2FASecret(userId uint, secret string, enabled bool) error {
	return r.DB.Model(&models.User{}).Where("id = ?", userId).Updates(map[string]interface{}{
		"two_fa_secret":  secret,
		"two_fa_enabled": enabled,
	}).Error
}

func (r *UserRepository) Update2FACode(userId uint, code string, expiresAt time.Time) error {
	return r.DB.Model(&models.User{}).Where("id = ?", userId).Updates(map[string]interface{}{
		"two_fa_code":       code,
		"two_fa_expires_at": expiresAt,
	}).Error
}

func (r *UserRepository) Set2FAStatus(userId uint, enabled bool) error {
	return r.DB.Model(&models.User{}).Where("id = ?", userId).Update("two_fa_enabled", enabled).Error
}




