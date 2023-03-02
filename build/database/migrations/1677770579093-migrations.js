"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.migrations1677770579093 = void 0;
class migrations1677770579093 {
    constructor() {
        this.name = 'migrations1677770579093';
    }
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`CREATE TABLE "questionnaire" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "active" boolean NOT NULL, CONSTRAINT "PK_e8232a11eaabac903636eb7e71e" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "school" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_57836c3fe2f2c7734b20911755e" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "teacher" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, CONSTRAINT "PK_2f807294148612a9751dacf1026" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "session" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "status" character varying NOT NULL, "applicationDate" TIMESTAMP NOT NULL, "questionnaire_id" uuid, "coach_id" uuid, "school_id" uuid, "teacher_id" uuid, CONSTRAINT "PK_f55da76ac1c3ac420f444d2ff11" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "guide" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying NOT NULL, CONSTRAINT "PK_fe92b4af32150e0580d37eacaef" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "competence" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "guide_id" uuid, CONSTRAINT "PK_994109fe84a82508e174282df03" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "question" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "questionnaire_id" uuid, "competence_id" uuid, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "option" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "question_id" uuid, CONSTRAINT "PK_e6090c1c6ad8962eea97abdbe63" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "answer" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, "question_id" uuid, "option_id" uuid, "session_id" uuid, CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "documentation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, "session_id" uuid, CONSTRAINT "PK_5bd6f5f1b06e11515e4174b020f" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`CREATE TABLE "feedback" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" character varying NOT NULL, "session_id" uuid, CONSTRAINT "PK_8389f9e087a57689cd5be8b2b13" PRIMARY KEY ("id"))`);
            yield queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_a55488c4e3256a0d4bbc52ca785" FOREIGN KEY ("questionnaire_id") REFERENCES "questionnaire"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_31e88904f181e92d5b7f88eceb0" FOREIGN KEY ("coach_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_a4c02bb32455cc20be9a02ea3b4" FOREIGN KEY ("school_id") REFERENCES "school"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "session" ADD CONSTRAINT "FK_e2edd036d661329fdb5b8e3ab43" FOREIGN KEY ("teacher_id") REFERENCES "teacher"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "competence" ADD CONSTRAINT "FK_1dfd6ab9f31936f546e0452e5d1" FOREIGN KEY ("guide_id") REFERENCES "guide"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_fa40da56981f3a6fe573e7dce19" FOREIGN KEY ("questionnaire_id") REFERENCES "questionnaire"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "question" ADD CONSTRAINT "FK_71d809af9271b147ca6aaf13868" FOREIGN KEY ("competence_id") REFERENCES "competence"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "option" ADD CONSTRAINT "FK_790cf6b252b5bb48cd8fc1d272b" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_69dad60c2f58e523232f06f5d8d" FOREIGN KEY ("option_id") REFERENCES "option"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_5af1cd1e18b4f118aa3a4b88eb2" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "documentation" ADD CONSTRAINT "FK_d5876e147b64c2aa9ae78d10883" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
            yield queryRunner.query(`ALTER TABLE "feedback" ADD CONSTRAINT "FK_e5bfaf86ab81e5ce5c1b54559d7" FOREIGN KEY ("session_id") REFERENCES "session"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            yield queryRunner.query(`ALTER TABLE "feedback" DROP CONSTRAINT "FK_e5bfaf86ab81e5ce5c1b54559d7"`);
            yield queryRunner.query(`ALTER TABLE "documentation" DROP CONSTRAINT "FK_d5876e147b64c2aa9ae78d10883"`);
            yield queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_5af1cd1e18b4f118aa3a4b88eb2"`);
            yield queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_69dad60c2f58e523232f06f5d8d"`);
            yield queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194"`);
            yield queryRunner.query(`ALTER TABLE "option" DROP CONSTRAINT "FK_790cf6b252b5bb48cd8fc1d272b"`);
            yield queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_71d809af9271b147ca6aaf13868"`);
            yield queryRunner.query(`ALTER TABLE "question" DROP CONSTRAINT "FK_fa40da56981f3a6fe573e7dce19"`);
            yield queryRunner.query(`ALTER TABLE "competence" DROP CONSTRAINT "FK_1dfd6ab9f31936f546e0452e5d1"`);
            yield queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_e2edd036d661329fdb5b8e3ab43"`);
            yield queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_a4c02bb32455cc20be9a02ea3b4"`);
            yield queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_31e88904f181e92d5b7f88eceb0"`);
            yield queryRunner.query(`ALTER TABLE "session" DROP CONSTRAINT "FK_a55488c4e3256a0d4bbc52ca785"`);
            yield queryRunner.query(`DROP TABLE "feedback"`);
            yield queryRunner.query(`DROP TABLE "documentation"`);
            yield queryRunner.query(`DROP TABLE "answer"`);
            yield queryRunner.query(`DROP TABLE "option"`);
            yield queryRunner.query(`DROP TABLE "question"`);
            yield queryRunner.query(`DROP TABLE "competence"`);
            yield queryRunner.query(`DROP TABLE "guide"`);
            yield queryRunner.query(`DROP TABLE "session"`);
            yield queryRunner.query(`DROP TABLE "user"`);
            yield queryRunner.query(`DROP TABLE "teacher"`);
            yield queryRunner.query(`DROP TABLE "school"`);
            yield queryRunner.query(`DROP TABLE "questionnaire"`);
        });
    }
}
exports.migrations1677770579093 = migrations1677770579093;
