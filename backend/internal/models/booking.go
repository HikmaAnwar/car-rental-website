package models

import (
	"time"

	"gorm.io/gorm"
)

type Booking struct {
	ID        uint           `gorm:"primaryKey" json:"id"`
	CreatedAt time.Time      `json:"created_at"`
	UpdatedAt time.Time      `json:"updated_at"`
	DeletedAt gorm.DeletedAt `gorm:"index" json:"-"`
	
	CarID     uint           `json:"car_id"`
	Car       Car            `gorm:"foreignKey:CarID" json:"car"`
	
	StartDate time.Time      `json:"start_date"`
	EndDate   time.Time      `json:"end_date"`
	
	Status    string         `gorm:"default:'pending'" json:"status"` // pending, confirmed, cancelled
	UserEmail string         `json:"user_email"`
}
