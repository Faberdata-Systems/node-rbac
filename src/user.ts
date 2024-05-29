import { Role } from './role';

export class User {
  id: number;
  name: string;
  roles: Role[] = [];

  constructor(id: number, name: string);
  constructor(user: { id: number, name: string, roles?: Role[] });
  constructor(idOrUser: number | { id: number, name: string, roles?: Role[] }, name?: string) {
    if (typeof idOrUser === 'number') {
      this.id = idOrUser;
      this.name = name || '';
    } else {
      this.id = idOrUser.id;
      this.name = idOrUser.name;
      this.roles = idOrUser.roles || [];
    }
  }

  addRole(role: Role) {
    this.roles.push(role);
  }
}