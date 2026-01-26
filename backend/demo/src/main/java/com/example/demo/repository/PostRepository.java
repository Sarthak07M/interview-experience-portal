package com.example.demo.repository;

import com.example.demo.model.InterviewPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends JpaRepository<InterviewPost, Long> {
    // This interface allows you to Save, Find, and Delete posts in MySQL
    // without writing a single line of SQL code!
}