import { Arg, Ctx, Field, InputType, Int, Mutation, Query, Resolver } from "type-graphql";
import { Course } from "../entities/Course";
import { GraphQLContext } from "../types";
import { CourseCatalog } from "../entities/CourseCatalog";
import { wrap } from "@mikro-orm/core";


@InputType()
class CreateCourseInput implements Partial<Course> {
    @Field()
    name!: string

    @Field(() => String)
    catalogId!: string

    @Field({ nullable: true })
    description?: string

    @Field()
    code!: string

    @Field()
    department!: string

    @Field(() => [String], { nullable: true })
    corequisiteIds!: string[] | undefined

    @Field(() => String, { nullable: true })
    isCorequisiteForId!: string | undefined

    @Field(() => [String], { nullable: true })
    prerequisiteIds!: string[] | undefined

    @Field(() => String, { nullable: true })
    isPrerequisiteForId!: string | undefined
}

@InputType()
class UpdateCourseInput implements Partial<Course> {
    @Field()
    id!: string

    @Field({nullable: true})
    name?: string

    @Field({ nullable: true })
    description?: string

    @Field({nullable: true})
    code?: string

    @Field({nullable: true})
    department?: string

}

@Resolver(of => Course)
export class CourseResolver {
    @Query(() => [Course])
    async list_courses(
        @Ctx() { em }: GraphQLContext,
        @Arg("limit", () => Int) limit: number
    ): Promise<Course[]> {
        return em.findAll(Course, {
            limit,
            populate: ["corequisites", "prerequisites", "isCorequisiteFor", "isPrerequisiteFor"]
        })
    }

    @Query(() => Course, { nullable: true })
    async get_course(
        @Ctx() { em }: GraphQLContext,
        @Arg("id", () => String) id: string
    ): Promise<Course | null> {
        return em.findOne(Course, {
            id: id
        }, {
            populate: ["corequisites", "prerequisites", "isCorequisiteFor", "isPrerequisiteFor"]
        })
    }

    @Mutation(() => Course)
    async create_course(
        @Arg("input") input: CreateCourseInput,
        @Ctx() { em }: GraphQLContext
    ): Promise<Course> {
        // Find the catalog it belongs to from ID
        const catalog = await em.findOneOrFail(CourseCatalog, { id: input.catalogId })


        // Create the object
        const newCourse = em.create(Course, {
            catalog,
            name: input.name,
            description: input.description,
            department: input.department,
            code: input.code,
        })

        // Corequisites
        if (input.corequisiteIds) {
            const coreqs = await em.find(Course, { id: { $in: input.corequisiteIds } })
            newCourse.corequisites.set(coreqs)

            coreqs.forEach(c => {
                c.isCorequisiteFor.add(newCourse)
            })
        }

        if (input.isCorequisiteForId) {
            const parent = await em.findOneOrFail(Course, { id: input.isCorequisiteForId })
            newCourse.isCorequisiteFor.add(parent)
        }

        // Prerequisites
        if (input.prerequisiteIds) {
            const prereqs = await em.find(Course, { id: { $in: input.prerequisiteIds } })
            newCourse.prerequisites.set(prereqs)

            prereqs.forEach(p => {
                p.isPrerequisiteFor.add(newCourse)
            })
        }

        if (input.isPrerequisiteForId) {
            const child = await em.findOneOrFail(Course, { id: input.isPrerequisiteForId })
            newCourse.isPrerequisiteFor.add(child)
        }

        await em.persistAndFlush(newCourse)
        return newCourse
    }

    @Mutation(() => Course)
    async update_course(
        @Arg("input") input: UpdateCourseInput,
        @Ctx() {em}: GraphQLContext
    ): Promise<Course> {
        const course = await em.findOneOrFail(Course, 
            { id: input.id},
        )

        if (input.name) {
            course.name = input.name
        }

        if (input.code) {
            course.code = input.code
        }

        if (input.department) {
            course.department = input.department
        }

        if (input.description) {
            course.description = input.description
        }

        await em.flush()
        return course
    }

    @Mutation(() => Course)
    async add_prereq(
        @Arg("courseId") courseId: string,
        @Arg("prereqId") prereqId: string,
        @Ctx() {em}: GraphQLContext
    ): Promise<Course> {
        const course = await em.findOneOrFail(Course, {id: courseId}, {populate: ["prerequisites"]})
        const prereq = await em.findOneOrFail(Course, {id: prereqId})

        course.prerequisites.add(prereq)
        prereq.isPrerequisiteFor.add(course)

        await em.persistAndFlush(course)
        await em.persistAndFlush(prereq)
        return course
    }

    @Mutation(() => Course)
    async add_coreq(
        @Arg("courseId") courseId: string,
        @Arg("coreqId") coreqId: string,
        @Ctx() {em}: GraphQLContext
    ): Promise<Course> {
        const course = await em.findOneOrFail(Course, {id: courseId}, {populate: ["corequisites"]})
        const coreq = await em.findOneOrFail(Course, {id: coreqId})

        course.corequisites.add(coreq)
        coreq.isCorequisiteFor.add(course)

        await em.persistAndFlush(course)
        await em.persistAndFlush(coreq)
        return course
    }

    @Mutation(() => Boolean)
    async delete_course(
        @Arg("courseId") courseId: string,
        @Ctx() { em }: GraphQLContext
    ): Promise<boolean> {
        const courseRef = em.getReference(Course, courseId)
        try {
            await em.removeAndFlush(courseRef)
        } catch {
            return false;
        } finally {
            return true;
        }

    }
}