"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./user");
var role_1 = require("./role");
var permission_1 = require("./permission");
var rbac_1 = require("./rbac");
describe('RBAC', function () {
    var rbac;
    var readPermission;
    var writePermission;
    var editPermission;
    var adminRole;
    var userRole;
    var childRole;
    var admin;
    var user;
    var grandChildRole;
    var childRole2;
    var parentRole;
    var permissions;
    var parentRoles;
    var lastPermission;
    var childRoles;
    var allPermissions = [];
    beforeEach(function () {
        permissions = Array.from({ length: 2000 }, function (_, i) { return new permission_1.Permission({ id: i + 1, name: "permission".concat(i + 1) }); });
        parentRoles = Array.from({ length: 5 }, function (_, i) { return new role_1.Role({ name: "parent".concat(i + 1) }); });
        rbac = new rbac_1.RBAC();
        var currentChild = new role_1.Role({ name: "child1" });
        currentChild.addPermission(permissions[0]);
        childRoles = [currentChild];
        var _loop_1 = function (i) {
            var childRole_1 = new role_1.Role({ name: "child".concat(i + 1) });
            parentRoles.forEach(function (parentRole, parentIndex) {
                var permissionName = "permission".concat(parentIndex + 1, "_").concat(i + 1);
                var permission = new permission_1.Permission({ id: i + 1, name: permissionName });
                lastPermission = permission;
                allPermissions.push(permission);
                childRole_1.addPermission(permission);
                if (i === 2) {
                    parentRole.addChild(currentChild);
                }
            });
            currentChild.addChild(childRole_1);
            currentChild = childRole_1;
            childRoles.push(childRole_1);
        };
        for (var i = 1; i < 2000; i++) {
            _loop_1(i);
        }
        rbac.addRoles(__spreadArray(__spreadArray([], parentRoles, true), childRoles, true));
        console.log(childRoles[1900].permissions);
        admin = new user_1.User({ id: 1, name: 'Admin', roles: parentRoles });
    });
    // test('isGranted should return false if role does not have permission', () => {
    //   expect(rbac.isGranted(admin, readPermission)).toBe(false);
    // });
    // test('isGranted should return true if child role has permission', () => {
    //   expect(rbac.isGranted(admin, writePermission)).toBe(true);
    // });
    test('isGranted should return true if child role has permission', function () {
        expect(rbac.isGranted(admin, allPermissions[1900])).toBe(true);
    });
});
