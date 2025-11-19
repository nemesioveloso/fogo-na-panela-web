export interface SubMenu {
  name: string;
  path: string;
  icon: string;
  accessLevel: ("admin" | "manager" | "user")[];
}

export interface Menu {
  name: string;
  icon: string;
  path?: string;
  accessLevel?: ("admin" | "manager" | "user")[];
  submenus?: SubMenu[];
}
