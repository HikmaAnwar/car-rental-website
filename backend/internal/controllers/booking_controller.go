package controllers

import (
	"Web-app/backend/internal/models"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type BookingController struct {
	DB *gorm.DB
}

type CreateBookingRequest struct {
	CarID     string `json:"carId" binding:"required"`
	StartDate string `json:"startDate" binding:"required"`
	EndDate   string `json:"endDate" binding:"required"`
	UserEmail string `json:"userEmail" binding:"required"`
}

// Create godoc
// @Summary      Create a new booking
// @Tags         Rental Fleet
// @Accept       json
// @Produce      json
// @Param        request  body      CreateBookingRequest  true  "Booking details"
// @Success      201      {object}  models.Booking
// @Failure      400      {object}  map[string]string
// @Failure      404      {object}  map[string]string
// @Failure      500      {object}  map[string]string
// @Router       /api/bookings [post]
func (ctrl *BookingController) Create(c *gin.Context) {
	var req CreateBookingRequest
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Parse dates
	sDate, err := time.Parse("2006-01-02", req.StartDate)
	if err != nil {
		sDate, err = time.Parse(time.RFC3339, req.StartDate)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid start date format, use YYYY-MM-DD"})
			return
		}
	}
	eDate, err := time.Parse("2006-01-02", req.EndDate)
	if err != nil {
		eDate, err = time.Parse(time.RFC3339, req.EndDate)
		if err != nil {
			c.JSON(http.StatusBadRequest, gin.H{"error": "invalid end date format, use YYYY-MM-DD"})
			return
		}
	}

	// Check if car exists
	carID, _ := strconv.ParseUint(req.CarID, 10, 32)
	var car models.Car
	if err := ctrl.DB.First(&car, carID).Error; err != nil {
		c.JSON(http.StatusNotFound, gin.H{"error": "car not found"})
		return
	}

	if !car.Available {
		c.JSON(http.StatusBadRequest, gin.H{"error": "car is already reserved"})
		return
	}

	// Create booking
	booking := models.Booking{
		CarID:     uint(carID),
		StartDate: sDate,
		EndDate:   eDate,
		UserEmail: req.UserEmail,
		Status:    "confirmed",
	}

	if err := ctrl.DB.Create(&booking).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not create booking"})
		return
	}

	// Update car availability
	ctrl.DB.Model(&car).Update("available", false)

	c.JSON(http.StatusCreated, booking)
}

// List godoc
// @Summary      List all bookings
// @Tags         Rental Fleet
// @Produce      json
// @Success      200  {array}   models.Booking
// @Failure      500  {object}  map[string]string
// @Router       /api/bookings [get]
func (ctrl *BookingController) List(c *gin.Context) {
	var bookings []models.Booking
	if err := ctrl.DB.Preload("Car").Find(&bookings).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not fetch bookings"})
		return
	}
	c.JSON(http.StatusOK, bookings)
}

type CarController struct {
	DB *gorm.DB
}

// List godoc
// @Summary      List and search cars
// @Description  Get a list of cars with optional filtering by brand, name, or search term
// @Tags         Rental Fleet
// @Produce      json
// @Param        brand   query     string  false  "Filter by brand"
// @Param        name    query     string  false  "Filter by name"
// @Param        search  query     string  false  "Search in name and brand"
// @Success      200     {array}   models.Car
// @Failure      500     {object}  map[string]string
// @Router       /api/cars [get]
func (ctrl *CarController) List(c *gin.Context) {
	var cars []models.Car
	query := ctrl.DB

	if brand := c.Query("brand"); brand != "" {
		query = query.Where("brand ILIKE ?", "%"+brand+"%")
	}
	if name := c.Query("name"); name != "" {
		query = query.Where("name ILIKE ?", "%"+name+"%")
	}
	if search := c.Query("search"); search != "" {
		query = query.Where("name ILIKE ? OR brand ILIKE ?", "%"+search+"%", "%"+search+"%")
	}

	if err := query.Find(&cars).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not fetch cars"})
		return
	}
	c.JSON(http.StatusOK, cars)
}
