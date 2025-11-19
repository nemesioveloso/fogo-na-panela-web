import type { Role } from "./DecodedToken";

export interface SubMenu {
  name: string;
  path: string;
  icon: string;
  accessLevel: Role[];
}

export interface Menu {
  name: string;
  icon: string;
  path?: string;
  accessLevel?: Role[];
  submenus?: SubMenu[];
}
