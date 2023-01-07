package com.spring.spring.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.spring.entity.Publisher;
import com.spring.spring.service.PublisherService;



@RestController
@RequestMapping("/publishers")
public class PublisherController {
    @Autowired
    private PublisherService service;

    @GetMapping("/search/email/{email}")
    public Publisher getPublisherByEmail(@PathVariable String email){
        return service.getPublisherByEmail(email);
    }

    @PutMapping("/publish/{userid}/{gameid}")
    public Publisher publishGame(@PathVariable int userid, @PathVariable int gameid ){
        return service.publishGame(userid,gameid);
    }

    @GetMapping
    public List<Publisher> getAllPublishers(){
        return service.getAllPublishers();
    }
}
