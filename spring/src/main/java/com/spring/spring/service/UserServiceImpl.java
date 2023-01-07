package com.spring.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.spring.entity.User;
import com.spring.spring.repository.UserRepository;

@Service
public class UserServiceImpl implements UserService{
    @Autowired
    private UserRepository repository;

    @Override
    public User save(User user) {
        // TODO Auto-generated method stub
        return repository.save(user);
    }

    @Override
    public List<User> getAllUsers() {
        // TODO Auto-generated method stub
        return repository.findAll();
    }

    @Override
    public User getUserById(int id) {
        // TODO Auto-generated method stub
        return repository.findById(id);
    }

    @Override
    public User getUserById(String _id) {
        // TODO Auto-generated method stub
        return repository.findById(_id).get();
    }

    @Override
    public User getUserByName(String name) {
        // TODO Auto-generated method stub
        return repository.findByName(name);
    }

    @Override
    public void deleteUser(int id) {
        // TODO Auto-generated method stub
        User user = repository.findById(id);
        repository.delete(user);
    }

    @Override
    public User addHours(int userId, int game_id, int hours) {
        User user = repository.findById(userId);
        int time = user.getPlayedHours().containsKey(game_id)? user.getPlayedHours().get(game_id) :0;
        user.getPlayedHours().put(game_id, time+hours);
        user.getPlaying().add(game_id);
        return repository.save(user);
        
    }

    @Override
    public User addList(int userid, int game_id, String list_type) {
        // TODO Auto-generated method stub
        User user = repository.findById(userid);
        switch(list_type){
            case "playing":
                user.getToBePlayed().remove(game_id);
                user.getPlaying().add(game_id);break;
            case "played":
                user.getPlaying().remove(game_id);
                user.getPlayed().add(game_id);break;
            case "tobeplayed":
                user.getToBePlayed().add(game_id);break;
        }
        return repository.save(user);

    }

    @Override
    public User getUserByEmail(String email) {
        // TODO Auto-generated method stub
        return repository.findByEmail(email);
    }

    @Override
    public List<User> getUsersByName(String name) {
        // TODO Auto-generated method stub
        return repository.findByNameLike(name);
    }

    
    
    
}

