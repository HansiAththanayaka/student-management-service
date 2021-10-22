import { Field, InputType, Int } from "@nestjs/graphql";
import { IsAlpha } from "class-validator";
import { Entity } from "typeorm";

@InputType()
export class createStudentDTO {
  @Field()
  id: number;
  @IsAlpha()
  @Field()
  name: string;
  @Field()
  dateOfBirth: Date;
  @Field()
  email: string;
  @Field()
  age: number;
}
