package com.example.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;

@Entity
@Table(name = "interview_posts")
public class InterviewPost {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String studentName;
    private String companyName;
    private String role;

    @Column(columnDefinition = "TEXT")
    private String experience;

    // --- CONSTRUCTORS ---
    public InterviewPost() {}

    public InterviewPost(String studentName, String companyName, String role, String experience) {
        this.studentName = studentName;
        this.companyName = companyName;
        this.role = role;
        this.experience = experience;
    }

    // --- GETTERS AND SETTERS (Crucial for React to see the data) ---
    
    public Long getId() {
        return id;
    }
    private int likes = 0; // Initialize at 0

    public int getLikes() { return likes; }
    public void setLikes(int likes) { this.likes = likes; }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getExperience() {
        return experience;
    }

    public void setExperience(String experience) {
        this.experience = experience;
    }
}