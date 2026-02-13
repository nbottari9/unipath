import { BaseEntity, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { User } from "./User";
import { Semester } from "./Semester";

@ObjectType()
@Entity()
export class Pathway extends BaseEntity {
    @Field()
    @PrimaryKey({ type: 'uuid' })
    id: string = crypto.randomUUID()

    @Field()
    @Property()
    name!: string

    @Field(() => User)
    @ManyToOne(() => User)
    owner!: User

    @Field(() => [Semester])
    @OneToMany(() => Semester, semesters => semesters.pathway)
    semesters = new Collection<Semester>(this)
}