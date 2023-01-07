package com.spring.spring.entity;

public class Rating {
    private String comment;
    private int rating;
    public String getComment() {
        return comment;
    }
    public void setComment(String comment) {
        this.comment = comment;
    }
    public int getRating() {
        return rating;
    }
    public void setRating(int rating) {
        this.rating = rating;
    }
    public Rating(String comment, int rating) {
        this.comment = comment;
        this.rating = rating;
    }
    
    
}
