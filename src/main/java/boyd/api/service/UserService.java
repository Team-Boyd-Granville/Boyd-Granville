package boyd.api.service;

import kong.unirest.HttpResponse;
import kong.unirest.JsonNode;
import kong.unirest.Unirest;

import org.apache.http.Header;
import org.apache.http.HttpEntity;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.*;

@Service
public class UserService {
    private final CloseableHttpClient httpClient = HttpClients.createDefault();
    public Dictionary<String, String[]> responseCache = new Hashtable<>();

    public String getUser(String user) throws IOException {
        String url = "https://api.github.com/users/"+user;
        String eTag = "";

        Iterator<String> test = responseCache.keys().asIterator();
        while(test.hasNext()) {
            if(test.next().equals(url)) {
                eTag = responseCache.get(url)[0];
            }
        }

        HttpGet request = new HttpGet(url);
        request.addHeader("If-None-Match", eTag);

        try (CloseableHttpResponse response = httpClient.execute(request)) {

            // Get HttpResponse Status
            System.out.println(response.getStatusLine().toString());

            if (Objects.equals(response.getStatusLine().toString(), "HTTP/1.1 304 Not Modified")) {
                return(responseCache.get(url)[1]);
            }

            HttpEntity entity = response.getEntity();

            Header[] headers = response.getHeaders("ETag");
            eTag = headers[0].getValue();


            if (entity != null) {
                // return it as a String
                String result = EntityUtils.toString(entity);
                String[] x = {eTag, result};
                responseCache.put(url, x);
                return(result);
            } else {
                return("Problem?");
            }

        }
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
    
    @CrossOrigin(origins = "http://localhost:3000")
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
