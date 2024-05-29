import { Permission } from './permission';

export class Role {
  name: string;
  permissions: Map<string, boolean> = new Map();
  children: Role[] = [];
  parents: Role[] = [];

  constructor(name: string, permissions?: Map<string, boolean>, children?: Role[], parents?: Role[]);
  constructor(role: { name: string, permissions?: Map<string, boolean>, children?: Role[], parents?: Role[] });
  constructor(nameOrRole: string | { name: string, permissions?: Map<string, boolean>, children?: Role[], parents?: Role[] }, permissions: Map<string, boolean> = new Map(), children: Role[] = [], parents: Role[] = []) {
    if (typeof nameOrRole === 'string') {
      this.name = nameOrRole;
      this.permissions = permissions;
      this.children = children;
      this.parents = parents;
    } else {
      this.name = nameOrRole.name;
      this.permissions = nameOrRole.permissions || new Map();
      this.children = nameOrRole.children || [];
      this.parents = nameOrRole.parents || [];
    }
  }
  addPermission(permission: Permission) {
    this.permissions.set(permission.name, true);
  }

  hasPermission(permissionName: string): boolean {
    if (this.permissions.has(permissionName)) {
      return true;
    }
    
    for (let child of this.children) {
      if (child.hasPermission(permissionName)) {
        return true;
      }
    }

    return false;
  }

  addChild(child: Role) {
    if (!this.children.includes(child)) {
      this.children.push(child);
      child.addParent(this);
    }
  }

  addParent(parent: Role) {
    if (!this.parents.includes(parent)) {
      this.parents.push(parent);
      parent.addChild(this);
    }
  }
}