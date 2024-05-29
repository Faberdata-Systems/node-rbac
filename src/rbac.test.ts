import { User } from './user';
import { Role } from './role';
import { Permission } from './permission';
import { RBAC } from './rbac';

describe('RBAC', () => {
  let rbac: RBAC;
  let readPermission: Permission;
  let writePermission: Permission;
  let editPermission: Permission;
  let adminRole: Role;
  let userRole: Role;
  let childRole: Role;
  let admin: User;
  let user: User;
  let grandChildRole: Role;
  let childRole2: Role;
  let parentRole: Role;
  let permissions: Permission[];
  let parentRoles: Role[];
  let lastPermission : Permission;
  let childRoles: Role[];
  let allPermissions: Permission[] = [];


  beforeEach(() => {

    permissions = Array.from({ length: 2000 }, (_, i) => new Permission({ id: i + 1, name: `permission${i + 1}` }));
    parentRoles = Array.from({ length: 5 }, (_, i) => new Role({ name: `parent${i + 1}` }));
    rbac = new RBAC();
    let currentChild = new Role({ name: `child1` });
    currentChild.addPermission(permissions[0]);
    childRoles = [currentChild];
    for (let i = 1; i < 2000; i++) {
      const childRole = new Role({ name: `child${i + 1}` });
        parentRoles.forEach((parentRole, parentIndex) => {
          const permissionName = `permission${parentIndex + 1}_${i + 1}`;
          const permission = new Permission({ id: i + 1, name: permissionName });
          lastPermission = permission;
          allPermissions.push(permission);
          childRole.addPermission(permission);
          if (i === 2) {
            parentRole.addChild(currentChild);
          }
      });
      currentChild.addChild(childRole);
      currentChild = childRole;
      childRoles.push(childRole);
    }
    rbac.addRoles([...parentRoles, ...childRoles]);
    console.log(childRoles[1900].permissions)
    admin = new User({ id: 1, name: 'Admin', roles: parentRoles });
    
    
  });

  // test('isGranted should return false if role does not have permission', () => {
  //   expect(rbac.isGranted(admin, readPermission)).toBe(false);
  // });

  // test('isGranted should return true if child role has permission', () => {
  //   expect(rbac.isGranted(admin, writePermission)).toBe(true);
  // });
  test('isGranted should return true if child role has permission', () => {
    expect(rbac.isGranted(admin, allPermissions[1900])).toBe(true);
  });
});