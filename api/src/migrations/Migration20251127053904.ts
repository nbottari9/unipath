import { Migration } from '@mikro-orm/migrations';

export class Migration20251127053904 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "user" ("id" uuid not null, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "institution_id" int not null, constraint "user_pkey" primary key ("id"));`);

    this.addSql(`create table "pathway" ("id" uuid not null, "name" varchar(255) not null, "owner_id" uuid not null, constraint "pathway_pkey" primary key ("id"));`);

    this.addSql(`alter table "user" add constraint "user_institution_id_foreign" foreign key ("institution_id") references "institution" ("id") on update cascade;`);

    this.addSql(`alter table "pathway" add constraint "pathway_owner_id_foreign" foreign key ("owner_id") references "user" ("id") on update cascade;`);

    this.addSql(`alter table "course_catalog" drop constraint "course_catalog_institution_id_foreign";`);

    this.addSql(`alter table "course" drop constraint "course_catalog_id_foreign";`);

    this.addSql(`alter table "course_prerequisites" drop constraint "course_prerequisites_course_1_id_foreign";`);
    this.addSql(`alter table "course_prerequisites" drop constraint "course_prerequisites_course_2_id_foreign";`);

    this.addSql(`alter table "course_corequisites" drop constraint "course_corequisites_course_1_id_foreign";`);
    this.addSql(`alter table "course_corequisites" drop constraint "course_corequisites_course_2_id_foreign";`);

    this.addSql(`alter table "institution" alter column "id" type int using ("id"::int);`);
    this.addSql(`create sequence if not exists "institution_id_seq";`);
    this.addSql(`select setval('institution_id_seq', (select max("id") from "institution"));`);
    this.addSql(`alter table "institution" alter column "id" set default nextval('institution_id_seq');`);

    this.addSql(`alter table "course_catalog" alter column "id" drop default;`);
    this.addSql(`alter table "course_catalog" alter column "id" type uuid using ("id"::text::uuid);`);
    this.addSql(`alter table "course_catalog" alter column "institution_id" type int using ("institution_id"::int);`);
    this.addSql(`alter table "course_catalog" add constraint "course_catalog_institution_id_foreign" foreign key ("institution_id") references "institution" ("id") on update cascade;`);

    this.addSql(`alter table "course" alter column "id" drop default;`);
    this.addSql(`alter table "course" alter column "id" type uuid using ("id"::text::uuid);`);
    this.addSql(`alter table "course" alter column "catalog_id" drop default;`);
    this.addSql(`alter table "course" alter column "catalog_id" type uuid using ("catalog_id"::text::uuid);`);
    this.addSql(`alter table "course" alter column "description" type text using ("description"::text);`);
    this.addSql(`alter table "course" alter column "id" drop default;`);
    this.addSql(`alter table "course" add constraint "course_catalog_id_foreign" foreign key ("catalog_id") references "course_catalog" ("id") on update cascade;`);

    this.addSql(`alter table "course_prerequisites" alter column "course_1_id" drop default;`);
    this.addSql(`alter table "course_prerequisites" alter column "course_1_id" type uuid using ("course_1_id"::text::uuid);`);
    this.addSql(`alter table "course_prerequisites" alter column "course_2_id" drop default;`);
    this.addSql(`alter table "course_prerequisites" alter column "course_2_id" type uuid using ("course_2_id"::text::uuid);`);
    this.addSql(`alter table "course_prerequisites" add constraint "course_prerequisites_course_1_id_foreign" foreign key ("course_1_id") references "course" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "course_prerequisites" add constraint "course_prerequisites_course_2_id_foreign" foreign key ("course_2_id") references "course" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "course_corequisites" alter column "course_1_id" drop default;`);
    this.addSql(`alter table "course_corequisites" alter column "course_1_id" type uuid using ("course_1_id"::text::uuid);`);
    this.addSql(`alter table "course_corequisites" alter column "course_2_id" drop default;`);
    this.addSql(`alter table "course_corequisites" alter column "course_2_id" type uuid using ("course_2_id"::text::uuid);`);
    this.addSql(`alter table "course_corequisites" add constraint "course_corequisites_course_1_id_foreign" foreign key ("course_1_id") references "course" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "course_corequisites" add constraint "course_corequisites_course_2_id_foreign" foreign key ("course_2_id") references "course" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "pathway" drop constraint "pathway_owner_id_foreign";`);

    this.addSql(`drop table if exists "user" cascade;`);

    this.addSql(`drop table if exists "pathway" cascade;`);

    this.addSql(`alter table "course_catalog" alter column "id" type text using ("id"::text);`);

    this.addSql(`alter table "course_catalog" drop constraint "course_catalog_institution_id_foreign";`);

    this.addSql(`alter table "course" alter column "id" type text using ("id"::text);`);
    this.addSql(`alter table "course" alter column "catalog_id" type text using ("catalog_id"::text);`);

    this.addSql(`alter table "course" drop constraint "course_catalog_id_foreign";`);

    this.addSql(`alter table "course_prerequisites" alter column "course_1_id" type text using ("course_1_id"::text);`);
    this.addSql(`alter table "course_prerequisites" alter column "course_2_id" type text using ("course_2_id"::text);`);

    this.addSql(`alter table "course_prerequisites" drop constraint "course_prerequisites_course_1_id_foreign";`);
    this.addSql(`alter table "course_prerequisites" drop constraint "course_prerequisites_course_2_id_foreign";`);

    this.addSql(`alter table "course_corequisites" alter column "course_1_id" type text using ("course_1_id"::text);`);
    this.addSql(`alter table "course_corequisites" alter column "course_2_id" type text using ("course_2_id"::text);`);

    this.addSql(`alter table "course_corequisites" drop constraint "course_corequisites_course_1_id_foreign";`);
    this.addSql(`alter table "course_corequisites" drop constraint "course_corequisites_course_2_id_foreign";`);

    this.addSql(`alter table "institution" alter column "id" type varchar(255) using ("id"::varchar(255));`);
    this.addSql(`alter table "institution" alter column "id" drop default;`);

    this.addSql(`alter table "course_catalog" alter column "id" type varchar(255) using ("id"::varchar(255));`);
    this.addSql(`alter table "course_catalog" alter column "institution_id" type varchar(255) using ("institution_id"::varchar(255));`);
    this.addSql(`alter table "course_catalog" add constraint "course_catalog_institution_id_foreign" foreign key ("institution_id") references "institution" ("id") on update cascade;`);

    this.addSql(`alter table "course" alter column "id" type int using ("id"::int);`);
    this.addSql(`alter table "course" alter column "catalog_id" type varchar(255) using ("catalog_id"::varchar(255));`);
    this.addSql(`alter table "course" alter column "description" type varchar(255) using ("description"::varchar(255));`);
    this.addSql(`create sequence if not exists "course_id_seq";`);
    this.addSql(`select setval('course_id_seq', (select max("id") from "course"));`);
    this.addSql(`alter table "course" alter column "id" set default nextval('course_id_seq');`);
    this.addSql(`alter table "course" add constraint "course_catalog_id_foreign" foreign key ("catalog_id") references "course_catalog" ("id") on update cascade;`);

    this.addSql(`alter table "course_prerequisites" alter column "course_1_id" type int using ("course_1_id"::int);`);
    this.addSql(`alter table "course_prerequisites" alter column "course_2_id" type int using ("course_2_id"::int);`);
    this.addSql(`alter table "course_prerequisites" add constraint "course_prerequisites_course_1_id_foreign" foreign key ("course_1_id") references "course" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "course_prerequisites" add constraint "course_prerequisites_course_2_id_foreign" foreign key ("course_2_id") references "course" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "course_corequisites" alter column "course_1_id" type int using ("course_1_id"::int);`);
    this.addSql(`alter table "course_corequisites" alter column "course_2_id" type int using ("course_2_id"::int);`);
    this.addSql(`alter table "course_corequisites" add constraint "course_corequisites_course_1_id_foreign" foreign key ("course_1_id") references "course" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "course_corequisites" add constraint "course_corequisites_course_2_id_foreign" foreign key ("course_2_id") references "course" ("id") on update cascade on delete cascade;`);
  }

}
