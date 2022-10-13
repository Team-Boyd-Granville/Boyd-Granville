package boyd.api.model;

import lombok.Data;

@Data
public class Issue {

    private String title;
    private String user;
    private String state;
    private int comments;
    private String description;

    public Issue() {}

    public Issue(String title, String user, String state, int comments, String description) {
        this.title = title;
        this.user = user;
        this.state = state;
        this.comments = comments;
        this.description = description;
    }

}
