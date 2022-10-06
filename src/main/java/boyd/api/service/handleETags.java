package boyd.api.service;

import org.apache.http.Header;
import org.apache.http.HttpEntity;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;

import java.io.IOException;
import java.util.Dictionary;
import java.util.Hashtable;
import java.util.Objects;

public class handleETags {

    private static final CloseableHttpClient httpClient = HttpClients.createDefault();
    public static Dictionary<String, String[]> responseCache = new Hashtable<>();

    public static String sendGetRequestWithETag(String url) {
        String eTag = "";

        try {
            eTag = responseCache.get(url)[0];
        } catch (Exception e) {
            System.err.println("Request not in cache");
        }

        HttpGet request = new HttpGet(url);
        request.addHeader("If-None-Match", eTag);

        try (CloseableHttpResponse response = httpClient.execute(request)) {

            // Get HttpResponse Status
            System.out.println(response.getStatusLine().toString());

            if (Objects.equals(response.getStatusLine().toString(), "HTTP/1.1 304 Not Modified")) {
                return(responseCache.get(url)[1]);
            }

            HttpEntity entity = response.getEntity();

            Header[] headers = response.getHeaders("ETag");
            eTag = headers[0].getValue();


            if (entity != null) {
                // return it as a String
                String result = EntityUtils.toString(entity);
                String[] x = {eTag, result};
                responseCache.put(url, x);
                return(result);
            } else {
                return("Problem?");
            }

        } catch (ClientProtocolException e) {
            throw new RuntimeException(e);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }

}
