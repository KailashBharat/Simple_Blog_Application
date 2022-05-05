import { Express } from "express";

import blogRoutes from "./blog";

const appRoutes = [blogRoutes];

export default function useRoutes(app: Express) {
  appRoutes.forEach((route) => {
    app.use(route);
  });
}
