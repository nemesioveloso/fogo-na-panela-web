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
    accessLevel: ["ADMIN", "EMPLOYEE", "CUSTOMER"],
  },
  {
    name: "Compras Anteriores",
    icon: "search",
    path: "/comprasAnteriores",
    accessLevel: ["ADMIN", "EMPLOYEE", "CUSTOMER"],
  },
  {
    name: "Meus Dados",
    icon: "search",
    path: "/meusDados",
    accessLevel: ["ADMIN", "EMPLOYEE", "CUSTOMER"],
  },
  // {
  //   name: "Dados",
  //   icon: "search",
  //   accessLevel: ["admin", "manager", "user"],
  //   submenus: [
  //     {
  //       name: "Compras Anteriores",
  //       path: "/comprasAnteriores",
  //       accessLevel: ["admin", "manager"],
  //     },
  //     {
  //       name: "Meus Dados",
  //       path: "/formCadastro",
  //       accessLevel: ["admin", "manager", "user"],
  //     },
  //   ],
  // },
];
