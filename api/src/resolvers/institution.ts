import { Arg, Ctx, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Institution } from "../entities/Institution";
import { GraphQLContext } from "../types";
import { Collection } from "@mikro-orm/core";
import { CourseCatalog } from "../entities/CourseCatalog";

@InputType()
class CreateInstitutionInput implements Partial<Institution> {
    @Field()
    id!: number

    @Field()
    name!: string
}

@Resolver(of => Institution)
export class InstitutionResolver {
    @Query(() => [Institution])
    async list_institutions(
        @Ctx() { em }: GraphQLContext,
        @Arg("limit") limit: number
    ): Promise<Institution[]> {
        return em.findAll(Institution, {
            limit,
            populate: ["catalogs"]
        })
    }

    @Query(() => Institution)
    async get_institution(
        @Ctx() { em }: GraphQLContext,
        @Arg("institutionId") institutionId: number
    ): Promise<Institution | null> {
        return em.findOne(Institution, {
            id: institutionId,
        }, {
            populate: ["catalogs"]
        })
    }

    @Mutation(() => Institution)
    async create_institution(
        @Ctx() { em }: GraphQLContext,
        @Arg("input") input: CreateInstitutionInput
    ): Promise<Institution> {
        const newInstitution = em.create(Institution, {
            id: input.id,
            name: input.name,
        })

        const defaultCatalog = em.create(CourseCatalog, {
            name: `Default ${input.name} catalog`,
            institution: newInstitution
        })

        newInstitution.catalogs.add(defaultCatalog)
        em.persistAndFlush([newInstitution, defaultCatalog])
        return newInstitution
    }

    @Mutation(() => Boolean)
    async delete_institution(
        @Ctx() { em }: GraphQLContext,
        @Arg("institutionId") institutionId: number
    ): Promise<boolean> {
        const institutionRef = em.getReference(Institution, institutionId)
        try {
            em.removeAndFlush(institutionRef)
        } catch {
            return false;
        } finally {
            return true;
        }
    }
}