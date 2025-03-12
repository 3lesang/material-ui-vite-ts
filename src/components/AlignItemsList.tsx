import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import List from "@mui/material/List";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { GridColDef } from "@mui/x-data-grid";
import LightBox from "./ui/LightBox";

interface AlignItemsListProps {
  rows?: any[];
  columns: GridColDef[];
}

export default function AlignItemsList({ rows, columns }: AlignItemsListProps) {
  return (
    <List dense>
      {rows?.map((row) => (
        <LightBox name={row[columns[0].field]}>
          <ListItemButton dense>
            <ListItemAvatar>
              <ImageOutlinedIcon />
            </ListItemAvatar>
            <ListItemText
              primary={row[columns[0].field]}
              slotProps={{
                primary: {
                  noWrap: true,
                },
              }}
              secondary={
                columns?.[1].renderCell
                  ? columns?.[1]?.renderCell(row[columns?.[1]?.field])
                  : row[columns[1].field]
              }
            />
          </ListItemButton>
        </LightBox>
      ))}
    </List>
  );
}
