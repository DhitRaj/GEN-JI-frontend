import { Metadata } from 'next';
import ContactPageClient from './ContactPageClient';

export const metadata: Metadata = {
  title: 'Contact | Gen-Ji Digital Studio',
  description: 'Get in touch with Gen-Ji for your next digital project. Share your requirements and let us build the future together.',
};

export default function ContactPage() {
  return <ContactPageClient />;
}