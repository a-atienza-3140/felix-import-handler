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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProperty = exports.createPropertyDetails = exports.createPropertyAction = exports.getProperty = exports.createPropertyOwner = exports.getIndividualOrCompany = exports.getOrCreateIndividual = exports.getOrCreateCompany = exports.getOwner = exports.getAddress = void 0;
var getAddress = function (row, supabaseClient) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, supabaseClient
                    .from("address")
                    .select("id, street")
                    .eq("street", row.street)
                    .limit(1)];
            case 1:
                _a = _b.sent(), data = _a.data, error = _a.error;
                if (error) {
                    console.error("Error:", exports.getAddress.name, error);
                    return [2 /*return*/];
                }
                return [2 /*return*/, data];
        }
    });
}); };
exports.getAddress = getAddress;
var getOwner = function (row, supabaseClient) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, supabaseClient
                    .from("property_owners")
                    .select("id")
                    .eq("full_name", row.owner_name)
                    .limit(1)];
            case 1:
                _a = _b.sent(), data = _a.data, error = _a.error;
                if (error) {
                    console.error("Error:", exports.getOwner.name, error);
                    return [2 /*return*/];
                }
                if (data && data.length > 0) {
                    console.log("Owner found...", data[0].id);
                }
                return [2 /*return*/, data];
        }
    });
}); };
exports.getOwner = getOwner;
var getOrCreateCompany = function (row, supabase) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error, newlyCreatedCompany;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, supabase
                    .from("company")
                    .select("id")
                    .eq("name", row.company)
                    .eq("name_director", row.name_director)
                    .eq("contact_company", row.contact_company)
                    .limit(1)];
            case 1:
                _a = _b.sent(), data = _a.data, error = _a.error;
                if (error) {
                    console.error("Error:", exports.getOrCreateCompany.name, error);
                    return [2 /*return*/];
                }
                if (!(data && data.length > 0)) return [3 /*break*/, 2];
                console.log("Found company...", data[0].id);
                return [3 /*break*/, 4];
            case 2: return [4 /*yield*/, supabase
                    .from("company")
                    .insert({
                    name: row.company,
                    name_director: row.name_director,
                    contact_company: row.contact_company,
                })
                    .select()];
            case 3:
                newlyCreatedCompany = (_b.sent()).data;
                if (newlyCreatedCompany && newlyCreatedCompany.length > 0) {
                    console.log("Created company...", newlyCreatedCompany[0].id);
                    return [2 /*return*/, newlyCreatedCompany[0]];
                }
                return [2 /*return*/];
            case 4: return [2 /*return*/, data[0]];
        }
    });
}); };
exports.getOrCreateCompany = getOrCreateCompany;
var getOrCreateIndividual = function (row, supabase) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error, _b, newlyCreatedIndividual, error_1;
    var _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0: return [4 /*yield*/, supabase
                    .from("individual")
                    .select("id")
                    .eq("surname", row.surname)
                    .eq("infix", row.infix)
                    .eq("initials", row.initials)
                    .eq("salutation", row.salutation)
                    .is("age", (_c = row.age) !== null && _c !== void 0 ? _c : null)
                    .limit(1)];
            case 1:
                _a = _e.sent(), data = _a.data, error = _a.error;
                if (error) {
                    console.error("Error:", exports.getOrCreateIndividual.name, error);
                    return [2 /*return*/];
                }
                if (!(data && data.length === 0)) return [3 /*break*/, 3];
                return [4 /*yield*/, supabase
                        .from("individual")
                        .insert({
                        surname: row.surname,
                        infix: row.infix,
                        initials: row.initials,
                        salutation: row.salutation,
                        date_of_birth: row.date_of_birth,
                        age: (_d = row.age) !== null && _d !== void 0 ? _d : null,
                    })
                        .select()];
            case 2:
                _b = _e.sent(), newlyCreatedIndividual = _b.data, error_1 = _b.error;
                if (error_1) {
                    console.error("Error:", exports.getOrCreateIndividual.name, "creation", error_1);
                    return [2 /*return*/];
                }
                console.log("Individual created...", newlyCreatedIndividual[0].id);
                return [2 /*return*/, newlyCreatedIndividual[0]];
            case 3: return [2 /*return*/, data[0]];
        }
    });
}); };
exports.getOrCreateIndividual = getOrCreateIndividual;
var getIndividualOrCompany = function (row, supabaseClient) { return __awaiter(void 0, void 0, void 0, function () {
    var company, individual;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!row.company) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, exports.getOrCreateCompany)(row, supabaseClient)];
            case 1:
                company = _a.sent();
                _a.label = 2;
            case 2:
                if (!row.surname) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, exports.getOrCreateIndividual)(row, supabaseClient)];
            case 3:
                individual = _a.sent();
                _a.label = 4;
            case 4: return [2 /*return*/, { individual: individual, company: company }];
        }
    });
}); };
exports.getIndividualOrCompany = getIndividualOrCompany;
var createPropertyOwner = function (row, supabaseClient) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, individual, company, _b, property_owner, error;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, (0, exports.getIndividualOrCompany)(row, supabaseClient)];
            case 1:
                _a = _c.sent(), individual = _a.individual, company = _a.company;
                return [4 /*yield*/, supabaseClient
                        .from("property_owners")
                        .insert({
                        full_name: row.owner_name || row.company,
                        owner_phone: row.owner_phone,
                        owner_mail: row.owner_mail,
                        individual_id: individual === null || individual === void 0 ? void 0 : individual.id,
                        company_id: company === null || company === void 0 ? void 0 : company.id,
                    })
                        .select()];
            case 2:
                _b = _c.sent(), property_owner = _b.data, error = _b.error;
                if (!property_owner && error) {
                    console.error("Error:", exports.createPropertyOwner.name, error);
                    return [2 /*return*/];
                }
                console.log("Owner created...", property_owner[0].id);
                return [2 /*return*/, property_owner];
        }
    });
}); };
exports.createPropertyOwner = createPropertyOwner;
/**
 * if age_information is newer, return undefined
 */
