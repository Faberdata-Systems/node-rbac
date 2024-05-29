"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var User = /** @class */ (function () {
    function User(idOrUser, name) {
        this.roles = [];
        if (typeof idOrUser === 'number') {
            this.id = idOrUser;
            this.name = name || '';
        }
        else {
            this.id = idOrUser.id;
            this.name = idOrUser.name;
            this.roles = idOrUser.roles || [];
        }
    }
    User.prototype.addRole = function (role) {
        this.roles.push(role);
    };
    return User;
}());
exports.User = User;
