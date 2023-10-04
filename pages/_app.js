import "../globals.css";
import { BioRhyme, Kanit, VT323 } from "next/font/google";
import { useRouter } from "next/router";
import Layout from "@/components/Layout";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PagesProgressBar as ProgressBar } from "next-nprogress-bar";

// google fonts
const bioRhyme = BioRhyme({
  weight: ["200", "400", "700", "800"],
  subsets: ["latin"],
  style: ["normal"],
  variable: "--font-bioRhyme",
});
const kanit = Kanit({
  weight: ["700", "600", "500", "400", "300"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-kanit",
});

const vt323 = VT323({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  variable: "--font-vt323",
});

export default function App({ Component, pageProps }) {

  const router = useRouter();

  return (
    <div
      className={`h-full w-full overflow-hidden ${bioRhyme.variable} ${kanit.variable} ${vt323.variable} text-neutral-200 bg-primaryBgAlt`}
    >
      {/* conditional for shared layout for app & not for landing page */}
      {router.pathname !== "/" ? (
        <Layout>
          <Component {...pageProps} />
        </Layout>
      ) : (
        <Component {...pageProps} />
      )}

      <ToastContainer
        position="bottom-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <ProgressBar height="0.4rem" shallowRouting={true} color="#fa586a" />
    </div>
  );
}
