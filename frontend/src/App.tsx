import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Services } from "@/components/Services";
import { BookingForm } from "@/components/BookingForm";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

function App() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <Hero />
      <Services />
      <BookingForm />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;