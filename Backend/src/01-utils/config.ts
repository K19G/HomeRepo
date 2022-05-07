abstract class Config {
    public port: number = 3001;
}

class DevelopmentConfig extends Config {
    public mongoConnectionString = "mongodb://localhost:27017/Supermarket";
    public constructor() {
        super();
    }
}

class ProductionConfig extends Config {
    public mongoConnectionString = "mongodb://localhost:27017/Supermarket";
    public constructor() {
        super();
        // this.port = +process.env.PORT;
    }
}
const config = process.env.ENVIRONMENT === "development" ? new DevelopmentConfig() : new ProductionConfig();

export default config;    
