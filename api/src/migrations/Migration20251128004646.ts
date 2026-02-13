import { Migration } from '@mikro-orm/migrations';

export class Migration20251128004646 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table "semester" ("id" uuid not null, "pathway_id" uuid not null, "name" varchar(255) not null, constraint "semester_pkey" primary key ("id"));`);

    this.addSql(`create table "semester_courses" ("semester_id" uuid not null, "course_id" uuid not null, constraint "semester_courses_pkey" primary key ("semester_id", "course_id"));`);

    this.addSql(`alter table "semester" add constraint "semester_pathway_id_foreign" foreign key ("pathway_id") references "pathway" ("id") on update cascade;`);

    this.addSql(`alter table "semester_courses" add constraint "semester_courses_semester_id_foreign" foreign key ("semester_id") references "semester" ("id") on update cascade on delete cascade;`);
    this.addSql(`alter table "semester_courses" add constraint "semester_courses_course_id_foreign" foreign key ("course_id") references "course" ("id") on update cascade on delete cascade;`);
  }

  override async down(): Promise<void> {
    this.addSql(`alter table "semester_courses" drop constraint "semester_courses_semester_id_foreign";`);

    this.addSql(`drop table if exists "semester" cascade;`);

    this.addSql(`drop table if exists "semester_courses" cascade;`);
  }

}
