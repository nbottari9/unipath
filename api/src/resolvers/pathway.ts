import { Arg, Ctx, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { Pathway } from "../entities/Pathway";
import { GraphQLContext } from "../types";
import { User } from "../entities/User";
import { Semester } from "../entities/Semester";

@InputType()
class CreatePathwayInput implements Partial<Pathway> {
    @Field()
    name!: string

    @Field()
    ownerId!: string
}

@Resolver(of => Pathway)
export class PathwayResolver {
    @Query(() => [Pathway])
    async list_pathways(
        @Arg("limit", () => Int) limit: number,
        @Ctx() { em }: GraphQLContext
    ): Promise<Pathway[]> {
        return em.findAll(Pathway, {
            limit,
            // add populate here in the future
        })
    }

    @Query(() => Pathway, { nullable: true })
    async get_pathway(
        @Arg("id", () => String) id: string,
        @Ctx() { em }: GraphQLContext
    ): Promise<Pathway | null> {
        return em.findOne(Pathway, {
            id: id
        }, {
            // add populate here in the future
        })
    }

    @Mutation(() => Pathway)
    async create_pathway(
        @Arg("input") input: CreatePathwayInput,
        @Ctx() { em }: GraphQLContext
    ): Promise<Pathway> {
        // Find the user
        const user = await em.findOneOrFail(User, { id: input.ownerId })

        // Create the object
        const newPathway = em.create(Pathway, {
            name: input.name,
            owner: user
        })

        await em.persistAndFlush(newPathway)
        return newPathway
    }

    @Mutation(() => Boolean)
    async delete_pathway(
        @Arg("id") id: string,
        @Ctx() { em }: GraphQLContext
    ): Promise<boolean> {
        const pathwayRef = em.getReference(Pathway, id)
        try {
            await em.removeAndFlush(pathwayRef)
        } catch {
            return false
        } finally {
            return true
        }
    }
}