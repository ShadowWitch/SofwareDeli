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
exports.CategoryController = void 0;
class CategoryController {
    constructor(categoryService) {
        this.categoryService = categoryService;
    }
    getSeveral(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { limit, offset, role } = req.query;
            const parsedLimit = limit ? parseInt(limit) : 50;
            const parsedOffset = offset ? parseInt(offset) : 0;
            const parsedRole = role ? role : undefined;
            try {
                const categoriesList = yield this.categoryService.findServeral({
                    pagination: {
                        limit: parsedLimit,
                        offset: parsedOffset,
                    },
                    where: {
                        role: parsedRole,
                    },
                });
                const response = {
                    data: categoriesList,
                    limit: parsedLimit,
                    offset: parsedOffset,
                    total: categoriesList.length,
                };
                return res.status(200).json(response);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const categoryFound = yield this.categoryService.findById(id);
                return res.status(200).json(categoryFound);
            }
            catch (error) {
                next(error);
            }
        });
    }
    getOneByName(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name } = req.params;
            try {
                const categoryFound = yield this.categoryService.findByName(name);
                return res.status(200).json(categoryFound);
            }
            catch (error) {
                next(error);
            }
        });
    }
    createOne(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoryData = req.body;
            try {
                const categoryCreated = yield this.categoryService.createOne(categoryData);
                const httpResponse = {
                    data: categoryCreated,
                    message: "Created",
                };
                res.status(201).json(httpResponse);
            }
            catch (error) {
                next(error);
            }
        });
    }
    updateOneById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const categoryData = req.body;
            try {
                const categoryUpdated = yield this.categoryService.updateById(id, categoryData);
                const httpResponse = {
                    data: categoryUpdated,
                    message: "Updated",
                };
                return res.status(200).json(httpResponse);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteOneById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const categoryDeleted = yield this.categoryService.deleteById(id);
                const httpResponse = {
                    data: categoryDeleted,
                    message: "Deleted",
                };
                return res.status(200).json(httpResponse);
            }
            catch (error) {
                next(error);
            }
        });
    }
    deleteSeveral(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const { ids } = req.body;
            const categoriesDeleted = yield this.categoryService.deleteMany(ids);
            try {
                return res.status(200).json(categoriesDeleted);
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.CategoryController = CategoryController;
