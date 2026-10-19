import Link from "next/link";
import { QuoteLink } from "@/components/QuoteLink";

export default function NotFound() {
  return (
    <section className="page-hero" style={{ minHeight: "70vh" }}>
      <div className="container">
        <p className="eyebrow">Error 404</p>
        <h1>That page isn&apos;t here.</h1>
        <p className="lede">It may have moved when we rebuilt the website. Try one of these instead.</p>
        <div className="row-actions" style={{ marginTop: "2rem" }}>
          <Link href="/" className="btn btn--dark">Back to Home</Link>
          <Link href="/gallery" className="btn btn--outline">View Gallery</Link>
          <QuoteLink location="404" />
        </div>
      </div>
    </section>
  );
}
