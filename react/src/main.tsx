import "@fontsource-variable/nunito-sans";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import App from "./App.tsx";
import "./index.css";
import theme from "./theme";

const client = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={client}>
      <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </QueryClientProvider>
  </React.StrictMode>
);