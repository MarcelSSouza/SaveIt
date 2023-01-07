package com.spring.spring.controller;

import java.util.List;
import org.apache.commons.text.WordUtils;
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

import com.spring.spring.entity.Game;
import com.spring.spring.entity.Rating;
import com.spring.spring.service.GameService;

@RestController
@RequestMapping("/games")
public class GameController {

    @Autowired
    private GameService service;
    
    @PostMapping
    public Game save(@RequestBody Game game){
        return service.save(game);
    }

    @GetMapping("/{_id}")
    public Game getGameById(@PathVariable String _id){
        return service.getGameById(_id);
    }
    @GetMapping
    public List<Game> getAllGames(){
        return service.getAllgames();
    }

    @GetMapping("/search/{Name}")
    public Game getGameByName(@PathVariable String Name){
        Name = WordUtils.capitalizeFully(Name);
        return service.getGameByName(Name);
    }

    @DeleteMapping("/delete/{gameid}")
    public void deleteGame(@PathVariable Integer gameid){
        service.deleteGame(gameid);
    }

    @GetMapping("/search/id/{gameid}")  
    public Game getGameBygameid(@PathVariable Integer gameid) {
         return service.getGameBygameid(gameid);    
    }

    @GetMapping("/search/names/{name}")
    public List<Game> getGamesByName(@PathVariable String name){
        name = WordUtils.capitalizeFully(name);
        return service.getGamesByName(name);
    }

    @GetMapping("/search/publisher/{publisher}")
    public List<Game> getGamesByPublisher(@PathVariable String publisher){
        return service.getGamesByPublisher(publisher);  
    }

    @GetMapping("/search/top10")
    public List<Game> getTop10Games(){
        return service.getTop10Games();
    }

    @PutMapping("/rating/{gameid}")
    public Game addRating(@PathVariable int gameid, @RequestBody Rating rating){
        
        return service.addRating(gameid, rating);
    }

    @GetMapping("/search/recent10")
    public List<Game> get10RecentGames(){
        return service.getRecentGames();
    }
}
 