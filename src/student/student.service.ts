import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { createStudentDTO } from "./dto/create.student.input";
import { updateStudentDTO } from "./dto/update.student.input";
import { Student } from "./entites/student.entity";
import * as moment from "moment";
import { Injectable } from "@nestjs/common";

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>
  ) {}

  async findAll(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  async bulkCreateStudent(students: createStudentDTO[]): Promise<boolean> {
    try {
      const stu = this.studentRepository.create(students); // stu =  new Student()
      await this.studentRepository.save(stu);
      return true;
    } catch (error) {
      return false;
    }
  }

  async updateStudent(id: number, student: updateStudentDTO): Promise<Student> {
    const newStudent = await this.studentRepository.findOne({ where: { id } });
    if (!newStudent) {
      throw new Error("Sorry!!! System doesn't have that student to update");
    }
    return this.studentRepository.save({
      ...newStudent,
      ...student,
      age: moment().diff(student.dateOfBirth, "years", false),
    });
  }

  async removeStudent(id: number): Promise<Student> {
    const newStudent = await this.studentRepository.findOne({ where: { id } });

    if (!newStudent) {
      throw new Error("Sorry!!! System doesn't have that student to remove");
    }

    return this.studentRepository.remove(newStudent);
  }
}
