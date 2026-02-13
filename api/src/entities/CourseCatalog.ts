import { BaseEntity, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { Course } from "./Course";
import { Institution } from "./Institution";

@ObjectType()
@Entity()
export class CourseCatalog extends BaseEntity {
    @Field()
    @PrimaryKey({ type: "uuid" })
    id: string = crypto.randomUUID()

    @Field()
    @Property()
    name!: string

    @Field()
    @ManyToOne(() => Institution)
    institution!: Institution

    @Field(() => [Course])
    @OneToMany(() => Course, course => course.catalog)
    courses = new Collection<Course>(this)
}