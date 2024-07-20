import "@/styles/globals.css";
import Navbar from "../components/navbar";

import { ChoresContextProvider } from "@/context/ChoreContext";
import { AuthContextProvider } from "@/context/AuthContext";
import { FamilyContextProvider } from "@/context/FamilyContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <FamilyContextProvider>
        <ChoresContextProvider>
          <div> 
            <Navbar />
            <Component {...pageProps} />
          </div>
        </ChoresContextProvider>
      </FamilyContextProvider>
    </AuthContextProvider>
  );
}
