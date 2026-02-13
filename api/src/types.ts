import { EntityManager } from "@mikro-orm/core";
import { Request, Response } from "express"

export type GraphQLContext = {
    req: Request;
    res: Response;
    em: EntityManager;
}