"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RBAC = void 0;
var RBAC = /** @class */ (function () {
    function RBAC() {
        this.roles = new Map();
    }
    RBAC.prototype.addRoles = function (roles) {
        for (var _i = 0, roles_1 = roles; _i < roles_1.length; _i++) {
            var role = roles_1[_i];
            this.addRole(role);
        }
    };
    RBAC.prototype.addRole = function (role, parents) {
        if (parents) {
            for (var _i = 0, parents_1 = parents; _i < parents_1.length; _i++) {
                var parent_1 = parents_1[_i];
                parent_1.addChild(role);
            }
        }
        this.roles.set(role.name, role);
    };
    RBAC.prototype.hasRole = function (roleName) {
        return this.roles.has(roleName);
    };
    RBAC.prototype.getRole = function (roleName) {
        var role = this.roles.get(roleName);
        if (!role) {
            throw new Error("No role with name \"".concat(roleName, "\" could be found"));
        }
        return role;
    };
    RBAC.prototype.isGranted = function (user, permission) {
        var granted = false;
        user.roles.forEach(function (role) {
            if (role.hasPermission(permission.name)) {
                granted = true;
            }
        });
        return granted;
    };
    return RBAC;
}());
exports.RBAC = RBAC;
