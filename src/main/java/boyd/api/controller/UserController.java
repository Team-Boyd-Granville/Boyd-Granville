package boyd.api.controller;

import boyd.api.model.User;
import boyd.api.service.UserService;
import kong.unirest.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin
@RestController
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping(value = "/user")
    public ResponseEntity<?> post(@RequestPart("user") String newUser) {
        JSONObject x = new JSONObject(newUser);

        User user = new User((String) x.get("username"), (String) x.get("email"), (String) x.get("topics"));

        userService.saveUser(user);

        System.out.println("Successfully saved new user");

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = "/user", params = "username")
    public String getUser(@RequestParam String username) {
        System.out.println("Get user from db");
        return userService.getUser(username);
    }

    @GetMapping(value="/user/info", params="username")
    public String getUserInfo(@RequestParam String username) {
        System.out.println("Get user info");
        return userService.getUserInfo(username);
    }

    @GetMapping(value="/user/followers", params="username")
    public String getFollowers(@RequestParam String username) {
        System.out.println("Get users followers");
        return userService.getFollowers(username);
    }

    @GetMapping(value="/user/starred", params="username")
    public String getStarred(@RequestParam String username) {
        System.out.println("Get users starred");
        return userService.getStarred(username);
    }

    @GetMapping(value="/user/recommendations", params={"username", "pageNumber"})
    public String getRecommendations(@RequestParam String username, int pageNumber) {
        System.out.println("Get users recommendations");
        return userService.getRecommendations(username, pageNumber);
    }

    @GetMapping(value="/user/repos", params="username")
    public String getRepos(@RequestParam String username) {
        System.out.println("Get users repos");
        return userService.getRepos(username);
    }

    @GetMapping(value="/user/events", params="username")
    public String getEvents(@RequestParam String username) {
        System.out.println("Get users events");
        return userService.getEvents(username);
    }

    @GetMapping(value="/user/recvEvents", params="username")
    public String getRecvEvents(@RequestParam String username) {
        System.out.println("Get users RecvEvents");
        return userService.getRecvEvents(username);
    }
}