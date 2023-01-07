package com.spring.spring.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.spring.spring.entity.User;

@Repository
public interface UserRepository extends MongoRepository<User,String>{
    User findById(Integer id);
    User findByName(String name);
    User findByEmail(String email);
    List<User> findByNameLike(String name);
}
