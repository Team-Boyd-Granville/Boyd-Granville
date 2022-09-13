package boyd.api.service;

import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;

import org.springframework.stereotype.Service;

@Service
public class RepoService {


    public String getRepoInfo(String owner, String repo) {
        HttpResponse<JsonNode> jsonResponse = Unirest.get("https://api.github.com/repos/"+owner+"/"+repo)
                .header("accept", "application/vnd.github+json").queryString("apiKey", "123")
                .asJson();
        return (jsonResponse.getBody().toString());
    }
    public String getRepoLanguages(String owner, String repo) {
        HttpResponse<JsonNode> jsonResponse = Unirest.get("https://api.github.com/repos/"+owner+"/"+repo+"/languages")
                .header("accept", "application/vnd.github+json").queryString("apiKey", "123")
                .asJson();
        return(jsonResponse.getBody().toString());
    }
    public String getRepoTags(String owner, String repo) {
        HttpResponse<JsonNode> jsonResponse = Unirest.get("https://api.github.com/repos/"+owner+"/"+repo+"/tags")
                .header("accept", "application/vnd.github+json").queryString("apiKey", "123")
                .asJson();
        return(jsonResponse.getBody().toString());
    }

    public String getRepoCommits(String owner, String repo) {
        HttpResponse<JsonNode> jsonResponse = Unirest.get("https://api.github.com/repos/"+owner+"/"+repo+"/commits")
                .header("accept", "application/vnd.github+json").queryString("apiKey", "123")
                .asJson();
        return(jsonResponse.getBody().toString());
    }

    public String getRepoTopics(String owner, String repo) {
        HttpResponse<JsonNode> jsonResponse = Unirest.get("https://api.github.com/repos/"+owner+"/"+repo+"/topics")
                .header("accept", "application/vnd.github+json").queryString("apiKey", "123")
                .asJson();
        return(jsonResponse.getBody().toString());
    }

    public String getRepoSearch(String keyword, String language) {
        // per_page specifies how many repos you want to be returned
        HttpResponse<JsonNode> jsonResponse = Unirest.get("https://api.github.com/search/repositories?q="+keyword +
                        "+language:"+language+"&sort=stars&order=desc?page=1&per_page=1").header("accept",
                        "application/vnd.github+json").queryString("apiKey", "123").asJson();
        return(jsonResponse.getBody().toString());
    }
}