"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medias_controllers_1 = require("../controllers/medias.controllers");
const users_middlewares_1 = require("../middlewares/users.middlewares");
const handlers_1 = require("../utils/handlers");
const mediasRouters = (0, express_1.Router)();
mediasRouters.post('/upload-image', users_middlewares_1.accessTokenValidation, users_middlewares_1.verifiedUserValidation, (0, handlers_1.wrapRequestHandler)(medias_controllers_1.uploadImageController));
mediasRouters.post('/upload-video', users_middlewares_1.accessTokenValidation, users_middlewares_1.verifiedUserValidation, (0, handlers_1.wrapRequestHandler)(medias_controllers_1.uploadVideoController));
mediasRouters.post('/upload-video-hls', users_middlewares_1.accessTokenValidation, users_middlewares_1.verifiedUserValidation, (0, handlers_1.wrapRequestHandler)(medias_controllers_1.uploadVideoHLSController));
mediasRouters.get('/video-status/:id', users_middlewares_1.accessTokenValidation, users_middlewares_1.verifiedUserValidation, (0, handlers_1.wrapRequestHandler)(medias_controllers_1.videoStatusController));
exports.default = mediasRouters;