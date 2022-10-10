package boyd.api.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name="`Users`")

@Data
public class User {

    @Id
    @GeneratedValue(strategy=GenerationType.SEQUENCE)
    @Column(name = "UserID")
    private Integer userId;

    @Column(name = "Username")
    private String username;

    @Column(name = "Email")
    private String email;

    @Column(name = "Topics")
    String topics;

    public User() {}

    public User(String username, String email, String topics) {
        this.username = username;
        this.email = email;
        this.topics = topics;
    }
}
