package boyd.api.model;

import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name="`commits`")

@Data
public class Commit {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "commitId")
    private Integer commitId;

    @Column(name = "authorId")
    private int authorId;

    @Column(name = "branch")
    private String branch;

    @Column(name = "commitDate")
    private String commitDate;

    @Column(name = "commitMessage")
    private String message;

    public Commit() {}

    public Commit(int authorId, String branch, String date, String message) {
        this.authorId = authorId;
        this.branch = branch;
        this. commitDate = date;
        this.message = message;
    }

}
