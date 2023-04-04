import "@/styles/globals.css";
import { AuthContextProvider } from "./authContext";

export default function App({ Component, pageProps }) {
  return (
    <>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </>
  );
}
