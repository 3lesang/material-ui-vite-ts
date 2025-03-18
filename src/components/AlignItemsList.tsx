import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { GridColDef } from "@mui/x-data-grid";

interface AlignItemsListProps {
  isLoading?: boolean;
  rows?: any[];
  columns: GridColDef[];
  onItemClick?: (row: any) => void;
}

const render = (i: number, columns: GridColDef[], row: any) => {
  return columns?.[i]?.renderCell
    ? columns?.[i]?.renderCell(row[columns?.[i]?.field])
    : row[columns[i]?.field];
};

export default function AlignItemsList({
  isLoading,
  rows,
  columns,
  onItemClick,
}: AlignItemsListProps) {
  const handleItemClick = (row: any) => {
    onItemClick?.(row);
  };
  return (
    <List dense>
      {rows?.map((row) => {
        return (
          <ListItemButton dense onClick={() => handleItemClick(row)}>
            {render(0, columns, row)}
            <ListItemText
              primary={render(1, columns, row)}
              slotProps={{
                primary: {
                  noWrap: true,
                },
                secondary: {
                  noWrap: true,
                },
              }}
              secondary={render(2, columns, row)}
            />
          </ListItemButton>
        );
      })}
    </List>
  );
}
