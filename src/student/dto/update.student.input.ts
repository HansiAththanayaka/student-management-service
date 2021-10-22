import { Field, InputType, Int } from "@nestjs/graphql";
import { Entity } from "typeorm";

@InputType()
@Entity()
export class updateStudentDTO {
  @Field()
  id: number;
  @Field()
  name: string;
  @Field()
  dateOfBirth: Date;
  @Field({ nullable: true })
  email: string;
}
