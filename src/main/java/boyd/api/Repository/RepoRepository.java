package boyd.api.Repository;

import boyd.api.model.Repo;
import org.springframework.stereotype.Repository;
import org.springframework.data.repository.CrudRepository;

@Repository
public interface RepoRepository extends CrudRepository<Repo, Long> {

}
