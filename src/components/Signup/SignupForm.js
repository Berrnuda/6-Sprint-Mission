"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
const eye_invisible_svg_1 = __importDefault(require("../../assets/icon/eye-invisible.svg"));
const eye_visible_svg_1 = __importDefault(require("../../assets/icon/eye-visible.svg"));
const API_1 = require("../API/API");
const AuthProvider_1 = require("../../context/AuthProvider");
function SignupForm() {
    const [email, setEmail] = (0, react_1.useState)("");
    const [emailError, setEmailError] = (0, react_1.useState)("");
    const [nickname, setNickname] = (0, react_1.useState)("");
    const [nicknameError, setNicknameError] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [passwordError, setPasswordError] = (0, react_1.useState)("");
    const [passwordConfirmation, setPasswordConfirm] = (0, react_1.useState)("");
    const [passwordConfirmError, setPasswordConfirmError] = (0, react_1.useState)("");
    const [showPassword, setShowPassword] = (0, react_1.useState)(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const { user } = (0, AuthProvider_1.useAuth)();
    (0, react_1.useEffect)(() => {
        if (user)
            navigate("/");
    }, [user, navigate]);
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            setEmailError("이메일을 입력하세요.");
            return false;
        }
        else if (!emailRegex.test(email)) {
            setEmailError("올바른 이메일 형식이 아닙니다.");
            return false;
        }
        else {
            setEmailError("");
            return true;
        }
    }
    function validateNickname() {
        if (!nickname) {
            setNicknameError("닉네임을 입력하세요.");
            return false;
        }
        else {
            setNicknameError("");
            return true;
        }
    }
    function validatePassword() {
        if (!password) {
            setPasswordError("비밀번호를 입력하세요.");
            return false;
        }
        else if (password.length < 8) {
            setPasswordError("비밀번호는 최소 8자 이상이어야 합니다.");
            return false;
        }
        else {
            setPasswordError("");
            return true;
        }
    }
    function validatePasswordConfirm() {
        if (password !== passwordConfirmation) {
            setPasswordConfirmError("비밀번호가 일치하지 않습니다.");
            return false;
        }
        else {
            setPasswordConfirmError("");
            return true;
        }
    }
    function handleSubmit(e) {
        return __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            if (validateEmail() &&
                validateNickname() &&
                validatePassword() &&
                validatePasswordConfirm()) {
                try {
                    yield (0, API_1.postSignup)({ email, nickname, password, passwordConfirmation });
                    alert("회원가입이 완료되었습니다.");
                    navigate("/signin");
                }
                catch (error) {
                    console.log(error);
                    alert(error);
                }
            }
        });
    }
    function togglePasswordVisibility() {
        setShowPassword(!showPassword);
    }
    function togglePasswordConfirmVisibility() {
        setShowPasswordConfirm(!showPasswordConfirm);
    }
    return (react_1.default.createElement("form", { id: "signupForm", className: "signin-form", onSubmit: handleSubmit },
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "email", className: "signin-label" }, "\uC774\uBA54\uC77C"),
            react_1.default.createElement("input", { id: "email", name: "email", type: "email", placeholder: "\uC774\uBA54\uC77C\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.", className: "signin-input", value: email, onChange: (e) => setEmail(e.target.value), onBlur: validateEmail, style: { border: emailError ? "1px solid #f74747" : "none" } }),
            emailError && (react_1.default.createElement("span", { id: "email-Error", className: "Error-message" }, emailError))),
        react_1.default.createElement("div", null,
            react_1.default.createElement("label", { htmlFor: "nickname", className: "signin-label" }, "\uB2C9\uB124\uC784"),
            react_1.default.createElement("input", { id: "nickname", name: "nickname", type: "text", placeholder: "\uB2C9\uB124\uC784\uC744 \uC785\uB825\uD574 \uC8FC\uC138\uC694.", className: "signin-input", value: nickname, onChange: (e) => setNickname(e.target.value), onBlur: validateNickname, style: { border: nicknameError ? "1px solid #f74747" : "none" } }),
            nicknameError && (react_1.default.createElement("span", { id: "nickname-Error", className: "Error-message" }, nicknameError))),
        react_1.default.createElement("div", { className: "signin-pwd" },
            react_1.default.createElement("label", { htmlFor: "pwd", className: "signin-label" }, "\uBE44\uBC00\uBC88\uD638"),
            react_1.default.createElement("input", { id: "pwd", name: "pwd", type: showPassword ? "text" : "password", placeholder: "\uBE44\uBC00\uBC88\uD638\uB97C \uC785\uB825\uD574 \uC8FC\uC138\uC694.", className: "signin-input", value: password, onChange: (e) => setPassword(e.target.value), onBlur: validatePassword, style: { border: passwordError ? "1px solid #f74747" : "none" } }),
            react_1.default.createElement("img", { id: "pwd-toggle", src: showPassword ? eye_visible_svg_1.default : eye_invisible_svg_1.default, className: "pwd-toggle", alt: "\uBE44\uBC00\uBC88\uD638 \uD1A0\uAE00", onClick: togglePasswordVisibility }),
            passwordError && (react_1.default.createElement("span", { id: "pwd-Error", className: "Error-message" }, passwordError))),
        react_1.default.createElement("div", { className: "signin-pwd" },
            react_1.default.createElement("label", { htmlFor: "pwd-same", className: "signin-label" }, "\uBE44\uBC00\uBC88\uD638 \uD655\uC778"),
            react_1.default.createElement("input", { id: "pwd-same", name: "pwd-same", type: showPasswordConfirm ? "text" : "password", placeholder: "\uBE44\uBC00\uBC88\uD638\uB97C \uB2E4\uC2DC \uD55C \uBC88 \uC785\uB825\uD574 \uC8FC\uC138\uC694.", className: "signin-input", value: passwordConfirmation, onChange: (e) => setPasswordConfirm(e.target.value), onBlur: validatePasswordConfirm, style: {
                    border: passwordConfirmError ? "1px solid #f74747" : "none",
                } }),
            react_1.default.createElement("img", { id: "pwd-same-toggle", src: showPasswordConfirm ? eye_visible_svg_1.default : eye_invisible_svg_1.default, className: "pwd-toggle", alt: "\uBE44\uBC00\uBC88\uD638 \uD1A0\uAE00", onClick: togglePasswordConfirmVisibility }),
            passwordConfirmError && (react_1.default.createElement("span", { id: "pwd-same-Error", className: "Error-message" }, passwordConfirmError))),
        react_1.default.createElement("button", { type: "submit", className: "signin-btn btn" }, "\uD68C\uC6D0\uAC00\uC785")));
}
exports.default = SignupForm;
