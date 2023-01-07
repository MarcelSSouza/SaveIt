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
@Document(collection = "publishers")
public class Publisher {

    @Id
    private String _id;
    private Integer id;
    private String name;
    private String email;
    private String password;
    private Set<Integer> gamesOwned;

    public Publisher(String name, String email, String password, Set<Integer> gamesOwned) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.gamesOwned = gamesOwned;

    }

}


