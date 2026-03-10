package models

import (
	"time"

	"gorm.io/gorm"
)

type Car struct {
	ID          uint           `gorm:"primaryKey" json:"id"`
	CreatedAt   time.Time      `json:"created_at"`
	UpdatedAt   time.Time      `json:"updated_at"`
	DeletedAt   gorm.DeletedAt `gorm:"index" json:"-"`
	Name        string         `json:"name"`
	Brand       string         `json:"brand"`
	PricePerDay float64        `json:"price_per_day"`
	Available   bool           `gorm:"default:true" json:"available"`
	ImageUrl    string         `json:"image_url"`
}
