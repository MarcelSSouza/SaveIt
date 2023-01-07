package com.spring.spring.entity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "users")
public class User {

    @Id
    private String _id;
    private Integer id;
    private String name;
    private String email;
    private String password;
    private Map<Integer,Integer> playedHours;
    private Set<Integer> toBePlayed;
    private Set<Integer> played;
    private Set<Integer> playing;
    private Set<String> favoriteGenre;

    public User(String name, String email, String password, Set<String> favoriteGenre) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.favoriteGenre = favoriteGenre;

        toBePlayed = new HashSet<>();
        played = new HashSet<>();
        playing = new HashSet<>();
        playedHours = new HashMap<Integer,Integer>();
    }

    
    
}



/*
 * 
 * "id": 8,
      "name": "Melissa Gomez",
      "email": "kaylawheeler@example.org",
      "password": "#6w(nJJRt5",
      "playedHours": {id_jogo: horas, }
          3688,
          30
      ],
      "playing": [
          2445,
          3769,
          1989
      ],
      "toBePlayed": [
          2381,
          913,
          2527
      ],
      "played": [
          46,
          2068,
          2817,
          2507,
          3358
      ],
      "favoriteGenre": [
          "Virtual Life"
      ]
 */