package com.spring.spring.service;

import java.util.List;

import com.spring.spring.entity.Game;
import com.spring.spring.entity.Rating;

public interface GameService {

    Game save(Game game);

    List<Game> getAllgames();

    Game getGameById(String _id);

    Game getGameBygameid(Integer gameid);

    Game getGameByName(String Name);

    void deleteGame(Integer gameid);

    List<Game> getGamesByName(String name);

    List<Game> getGamesByPublisher(String publisher);

    List<Game> getTop10Games();

    Game addRating(int gameid, Rating rating);

    List<Game> getRecentGames();
    
}
