"use strict";var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");Object.defineProperty(exports, "__esModule", { value: true });exports.db = exports.admin = void 0;var firebaseAdmin = _interopRequireWildcard(require("firebase-admin"));

const admin = firebaseAdmin.initializeApp();exports.admin = admin;
const db = admin.firestore();exports.db = db;