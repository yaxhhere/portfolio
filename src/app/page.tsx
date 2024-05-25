import ContactMe from "@/components/contactMe";
import About from "../components/about";
import Details from "../components/details";
import Experience from "../components/experience";
import Navbar from "../components/navbar";
import Testimonials from "../components/testimonial";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between box-border bg-[#30333a] text-[#fff]">
      <Navbar />
      <About />
      <Details />
      <Experience />
      <Testimonials />
      <ContactMe />
    </main>
  );
}
