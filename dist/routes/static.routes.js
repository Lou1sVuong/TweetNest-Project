"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const medias_controllers_1 = require("../controllers/medias.controllers");
const staticRouters = (0, express_1.Router)();
staticRouters.get('/image/:name', medias_controllers_1.serveImageController);
staticRouters.get('/video/:name', medias_controllers_1.serveVideoController);
staticRouters.get('/video-hls/:id/master.m3u8', medias_controllers_1.serveM3u8Controller);
staticRouters.get('/video-hls/:id/:v/:segment', medias_controllers_1.serveSegmentController);
exports.default = staticRouters;