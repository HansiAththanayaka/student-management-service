import { BullModule } from "@nestjs/bull";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MulterModule } from "@nestjs/platform-express";
import { TypeOrmModule } from "@nestjs/typeorm";
import { join } from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { StudentModule } from "./student/student.module";
//import { AppGateway } from "./app.gateway";

@Module({
  imports: [
    StudentModule,
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), "src/graphqlschema.gql"),
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "postgres",
      password: "root@123",
      database: "studentDetails",
      entities: ["dist/**/*.entity{.ts,.js}"],
      synchronize: true,
    }),
    BullModule.forRoot({
      redis: {
        host: "localhost",
        port: 6379,
      },
    }),
    MulterModule.register({
      dest: "./uploads",
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
