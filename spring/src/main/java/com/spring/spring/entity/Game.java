package com.spring.spring.entity;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Getter;
import lombok.Setter;
@Getter
@Setter
@Document(collection = "games")
public class Game  implements java.io.Serializable {
    @Id
    private String _id;
    private Integer gameid;
    private String name;
    private List<String> genre;
    private String publisher;
    private int metascore;
    private int totalcriticism;
    private double userrate;
    private int userratecount;
    private String summary;
    private String multiplayer;
    private String releasedate;
    private String imageurl;
    private List<Rating> comments;
    private int commentcount;

    public Game(String name, List<String> genre, String publisher, String summary) {
      this.name = name;
      this.genre = genre;
      this.publisher = publisher;
      this.summary = summary;
      this.metascore = 0;
      this.totalcriticism = 0;
      this.userrate = 0.0;
      this.userratecount = 0;
      this.comments = new ArrayList<>();
      this.commentcount = 0;
    }

    public Game() {
    }
    

    
    
}


/*
 * 
 *     _id: ObjectId("63b392ca802f298387dd2bd7"),
    name: 'Grim Fandango',
    releasedate: 'October 14, 1998',
    genre: 'Adventure, General, General, 3D, Third-Person, Fantasy',
    publisher: 'LucasArts',
    metascore: 94,
    totalcriticism: 15,
    userrate: 9,
    userratecount: 772,
    summary: "Something's rotten in the Land of Dead and you're being played for a sucker.  Meet Manny Calavera, travel agent at the Department of Death. He sells luxury packages to souls on their four-year journey to eternal rest. But there's trouble in paradise.  Help Manny untangle himself from a",
    gameid: 21,
    comments: [
      { comment: 'This game is awful', rating: 1 },
      { comment: 'This game is awesome', rating: 10 }
    ],
    commentcount: 2,
    imageurl: 'https://static.metacritic.com/images/products/games/2/c3ac5d8edcc4d201cb9e92ad8903d9a5-98.jpg',
    multiplayer: 'No Online Multiplayer'

 */
