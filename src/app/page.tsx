import { Navbar } from "@/components";
import Hero from "./hero";
export default function Portfolio() {
  return (
    <>
      <div style={{ backgroundColor: "#FFF" }}>
        <div className="mb-24">
          <Navbar />
        </div>

        <Hero />
      </div>
    </>
  );
}
