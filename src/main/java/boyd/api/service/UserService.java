package boyd.api.service;

import boyd.api.Repository.UserRepository;
import boyd.api.model.Repo;
import boyd.api.model.User;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;
import kong.unirest.json.JSONArray;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class UserService {

    @Autowired
    UserRepository userRepository;

    public String getUser(String username) {
        try {
            List<User> user = userRepository.findByUsername(username);
    
            if (user == null) {
                return getUserInfo(username);
            } else {
                String name = user.get(0).getUsername();
                String email = user.get(0).getEmail();
                String topics = user.get(0).getTopics();
                System.out.println(name + ", " + topics + ", " + email);
    
                return name + ", " + topics + ", " + email;
            }
        } catch (Exception e) {
            // TODO: handle exception
            return null;
        }
    }

    public String getUserInfo(String user) {
        return(handleETags.sendGetRequestWithETag("https://api.github.com/users/"+user));
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public String getFollowers(String user) {
        HttpResponse<JsonNode> jsonResponse = Unirest.get("https://api.github.com/users/" + user + "/followers")
                .header("accept", "application/json").queryString("apiKey", "123")
                .asJson();
        return(jsonResponse.getBody().toString());
    }

    public String getStarred(String user) {
        String x = handleETags.sendGetRequestWithETag("https://api.github.com/users/"+user+"/starred");
        JsonNode json = new JsonNode(x);

        int numberRepos = json.getArray().length();
        StringBuilder r = new StringBuilder();
        JsonNode j;

        for (int i = 0; i < numberRepos; i++) {
            String name = json.getArray().getJSONObject(i).get("name").toString();
            String fullName = json.getArray().getJSONObject(i).get("full_name").toString();
            String ownerInfo = json.getArray().getJSONObject(i).get("owner").toString();
            j = new JsonNode(ownerInfo);
            String owner = j.getObject().get("login").toString();
            r.append(name).append(", ").append(fullName).append(", ").append(owner).append(".\n");
        }
        return(r.toString().trim());
    }

    public String getRepos(String user) {
        String x = handleETags.sendGetRequestWithETag("https://api.github.com/users/"+user+"/repos");
        JsonNode json = new JsonNode(x);

        int numberRepos = json.getArray().length();
        StringBuilder r = new StringBuilder();
        String name, fullName, owner;

        for (int i = 0; i < numberRepos; i++) {
            name = json.getArray().getJSONObject(i).get("name").toString();
            fullName = json.getArray().getJSONObject(i).get("full_name").toString();
            owner = json.getArray().getJSONObject(i).get("owner").toString();
            r.append(name).append(", ").append(fullName).append(", ").append(owner).append(".\n");
        }
        return(r.toString().trim());
    }

    public String getEvents(String user) {
        return(handleETags.sendGetRequestWithETag("https://api.github.com/users/"+user+"/events"));
    }

    public String getRecvEvents(String user) {
        return(handleETags.sendGetRequestWithETag("https://api.github.com/users/"+user+"/received_events"));
    }

    public String getRecommendations(String username, int pageNumber) {
        UserService userService = new UserService();
        String currentUser = userService.getUserInfo(username);
        System.out.println(currentUser);
        // String[] components = currentUser.split(", ");
        // String[] userTopics = components[1].split(" ");

        // String keyword = userTopics[0];
        String keyword = "music";
        String language = "python";

        return getRepoSearch(keyword, language, pageNumber);
    }

    public String getRepoSearch(String keyword, String language, int pageNumber) {
        HttpResponse<JsonNode> jsonResponse;
        // per_page specifies how many repos you want to be returned
        if (keyword.equals("") && language.equals("")) {
            jsonResponse = Unirest.get("https://api.github.com/search/repositories?q=stars:1000..2000&fork:true&sort=stars&order=desc?page=" + Integer.toString(pageNumber) + "&per_page=10").header("accept",
                    "application/vnd.github+json").queryString("apiKey", "123").asJson();
        } else {
            jsonResponse = Unirest.get("https://api.github.com/search/repositories?q=" + keyword +
                    "+language:" + language + "&sort=stars&order=desc?page=" + Integer.toString(pageNumber) + "&per_page=" +Integer.toString(10*pageNumber) + "").header("accept",
                    "application/vnd.github+json").queryString("apiKey", "123").asJson();
        }

        JSONArray j = jsonResponse.getBody().getObject().getJSONArray("items");
        StringBuilder r = new StringBuilder();
        JsonNode x;

        for (int i = (10 * pageNumber - 10); i < (pageNumber * 10); i++) {
            String name = j.getJSONObject(i).get("name").toString();
            String fullName = j.getJSONObject(i).get("full_name").toString();
            String ownerInfo = j.getJSONObject(i).get("owner").toString();
            x = new JsonNode(ownerInfo);
            String owner = x.getObject().get("login").toString();
            r.append(name).append(", ").append(fullName).append(", ").append(owner).append(".\n");
        }
        // return(jsonResponse.getBody().getObject().get("items").toString());
        return (r.toString().trim());
    }


}
