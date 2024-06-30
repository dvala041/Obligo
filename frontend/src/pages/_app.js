import "@/styles/globals.css";
import Navbar from "../components/navbar";

import { ChoresContextProvider } from "@/context/ChoreContext";
import { AuthContextProvider } from "@/context/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <ChoresContextProvider>
        <div> 
          <Navbar />
          <Component {...pageProps} />
        </div>
      </ChoresContextProvider>
    </AuthContextProvider>
  );
}
