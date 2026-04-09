//Note you have to move the sql-jdbc file into the folder that is allocated to this data-base section. Otherwise it will not compile properly
//Run the file and use the command (java -cp ".;sqlite-jdbc-3.51.3.0.jar" <fileName>) to make functioncal 
//Ensure to use the proper intergrated terminal to allow for powershell to read the proper files
import java.sql.DriverManager;
import java.sql.SQLException;

public class FlightInfo {
    public static void main(String[] args) {
        String url = "jdbc:sqlite:FlightInfo.db";
        
        try (var conn = DriverManager.getConnection(url);
             var stmt = conn.createStatement()) {
            
            // This statement creates the database file if it doesn't exist
            // and creates the 'users' table inside it.
            String sql = "CREATE TABLE IF NOT EXISTS FlightInfo (" +
                         "PLANE TEXT PRIMARY KEY," +
                         "DEPATURE TEXT NOT NULL," +
                         "DEPATURE_TIME TEXT NOT NULL,"+
                         "ARRIVIAL TEXT NOT NULL," +
                         "ARRIVIAL_TIME TEXT NOT NULL"+
                         ")";
            
            stmt.execute(sql);
            System.out.println("Database and table created successfully!");
            
        } catch (SQLException e) {
            System.out.println(e.getMessage());
        }
    }
}   