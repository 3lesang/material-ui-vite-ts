import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link, useLocation } from "@tanstack/react-router";
import React from "react";

export interface CustomListItemProps {
  title: string;
  href?: string;
  type?: "group";
  icon?: React.ReactNode;
}

interface CustomListProps {
  items: CustomListItemProps[];
}

interface ListItemProps extends CustomListItemProps {
  selected: boolean;
}

function CustomList({ items }: CustomListProps) {
  const location = useLocation();

  const formatItems = (items: CustomListItemProps[]) => {
    return items.map((item) => {
      return {
        ...item,
        selected: location.pathname.includes(item.href as string),
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
            <ListItemText
              primary={item.title}
              slotProps={{
                primary: {
                  fontWeight: 500,
                  fontSize: 12,
                  color: "textSecondary",
                  pl: 1,
                },
              }}
            />
          </ListItem>
        );
      }
      return (
        <ListItem key={index} disablePadding>
          <ListItemButton
            component={Link}
            to={item.href}
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

export default CustomList;
