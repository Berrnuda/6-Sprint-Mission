var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Router_1 = __importDefault(require("./Router"));
const react_1 = __importDefault(require("react"));
function App() {
    return (react_1.default.createElement(react_1.default.Fragment, null,
        react_1.default.createElement(Router_1.default, null)));
}
exports.default = App;
