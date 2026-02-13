import { BaseEntity, Collection, Entity, OneToMany, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { CourseCatalog } from "./CourseCatalog";

@ObjectType()
@Entity()
export class Institution extends BaseEntity {
    @Field()
    @PrimaryKey()
    id!: number

    @Field()
    @Property()
    name!: string

    @Field(() => [CourseCatalog])
    @OneToMany(() => CourseCatalog, catalogs => catalogs.institution)
    catalogs = new Collection<CourseCatalog>(this)
}