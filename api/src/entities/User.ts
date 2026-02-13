import { BaseEntity, Collection, Entity, ManyToOne, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { Institution } from "./Institution";
import { Pathway } from "./Pathway";

@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryKey({ type: 'uuid' })
    id: string = crypto.randomUUID()

    @Field()
    @Property()
    firstName!: string

    @Field()
    @Property()
    lastName!: string

    @Field()
    @ManyToOne(() => Institution)
    institution!: Institution

    @Field(() => [Pathway])
    @OneToMany(() => Pathway, pathways => pathways.owner)
    pathways = new Collection<Pathway>(this)


}