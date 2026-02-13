import { Migration } from '@mikro-orm/migrations';

export class Migration20251118204024 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "institution" ("id" varchar(255) not null, "name" varchar(255) not null, constraint "institution_pkey" primary key ("id"));`);

    this.addSql(`create table "course_catalog" ("id" varchar(255) not null, "name" varchar(255) not null, "institution_id" varchar(255) not null, constraint "course_catalog_pkey" primary key ("id"));`);

    this.addSql(`create table "course" ("id" serial primary key, "catalog_id" varchar(255) not null, "name" varchar(255) not null, "description" varchar(255) null, "code" varchar(255) not null, "department" varchar(255) not null);`);

    this.addSql(`create table "course_prerequisites" ("course_1_id" int not null, "course_2_id" int not null, constraint "course_prerequisites_pkey" primary key ("course_1_id", "course_2_id"));`);

    this.addSql(`create table "course_corequisites" ("course_1_id" int not null, "course_2_id" int not null, constraint "course_corequisites_pkey" primary key ("course_1_id", "course_2_id"));`);

    this.addSql(`alter table "course_catalog" add constraint "course_catalog_institution_id_foreign" foreign key ("institution_id") references "institution" ("id") on update cascade;`);

    this.addSql(`alter table "course" add constraint "course_catalog_id_foreign" foreign key ("catalog_id") references "course_catalog" ("id") on update cascade;`);

    this.addSql(`alter table "course_prerequisites" add constraint "course_prerequisites_course_1_id_foreign" foreign key ("course_1_id") references "course" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "course_prerequisites" add constraint "course_prerequisites_course_2_id_foreign" foreign key ("course_2_id") references "course" ("id") on update cascade on delete cascade;`);

    this.addSql(`alter table "course_corequisites" add constraint "course_corequisites_course_1_id_foreign" foreign key ("course_1_id") references "course" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "course_corequisites" add constraint "course_corequisites_course_2_id_foreign" foreign key ("course_2_id") references "course" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "course_catalog" drop constraint "course_catalog_institution_id_foreign";`);

    this.addSql(`alter table "course" drop constraint "course_catalog_id_foreign";`);

    this.addSql(`alter table "course_prerequisites" drop constraint "course_prerequisites_course_1_id_foreign";`);

    this.addSql(`alter table "course_prerequisites" drop constraint "course_prerequisites_course_2_id_foreign";`);

    this.addSql(`alter table "course_corequisites" drop constraint "course_corequisites_course_1_id_foreign";`);

    this.addSql(`alter table "course_corequisites" drop constraint "course_corequisites_course_2_id_foreign";`);

    this.addSql(`drop table if exists "institution" cascade;`);

    this.addSql(`drop table if exists "course_catalog" cascade;`);

    this.addSql(`drop table if exists "course" cascade;`);

    this.addSql(`drop table if exists "course_prerequisites" cascade;`);

    this.addSql(`drop table if exists "course_corequisites" cascade;`);
  }

}
