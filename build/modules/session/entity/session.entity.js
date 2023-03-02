"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Session = void 0;
const typeorm_1 = require("typeorm");
const questionnaire_entity_1 = require("../../questionnaire/entity/questionnaire.entity");
const school_entity_1 = require("../../school/entity/school.entity");
const teacher_entity_1 = require("../../teacher/entity/teacher.entity");
const entity_1 = require("../../user/entity");
let Session = class Session {
    constructor(session) {
        Object.assign(this, session);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", Number)
], Session.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Session.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Session.prototype, "applicationDate", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => questionnaire_entity_1.Questionnaire, (questionnaire) => questionnaire.id),
    (0, typeorm_1.JoinColumn)({ name: "questionnaire_id" }),
    __metadata("design:type", questionnaire_entity_1.Questionnaire)
], Session.prototype, "questionnaire", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => entity_1.User, (coach) => coach.id),
    (0, typeorm_1.JoinColumn)({ name: "coach_id" }),
    __metadata("design:type", entity_1.User)
], Session.prototype, "coache", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => school_entity_1.School, (school) => school.id),
    (0, typeorm_1.JoinColumn)({ name: "school_id" }),
    __metadata("design:type", school_entity_1.School)
], Session.prototype, "school", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => teacher_entity_1.Teacher, (teacher) => teacher.id),
    (0, typeorm_1.JoinColumn)({ name: "teacher_id" }),
    __metadata("design:type", teacher_entity_1.Teacher)
], Session.prototype, "teacher", void 0);
Session = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Session);
exports.Session = Session;
