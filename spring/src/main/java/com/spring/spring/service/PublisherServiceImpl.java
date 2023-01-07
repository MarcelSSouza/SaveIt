package com.spring.spring.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.spring.spring.entity.Publisher;
import com.spring.spring.repository.PublisherRepository;

@Service
public class PublisherServiceImpl implements PublisherService{
    @Autowired
    private PublisherRepository repository;

    @Override
    public Publisher save(Publisher Publisher) {
        // TODO Auto-generated method stub
        return repository.save(Publisher);
    }

    @Override
    public List<Publisher> getAllPublishers() {
        // TODO Auto-generated method stub
        return repository.findAll();
    }

    @Override
    public Publisher getPublisherById(int id) {
        // TODO Auto-generated method stub
        return repository.findById(id);
    }

    @Override
    public Publisher getPublisherById(String _id) {
        // TODO Auto-generated method stub
        return repository.findById(_id).get();
    }

    @Override
    public Publisher getPublisherByName(String name) {
        // TODO Auto-generated method stub
        return repository.findByName(name);
    }

    @Override
    public void deletePublisher(int id) {
        // TODO Auto-generated method stub
        Publisher Publisher = repository.findById(id);
        repository.delete(Publisher);
    }


    

    @Override
    public Publisher getPublisherByEmail(String email) {
        // TODO Auto-generated method stub
        return repository.findByEmail(email);
    }

    @Override
    public List<Publisher> getPublishersByName(String name) {
        // TODO Auto-generated method stub
        return repository.findByNameLike(name);
    }

    @Override
    public Publisher publishGame(Integer userid, Integer gameid) {
        // TODO Auto-generated method stub
        Publisher pub = repository.findById(userid);
        pub.getGamesOwned().add(gameid);
        return repository.save(pub);
    }


    
}
