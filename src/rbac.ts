import { Role } from './role';
import { Permission } from './permission';
import { User } from './user';

export  class RBAC {
  roles: Map<string, Role> = new Map();
  addRoles(roles: Role[]) {
    for (let role of roles) {
      this.addRole(role);
    }
  }
  addRole(role: Role, parents?: Role[]) {
    if (parents) {
      for (let parent of parents) {
        parent.addChild(role);
      }
    }

    this.roles.set(role.name, role);
  }

  hasRole(roleName: string): boolean {
    return this.roles.has(roleName);
  }

  getRole(roleName: string): Role {
    const role = this.roles.get(roleName);
    if (!role) {
      throw new Error(`No role with name "${roleName}" could be found`);
    }
    return role;
  }
  isGranted(user: User, permission: Permission): boolean {
      let granted = false;
      user.roles.forEach(role => {
        if (role.hasPermission(permission.name)) {
          granted = true;
        }
      });
      return granted;
    }
  }
