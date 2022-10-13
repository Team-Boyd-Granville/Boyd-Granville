package boyd.api.service;

import boyd.api.Repository.RepoRepository;
import boyd.api.controller.UserController;
import boyd.api.model.Repo;
import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;

import kong.unirest.json.JSONArray;
import kong.unirest.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.Scanner;
import boyd.api.model.Issue;

@Service
public class RepoService {

    @Autowired
    RepoRepository repoRepository;

    public String[] importantWords;

    public Repo saveRepo(Repo repo) {
        return repoRepository.save(repo);
    }

    public String getRepoInfo(String owner, String repo) {
        return (handleETags.sendGetRequestWithETag("https://api.github.com/repos/" + owner + "/" + repo));
    }

    public String getRepoLanguages(String owner, String repo) {
        return (handleETags.sendGetRequestWithETag("https://api.github.com/repos/" + owner + "/" + repo + "/languages"));
    }

    public String getRepoTags(String owner, String repo) {
        return (handleETags.sendGetRequestWithETag("https://api.github.com/repos/" + owner + "/" + repo + "/tags"));
    }

    public Issue[] getRepoIssues(String owner, String repo) {
        String x = handleETags.sendGetRequestWithETag("https://api.github.com/repos/" + owner + "/" + repo + "/issues");
        JSONArray json = new JsonNode(x).getArray();

        Issue[] issue = new Issue[3];

        int count = 0;

        for (int i = 0; i < json.length(); i++) {
            JSONObject jo = json.getJSONObject(i);

            issue[count] = new Issue();

            issue[count].setTitle((String) jo.get("title"));

            issue[count].setUser((String) jo.getJSONObject("user").get("login"));

            String state = (String) jo.get("state");
            if (state.equals("closed")) {
                continue;
            }
            issue[count].setState(state);

            issue[count].setComments((Integer) jo.get("comments"));

            try {
                issue[count].setDescription((String) jo.get("body"));
            } catch (JSONException e) {
                System.err.println("No body");
            }

            if (count == 2) {
                break;
            }
            count++;
        }

        return issue;
    }

    public String getRepoDeployments(String owner, String repo) {
        String x = handleETags.sendGetRequestWithETag("https://api.github.com/repos/" + owner + "/" + repo + "/deployments");
        JSONArray json = new JsonNode(x).getArray();

        StringBuilder r = new StringBuilder();

        for (int i = 0; i < json.length(); i++) {
            JSONObject jo = json.getJSONObject(i);
            r.append("title:").append(jo.get("original_environment")).append(", ");
            r.append("creator:").append(jo.getJSONObject("creator").get("login")).append(", ");
            r.append("description:").append(jo.get("description")).append(", ");
            r.append("task:").append(jo.get("task")).append(", ");
            r.append("time:").append(jo.get("created_at"));
            r.append("\n");

            if (i == 2) {
                break;
            }
        }

        return r.toString();
    }

    public String getRepoReadme(String owner, String repo) {
        return (handleETags.sendGetRequestWithETag("https://raw.githubusercontent.com/" + owner + "/" + repo + "/main/README.md"));
    }

    public String getRepoContributors(String owner, String repo) {
        return (handleETags.sendGetRequestWithETag("https://api.github.com/repos/" + owner + "/" + repo + "/contributors?per_page=100&page=1"));
    }

    public String getRepoCommits(String owner, String repo) {
        String x = handleETags.sendGetRequestWithETag("https://api.github.com/repos/" + owner + "/" + repo + "/commits");
        JSONArray json = new JsonNode(x).getArray();

        return tagJsonMessages(json);
    }

    public String tagJsonMessages(JSONArray json) {
        int jsonLength = json.length();
        StringBuilder r = new StringBuilder();

        // if (importantWords == null) {
        //     populateImportantWordArray();
        // }

        for (int i = 0; i < jsonLength; i++) {
            JSONObject j = json.getJSONObject(i).getJSONObject("commit");
            String info = j.getJSONObject("author").get("name") + ", " + j.getJSONObject("author").get("date");
            String message = j.get("message").toString();

            // message = tagString(message) + message;
            if (i == 3)
                break;
            r.append(info).append(", ").append(message).append("\n");
        }

        return r.toString().trim();
    }

    public String tagString(String message) {
        for (String importantWord : importantWords) {
            if (message.toLowerCase().contains(importantWord)) {
                return "important message: ";
            }
        }
        return "";
    }

    public void populateImportantWordArray() {
        URL resource = getClass().getClassLoader().getResource("importantWords.txt");
        File file;

        StringBuilder f = new StringBuilder();

        try {
            assert resource != null;
            file = new File(resource.toURI());
            Scanner sc = new Scanner(file);
            while (sc.hasNextLine()) {
                String s = sc.nextLine();
                f.append(s);
            }
            importantWords = f.toString().split(", ");
        } catch (URISyntaxException | FileNotFoundException e) {
            e.printStackTrace();
        }
    }

    public String getRepoTopics(String owner, String repo) {
        return (handleETags.sendGetRequestWithETag("https://api.github.com/repos/" + owner + "/" + repo + "/topics"));
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

    public String getAllRepoInformation(String owner, String repo) {

        // String m1 = getRepoTags(owner, repo);
        String m2 = getRepoLanguages(owner, repo);
        String m3 = getRepoTopics(owner, repo);
        String m4 = getRepoCommits(owner, repo);
        // String m5 = getRepoIssues(owner, repo);
        String m6 = getRepoDeployments(owner, repo);
        // String m7 = getRepoReadme(owner, repo);

        String r = "";

        // r += "Tags:\n" + m1 + "\n";
        r += "Languages:\n" + m2 + "\n";
        r += "Topics:\n" + m3 + "\n";
        r += "Commits:\n" + m4 + "\n";
        // r += "Issues:\n" + m5 + "\n";
        r += "Deployments:\n" + m6 + "\n";
        // r += "ReadMe:\n" + m7 + "\n";

        return r;
    }

    public String getRecommendations(String username, int pageNumber) {
        // UserService userService = new UserService();
        // String currentUser = userService.getUser(username).trim();
        // String[] components = currentUser.split(", ");
        // String[] userTopics = components[1].split(" ");

        // String keyword = userTopics[0];
        String keyword = "music";
        String language = "python";

        return getRepoSearch(keyword, language, pageNumber);
    }
}
