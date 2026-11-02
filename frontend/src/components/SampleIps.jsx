const SAMPLE_IPS = [
  { name: "Google", ip: "8.8.8.8" },
  { name: "Cloudflare", ip: "1.1.1.1" },
  { name: "Quad9", ip: "9.9.9.9" },
  { name: "OpenDNS", ip: "208.67.222.222" },
  { name: "Google", ip: "2001:4860:4860::8888" },
  { name: "Cloudflare", ip: "2606:4700:4700::1111" },
];

// Show public IPs that can be looked up with one click
export default function SampleIps({ isDisabled, onPick }) {
  return (
    <div className="sample-ips">
      {SAMPLE_IPS.map((sample) => (
        <button key={sample.ip} className="sample-ip" disabled={isDisabled} onClick={() => onPick(sample.ip)}>
          <span className="sample-ip-name">{sample.name}</span> {sample.ip}
        </button>
      ))}
    </div>
  );
}
