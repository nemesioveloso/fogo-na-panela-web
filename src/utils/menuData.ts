import type { Menu } from "../models/tipagemMenu";

export const menuData: Menu[] = [
  {
    name: "Início",
    icon: "home",
    path: "/dashboard",
  },
  {
    name: "Tabela",
    icon: "table",
    path: "/tabela",
    accessLevel: ["admin", "manager", "user"],
  },
  {
    name: "Dados",
    icon: "search",
    accessLevel: ["admin", "manager", "user"],
    submenus: [
      {
        name: "Formulário com Validação",
        path: "/dashboard",
        accessLevel: ["admin", "manager"],
      },
      {
        name: "Formulário com Validação via Props",
        path: "/formCadastro",
        accessLevel: ["admin", "manager", "user"],
      },
      {
        name: "404",
        path: "/about2",
        accessLevel: ["admin", "manager"],
      },
    ],
  },
];
