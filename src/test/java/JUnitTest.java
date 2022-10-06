import boyd.api.service.RepoService;
import org.junit.Test;

public class JUnitTest {

    @Test
    public void testTaggingCommitsAsImportant() {
        RepoService rs = new RepoService();
        rs.populateImportantWordArray();
        String response = "important message: ";

        String m1 = "api was hacked";
        String m2 = "small bug in api";

        assert(rs.tagString(m1).equals(response));
        assert(!rs.tagString(m2).equals(response));
    }

}
