import Hero from "../component/Hero";
import Categories from "../component/Cards/Categories";
import MobileApp from "../component/MobileApp";
import Contact from "../component/Contact";

export default function Home() {
  return (
    <div>
      <section id="home">
        <Hero />
      </section>

      <section id="menu" className="">
        <Categories />
      </section>

      <section id="mobile" className="">
        <MobileApp />
      </section>

      <section id="contact" className="">
        <Contact />
      </section>
    </div>
  );
}