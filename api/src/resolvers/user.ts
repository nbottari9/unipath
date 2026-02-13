import { Arg, Ctx, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entities/User";
import { GraphQLContext } from "../types";
import { Institution } from "../entities/Institution";
@InputType()
class CreateUserInput implements Partial<User> {
    @Field()
    firstName!: string

    @Field()
    lastName!: string

    @Field(() => Int)
    institutionId!: number
}

@Resolver(of => User)
export class UserResolver {
    @Query(() => [User])
    async list_users(
        @Ctx() { em }: GraphQLContext,
        @Arg("limit", () => Int) limit: number
    ): Promise<User[]> {
        return em.findAll(User, {
            limit,
            populate: ["institution", "pathways"]
        })
    }

    @Query(() => User, { nullable: true })
    async get_user(
        @Ctx() { em }: GraphQLContext,
        @Arg("id", () => String) id: string
    ): Promise<User | null> {
        return em.findOne(User, {
            id: id
        }, {
            populate: ["institution", "pathways"]
        })
    }

    @Mutation(() => User)
    async create_user(
        @Arg("input") input: CreateUserInput,
        @Ctx() { em }: GraphQLContext
    ): Promise<User> {
        // Find the institution
        const institution = await em.findOneOrFail(Institution, { id: input.institutionId })

        // Create the user
        const newUser = em.create(User, {
            firstName: input.firstName,
            lastName: input.lastName,
            institution
        }
        )

        await em.persistAndFlush(newUser)
        return newUser;
    }

    @Mutation(() => Boolean)
    async delete_user(
        @Arg("id") id: string,
        @Ctx() { em }: GraphQLContext
    ): Promise<boolean> {
        const userRef = em.getReference(User, id)
        try {
            await em.removeAndFlush(userRef)
        } catch {
            return false
        } finally {
            return true
        }
    }
}