import About from "./components/About";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Testimonials from "./components/Testimonials";

export default function Home() {
	return (
		<div className="mx-auto max-w-6xl px-4 md:px-6 lg:px-8 overflow-hidden">
			<Header />
			<Hero />
			<About />
			<Testimonials />
			<Footer />
		</div>
	);
}
