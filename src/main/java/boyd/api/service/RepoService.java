package boyd.api.service;

import boyd.api.Repository.RepoRepository;
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

    public String getRepoIssues(String owner, String repo) {
        String x = handleETags.sendGetRequestWithETag("https://api.github.com/repos/" + owner + "/" + repo + "/issues");
        JSONArray json = new JsonNode(x).getArray();

        StringBuilder r = new StringBuilder();

        for (int i = 0; i < json.length(); i++) {
            JSONObject jo = json.getJSONObject(i);
            r.append("title:").append(jo.get("title")).append(", ");
            r.append("user:").append(jo.getJSONObject("user").get("login")).append(", description:");
            JSONArray ja = jo.getJSONArray("labels");
            for (int j = 0; j < ja.length(); j++) {
                JSONObject jo2 = ja.getJSONObject(j);
                r.append(jo2.get("description")).append(",");
            }
            r.delete(r.length()-1, r.length());
            r.append("\n");

            if (i == 2) {
                break;
            }
        }

        return r.toString();
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

    public String getRepoCommits(String owner, String repo) {
        String x = handleETags.sendGetRequestWithETag("https://api.github.com/repos/" + owner + "/" + repo + "/commits");
        JSONArray json = new JsonNode(x).getArray();

        return tagJsonMessages(json);
    }

    public String tagJsonMessages(JSONArray json) {
        int jsonLength = json.length();
        StringBuilder r = new StringBuilder();

        if (importantWords == null) {
            populateImportantWordArray();
        }

        for (int i = 0; i < jsonLength; i++) {
            JSONObject j = json.getJSONObject(i).getJSONObject("commit");
            String info = j.getJSONObject("author").get("name") + ", " + j.getJSONObject("author").get("date");
            String message = j.get("message").toString();

            message = tagString(message) + message;
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

    public String getRepoSearch(String keyword, String language) {
        HttpResponse<JsonNode> jsonResponse;
        // per_page specifies how many repos you want to be returned
        if (keyword.equals("") && language.equals("")) {
            jsonResponse = Unirest.get("https://api.github.com/search/repositories?q=stars:1000..2000&fork:true&sort=stars&order=desc?page=1&per_page=3").header("accept",
                    "application/vnd.github+json").queryString("apiKey", "123").asJson();
        } else {
            jsonResponse = Unirest.get("https://api.github.com/search/repositories?q=" + keyword +
                    "+language:" + language + "&sort=stars&order=desc?page=1&per_page=3").header("accept",
                    "application/vnd.github+json").queryString("apiKey", "123").asJson();
        }

        JSONArray j = jsonResponse.getBody().getObject().getJSONArray("items");
        StringBuilder r = new StringBuilder();
        JsonNode x;

        for (int i = 0; i < j.length(); i++) {
            String name = j.getJSONObject(i).get("name").toString();
            String fullName = j.getJSONObject(i).get("full_name").toString();
            String ownerInfo = j.getJSONObject(i).get("owner").toString();
            x = new JsonNode(ownerInfo);
            String owner = x.getObject().get("login").toString();
            r.append(name).append(", ").append(fullName).append(", ").append(owner).append(".\n");
        }
        // return(jsonResponse.getBody().getObject().get("items").toString());
        return (r.toString());
    }

    public String getAllRepoInformation(String owner, String repo) {

        // String m1 = getRepoTags(owner, repo);
        String m2 = getRepoLanguages(owner, repo);
        // String m3 = getRepoTopics(owner, repo);
        String m4 = getRepoCommits(owner, repo);
        // String m5 = getRepoIssues(owner, repo);
        // String m6 = getRepoDeployments(owner, repo);
        // String m7 = getRepoReadme(owner, repo);

        String r = "";

        // r += "Tags:\n" + m1 + "\n";
        r += "Languages:\n" + m2 + "\n";
        // r += "Topics:\n" + m3 + "\n";
        r += "Commits:\n" + m4 + "\n";
        // r += "Issues:\n" + m5 + "\n";
        // r += "Deployments:\n" + m6 + "\n";
        // r += "ReadMe:\n" + m7 + "\n";

        return r;
    }

}