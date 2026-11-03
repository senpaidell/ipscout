import { useState } from "react";
import SiteHeader from "./components/SiteHeader.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import BackToTop from "./components/BackToTop.jsx";
import MyIpView from "./views/MyIpView.jsx";
import LookUpView from "./views/LookUpView.jsx";

// App
export default function App() {
  const [page, setPage] = useState("home");

  // Page change
  function openPage(nextPage) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <SiteHeader page={page} onNavigate={openPage} />
      <main className="page">
        {page === "home" ? <MyIpView /> : <LookUpView />}
      </main>
      <BackToTop />
      <SiteFooter />
    </>
  );
}
