import "@/styles/globals.css";
import Navbar from "../components/navbar";

import { ChoresContextProvider } from "@/context/ChoreContext";
import { AuthContextProvider } from "@/context/AuthContext";
import { FamilyContextProvider } from "@/context/FamilyContext";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter()
  const showMessage = router.pathname !== "/"
  return (
    <AuthContextProvider>
      <FamilyContextProvider>
        <ChoresContextProvider>
          <div> 
            {showMessage && <Navbar />}
            <Component {...pageProps} />
          </div>
        </ChoresContextProvider>
      </FamilyContextProvider>
    </AuthContextProvider>
  );
}
