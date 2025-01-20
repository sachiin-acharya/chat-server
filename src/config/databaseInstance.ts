import { Dialect, Sequelize } from "sequelize";
import { db } from ".";

class Database {
  public sequelize: Sequelize;
  private static instance: Database;
  private dialect: Dialect;
  private dbname: string;
  private username: string;
  private password: string;
  private host: string;
  private port: number;

  static get(): Database {
    if (!Database.instance) Database.instance = new Database();
    return Database.instance;
  }

  public constructor() {
    this.dialect = db.dialect;
    this.dbname = db.name;
    this.username = db.username;
    this.password = db.password;
    this.host = db.host;
    this.port = db.port;
    
    this.sequelize = new Sequelize(
      this.dbname,
      this.username,
      this.password,
      {
        host: this.host,
        dialect: this.dialect,
        port: this.port,
        schema: 'public',
        logging: false,
        timezone: "utc",

        dialectOptions: {
          encrypt: true,
          useUTC: false,
        },

        define: {
          timestamps: true,
          underscored: true,
          createdAt: 'created_at',
          updatedAt: 'updated_at',
          deletedAt: 'deleted_at'
        },
      }
    );
  }

  async connection(): Promise<void> {
    try {
      await this.sequelize.authenticate();
      console.info(`${this.dialect} connected`);
      
      // Optional: Verify schema access
      await this.sequelize.query('SELECT current_schema()');
      console.info('Schema access verified');
      
    } catch (error: any) {
      console.error(`Database connection failed:`, error);
      throw new Error(error.message);
    }
  }
}

const database = Database.get();
export { database as Database };