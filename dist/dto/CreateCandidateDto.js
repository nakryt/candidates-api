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
exports.CreateCandidateDto = void 0;
const class_validator_1 = require("class-validator");
const Candidate_1 = require("../entities/Candidate");
class CreateCandidateDto {
}
exports.CreateCandidateDto = CreateCandidateDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Name is required" }),
    (0, class_validator_1.Length)(2, 100, { message: "Name must be between 2 and 100 characters" }),
    __metadata("design:type", String)
], CreateCandidateDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: "Position is required" }),
    (0, class_validator_1.Length)(2, 100, { message: "Position must be between 2 and 100 characters" }),
    __metadata("design:type", String)
], CreateCandidateDto.prototype, "position", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: "Invalid email format" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Email is required" }),
    __metadata("design:type", String)
], CreateCandidateDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsPhoneNumber)(undefined, { message: "Invalid phone number format" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Phone is required" }),
    __metadata("design:type", String)
], CreateCandidateDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.Length)(10, 2000, {
        message: "Description must be between 10 and 2000 characters",
    }),
    __metadata("design:type", String)
], CreateCandidateDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsEnum)(Candidate_1.CandidateStatus, {
        message: `Status must be one of: ${Object.values(Candidate_1.CandidateStatus).join(", ")}`,
    }),
    __metadata("design:type", String)
], CreateCandidateDto.prototype, "status", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)({ message: "Skills must be an array" }),
    (0, class_validator_1.ArrayMinSize)(0, { message: "Skills array cannot be empty if provided" }),
    __metadata("design:type", Array)
], CreateCandidateDto.prototype, "skillIds", void 0);
