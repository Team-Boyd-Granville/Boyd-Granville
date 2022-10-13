package boyd.api.controller;
import boyd.api.model.Issue;

import boyd.api.model.Repo;
import boyd.api.service.RepoService;
import kong.unirest.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class RepoController {

    @Autowired
    RepoService repoService;

    @PostMapping(value = "/repo")
    public ResponseEntity<?> post(@RequestPart("repo") String newRepo) {
        JSONObject x = new JSONObject(newRepo);

        Repo repo = new Repo((String) x.get("name"), (String) x.get("owner"), (Integer) x.get("lastCommit"));

        repoService.saveRepo(repo);

        System.out.println("Successfully saved new repo");

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value="repo/info", params={"owner", "repo"})
    public String getRepoInfo(@RequestParam String owner, String repo) {
        System.out.println("Get repo info");
        return repoService.getRepoInfo(owner, repo);
    }

    @GetMapping(value="repo/allInfo", params={"owner", "repo"})
    public String getAllRepoInfo (@RequestParam String owner, String repo) {
        System.out.println("Get all repo info");
        return repoService.getAllRepoInformation(owner, repo);
    }

    @GetMapping(value="/repo/languages", params={"owner", "repo"})
    public String getRepoLanguages(@RequestParam String owner, String repo) {
        System.out.println("Get repos languages");
        return repoService.getRepoLanguages(owner, repo);
    }

    @GetMapping(value="/repo/tags", params={"owner", "repo"})
    public String getRepoTags(@RequestParam String owner, String repo) {
        System.out.println("Get repos tags");
        return repoService.getRepoTags(owner, repo);
    }

    @GetMapping(value="/repo/issues", params={"owner", "repo"})
    public Issue[] getRepoIssues(@RequestParam String owner, String repo) {
        System.out.println("Get repos issues");
        return repoService.getRepoIssues(owner, repo);
    }

    @GetMapping(value="/repo/deployments", params={"owner", "repo"})
    public String getRepoDeployments(@RequestParam String owner, String repo) {
        System.out.println("Get repos deployments");
        return repoService.getRepoDeployments(owner, repo);
    }

    // @GetMapping(value="/repo/readme", params={"owner", "repo"})
    // public String getRepoReadme(@RequestParam String owner, String repo) {
    //     System.out.println("Get repos readme");
    //     return repoService.getRepoReadme(owner, repo);
    // }

    @GetMapping(value="/repo/contributors", params={"owner", "repo"})
    public String getRepoContributors(@RequestParam String owner, String repo) {
        System.out.println("Get repos contributors");
        return repoService.getRepoContributors(owner, repo);
    }

    @GetMapping(value="/repo/commits", params={"owner", "repo"})
    public String getRepoCommits(@RequestParam String owner, String repo) {
        System.out.println("Get repos commits");
        return repoService.getRepoCommits(owner, repo);
    }

    @GetMapping(value="/repo/topics", params={"owner", "repo"})
    public String getRepoTopics(@RequestParam String owner, String repo) {
        System.out.println("Get repos topics");
        return repoService.getRepoTopics(owner, repo);
    }

    @GetMapping(value="/repo/search", params={"keyword", "language"})
    public String getRepoSearch(@RequestParam String keyword, String language) {
        System.out.println("Search for repo");
        return repoService.getRepoSearch(keyword, language, 1);
    }

    @GetMapping(value="/repo/recommendations", params={"username", "pageNumber"})
    public String getRecommendations(@RequestParam String username, int pageNumber) {
        System.out.println("Get users recommendations");
        return repoService.getRecommendations(username, pageNumber);
    }
}
