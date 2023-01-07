package com.spring.spring.request;

public class UpdateUserListRequestModel {
    private int game_id;
    private String list_type;
    public int getGame_id() {
        return game_id;
    }
    public void setGame_id(int game_id) {
        this.game_id = game_id;
    }
    public String getList_type() {
        return list_type;
    }
    public void setList_type(String list_type) {
        this.list_type = list_type;
    }
    @Override
    public String toString() {
        return "[game_id=" + game_id + ", list_type=" + list_type + "]";
    }
    

    
}
