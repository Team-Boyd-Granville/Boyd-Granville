package boyd.api.service;

import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    public String getUser(String user) {
        HttpResponse<JsonNode> jsonResponse = Unirest.get("https://api.github.com/users/" + user)
                .header("accept", "application/json").queryString("apiKey", "123")
                .asJson();
        return(jsonResponse.getBody().toString());
    }

    public String getFollowers(String user) {
        HttpResponse<JsonNode> jsonResponse = Unirest.get("https://api.github.com/users/" + user + "/followers")
                .header("accept", "application/json").queryString("apiKey", "123")
                .asJson();
        return(jsonResponse.getBody().toString());
    }

    public String getStarred(String user) {
        HttpResponse<JsonNode> jsonResponse = Unirest.get("https://api.github.com/users/"+user+"/starred")
                .header("accept", "application/json").queryString("apiKey", "123")
                .asJson();
        return(jsonResponse.getBody().toString());
    }

    public String getRepos(String user) {
        HttpResponse<JsonNode> jsonResponse = Unirest.get("https://api.github.com/users/"+user+"/repos")
                .header("accept", "application/json").queryString("apiKey", "123")
                .asJson();
        return(jsonResponse.getBody().toString());
    }

    public String getEvents(String user) {
        HttpResponse<JsonNode> jsonResponse = Unirest.get("https://api.github.com/users/"+user+"/events")
                .header("accept", "application/json").queryString("apiKey", "123")
                .asJson();
        return(jsonResponse.getBody().toString());
    }

    public String getRecvEvents(String user) {
        HttpResponse<JsonNode> jsonResponse = Unirest.get("https://api.github.com/users/"+user+"/received_events")
                .header("accept", "application/json").queryString("apiKey", "123")
                .asJson();
        return(jsonResponse.getBody().toString());
    }


}