package com.spring.spring.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.spring.spring.entity.Publisher;

@Repository
public interface PublisherRepository extends MongoRepository<Publisher,String>{
    Publisher findById(Integer id);
    Publisher findByName(String name);
    Publisher findByEmail(String email);
    List<Publisher> findByNameLike(String name);

    
}
