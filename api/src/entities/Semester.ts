import { BaseEntity, Collection, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { Pathway } from "./Pathway";
import { Course } from "./Course";


@ObjectType()
@Entity()
export class Semester extends BaseEntity {
    @Field()
    @PrimaryKey({ type: "uuid" })
    id: string = crypto.randomUUID()

    @Field(() => Pathway)
    @ManyToOne(() => Pathway)
    pathway!: Pathway

    @Field()
    @Property()
    name!: string

    @Field(() => [Course])
    @ManyToMany(() => Course, undefined, { owner: true })
    courses = new Collection<Course>(this)

}