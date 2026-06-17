import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

import {
  PageHero,
  PageSection,
  PageShell,
} from '@/components/furniture/PagePrimitives';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { products } from '@/config/furniture-page';

export default function ProductsPage() {
  return (
    <PageShell>
      <PageHero
        eyebrow="Продукция"
        title="Фурнитура для алюминиевых систем"
        description="Каталог ключевых решений для оконных, дверных, раздвижных и складных светопрозрачных конструкций."
        withImage
      />
      <PageSection>
        <div className="grid gap-6 lg:grid-cols-4">
          {products.map((product) => (
            <Card
              key={product.title}
              className="flex h-full flex-col rounded-3xl border-slate-200 bg-white"
            >
              <CardHeader>
                <CardTitle className="text-xl">{product.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <p className="text-sm leading-7 text-slate-600">
                  {product.description}
                </p>
              </CardContent>
              <CardFooter>
                <Button asChild variant="sky" className="w-full gap-2">
                  <Link href={`/products/${product.slug}`}>
                    Узнать больше
                    <ArrowRight className="relative top-px h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </PageSection>
    </PageShell>
  );
}
