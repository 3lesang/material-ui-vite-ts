import { useMediaQuery, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid/DataGrid";
import AlignItemsList from "./AlignItemsList";

interface AppListProps {
  isLoading: boolean;
  rows: any[];
  columns: any[];
  mobileColumns: any[];
  onClick: (value: any) => void;
}

function AppList({
  isLoading,
  columns,
  mobileColumns,
  rows,
  onClick,
}: AppListProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (isMobile) {
    return (
      <AlignItemsList
        isLoading={isLoading}
        columns={mobileColumns}
        rows={rows}
        onItemClick={onClick}
      />
    );
  }

  return <DataGrid loading={isLoading} columns={columns} rows={rows} />;
}

export default AppList;
