import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/client", "routes/users/index.tsx"),
  route("/client/:id/invoices", "routes/invoices/index.tsx"),
  route("/dashboard", "routes/dashboard/index.tsx"),
  route("/upload", "routes/upload/uploadScreen.tsx"),
] satisfies RouteConfig;
