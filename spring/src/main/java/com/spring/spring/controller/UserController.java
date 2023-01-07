package com.spring.spring.controller;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spring.spring.entity.User;
import com.spring.spring.request.UpdateUserHoursRequestModel;
import com.spring.spring.request.UpdateUserListRequestModel;
import com.spring.spring.service.UserService;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService service;

    @GetMapping
    public List<User> getAllUsers(){
        return service.getAllUsers();
    }

    @PostMapping()
    public String addUser(@RequestBody User user){
        service.save(user);
        return "User created";
    }

    @GetMapping("/search/{name}")
    public User getUserbyName(@PathVariable String name){
        return service.getUserByName(name);
    }

    @GetMapping("/search/id/{id}")
    public User getUserById(@PathVariable int id){
        return service.getUserById(id);
    }

    @DeleteMapping("/delete/{userid}")
    public void deleteUser(@PathVariable int userid){
        service.deleteUser(userid);
    }

    @PutMapping("/{userid}/hours")
    public User addHours(@PathVariable int userid, @RequestBody UpdateUserHoursRequestModel userDetails){
        return service.addHours(userid, userDetails.getGame_id(), userDetails.getHours());
    }
    
    @PutMapping("/{userid}/addlist")
    public User addToList(@PathVariable int userid, @RequestBody UpdateUserListRequestModel userDetails){
        return service.addList(userid, userDetails.getGame_id(), userDetails.getList_type());
    }
    
    @GetMapping("/search/email/{email}")
    public User getUserByEmail(@PathVariable String email){
        return service.getUserByEmail(email);
    }

    @GetMapping("/search/names/{name}")
    public List<User> getUsersByName(@PathVariable String name){
        return service.getUsersByName(name);
    }
}

/*
 * 
 * add user
 * get user by id
 * get all users
 * update user /id
 * update played hours (/hours/{id})
 * add game to playing list
 * add game to played list
 * add game to toBePlayed list
 */