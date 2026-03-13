package controllers

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
)

type UploadController struct{}

// UploadFile godoc
// @Summary      Upload a vehicle image
// @Description  Upload an image file for a car and get a persistent URL
// @Tags         Rental Fleet
// @Accept       mpfd
// @Produce      json
// @Param        file  formData  file  true  "Image file to upload"
// @Success      200   {object}  map[string]string
// @Failure      400   {object}  map[string]string
// @Failure      500   {object}  map[string]string
// @Router       /api/upload [post]
func (ctrl *UploadController) UploadFile(c *gin.Context) {
	// 1. Get the file from request
	file, err := c.FormFile("file")
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "no file is received"})
		return
	}

	// 2. Create the uploads directory if it doesn't exist
	uploadDir := "uploads/cars"
	if _, err := os.Stat(uploadDir); os.IsNotExist(err) {
		err = os.MkdirAll(uploadDir, 0755)
		if err != nil {
			c.JSON(http.StatusInternalServerError, gin.H{"error": "could not create upload directory"})
			return
		}
	}

	// 3. Generate unique filename
	extension := filepath.Ext(file.Filename)
	newFileName := fmt.Sprintf("%d%s", time.Now().UnixNano(), extension)
	filePath := filepath.Join(uploadDir, newFileName)

	// 4. Save the file
	if err := c.SaveUploadedFile(file, filePath); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "could not save file"})
		return
	}

	// 5. Return the URL (backend serves 'uploads' folder statically)
	fileUrl := fmt.Sprintf("http://localhost:8088/%s", filePath)
	// Replace backslashes on Windows for URL consistency
	fileUrl = filepath.ToSlash(fileUrl)

	c.JSON(http.StatusOK, gin.H{
		"url": fileUrl,
	})
}
