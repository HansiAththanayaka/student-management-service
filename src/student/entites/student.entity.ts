import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";

@ObjectType()
@Entity()
export class Student {
  [x: string]: any;
  @Field(() => Int)
  @PrimaryColumn()
  id: number;
  @Field()
  @Column()
  name: string;
  @Field()
  @Column()
  dateOfBirth: Date;
  @Field()
  @Column()
  email: string;
  @Field()
  @Column()
  age: number;
}
