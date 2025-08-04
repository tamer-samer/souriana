import { Hero, About, Contact } from "@/components/home";
export default async function HomePage() {
  return (
    <div>
      <Hero />
      <About />
      <Contact />
    </div>
  );
}
