import type {CodegenConfig} from "@graphql-codegen/cli"
import dotenv from "dotenv"

const config: CodegenConfig = {
    schema: "127.0.0.1:4000/graphql",
    documents: ["src/**/*.tsx"],
    generates: {
        "./src/gql/": {
            preset: "client",
            config: {
                documentMode: "string"
            }
        },
        "./schema.graphql": {
            plugins: ["schema-ast"],
            config: {
                includeDirectives: true
            }
        }
        
    }
}

export default config