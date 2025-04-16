import {
  isRouteErrorResponse,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useNavigate,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Icon } from "@mui/material";
import * as React from "react";
import MenuIcon from "@mui/icons-material/Menu";

const routes = [
  { name: "dashboard", router: "/dashboard", icon: "analytics" },
  { name: "clientes", router: "/client", icon: "groups" },
  ,
  { name: "Enviar fatura", router: "/upload", icon: "upload_file" },
];

export function Layout({ children }: { children: React.ReactNode }) {
  let navigate = useNavigate();
  const [open, setOpen] = React.useState(true);
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />

        <Meta />
      </head>
      <body style={{ margin: 0 }}>
        <Box sx={{ flexGrow: 1, padding: 0, margin: 0 }}>
          <AppBar position="fixed" style={{ backgroundColor: "#02231c" }}>
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
                onClick={() => setOpen(!open)}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                💡
              </Typography>
            </Toolbar>
          </AppBar>

          <Drawer
            open={open}
            variant="temporary"
            anchor="left"
            onClose={() => setOpen(false)}
          >
            <List>
              {routes.map((r) => (
                <ListItem key={r?.name}>
                  <ListItemButton
                    onClick={() => navigate(r.router)}
                    key={r.name}
                  >
                    <ListItemIcon>
                      <Icon sx={{ color: "#02231c" }}>{r?.icon}</Icon>
                    </ListItemIcon>
                    <ListItemText primary={r.name}></ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Drawer>
          <div style={{ flex: 1, marginTop: 80 }}>{children}</div>
        </Box>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
