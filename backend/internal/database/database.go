package database

import (
	"Web-app/backend/internal/config"
	"Web-app/backend/internal/models"
	"fmt"
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Connect establishes a connection to the database using GORM
func Connect() (*gorm.DB, error) {
	cfg := config.Load()

	db, err := gorm.Open(postgres.Open(cfg.DatabaseURL), &gorm.Config{})

	if err != nil {
		return nil, fmt.Errorf("error opening database: %w", err)
	}

	// AUTOMATIC TABLE CREATION
	err = db.AutoMigrate(&models.User{}, &models.Car{}, &models.Booking{})
	if err != nil {
		log.Printf("Migration failed: %v", err)
	} else {
		log.Println("Database migration completed successfully")
	}

	return db, nil
}

