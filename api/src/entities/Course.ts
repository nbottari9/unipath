import { BaseEntity, Collection, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { CourseCatalog } from "./CourseCatalog";

@ObjectType()
@Entity()
export class Course extends BaseEntity {
    @Field()
    @PrimaryKey({ type: "uuid" })
    id: string = crypto.randomUUID()

    @Field()
    @ManyToOne(() => CourseCatalog)
    catalog!: CourseCatalog

    // Name: string
    @Field()
    @Property()
    name!: string;

    @Field()
    @Property({ nullable: true, type: "text" })
    description?: string

    // Course code: string
    @Field()
    @Property()
    code!: string

    // Department: string
    @Field()
    @Property()
    department!: string



    // Self referencing fields for pre and coreqs
    // Coreqs: Course[]
    @Field(() => [Course], { nullable: true })
    @ManyToMany(() => Course, course => course.isCorequisiteFor, { owner: true, nullable: true })
    corequisites = new Collection<Course>(this)

    @Field(() => [Course], { nullable: true })
    @ManyToMany(() => Course, course => course.corequisites, { nullable: true })
    isCorequisiteFor = new Collection<Course>(this)

    @Field(() => [Course], { nullable: true })
    @ManyToMany(() => Course, course => course.isPrerequisiteFor, { owner: true, nullable: true })
    prerequisites = new Collection<Course>(this)

    @Field(() => [Course], { nullable: true })
    @ManyToMany(() => Course, course => course.prerequisites, { nullable: true })
    isPrerequisiteFor = new Collection<Course>(this)

}