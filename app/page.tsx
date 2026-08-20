import { Header } from '../src/components/Header';
import { About } from '../src/components/About';
import { NewsletterForm } from '../src/components/NewsletterForm';
import { WhatsAppCommunity } from '../src/components/WhatsAppCommunity';
import { Footer } from '../src/components/Footer';
import { Marquee } from '../src/components/Marquee';

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Marquee
          items={[
            'Leadership development',
            'Career transformation',
            'Keynotes & workshops',
            'Software → leadership',
            'Proven strategies',
          ]}
        />
        <About />
        <NewsletterForm />
        <WhatsAppCommunity />
      </main>
      <Footer />
    </>
  );
}
