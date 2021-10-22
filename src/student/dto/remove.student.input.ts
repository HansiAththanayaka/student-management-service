import { Field, InputType, Int } from "@nestjs/graphql";
import { Entity } from "typeorm";

@InputType()
@Entity()
export class removeStudentDTO {
  @Field()
  id: number;
}
