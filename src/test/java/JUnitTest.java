import boyd.api.service.RepoService;
import boyd.api.service.UserService;

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

    // Tests that the correct number of keyword combination sets are generated
    @Test
    public void testgetKeywordCombinations() {
        UserService us = new UserService();

        String[] keywords = {"machine-learning", "api", "react", "django", "music", "cyber-security"};
        int size = 6;
        long[] combinationsPerCategory = new long[size];
        int total = 0;
        for (int i = size-1; i > 0; i--) {
            combinationsPerCategory[i-1] = choose(6, i);
            total += combinationsPerCategory[i-1];
        }
        assert(total == us.getKeywordCombinations(keywords).size());
    }
    
    public static long choose(long total, long choose){
        if(total < choose)
            return 0;
        if(choose == 0 || choose == total)
            return 1;
        return choose(total - 1,choose-1)+choose(total-1,choose);
    }
}
