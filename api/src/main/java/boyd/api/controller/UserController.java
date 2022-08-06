package boyd.api.controller;

import boyd.api.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserController {
    @Autowired
    UserService userService;

    @GetMapping(value="/user", params="username")
    public String get(@RequestParam String username) {
        System.out.println("Get user info");
        return userService.getUser(username);
    }

    @GetMapping(value="/followers", params="username")
    public String getFollowers(@RequestParam String username) {
        System.out.println("Get users followers");
        return userService.getFollowers(username);
    }

    @GetMapping(value="/starred", params="username")
    public String getStarred(@RequestParam String username) {
        System.out.println("Get users starred");
        return userService.getStarred(username);
    }

    @GetMapping(value="/repos", params="username")
    public String getRepos(@RequestParam String username) {
        System.out.println("Get users repos");
        return userService.getRepos(username);
    }

    @GetMapping(value="/events", params="username")
    public String getEvents(@RequestParam String username) {
        System.out.println("Get users events");
        return userService.getEvents(username);
    }

    @GetMapping(value="/recvEvents", params="username")
    public String getRecvEvents(@RequestParam String username) {
        System.out.println("Get users RecvEvents");
        return userService.getRecvEvents(username);
    }
}