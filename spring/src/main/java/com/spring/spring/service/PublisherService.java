package com.spring.spring.service;


import java.util.List;

import com.spring.spring.entity.Publisher;

public interface PublisherService {
    Publisher save(Publisher Publisher);
    List<Publisher> getAllPublishers();
    Publisher getPublisherById(int id);
    Publisher getPublisherById(String _id);
    Publisher getPublisherByName(String name);
    void deletePublisher(int id);
    Publisher getPublisherByEmail(String email);
    List<Publisher> getPublishersByName(String name);
    Publisher publishGame(Integer userid, Integer gameid);
  

}
