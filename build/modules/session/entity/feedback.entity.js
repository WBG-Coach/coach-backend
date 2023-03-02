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
exports.Feedback = void 0;
const typeorm_1 = require("typeorm");
const session_entity_1 = require("./session.entity");
let Feedback = class Feedback {
    constructor(feedback) {
        Object.assign(this, feedback);
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)("uuid"),
    __metadata("design:type", Number)
], Feedback.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Feedback.prototype, "value", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => session_entity_1.Session, (session) => session.id),
    (0, typeorm_1.JoinColumn)({ name: "session_id" }),
    __metadata("design:type", session_entity_1.Session)
], Feedback.prototype, "session", void 0);
Feedback = __decorate([
    (0, typeorm_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Feedback);
exports.Feedback = Feedback;
