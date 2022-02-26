"use strict";
exports.__esModule = true;
exports.Header = void 0;
var SignInButton_1 = require("../SignInButton");
var styles_module_scss_1 = require("./styles.module.scss");
var ActiveLink_1 = require("../ActiveLink");
function Header() {
    return (React.createElement("header", { className: styles_module_scss_1["default"].headerContainer },
        React.createElement("div", { className: styles_module_scss_1["default"].headerContent },
            React.createElement("img", { src: "/images/logo.svg", alt: "ig.news" }),
            React.createElement("nav", null,
                React.createElement(ActiveLink_1.ActiveLink, { activeClassName: styles_module_scss_1["default"].active, href: "/" },
                    React.createElement("a", null, " Home  ")),
                React.createElement(ActiveLink_1.ActiveLink, { activeClassName: styles_module_scss_1["default"].active, href: "/posts" },
                    React.createElement("a", null, " Posts "))),
            React.createElement(SignInButton_1.SignInButton, null))));
}
exports.Header = Header;
