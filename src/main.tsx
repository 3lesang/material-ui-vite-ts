import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import theme from "./theme";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { notify } from "./components/ui/Toast";
import { AppProvider } from "./context/app";
import { routeTree } from "./routeTree.gen";

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error) => {
      notify(error.message, { variant: "error" });
    },
  }),
});

const router = createRouter({ routeTree, context: { queryClient } });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          <AppProvider>
            <RouterProvider router={router} />
          </AppProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ThemeProvider>
    </StrictMode>
  );
}
