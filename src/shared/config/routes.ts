import { RouteObject } from "react-router-dom";

export const rutes: RouteObject[] = [
  {
    path: "/",
    async lazy() {
      const { Layout } = await import("../../app/pages/layout/layout");
      return { Component: Layout };
    },
  },
];
