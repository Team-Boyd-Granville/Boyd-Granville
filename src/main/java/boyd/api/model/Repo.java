package boyd.api.model;

import lombok.Data;
import javax.persistence.*;

@Entity
@Table(name="`Repositories`")

@Data
public class Repo {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "RepoID")
    private Integer RepoId;

    @Column(name = "name")
    private String name;

    @Column(name = "owner")
    private String owner;

    @Column(name = "LastCommit")
    private int LastCommit;

    public Repo() {}

    public Repo(String name, String owner, int lastCommit) {
        this.name = name;
        this.owner = owner;
        this.LastCommit = lastCommit;
    }

}
