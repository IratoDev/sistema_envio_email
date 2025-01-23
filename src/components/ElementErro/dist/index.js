"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
        while (_) try {
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
exports.__esModule = true;
exports.ErroItem = void 0;
var react_1 = require("react");
var fi_1 = require("react-icons/fi");
var fa_1 = require("react-icons/fa");
var StyleErro_module_css_1 = require("./StyleErro.module.css");
var api_1 = require("../../service/api");
var sonner_1 = require("sonner");
function ErroItem(_a) {
    var _this = this;
    var id = _a.id, nome = _a.nome, causa = _a.causa, solucao = _a.solucao, imagem = _a.imagem, onDelete = _a.onDelete, onEdit = _a.onEdit;
    var _b = react_1.useState(false), modalVisible = _b[0], setModalVisible = _b[1];
    var _c = react_1.useState(false), editModalVisible = _c[0], setEditModalVisible = _c[1];
    var _d = react_1.useState({ nome: nome, causa: causa, solucao: solucao, imagem: imagem }), editData = _d[0], setEditData = _d[1];
    var _e = react_1.useState(null), imageAvatar = _e[0], setImageAvatar = _e[1];
    var _f = react_1.useState(''), avatarUrl = _f[0], setAvatarUrl = _f[1];
    var openModal = function () { return setModalVisible(true); };
    var closeModal = function () { return setModalVisible(false); };
    var openEditModal = function () { return setEditModalVisible(true); };
    var closeEditModal = function () { return setEditModalVisible(false); };
    var handleInputChange = function (e) {
        var _a = e.target, name = _a.name, value = _a.value;
        setEditData(function (prev) {
            var _a;
            return (__assign(__assign({}, prev), (_a = {}, _a[name] = value, _a)));
        });
    };
    function handleFile(e) {
        if (!e.target.files)
            return;
        var image = e.target.files[0];
        if (image && (image.type === 'image/jpeg' || image.type === 'image/jpg' || image.type === 'image/png')) {
            setImageAvatar(image);
            setAvatarUrl(URL.createObjectURL(image));
        }
    }
    var handleEditSave = function () { return __awaiter(_this, void 0, void 0, function () {
        var apiClient, data, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    apiClient = api_1.setupApiClient();
                    data = new FormData();
                    // Adiciona os campos ao FormData
                    data.append("nome", editData.nome);
                    data.append("causa", editData.causa);
                    data.append("solucao", editData.solucao);
                    // Verifica se existe uma imagem e adiciona ao FormData
                    if (imageAvatar) {
                        data.append("files", imageAvatar); // Aqui é o arquivo real
                    }
                    return [4 /*yield*/, apiClient.put("/erro/update/" + id, data)];
                case 1:
                    response = _a.sent();
                    onEdit(id, response.data); // Atualiza o frontend com os dados retornados
                    sonner_1.toast.success("Erro atualizado com sucesso!");
                    closeEditModal();
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    console.error("Erro ao atualizar o erro:", error_1);
                    sonner_1.toast.error("Erro ao atualizar o erro.");
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement("div", { className: StyleErro_module_css_1["default"].erroItem },
            react_1["default"].createElement("div", { className: StyleErro_module_css_1["default"].BoxImg },
                react_1["default"].createElement("h3", null, nome),
                imagem && react_1["default"].createElement("img", { src: imagem, alt: nome, className: StyleErro_module_css_1["default"].erroImage })),
            react_1["default"].createElement("div", { className: StyleErro_module_css_1["default"].conteinerButton },
                react_1["default"].createElement("button", { className: StyleErro_module_css_1["default"].erroButton, onClick: function () { return onDelete(id); } },
                    react_1["default"].createElement(fa_1.FaTrashAlt, null)),
                react_1["default"].createElement("button", { className: StyleErro_module_css_1["default"].erroButton, onClick: openEditModal },
                    react_1["default"].createElement(fa_1.FaPen, null)),
                react_1["default"].createElement("button", { className: StyleErro_module_css_1["default"].erroButton, onClick: openModal },
                    react_1["default"].createElement(fi_1.FiEye, { size: 20, color: "#fff" })))),
        modalVisible && (react_1["default"].createElement("div", { className: StyleErro_module_css_1["default"].modal },
            react_1["default"].createElement("div", { className: StyleErro_module_css_1["default"].modalContent },
                react_1["default"].createElement("button", { onClick: closeModal, className: StyleErro_module_css_1["default"].closeModal }, "X"),
                imagem && react_1["default"].createElement("img", { src: imagem, alt: nome, className: StyleErro_module_css_1["default"].modalImage }),
                react_1["default"].createElement("h2", null, nome),
                react_1["default"].createElement("p", null,
                    react_1["default"].createElement("strong", null, "Causa:"),
                    " ",
                    causa),
                react_1["default"].createElement("p", null,
                    react_1["default"].createElement("strong", null, "Solu\u00E7\u00E3o:"),
                    " ",
                    solucao)))),
        editModalVisible && (react_1["default"].createElement("div", { className: StyleErro_module_css_1["default"].modalEdicao },
            react_1["default"].createElement("div", { className: StyleErro_module_css_1["default"].modalContent },
                react_1["default"].createElement("button", { onClick: closeEditModal, className: StyleErro_module_css_1["default"].closeModal }, "X"),
                react_1["default"].createElement("h2", null, "Editar Erro"),
                react_1["default"].createElement("form", { onSubmit: handleEditSave },
                    react_1["default"].createElement("label", null,
                        "Nome:",
                        react_1["default"].createElement("input", { type: "text", name: "nome", value: editData.nome, onChange: handleInputChange, className: StyleErro_module_css_1["default"].input })),
                    react_1["default"].createElement("label", null,
                        "Causa:",
                        react_1["default"].createElement("textarea", { name: "causa", value: editData.causa, onChange: handleInputChange, className: StyleErro_module_css_1["default"].input })),
                    react_1["default"].createElement("label", null,
                        "Solu\u00E7\u00E3o:",
                        react_1["default"].createElement("textarea", { name: "solucao", value: editData.solucao, onChange: handleInputChange, className: StyleErro_module_css_1["default"].input })),
                    react_1["default"].createElement("label", null,
                        "Imagem:",
                        react_1["default"].createElement("input", { type: "file", name: "imagem", accept: "image/png, image/jpeg, image/jpg", onChange: handleFile, className: StyleErro_module_css_1["default"].input }),
                        imageAvatar && react_1["default"].createElement("img", { className: StyleErro_module_css_1["default"].previw, src: avatarUrl, alt: "foto do erro", width: 100, height: 100 })),
                    react_1["default"].createElement("button", { type: "submit", className: StyleErro_module_css_1["default"].saveButton }, "Salvar")))))));
}
exports.ErroItem = ErroItem;
