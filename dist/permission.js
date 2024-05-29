"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Permission = void 0;
var Permission = /** @class */ (function () {
    function Permission(permissionOrName, name) {
        if (typeof permissionOrName === 'number') {
            this.id = permissionOrName;
            this.name = name;
        }
        else {
            this.id = permissionOrName.id;
            this.name = permissionOrName.name;
        }
    }
    return Permission;
}());
exports.Permission = Permission;
