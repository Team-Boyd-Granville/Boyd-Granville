package boyd.api.controller;

import boyd.api.service.RepoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class RepoController {

    @Autowired
    RepoService repoService;

    @GetMapping(value="repo/info", params={"owner", "repo"})
    public String getRepoInfo(@RequestParam String owner, String repo) {
        System.out.println("Get repo info");
        return repoService.getRepoInfo(owner, repo);
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
        return repoService.getRepoSearch(keyword, language);
    }
}