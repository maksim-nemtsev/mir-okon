import { Mail, MapPin, Phone } from 'lucide-react';

import {
  PageHero,
  PageSection,
  PageShell,
} from '@/components/roto/PagePrimitives';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const contacts = [
  { label: '+7 (8652) 29‒29‒70', icon: Phone, href: 'tel:+78652292970' },
  { label: '+7 (8652) 29‒29‒80', icon: Phone, href: 'tel:+78652292980' },
  {
    label: 'mir-okon.com@yandex.ru',
    icon: Mail,
    href: 'mailto:mir-okon.com@yandex.ru',
  },
  {
    label: 'Ставрополь, улица Ленина, 31',
    icon: MapPin,
  },
] as const;

export default function ContactsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Контакты"
        title="Свяжитесь с Мир Окон"
        description="Позвоните или напишите нам, чтобы получить консультацию и технические материалы по фурнитуре Roto."
      />
      <PageSection>
        <Card className="mx-auto max-w-3xl rounded-3xl border-slate-200 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl">Контактная информация</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-5">
              {contacts.map(({ label, icon: Icon, ...item }) => {
                const content = (
                  <>
                    <Icon className="mt-1 h-5 w-5 shrink-0 text-[#0284c7]" />
                    {label}
                  </>
                );

                return 'href' in item && item.href ? (
                  <a
                    key={label}
                    href={item.href}
                    className="flex gap-3 text-sm leading-7 text-slate-700 transition hover:text-[#0284c7]"
                  >
                    {content}
                  </a>
                ) : (
                  <p
                    key={label}
                    className="flex gap-3 text-sm leading-7 text-slate-700"
                  >
                    {content}
                  </p>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </PageSection>
    </PageShell>
  );
}
