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
exports.Candidate = exports.CandidateStatus = void 0;
const typeorm_1 = require("typeorm");
const class_validator_1 = require("class-validator");
const Skill_1 = require("./Skill");
var CandidateStatus;
(function (CandidateStatus) {
    CandidateStatus["ACTIVE"] = "active";
    CandidateStatus["INTERVIEW"] = "interview";
    CandidateStatus["REJECTED"] = "rejected";
})(CandidateStatus || (exports.CandidateStatus = CandidateStatus = {}));
let Candidate = class Candidate {
};
exports.Candidate = Candidate;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Candidate.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.Length)(2, 100, { message: "Name must be between 2 and 100 characters" }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Candidate.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.Length)(2, 100, { message: "Position must be between 2 and 100 characters" }),
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Candidate.prototype, "position", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(CandidateStatus, {
        message: "Status must be active, interview, or rejected",
    }),
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({
        type: "enum",
        enum: CandidateStatus,
        default: CandidateStatus.ACTIVE,
    }),
    __metadata("design:type", String)
], Candidate.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: "Invalid email format" }),
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Candidate.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsPhoneNumber)(undefined, { message: "Invalid phone number format" }),
    (0, typeorm_1.Index)(),
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], Candidate.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.Length)(10, 2000, {
        message: "Description must be between 10 and 2000 characters",
    }),
    (0, typeorm_1.Column)("text"),
    __metadata("design:type", String)
], Candidate.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => Skill_1.Skill, (skill) => skill.candidates),
    (0, typeorm_1.JoinTable)({
        name: "candidate_skills",
        joinColumn: { name: "candidateId", referencedColumnName: "id" },
        inverseJoinColumn: { name: "skillId", referencedColumnName: "id" },
    }),
    __metadata("design:type", Array)
], Candidate.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Candidate.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Candidate.prototype, "updatedAt", void 0);
exports.Candidate = Candidate = __decorate([
    (0, typeorm_1.Entity)("candidates")
], Candidate);
