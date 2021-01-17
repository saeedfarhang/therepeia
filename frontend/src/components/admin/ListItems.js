import React from "react";
import { ListItem as MuiListItem } from "@material-ui/core";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import DashboardIcon from "@material-ui/icons/Dashboard";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import PeopleIcon from "@material-ui/icons/People";
import BarChartIcon from "@material-ui/icons/BarChart";
import LayersIcon from "@material-ui/icons/Layers";
import AssignmentIcon from "@material-ui/icons/Assignment";

function ListItem(props) {
  return <MuiListItem button component="a" {...props} />;
}

export const mainListItems = (
  <div>
    <ListItem href="/admin">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="داشبورد" />
    </ListItem>
    <ListItem href="/admin/products">
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="محصولات" />
    </ListItem>
    <ListItem href="/admin/customers">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="مشتریان" />
    </ListItem>
    <ListItem href="/admin/reports">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="گزارش ها" />
    </ListItem>
    <ListItem button href="/admin/tickets">
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="تیکت ها" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>گزارشات کلی</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="ماه جاری" />
    </ListItem>
  </div>
);
