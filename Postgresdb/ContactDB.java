import java.sql.*;
import java.io.*;

public class ContactDB {
    Connection conn;

    public static void main(String[] args) {
        String jdbcURL = "jdbc:postgresql://localhost:5432/mydb";
        String username = "postgres";
        String password = "pass123";

        try {
            conn  = DriverManager.getConnection(jdbcURL, username, password);
            System.out.println("Connected to database");
        } catch (Exception e) {
            System.out.println("Could not establish database connection");
        }
    }

    public static void closeConnection() {
        conn.close();
        System.out.println("Database connection closed");
    }

    public static void setuptables() {
        try {
            String line;
            Process p = Runtime.getRuntime().exec
              ("sudo psql -U postgres -h 127.0.0.1 -d mydb -f dataschema.sql");
            BufferedReader input =
              new BufferedReader
                (new InputStreamReader(p.getInputStream()));
            while ((line = input.readLine()) != null) {
              System.out.println(line);
            }
            input.close();
          }
          catch (Exception err) {
            err.printStackTrace();
          }
    }
}