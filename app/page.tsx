import { Header } from '../src/components/Header';
import { About } from '../src/components/About';
import { NewsletterForm } from '../src/components/NewsletterForm';
import { Footer } from '../src/components/Footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <About />
        <NewsletterForm />
      </main>
      <Footer />
    </>
  );
}