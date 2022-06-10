package com.gamebroadcast.forum.mail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailSenderService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendEmail(String reciver, String subject, String text) {
        SimpleMailMessage mail = new SimpleMailMessage();
        mail.setFrom("noreply@gmail.com");
        mail.setTo(reciver);
        mail.setSubject(subject);
        mail.setText(text);

        mailSender.send(mail);
    }
}