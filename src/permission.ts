export class Permission {
  id: number;
  name: string;

  constructor(permission: { id: number, name: string });
  constructor(id: number, name: string);
  constructor(permissionOrName: { id: number, name: string } | number, name?: string) {
    if (typeof permissionOrName === 'number') {
      this.id = permissionOrName;
      this.name = name!;
    } else {
      this.id = permissionOrName.id;
      this.name = permissionOrName.name;
    }
  }
}