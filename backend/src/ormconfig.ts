// import { ConnectionOptions, DataSourceOptions } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: 'postgres',
    // host: 'localhost',
    host: 'postgres11',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'outside',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
    migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
}

export default config;