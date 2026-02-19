import "reflect-metadata"
import { ApolloServer } from "@apollo/server"
import { buildSchema } from "type-graphql"
import { MikroORM, PostgreSqlDriver, RequestContext } from "@mikro-orm/postgresql"
import { TsMorphMetadataProvider } from "@mikro-orm/reflection"
import { CourseResolver } from "./resolvers/course"
import { CourseCatalogResolver } from "./resolvers/course_catalog"
import { InstitutionResolver } from "./resolvers/institution"
import { Migrator } from "@mikro-orm/migrations"
import { expressMiddleware } from "@as-integrations/express4"
import express from "express"
import cors from "cors"
import { UserResolver } from "./resolvers/user"
import { PathwayResolver } from "./resolvers/pathway"
import { SemesterResolver } from "./resolvers/semester"
import path from "path"
import dotenv from "dotenv"


async function main() {
    dotenv.config()
    console.log("Aaaaaaaaa here")
    const app = express()
    console.log("URL", process.env.POSTGRES_HOST)
    let orm: MikroORM
    try {
        orm = await MikroORM.init<PostgreSqlDriver>({
        driver: PostgreSqlDriver,
        clientUrl: process.env.POSTGRES_URL,
        // host: process.env.POSTGRES_HOST || "postgres-db",
        // port: parseInt(process.env.POSTGRES_PORT || "5432"),
        // user: process.env.POSTGRES_USER,
        // password: process.env.POSTGRES_PASSWORD,
        metadataProvider: TsMorphMetadataProvider,
        entitiesTs: [path.join(__dirname, "./entities/*.ts")],
        entities: [path.join(__dirname, "./entities/*.js")],
        dbName: process.env.POSTGRES_DB,
        extensions: [Migrator]
    })
    } catch (e) {
        console.error(e)
    }
    

    app.use((req, res, next) => {
        RequestContext.create(orm.em, next)
    })

    const schema = await buildSchema({
        resolvers: [CourseResolver, InstitutionResolver, CourseCatalogResolver, UserResolver, PathwayResolver, SemesterResolver],
        validate: false
    })

    const server = new ApolloServer({
        schema
    })

    await server.start()

    app.use(
        "/graphql",
        cors<cors.CorsRequest>(),
        express.json(),
        expressMiddleware(server, {
            context: async ({ req, res }) => ({
                req,
                res,
                em: orm.em.fork()
            })
        })
    );

    app.listen(4000, () => {
        console.log("Server started on localhost:4000");
    });

    app.get("/health", (req, res) => {
        res.status(200).json({status: "ok"})
    })
}

main().catch((err) => {
    console.error(err);
});