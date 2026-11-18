import { useState } from "react";
import SiteHeader from "./components/SiteHeader.jsx";
import SiteFooter from "./components/SiteFooter.jsx";
import BackToTop from "./components/BackToTop.jsx";
import MyIpView from "./views/MyIpView.jsx";
import LookUpView from "./views/LookUpView.jsx";
import HistoryView from "./views/HistoryView.jsx";
import SubnetView from "./views/SubnetView.jsx";
import { addHistoryEntry, buildHistoryEntry } from "./utils/history.js";

// App
export default function App() {
  const [page, setPage] = useState("home");
  const [history, setHistory] = useState([]);

  // Page change
  function openPage(nextPage) {
    setPage(nextPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Save lookup
  function saveLookup(data) {
    setHistory((list) => addHistoryEntry(list, buildHistoryEntry(data, Date.now())));
  }

  return (
    <>
      <SiteHeader page={page} onNavigate={openPage} />
      <main className="page">
        {page === "home" && <MyIpView onLookup={saveLookup} />}
        {page === "lookup" && <LookUpView onLookup={saveLookup} />}
        {page === "subnet" && <SubnetView />}
        {page === "history" && <HistoryView history={history} onClear={() => setHistory([])} />}
      </main>
      <BackToTop />
      <SiteFooter />
    </>
  );
}
