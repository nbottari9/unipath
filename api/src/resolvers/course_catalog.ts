import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { CourseCatalog } from "../entities/CourseCatalog";
import { GraphQLContext } from "../types";
import { Institution } from "../entities/Institution";



@InputType()
class CreateCourseCatalogInput implements Partial<CourseCatalog> {
    @Field()
    name!: string

    @Field()
    institutionId!: number
}

@Resolver(of => CourseCatalog)
export class CourseCatalogResolver {
    @Query(() => [CourseCatalog])
    async list_course_catalogs(
        @Ctx() { em }: GraphQLContext,
        @Arg("limit") limit: number
    ): Promise<CourseCatalog[]> {
        return em.findAll(CourseCatalog, {
            limit,
            populate: ["courses"]
        })
    }

    @Query(() => CourseCatalog)
    async get_course_catalog(
        @Ctx() { em }: GraphQLContext,
        @Arg("courseCatalogId") courseCatalogId: string
    ): Promise<CourseCatalog | null> {
        return em.findOne(CourseCatalog, {
            id: courseCatalogId
        }, {
            populate: ["courses"]
        })
    }

    @Mutation(() => CourseCatalog)
    async create_course_catalog(
        @Ctx() { em }: GraphQLContext,
        @Arg("input") input: CreateCourseCatalogInput
    ): Promise<CourseCatalog> {
        const institution = await em.findOneOrFail(Institution, { id: input.institutionId })
        const newCourseCatalog = em.create(CourseCatalog, {
            name: input.name,
            institution
        })

        em.persistAndFlush(newCourseCatalog)
        return newCourseCatalog
    }

    @Mutation(() => Boolean)
    async delete_course_catalog(
        @Ctx() { em }: GraphQLContext,
        @Arg("courseCatalogId") courseCatalogId: string
    ): Promise<boolean> {
        const courseCatalogRef = em.getReference(CourseCatalog, courseCatalogId)
        try {
            em.removeAndFlush(courseCatalogRef)
        } catch {
            return false;
        } finally {
            return true;
        }
    }
}