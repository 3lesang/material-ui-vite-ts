import { axiosClient } from "@/axios";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useQuery } from "@tanstack/react-query";
import { formatPermissions } from ".";

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
    <Card>
      <CardHeader
        title="Permission Information"
        subheader="Enter the permission information"
        titleTypographyProps={{
          variant: "button",
        }}
        subheaderTypographyProps={{
          variant: "caption",
        }}
      />
      <Table size="small">
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
                          size="small"
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
    </Card>
  );
}

export default PermissionTable;
