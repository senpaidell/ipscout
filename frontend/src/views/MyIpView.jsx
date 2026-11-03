import { useIpRequest } from "../api/useIpRequest.js";
import IpResults from "../components/IpResults.jsx";
import IpResultsSkeleton from "../components/IpResultsSkeleton.jsx";

// Home page
export default function MyIpView() {
  const { data, error, isLoading, loadIp } = useIpRequest();
  const isIdle = !data && !isLoading;

  return (
    <>
      <section className={isIdle ? "hero hero-centered" : "hero"}>
        <h1 className="hero-title">{isIdle ? "Ready to know your IP?" : "Your public IP"}</h1>
        <p className="hero-subline">Public IP lookup for network technicians</p>
        {isIdle && <button className="action-pill" onClick={() => loadIp()}>Go</button>}
        {isIdle && error && <p className="error-message" role="alert">{error}</p>}
      </section>
      {isLoading && <IpResultsSkeleton />}
      {data && <IpResults data={data} onAgain={() => loadIp()} />}
    </>
  );
}
