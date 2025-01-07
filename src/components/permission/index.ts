import { PermissionColumnsProps } from "./Permission";

export function formatPermissions(data: any[]) {
  return data.reduce((prev, current) => {
    return {
      ...prev,
      [current.module]: {
        ...prev[current.module],
        [current.action]: current,
      },
    };
  }, {});
}

export const columns: PermissionColumnsProps[] = [
  {
    field: "module",
    headerName: "Module",
    type: "string",
  },
  {
    field: "read",
    headerName: "View",
    align: "center",
    type: "checkbox",
  },
  {
    field: "create",
    headerName: "Create",
    align: "center",
    type: "checkbox",
  },
  {
    field: "update",
    headerName: "Edit",
    align: "center",
    type: "checkbox",
  },
  {
    field: "delete",
    headerName: "Delete",
    align: "center",
    type: "checkbox",
  },
  {
    field: "assign",
    headerName: "Assign",
    align: "center",
    type: "checkbox",
  },
];
