import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import ServiceZones from "@/components/ServiceZones";
import ImageGallery from "@/components/ImageGallery";
import QuoteForm from "@/components/QuoteForm";
import Contact from "@/components/Contact";

const HomePage = () => {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <ImageGallery />
      <ServiceZones />
      <QuoteForm />
      <Contact />
    </>
  );
};

export default HomePage;
