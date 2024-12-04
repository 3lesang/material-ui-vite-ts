import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/product/$id")({
  component: RouteComponent,
});

function RouteComponent() {
  return <p>id</p>;
}
