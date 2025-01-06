import { axiosClient } from "@/axios";
import { formatPermissions } from "@/routes/_admin/setting/_layout/role/$id";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Checkbox from "@mui/material/Checkbox";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { TableCellProps } from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useQuery } from "@tanstack/react-query";

export interface PermissionColumnsProps {
  field: string;
  headerName: string;
  type?: "string" | "checkbox";
  align?: TableCellProps["align"];
}

interface Props {
  onChange?: (data: any) => void;
  rows?: any[];
  columns?: PermissionColumnsProps[];
}

function PermissionTable(props: Props) {
  const page = 1;
  const limit = 10;
  const { data } = useQuery({
    queryKey: ["permissions", page, limit],
    queryFn: () => axiosClient.get("/permissions", { params: { page, limit } }),
  });

  const rows = Object.entries(formatPermissions(data?.data?.data || []));

  const handleCheckboxChange = (permission: any): void => {
    console.log(permission);
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
                const renderValue = () => {
                  switch (column.type) {
                    case "string":
                      return row[0];
                    case "checkbox": {
                      if (!row[1][column.field]?.id) return null;
                      return (
                        <Checkbox
                          size="small"
                          sx={{ padding: 0.5 }}
                          onChange={() =>
                            handleCheckboxChange(row[1][column.field])
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
