package com.spring.spring.service;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.spring.entity.Game;
import com.spring.spring.entity.Rating;
import com.spring.spring.repository.GameRepository;

@Service
public class GameServiceImpl implements GameService{
    @Autowired
    private GameRepository repository;

    @Override
    public Game save(Game game) {
        // TODO Auto-generated method stub
        List<Game> games = getRecentGames().subList(0, 1);
        game.setGameid(games.get(0).getGameid()+1);
        return repository.save(game);
    }

    @Override
    public List<Game> getAllgames() {
        // TODO Auto-generated method stub
        return repository.findAll();
    }

    @Override
    public Game getGameById(String _id) {
        return repository.findById(_id).get();
    }

    @Override
    public Game getGameByName(String Name) {
        // TODO Auto-generated method stub
        return repository.findByName(Name);
    }

    @Override
    public void deleteGame(Integer gameid) {
        // TODO Auto-generated method stub
        repository.deleteBygameid(gameid);
    }


    @Override
    public Game getGameBygameid(Integer gameid) {
        // TODO Auto-generated method stub
        return repository.findBygameid(gameid);
    }

    @Override
    public List<Game> getGamesByName(String name) {
        // TODO Auto-generated method stub
        return repository.findByNameLike(name);
    }

    @Override
    public List<Game> getGamesByPublisher(String publisher) {
        // TODO Auto-generated method stub
        return repository.findByPublisher(publisher);
    }

    @Override
    public List<Game> getTop10Games() {
        // TODO Auto-generated method stub
        List<Game> games= repository.findAll();
        Collections.sort(games, new Comparator<Game>(){
            public int compare(Game g1, Game g2){
                return g1.getUserrate()<g2.getUserrate()?1:g1.getUserrate()>g2.getUserrate()?-1:0;
            }
        });
        return games.subList(0, 10);
    }

    @Override
    public Game addRating(int gameid, Rating rating) {
        // TODO Auto-generated method stub
        Game game = repository.findBygameid(gameid);
        double newRating = (rating.getRating() + (game.getUserrate()*game.getUserratecount()))/(game.getUserratecount() + 1);
        game.setUserratecount(game.getUserratecount()+1);
        game.setUserrate(Math.round(newRating*100.0)/100.0);
        game.getComments().add(rating);
        return repository.save(game);
    }

    @Override
    public List<Game> getRecentGames() {
        // TODO Auto-generated method stub
        List<Game> games= repository.findAll();
        Collections.sort(games, new Comparator<Game>(){
            public int compare(Game g1, Game g2){
                return g1.getGameid()<g2.getGameid()?1:g1.getGameid()>g2.getGameid()?-1:0;
            }
        });

        return games.subList(0, 10);
    }
    
}
