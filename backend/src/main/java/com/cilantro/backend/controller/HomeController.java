package com.cilantro.backend.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/home")
public class HomeController {

    @GetMapping("/hello")
    public String helloGet() {
        return "GET request successful!";
    }

    @PostMapping("/hello")
    public String helloPost(@RequestBody(required = false) String body) {
        return "POST request successful! Received: " + (body != null ? body : "no body");
    }
}