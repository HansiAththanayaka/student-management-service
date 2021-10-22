import { Resolver, Query, Mutation, Args, Int } from "@nestjs/graphql";
import { Student } from "./entites/student.entity";
import { createStudentDTO } from "./dto/create.student.input";
import { updateStudentDTO } from "./dto/update.student.input";
import { removeStudentDTO } from "./dto/remove.student.input";
import { StudentService } from "./student.service";

@Resolver(() => Student)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => [Student], { name: "getFindAllStudent" })
  findAll() {
    return this.studentService.findAll();
  }

  @Mutation(() => Boolean, { name: "createStudent" })
  createStudent(
    @Args("students", { type: () => [createStudentDTO] })
    students: createStudentDTO[]
  ) {
    return this.studentService.bulkCreateStudent(students);
  }

  @Mutation(() => Student, { name: "updateStudent" })
  updateStudent(@Args("student") student: updateStudentDTO) {
    return this.studentService.updateStudent(student.id, student);
  }

  @Mutation(() => Student, { name: "removeStudent" })
  removeStudent(@Args("id") id: number) {
    return this.studentService.removeStudent(id);
  }
}
