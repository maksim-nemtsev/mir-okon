import { CalendarDays } from 'lucide-react';
import { notFound } from 'next/navigation';

import {
  PageHero,
  PageSection,
  PageShell,
} from '@/components/roto/PagePrimitives';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { articles, getArticleBySlug } from '@/config/roto-page';

type ArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const generateStaticParams = () =>
  articles.map((article) => ({
    slug: article.slug,
  }));

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <PageShell>
      <PageHero
        eyebrow="Полезная информация"
        title={article.title}
        description={article.summary}
      />
      <PageSection>
        <div className="mx-auto grid max-w-4xl gap-8">
          <Card className="overflow-hidden rounded-3xl border-slate-200 bg-white">
            <div className="flex min-h-64 items-end bg-[linear-gradient(135deg,#f8fafc_0%,#e2e8f0_55%,#e0f2fe_100%)] p-8">
              <Badge
                variant="outline"
                className="rounded-full bg-white px-4 py-2 uppercase tracking-[0.25em] text-[#0284c7] shadow-sm"
              >
                Мир Окон
              </Badge>
            </div>
            <CardContent className="p-8">
              <p className="flex items-center gap-2 text-sm text-slate-400">
                <CalendarDays className="h-4 w-4" />
                {article.date}
              </p>
              <div className="mt-6 grid gap-5">
                {article.content.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-8 text-slate-600"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </PageSection>
    </PageShell>
  );
}
