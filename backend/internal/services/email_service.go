package services

import (
	"Web-app/backend/internal/config"
	"fmt"
	"net/smtp"
)

type EmailService struct{}

func (s *EmailService) Send2FACode(toEmail, code string) error {
	cfg := config.Load()

	// 1. Message data
	subject := "Subject: Your 2FA Verification Code\n"
	mime := "MIME-version: 1.0;\nContent-Type: text/html; charset=\"UTF-8\";\n\n"
	body := fmt.Sprintf("<html><body><h2>Your verification code is: <b>%s</b></h2><p>This code will expire in 10 minutes.</p></body></html>", code)
	message := []byte(subject + mime + body)

	// 2. Authentication
	auth := smtp.PlainAuth("", cfg.SMTPUser, cfg.SMTPPass, cfg.SMTPHost)

	// 3. Send the email
	addr := fmt.Sprintf("%s:%s", cfg.SMTPHost, cfg.SMTPPort)
	return smtp.SendMail(addr, auth, cfg.SMTPUser, []string{toEmail}, message)
}
