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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurePassport = void 0;
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_discord_1 = require("passport-discord");
const passport_github2_1 = require("passport-github2");
const user_service_1 = require("../services/user.service");
const configurePassport = (config) => {
    // Google Strategy
    passport_1.default.use(new passport_google_oauth20_1.Strategy({
        clientID: config.google.clientID,
        clientSecret: config.google.clientSecret,
        callbackURL: config.google.callbackURL,
        scope: config.google.scope || ["profile", "email"],
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.findOrCreateUser)("google", profile);
            done(null, user);
        }
        catch (error) {
            done(error);
        }
    })));
    // Discord Strategy
    passport_1.default.use(new passport_discord_1.Strategy({
        clientID: config.discord.clientID,
        clientSecret: config.discord.clientSecret,
        callbackURL: config.discord.callbackURL,
        scope: config.discord.scope || ["identify", "email"],
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.findOrCreateUser)("discord", profile);
            done(null, user);
        }
        catch (error) {
            done(error);
        }
    })));
    // GitHub Strategy
    passport_1.default.use(new passport_github2_1.Strategy({
        clientID: config.github.clientID,
        clientSecret: config.github.clientSecret,
        callbackURL: config.github.callbackURL,
        scope: config.github.scope || ["user:email"],
    }, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.findOrCreateUser)("github", profile);
            done(null, user);
        }
        catch (error) {
            done(error);
        }
    })));
    passport_1.default.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport_1.default.deserializeUser((id, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const user = yield (0, user_service_1.findUserById)(id);
            done(null, user);
        }
        catch (error) {
            done(error);
        }
    }));
};
exports.configurePassport = configurePassport;
