import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from "@tanstack/react-router";
import React from "react";

export interface AppListItemProps {
  title: string;
  to?: string;
  type?: "group";
  icon?: React.ReactNode;
}

interface AppListProps {
  items: AppListItemProps[];
}

interface ListItemProps extends AppListItemProps {
  selected: boolean;
}

function AppList({ items }: AppListProps) {
  const location = useLocation();

  const formatItems = (items: AppListItemProps[]) => {
    return items.map((item) => {
      return {
        ...item,
        selected: location.pathname.includes(item.to as string),
      };
    });
  };

  const itemsList = formatItems(items);

  const renderItems = () => {
    if (!itemsList.length) return null;
    return itemsList.map((item: ListItemProps, index) => {
      if (item.type === "group") {
        return (
          <ListItem key={index} disablePadding>
            <ListItemText primary={item.title} />
          </ListItem>
        );
      }
      return (
        <ListItem key={index} disablePadding>
          <ListItemButton
            component={Link}
            to={item.to}
            selected={item.selected}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>
            <ListItemText>{item.title}</ListItemText>
          </ListItemButton>
        </ListItem>
      );
    });
  };
  return (
    <List dense disablePadding>
      {renderItems()}
    </List>
  );
}

export default AppList;
