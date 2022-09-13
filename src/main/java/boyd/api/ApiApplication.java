package boyd.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import kong.unirest.*;

@SpringBootApplication
public class ApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ApiApplication.class, args);
		HttpResponse<JsonNode> jsonResponse = Unirest.get(
						"https://api.github.com/users/DanielJHaupt")
				.header("accept", "application/json").queryString("apiKey", "123")
				.asJson();
		System.out.println(jsonResponse.getBody().toString());
	}

}
