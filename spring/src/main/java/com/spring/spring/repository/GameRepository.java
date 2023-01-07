package com.spring.spring.repository;


import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.spring.spring.entity.Game;

@Repository
public interface GameRepository extends MongoRepository<Game,String>{

    Game findByName(String Name);

    Game findBygameid(Integer gameid);

    Void deleteBygameid(Integer gameid);

    List<Game> findByNameLike(String name);

    List<Game> findByPublisher(String publisher);
    
}
