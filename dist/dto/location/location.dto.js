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
exports.LocationDto = exports.IsPolygonConstraint = void 0;
exports.IsPolygon = IsPolygon;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const translation_dto_1 = require("../translation/translation.dto");
const resource_dto_1 = require("../resource/resource.dto");
const poi_dto_1 = require("../poi/poi.dto");
// Custom constraint for validating GeoJSON Polygon
let IsPolygonConstraint = class IsPolygonConstraint {
    validate(geom, args) {
        if (!geom || typeof geom !== "object")
            return false;
        // Check if it's a Polygon
        if (geom.type !== "Polygon")
            return false;
        // Validate coordinates structure for Polygon
        return this.isValidPolygonCoordinates(geom.coordinates);
    }
    defaultMessage(args) {
        return "geom must be a valid GeoJSON Polygon";
    }
    isValidPolygonCoordinates(polygonCoords) {
        if (!Array.isArray(polygonCoords) || polygonCoords.length === 0)
            return false;
        for (const ring of polygonCoords) {
            if (!this.isValidLinearRing(ring))
                return false;
        }
        return true;
    }
    isValidLinearRing(ring) {
        if (!Array.isArray(ring) || ring.length < 4)
            return false;
        // Check first and last coordinates match (closed ring)
        const first = ring[0];
        const last = ring[ring.length - 1];
        if (first[0] !== last[0] || first[1] !== last[1])
            return false;
        // Validate each coordinate pair
        for (const coord of ring) {
            if (!Array.isArray(coord) ||
                coord.length < 2 ||
                typeof coord[0] !== "number" ||
                typeof coord[1] !== "number") {
                return false;
            }
        }
        return true;
    }
};
exports.IsPolygonConstraint = IsPolygonConstraint;
exports.IsPolygonConstraint = IsPolygonConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: "isValidPolygon", async: false })
], IsPolygonConstraint);
// Custom decorator
function IsPolygon(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsPolygonConstraint,
        });
    };
}
class LocationDto {
}
exports.LocationDto = LocationDto;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], LocationDto.prototype, "id", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], LocationDto.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], LocationDto.prototype, "prices", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], LocationDto.prototype, "is_published", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], LocationDto.prototype, "is_purchased", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => translation_dto_1.TranslationDto),
    __metadata("design:type", Array)
], LocationDto.prototype, "translations", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => resource_dto_1.ResourceDto),
    __metadata("design:type", Array)
], LocationDto.prototype, "resources", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsInt)({ each: true }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], LocationDto.prototype, "region_ids", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LocationDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], LocationDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], LocationDto.prototype, "stripe_product_id", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], LocationDto.prototype, "is_geom_set", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    IsPolygon(),
    __metadata("design:type", Object)
], LocationDto.prototype, "geom", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => poi_dto_1.PoiDto),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], LocationDto.prototype, "pois", void 0);
