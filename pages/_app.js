import "@/styles/globals.css";
import { AuthContextProvider } from "../components/AuthContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  );
}