var getProperty = function (row, supabaseClient) { return __awaiter(void 0, void 0, void 0, function () {
    var formattedDate, _a, data, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                formattedDate = new Date(row.age_information)
                    .toISOString()
                    .slice(0, 10);
                return [4 /*yield*/, supabaseClient
                        .from("property")
                        .select("id, age_information")
                        .eq("age_information", formattedDate)
                        .limit(1)];
            case 1:
                _a = _b.sent(), data = _a.data, error = _a.error;
                if (error) {
                    console.error("Error:", exports.getProperty.name, error);
                    return [2 /*return*/];
                }
                if (data && data.length > 0) {
                    console.log("Property found...", data[0].id);
                    if (new Date(data[0].age_information) < new Date(row.age_information)) {
                        return [2 /*return*/];
                    }
                }
                return [2 /*return*/, data];
        }
    });
}); };
exports.getProperty = getProperty;
var createPropertyAction = function (supabaseClient) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, supabaseClient
                    .from("property_actions")
                    .insert([{}])
                    .select("id")
                    .limit(1)
                    .single()];
            case 1:
                _a = _b.sent(), data = _a.data, error = _a.error;
                if (error) {
                    console.error("Error:", exports.createPropertyAction.name, error);
                    return [2 /*return*/];
                }
                return [2 /*return*/, data];
        }
    });
}); };
exports.createPropertyAction = createPropertyAction;
var createPropertyDetails = function (supabaseClient) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, data, error;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, supabaseClient
                    .from("property_details")
                    .insert([{}])
                    .select("id")
                    .limit(1)
                    .single()];
            case 1:
                _a = _b.sent(), data = _a.data, error = _a.error;
                if (error) {
                    console.error("Error:", exports.createPropertyDetails.name, error);
                    return [2 /*return*/];
                }
                return [2 /*return*/, data];
        }
    });
}); };
exports.createPropertyDetails = createPropertyDetails;
var createProperty = function (row, supabaseClient, owner_id) { return __awaiter(void 0, void 0, void 0, function () {
    var propertyAction, propertyDetails, _a, data, error;
    var _b, _c, _d;
    return __generator(this, function (_e) {
        switch (_e.label) {
            case 0:
                console.log("Creating property...");
                return [4 /*yield*/, (0, exports.createPropertyAction)(supabaseClient)];
            case 1:
                propertyAction = _e.sent();
                return [4 /*yield*/, (0, exports.createPropertyDetails)(supabaseClient)];
            case 2:
                propertyDetails = _e.sent();
                return [4 /*yield*/, supabaseClient
                        .from("property")
                        .insert({
                        age_information: row.age_information,
                        cadastral_designation: row.cadastral_designation,
                        object: row.object,
                        bag_id: row.bag_id,
                        description: row.description,
                        purchase_price: row.purchase_price,
                        purchase_year: (_b = row.purchase_year) !== null && _b !== void 0 ? _b : null,
                        obtained_with_more_real_estate: (_c = row.obtained_with_more_real_estate) === null || _c === void 0 ? void 0 : _c.toLowerCase(),
                        cadaster_surface: row.cadaster_surface,
                        bag_surface: row.bag_surface,
                        measured_surface: row.measured_surface,
                        owner_lives_here: (_d = row.owner_lives_here) === null || _d === void 0 ? void 0 : _d.toLowerCase(),
                        address_id: row.address_id,
                        owner_id: owner_id,
                        property_action_id: propertyAction === null || propertyAction === void 0 ? void 0 : propertyAction.id,
                        property_details_id: propertyDetails === null || propertyDetails === void 0 ? void 0 : propertyDetails.id,
                    })
                        .select()];
            case 3:
                _a = _e.sent(), data = _a.data, error = _a.error;
                if (error) {
                    console.error("Error:", exports.createProperty.name, error);
                    return [2 /*return*/];
                }
                console.log("Property created...", data[0].id);
                return [2 /*return*/, data];
        }
    });
}); };
exports.createProperty = createProperty;
