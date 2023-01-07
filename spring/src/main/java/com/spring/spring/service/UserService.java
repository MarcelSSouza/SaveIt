package com.spring.spring.service;

import java.util.List;

import com.spring.spring.entity.User;

public interface UserService {

    User save(User user);
    List<User> getAllUsers();
    User getUserById(int id);
    User getUserById(String _id);
    User getUserByName(String name);
    void deleteUser(int id);
    User addHours(int userId, int game_id, int hours);
    User addList(int userid, int game_id, String list_type);
    User getUserByEmail(String email);
    List<User> getUsersByName(String name);

    
}
