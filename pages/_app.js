import "@/globals.scss";
import { BioRhyme, Kanit } from "next/font/google";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { createContext, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
config.autoAddCss = false;

// google fonts
const bioRhyme = BioRhyme({
  weight: ["200", "400", "700", "800"],
  subsets: ["latin"],
  style: ["normal"],
  variable: "--font-bioRhyme",
});
const kanit = Kanit({
  weight: ["700", "600", "400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-kanit"
})

// context
export const GlobalContext = createContext();

export default function App({ Component, pageProps }) {
  const [formData, setFormData] = useState();

  const router = useRouter();

  return (
    <div
      className={`h-full w-full overflow-hidden ${bioRhyme.variable} ${kanit.variable} text-neutral-100`}
    >
      <GlobalContext.Provider value={{ formData, setFormData }}>
        {/* conditional for shared layout for app & not for landing page */}
        {router.pathname !== "/" ? (
          <Layout>
            <Component {...pageProps} />
          </Layout>
        ) : (
          <Component {...pageProps} />
        )}
      </GlobalContext.Provider>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}
