// import { ConnectionOptions, DataSourceOptions } from "typeorm";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: 'localhost',
    // host: 'postgres11',
    port: 5432,
    username: 'postgres',
    password: 'password',
    database: 'outside',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: false,
    // synchronize: true,
    migrations: [__dirname, '/migrations/**/*{.ts,.js}'],
    // cli: {
    //     migrationsDir: 'src/migrations',
    // },
}

export default config;