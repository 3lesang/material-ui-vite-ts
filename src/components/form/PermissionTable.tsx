import { axiosClient } from "@/axios";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useQuery } from "@tanstack/react-query";

function formatPermissions(data: any[]) {
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
    headerName: "List",
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
    headerName: "Update",
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

export interface PermissionColumnsProps {
  field: string;
  headerName: string;
  type?: "string" | "checkbox";
  align?: TableCellProps["align"];
}

interface Props {
  onChange?: (data: any) => void;
  columns?: PermissionColumnsProps[];
  value?: any[];
  disable?: boolean;
}

const page = 1;
const limit = 10;

function PermissionTable(props: Props) {
  const { data } = useQuery({
    queryKey: ["permissions", page, limit],
    queryFn: () => axiosClient.get("/permissions", { params: { page, limit } }),
  });

  const permissions = formatPermissions(props.value || []);
  const rows = Object.entries(formatPermissions(data?.data?.data || []));

  const handleCheckboxChange = (permission: any): void => {
    const permissions = props?.value;
    const index = permissions?.findIndex((item) => item?.id == permission?.id);

    if (index == -1) {
      permissions?.push(permission);
    } else {
      permissions?.splice(Number(index), 1);
    }
    props?.onChange?.(permissions);
  };

  return (
    <Table>
      <TableHead>
        <TableRow>
          {props?.columns?.map((column, index) => (
            <TableCell key={index} align={column.align}>
              {column.headerName}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rows?.map((row: [string, any], index) => (
          <TableRow key={index}>
            {props?.columns?.map((column, index) => {
              const module = row[0];
              const actions = row[1];
              const actionName = column.field;
              const checked = permissions[module]?.[actionName]?.id;
              const renderValue = () => {
                switch (column.type) {
                  case "string":
                    return module;
                  case "checkbox": {
                    if (!actions[actionName]?.id) return null;
                    return (
                      <Checkbox
                        disabled={props?.disable}
                        sx={{ padding: 0.5 }}
                        defaultChecked={checked}
                        onChange={() =>
                          handleCheckboxChange(actions[actionName])
                        }
                      />
                    );
                  }
                }
              };
              return (
                <TableCell key={index} align={column.align}>
                  {renderValue()}
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default PermissionTable;
