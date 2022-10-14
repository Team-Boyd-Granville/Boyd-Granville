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

import com.google.common.collect.ImmutableSet;
import com.google.common.collect.Sets;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
public class UserService {

    List<Set<String>> exploredOptions = new ArrayList<Set<String>>();

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
        String currentUser = getUser(username);
        System.out.println(currentUser);
        String[] components = currentUser.split(",");
        String[] userTopics = (components[1].trim()).split(" ");

        for (int i = 0; i < userTopics.length; i++) {
            System.out.println(userTopics[i]);
        }

        // String keyword = userTopics[0];
        // String keyword = "music";
        String language = "python";

        return getRepoSearch(userTopics, language, pageNumber);
    }

    public String getRepoSearch(String[] keyword, String language, int pageNumber) {
        HttpResponse<JsonNode> jsonResponse;

        int numKeywords = keyword.length;
        Set<String> targetSet = new HashSet<String>(Arrays.asList(keyword));
        List<Set<String>> allCombinations = new ArrayList<Set<String>>();
        for (int i = numKeywords - 1; i > 0; i--) {
            Set<Set<String>> combinations = Sets.combinations(targetSet, Math.min(targetSet.size(), i));
            for (Set<String> x : combinations)
                allCombinations.add(x);
        }

        allCombinations.removeAll(exploredOptions);

        StringBuilder output = new StringBuilder();
        for (int m = 0; m < allCombinations.size(); m++) {

            // per_page specifies how many repos you want to be returned
            String keywordString = "";
            if (keyword.equals(null) && language.equals("")) {
            jsonResponse = Unirest.get("https://api.github.com/search/repositories?q=stars:1000..2000&fork:true&sort=stars&order=desc?page=" + Integer.toString(pageNumber) + "&per_page=10").header("accept",
                    "application/vnd.github+json").queryString("apiKey", "123").asJson();
        } else {
                for (String x : allCombinations.get(m)) {
                    keywordString += x + "+";
                }
            keywordString = keywordString.substring(0, keywordString.length() - 1);
            System.out.println(keywordString);

            jsonResponse = Unirest.get("https://api.github.com/search/repositories?q=" + keywordString +
                    "+language:python&sort=stars&order=desc?page=1&per_page=" + Integer.toString(10*pageNumber) + " ").header("accept",
                    "application/vnd.github+json").queryString("apiKey", "123").asJson();
            }
        
        if (jsonResponse.isSuccess()) {
        JSONArray j = jsonResponse.getBody().getObject().getJSONArray("items");
        StringBuilder r = new StringBuilder();
        JsonNode x;
        
        int minNumResults = Math.min(pageNumber*10, j.length());
        if (minNumResults == j.length() && j.length() < 10) {
            exploredOptions.add(allCombinations.get(m));
        }

        for (int i = pageNumber*10-10; i < Math.min(pageNumber*10, j.length()); i++) {
            String name = j.getJSONObject(i).get("name").toString();
            String fullName = j.getJSONObject(i).get("full_name").toString();
            String ownerInfo = j.getJSONObject(i).get("owner").toString();
            x = new JsonNode(ownerInfo);
            String owner = x.getObject().get("login").toString();
            r.append(name).append(", ").append(fullName).append(", ").append(owner).append("~@" + keywordString.replace("+", ", ") + "\n");
        }
        output.append(r.toString().trim());
    }
    }
        // return(jsonResponse.getBody().getObject().get("items").toString());
        return (output.toString());
    }
    
    
}
