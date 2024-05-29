"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
var Role = /** @class */ (function () {
    function Role(nameOrRole, permissions, children, parents) {
        if (permissions === void 0) { permissions = new Map(); }
        if (children === void 0) { children = []; }
        if (parents === void 0) { parents = []; }
        this.permissions = new Map();
        this.children = [];
        this.parents = [];
        if (typeof nameOrRole === 'string') {
            this.name = nameOrRole;
            this.permissions = permissions;
            this.children = children;
            this.parents = parents;
        }
        else {
            this.name = nameOrRole.name;
            this.permissions = nameOrRole.permissions || new Map();
            this.children = nameOrRole.children || [];
            this.parents = nameOrRole.parents || [];
        }
    }
    Role.prototype.addPermission = function (permission) {
        this.permissions.set(permission.name, true);
    };
    Role.prototype.hasPermission = function (permissionName) {
        if (this.permissions.has(permissionName)) {
            return true;
        }
        for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
            var child = _a[_i];
            if (child.hasPermission(permissionName)) {
                return true;
            }
        }
        return false;
    };
    Role.prototype.addChild = function (child) {
        if (!this.children.includes(child)) {
            this.children.push(child);
            child.addParent(this);
        }
    };
    Role.prototype.addParent = function (parent) {
        if (!this.parents.includes(parent)) {
            this.parents.push(parent);
            parent.addChild(this);
        }
    };
    return Role;
}());
exports.Role = Role;
