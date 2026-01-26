package com.example.demo.controller;

import com.example.demo.model.InterviewPost;
import com.example.demo.repository.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/posts")
@CrossOrigin(origins = "http://localhost:5173", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE, RequestMethod.PUT, RequestMethod.OPTIONS})public class PostController {

    @Autowired
    private PostRepository postRepository;

    // 1. Save a new experience
    @PostMapping
    public InterviewPost createPost(@RequestBody InterviewPost post) {
        return postRepository.save(post);
    }

    // 2. Get all shared experiences for the homepage
    @GetMapping
    public List<InterviewPost> getAllPosts() {
        return postRepository.findAll();
    }
    @PutMapping("/{id}/like")
    public void likePost(@PathVariable Long id) {
        InterviewPost post = postRepository.findById(id).orElseThrow();
        post.setLikes(post.getLikes() + 1);
        postRepository.save(post);
    }
 // 3. Admin Delete Feature
    @DeleteMapping("/{id}")
    public void deletePost(@PathVariable Long id) {
        postRepository.deleteById(id);
    }
}
