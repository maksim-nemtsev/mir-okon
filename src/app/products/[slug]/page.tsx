import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import {
  PageHero,
  PageSection,
  PageShell,
} from '@/components/roto/PagePrimitives';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getProductBySlug, products } from '@/config/roto-page';
import { cn } from '@/lib/utils';

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateStaticParams = () =>
  products.map((product) => ({
    slug: product.slug,
  }));

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="Продукция"
        title={product.title}
        description={product.description}
      />
      <PageSection>
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Card className="overflow-hidden rounded-3xl border-slate-200 bg-white">
            <div className="relative min-h-80 bg-slate-100">
              <Image
                src="/images/Screenshot_3.png"
                alt={product.title}
                fill
                className={cn('object-cover', product.imagePosition)}
                sizes="(min-width: 1024px) 42vw, 100vw"
                priority
              />
            </div>
          </Card>
          <div className="grid gap-6">
            <Card className="rounded-3xl border-slate-200 bg-white">
              <CardHeader>
                <CardTitle className="text-2xl text-[#0369a1]">
                  {product.detailTitle}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-8 text-slate-600">
                  {product.details}
                </p>
              </CardContent>
            </Card>
            <Card className="rounded-3xl border-slate-200 bg-slate-50">
              <CardHeader>
                <CardTitle className="text-xl">Ключевые преимущества</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-4">
                  {product.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-3 text-sm leading-7 text-slate-700"
                    >
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#0284c7]" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </PageSection>
    </PageShell>
  );
}
