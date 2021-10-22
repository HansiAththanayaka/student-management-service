import { Test, TestingModule } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { updateStudentDTO } from "./dto/update.student.input";
import { Student } from "./entites/student.entity";
import { StudentResolver } from "./student.resolver";
import { StudentService } from "./student.service";

describe("StudentService", () => {
  let service: StudentService;
  const updateDTO = new updateStudentDTO();
  let id: number;

  (updateDTO.name = "hansi"), (updateDTO.email = "ghu@gmail.com");

  const student: Student = {
    id: 1,
    name: "fake",
    email: "fake@email.com",
    dateOfBirth: new Date("1996-03-16"),
    age: 24,
  };

  const studentRepo = {
    findOne: jest.fn(() => {
      return {
        ...updateDTO,
      };
    }),
    find: jest.fn().mockImplementation(() => Promise.resolve([student])),
    create: jest.fn().mockImplementation((updateDTO) => updateDTO),
    remove: jest.fn().mockImplementation((student) => student),
    save: jest
      .fn()
      .mockImplementation((student) => Promise.resolve({ ...updateDTO })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        StudentService,
        {
          provide: getRepositoryToken(Student),
          useValue: studentRepo,
        },
      ],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should be get all students", async () => {
    expect(await service.findAll()).toEqual([student]);
  });

  it("should insert student list and return true", async () => {
    expect(
      await service.bulkCreateStudent([
        {
          id: 1,
          name: "fake",
          email: "fake@email.com",
          dateOfBirth: new Date("1996-03-16"),
          age: 24,
        },
      ])
    ).toEqual(true);
  });

  it("should delete student", async () => {
    expect(await service.removeStudent(1)).toEqual({ ...updateDTO });
  });

  it("should be update student and return with id", async () => {
    expect(await service.updateStudent(id, updateDTO)).toEqual({
      ...updateDTO,
    });
  });
});
