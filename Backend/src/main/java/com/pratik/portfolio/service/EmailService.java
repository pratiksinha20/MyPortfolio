package com.pratik.portfolio.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.email.to:pratiksinha198@gmail.com}")
    private String toEmail;

    @Value("${app.email.enabled:true}")
    private boolean emailEnabled;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendContactNotification(String senderName, String senderEmail, String messageBody) {
        if (!emailEnabled) {
            System.out.println("[Email Disabled] Skipping email for: " + senderName);
            return;
        }

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setTo(toEmail);
            helper.setSubject("🚀 Portfolio Contact: " + senderName);
            helper.setReplyTo(senderEmail);

            String htmlContent = """
                <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto;
                            background: linear-gradient(135deg, #0a0a0a, #1a1a2e); color: #e2e8f0;
                            border-radius: 16px; overflow: hidden; border: 1px solid rgba(0,212,255,0.2);">

                    <div style="background: linear-gradient(135deg, #00d4ff, #7c3aed); padding: 24px 32px;">
                        <h1 style="margin: 0; font-size: 20px; color: #fff;">
                            ✉️ New Portfolio Message
                        </h1>
                    </div>

                    <div style="padding: 32px;">
                        <table style="width: 100%%; border-collapse: collapse;">
                            <tr>
                                <td style="padding: 8px 0; color: #00d4ff; font-size: 12px; text-transform: uppercase;
                                           letter-spacing: 2px; width: 80px; vertical-align: top;">From</td>
                                <td style="padding: 8px 0; font-size: 15px; color: #fff;">%s</td>
                            </tr>
                            <tr>
                                <td style="padding: 8px 0; color: #00d4ff; font-size: 12px; text-transform: uppercase;
                                           letter-spacing: 2px; vertical-align: top;">Email</td>
                                <td style="padding: 8px 0; font-size: 15px;">
                                    <a href="mailto:%s" style="color: #7c3aed; text-decoration: none;">%s</a>
                                </td>
                            </tr>
                        </table>

                        <div style="margin-top: 20px; padding: 20px; background: rgba(255,255,255,0.03);
                                    border-radius: 12px; border: 1px solid rgba(255,255,255,0.06);">
                            <p style="margin: 0 0 8px; color: #00d4ff; font-size: 12px; text-transform: uppercase;
                                      letter-spacing: 2px;">Message</p>
                            <p style="margin: 0; font-size: 15px; line-height: 1.7; color: #e2e8f0;">%s</p>
                        </div>
                    </div>

                    <div style="padding: 16px 32px; border-top: 1px solid rgba(255,255,255,0.05);
                                text-align: center; font-size: 11px; color: rgba(255,255,255,0.3);">
                        Sent from Antigravity Developer Space Portfolio
                    </div>
                </div>
                """.formatted(senderName, senderEmail, senderEmail, messageBody);

            helper.setText(htmlContent, true);
            mailSender.send(message);
            System.out.println("[Email Sent] Contact notification for: " + senderName);

        } catch (MessagingException e) {
            System.err.println("[Email Error] Failed to send notification: " + e.getMessage());
            // Don't throw — email failure shouldn't break the contact form
        }
    }
}
