package boyd.api.service;

import boyd.api.Repository.UserRepository;
import boyd.api.model.Repo;
import boyd.api.model.User;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;

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

    public String getRecommendations(String username) {
        String node = username;
        for(int i = 0; i < 3; i++) {
            String tmp = getStarred(node);
            if (!tmp.contains(","))
                break;
            String[] favourite = getStarred(node).split("\n");
            int count = 0;
            while (favourite[count].contains(node)) {
                count++;
            }
            node = favourite[count].split(",")[2];
            node = node.substring(0, node.length()-1).trim();
        }
        return getRepos(node);
    }


}
