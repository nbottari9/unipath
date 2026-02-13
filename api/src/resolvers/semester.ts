import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { GraphQLContext } from "../types";
import { Semester } from "../entities/Semester";
import { Pathway } from "../entities/Pathway";
import { Course } from "../entities/Course";

@InputType()
class CreateSemesterInput implements Partial<Semester> {
    @Field()
    name!: string

    @Field()
    pathwayId!: string
}

@InputType()
class AddCourseToSemesterInput {
    @Field()
    semesterId!: string

    @Field()
    courseId!: string
}

@Resolver(of => Semester)
export class SemesterResolver {
    @Query(() => [Semester])
    async list_semesters(
        @Arg("limit") limit: number,
        @Ctx() { em }: GraphQLContext
    ): Promise<Semester[]> {
        return em.findAll(Semester, {
            limit,
            populate: ["courses", "pathway"]
        })
    }

    @Query(() => Semester)
    async get_semester(
        @Arg("id") id: string,
        @Ctx() { em }: GraphQLContext
    ): Promise<Semester | null> {
        return em.findOne(Semester, {
            id: id
        }, {
            populate: ["courses", "pathway"]
        })
    }

    @Mutation(() => Semester)
    async create_semester(
        @Arg("input") input: CreateSemesterInput,
        @Ctx() { em }: GraphQLContext
    ): Promise<Semester> {
        // Get the pathway
        const pathway = await em.findOneOrFail(Pathway, { id: input.pathwayId })

        const newSemester = em.create(Semester, {
            name: input.name,
            pathway
        })

        await em.persistAndFlush(newSemester)
        return newSemester
    }

    @Mutation(() => Boolean)
    async delete_semester(
        @Arg("id") id: string,
        @Ctx() { em }: GraphQLContext
    ): Promise<boolean> {
        const semesterRef = em.getReference(Semester, id)
        try {
            await em.removeAndFlush(semesterRef)
        } catch {
            return false
        } finally {
            return true
        }

    }

    @Mutation(() => Boolean)
    async add_course(
        @Arg("input") input: AddCourseToSemesterInput,
        @Ctx() { em }: GraphQLContext
    ): Promise<boolean> {
        const semester = await em.findOneOrFail(Semester, {
            id: input.semesterId
        })

        const course = await em.findOneOrFail(Course, {
            id: input.courseId
        })

        try {
            semester.courses.add(course)
            em.persistAndFlush(semester)
        } catch {
            return false;
        } finally {
            return true;
        }

    }
}