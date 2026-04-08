package com.pratik.portfolio.controller;

import com.pratik.portfolio.entity.ContactMessage;
import com.pratik.portfolio.service.ContactService;
import com.pratik.portfolio.service.EmailService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class ContactController {

    private final ContactService contactService;
    private final EmailService emailService;

    public ContactController(ContactService contactService, EmailService emailService) {
        this.contactService = contactService;
        this.emailService = emailService;
    }

    @PostMapping("/contact")
    public ResponseEntity<Map<String, String>> submitContact(@Valid @RequestBody ContactMessage message) {
        // 1. Save to database
        contactService.saveMessage(message);

        // 2. Send email notification to your Gmail
        emailService.sendContactNotification(
                message.getName(),
                message.getEmail(),
                message.getMessage()
        );

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(Map.of(
                        "status", "success",
                        "message", "Thank you, " + message.getName() + "! Your message has been received."
                ));
    }
}
