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
exports.ContactServices = void 0;
const exceptions_1 = require("../../../exceptions");
class ContactServices {
    constructor(contactRepository) {
        this.contactRepository = contactRepository;
    }
    findServeral(options) {
        return __awaiter(this, void 0, void 0, function* () {
            const where = {};
            const itemsFound = yield this.contactRepository.findMany({
                pagination: options.pagination,
                where,
            });
            return itemsFound;
        });
    }
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemFound = yield this.contactRepository.findById(id);
            if (!itemFound) {
                throw new exceptions_1.NotFoundException();
            }
            return itemFound;
        });
    }
    createOne(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemAlreadyExists = yield this.contactRepository.findByPhone(data.phone);
            if (itemAlreadyExists) {
                throw new exceptions_1.HttpException(409, "Already exists");
            }
            const itemCreated = yield this.contactRepository.createOne(data);
            if (!itemCreated)
                throw new Error("No item created");
            return itemCreated;
        });
    }
    updateById(id, data) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemUpdated = yield this.contactRepository.updateById(id, data);
            if (!itemUpdated) {
                throw new Error("No item updated");
            }
            return itemUpdated;
        });
    }
    deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemDeleted = yield this.contactRepository.deleteById(id);
            if (!itemDeleted) {
                throw new Error("No item deleted");
            }
            return itemDeleted;
        });
    }
    deleteMany(ids) {
        return __awaiter(this, void 0, void 0, function* () {
            const itemsDeleted = yield this.contactRepository.deleteMany(ids);
            if (!itemsDeleted) {
                throw new Error("No items deleted");
            }
            return itemsDeleted;
        });
    }
}
exports.ContactServices = ContactServices;
