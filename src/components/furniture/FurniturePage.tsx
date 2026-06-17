'use client';

import { motion } from 'framer-motion';
import {
  ArrowRight,
  ChevronUp,
  Mail,
  Menu,
  Phone,
  Send,
  X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import {
  articles,
  contactItems,
  footerColumns,
  mainCategories,
  navItems,
  getProductsByCategory,
  furnitureFeatures,
  utilityLinks,
  type ArticleCard,
  type MainCategory,
  type ProductCard,
} from '@/config/furniture-page';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';

const sectionMotion = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.45 },
};

const Container = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn('mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8', className)}
  >
    {children}
  </div>
);

const BrandLogo = () => (
  <Link
    href="/"
    className="inline-flex flex-col leading-none"
    aria-label="Мир Окон"
  >
    <span className="flex items-end gap-2">
      <span className="text-3xl font-black tracking-[-0.08em] text-slate-950 sm:text-4xl">
        Мир Окон
      </span>
    </span>
  </Link>
);

const UtilityBar = () => (
  <div className="hidden bg-[#0284c7] text-white lg:block">
    <Container className="flex min-h-10 items-center justify-between gap-6 text-xs">
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {utilityLinks.map(({ label, icon: Icon }) => (
          <span
            key={label}
            className="inline-flex items-center gap-2 whitespace-nowrap"
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </span>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <span className="whitespace-nowrap">Частным клиентам</span>
        <span className="flex items-center gap-2 text-[11px] font-semibold">
          <span>TG</span>
          <span>VK</span>
        </span>
      </div>
    </Container>
  </div>
);

const SiteHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur">
      <UtilityBar />
      <Container className="flex min-h-20 items-center justify-between gap-6 py-4">
        <BrandLogo />
        <div className="hidden items-center gap-8 lg:flex">
          <a
            href="tel:+78002003802"
            className="inline-flex items-center gap-2 text-base font-semibold text-[#0284c7]"
          >
            <Phone className="h-4 w-4" />
            +7 (8652) 29‒29‒70
          </a>
          <a
            href="tel:+74959874535"
            className="inline-flex items-center gap-2 text-base font-semibold text-[#0284c7]"
          >
            <Phone className="h-4 w-4" />
            +7 (8652) 29‒29‒80
          </a>
        </div>
        <Button
          type="button"
          variant="outline"
          size="icon"
          className="lg:hidden"
          onClick={() => setIsOpen((value) => !value)}
          aria-label="Открыть меню"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </Container>
      <nav className="hidden border-t border-slate-100 bg-white lg:block">
        <Container className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-7">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className={cn(
                  'py-4 text-xs font-semibold uppercase tracking-wide text-slate-700 transition hover:text-[#0284c7]',
                  item.label === 'Продукция' &&
                    'border-b-2 border-[#0284c7] text-[#0284c7]'
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </Container>
      </nav>
      {isOpen && (
        <div className="border-t border-slate-100 bg-white px-4 pb-5 lg:hidden">
          <div className="grid gap-3">
            {navItems.map((item) => (
              <Link
                href={item.href}
                key={item.label}
                className="rounded-lg px-2 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

const HeroSection = () => (
  <section className="relative overflow-hidden bg-[#eef7fd]">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(255,255,255,0.75),transparent_38%),radial-gradient(circle_at_22%_72%,rgba(125,211,252,0.35),transparent_42%),linear-gradient(165deg,#f8fcff_0%,#e8f4fc_38%,#d9eeff_72%,#cfe8fb_100%)]" />
    <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.35)_0_1px,transparent_1px_90px)]" />
    <div className="absolute inset-y-0 right-0 hidden w-[45%] bg-[#f5fbff] [clip-path:polygon(18%_0,100%_0,100%_100%,0_100%)] lg:block" />
    <Container className="relative grid min-h-[480px] items-center gap-10 py-16 lg:grid-cols-[1fr_0.75fr]">
      <motion.div
        className="max-w-3xl text-sky-950"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <h1 className="text-4xl font-bold tracking-tight text-sky-950 sm:text-5xl lg:text-6xl">
          В ассортименте
        </h1>
        <ul className="mt-8 max-w-2xl space-y-4">
          {mainCategories.map(({ category, brands, slug }) => (
            <li key={slug} className="text-base leading-7 sm:text-lg">
              <a href={`#${slug}`} className="transition hover:text-[#0284c7]">
                <span className="font-semibold text-sky-950">{category}</span>
                <span className="text-slate-700"> — {brands}</span>
              </a>
            </li>
          ))}
        </ul>
      </motion.div>
      <motion.div
        className="relative min-h-72 overflow-hidden rounded-3xl bg-white shadow-[0_20px_50px_-12px_rgba(56,189,248,0.28)] ring-1 ring-sky-100"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, delay: 0.1 }}
      >
        <Image
          src="/images/main-big.png"
          alt="Продукция Мир Окон"
          fill
          className="object-cover object-[78%_52%]"
          sizes="(min-width: 1024px) 520px, 100vw"
        />
      </motion.div>
    </Container>
  </section>
);

const CategoryBlock = ({
  category,
  reversed = false,
  children,
}: {
  category: MainCategory;
  reversed?: boolean;
  children?: React.ReactNode;
}) => (
  <motion.section
    id={category.slug}
    className={cn('py-16', reversed ? 'bg-slate-50' : 'bg-white')}
    {...sectionMotion}
  >
    <Container>
      <div
        className={cn(
          'grid items-center gap-10 lg:grid-cols-2',
          reversed && 'lg:[&>*:first-child]:order-2'
        )}
      >
        <div className="relative min-h-72 overflow-hidden rounded-3xl border border-slate-200 bg-slate-100 shadow-sm lg:min-h-96">
          <Image
            src={category.image}
            alt={category.category}
            fill
            className={cn('object-cover', category.imagePosition)}
            sizes="(min-width: 1024px) 50vw, 100vw"
          />
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-slate-800">
            {category.brands}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl">
            {category.category}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600">
            {category.description}
          </p>
          {category.slug === 'furniture' ? (
            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              {furnitureFeatures.map(({ label, icon: Icon }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 text-[#0284c7]"
                >
                  <span className="rounded-full bg-sky-50 p-2">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span className="text-sm font-semibold">{label}</span>
                </div>
              ))}
            </div>
          ) : (
            <ul className="mt-6 grid gap-2">
              {category.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="flex items-start gap-2 text-sm leading-7 text-slate-600"
                >
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#0284c7]" />
                  {highlight}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {children}
    </Container>
  </motion.section>
);

const CategoryBlocksSection = () => (
  <>
    {mainCategories.map((category, index) => {
      const categoryProducts = getProductsByCategory(category.slug);

      return (
        <CategoryBlock
          key={category.slug}
          category={category}
          reversed={index % 2 === 1}
        >
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {categoryProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </CategoryBlock>
      );
    })}
  </>
);

const ProductCard = ({ product }: { product: ProductCard }) => (
  <Card className="flex h-full flex-col rounded-3xl border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:shadow-xl">
    <div className="relative min-h-44 overflow-hidden rounded-2xl bg-slate-100">
      <Image
        src={product.image}
        alt={product.title}
        fill
        className={cn('object-cover', product.imagePosition)}
        sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
      />
    </div>
    <CardHeader className="px-0 pb-0 pt-6 text-center">
      <CardTitle className="text-lg text-slate-950">{product.title}</CardTitle>
    </CardHeader>
    <CardContent className="flex-1 px-0 pb-0 pt-5">
      <div className="grid gap-3">
        <Button asChild variant="sky">
          <Link href={`/products/${product.slug}`}>Узнать больше</Link>
        </Button>
      </div>
      <p className="mt-5 text-center text-sm leading-6 text-slate-600">
        {product.description}
      </p>
    </CardContent>
  </Card>
);

const ArticleCard = ({ article }: { article: ArticleCard }) => (
  <Card className="flex h-full flex-col overflow-hidden rounded-3xl border-slate-200 bg-white">
    <div className="flex min-h-56 items-end bg-[linear-gradient(135deg,#f8fafc_0%,#e2e8f0_55%,#e0f2fe_100%)] p-6">
      <Badge
        variant="outline"
        className="rounded-full bg-white px-4 py-2 uppercase tracking-[0.25em] text-[#0284c7] shadow-sm"
      >
        Мир Окон
      </Badge>
    </div>
    <CardHeader className="flex-1">
      <CardTitle className="text-lg leading-7 text-[#0369a1]">
        {article.title}
      </CardTitle>
      <p className="mt-4 text-sm text-slate-400">{article.date}</p>
    </CardHeader>
    <CardFooter>
      <Button asChild variant="sky" className="gap-2">
        <Link href={`/articles/${article.slug}`}>
          Узнать больше
          <ArrowRight className="relative top-px h-4 w-4" />
        </Link>
      </Button>
    </CardFooter>
  </Card>
);

const ArticlesSection = () => (
  <motion.section className="bg-white py-16" {...sectionMotion}>
    <Container>
      <h2 className="text-3xl font-semibold text-[#0369a1]">
        Полезная информация
      </h2>
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {articles.map((article) => (
          <ArticleCard key={article.title} article={article} />
        ))}
      </div>
    </Container>
  </motion.section>
);

const SiteFooter = () => (
  <footer id="contacts" className="bg-[#2c2c2c] text-white">
    <Container className="grid gap-10 py-14 lg:grid-cols-[1fr_1fr_1.2fr]">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-1">
        {footerColumns.slice(0, 2).map((column) => (
          <FooterList
            key={column.title}
            title={column.title}
            items={column.items}
          />
        ))}
      </div>
      <FooterList
        title={footerColumns[2].title}
        items={footerColumns[2].items}
      />
      <div>
        <FooterHeading>Контакты</FooterHeading>
        <div className="mt-6 grid gap-4">
          {contactItems.map(({ label, icon: Icon }) => (
            <p
              key={label}
              className="flex items-start gap-3 text-sm leading-6 text-white/75"
            >
              <Icon className="mt-1 h-4 w-4 shrink-0 text-white" />
              {label}
            </p>
          ))}
        </div>
        <div className="mt-8">
          <Button asChild variant="brand" className="min-h-11 w-fit">
            <Link href="/contacts">Связаться с нами</Link>
          </Button>
        </div>
        <p className="mt-8 max-w-sm text-sm leading-6 text-white/70">
          Напишите или позвоните нам, чтобы получить технические каталоги и
          консультацию по подбору фурнитуры.
        </p>
        <Send className="mt-4 h-6 w-6" />
      </div>
    </Container>
    <div className="border-t border-white/10 py-5">
      <Container className="flex flex-col items-center justify-between gap-4 text-center text-xs text-white/60 sm:flex-row">
        <p>
          © 2017-2026 МИР ОКОН | Карта сайта | Политика обработки персональных
          данных
        </p>
        <Link
          href="#"
          className="inline-flex rounded-md bg-white/10 p-3 text-white transition hover:bg-white/20"
          aria-label="Наверх"
        >
          <ChevronUp className="h-4 w-4" />
        </Link>
      </Container>
    </div>
  </footer>
);

const FooterHeading = ({ children }: { children: React.ReactNode }) => (
  <div>
    <h3 className="text-base font-bold">{children}</h3>
    <div className="mt-3 h-0.5 w-24 bg-sky-400" />
  </div>
);

const FooterList = ({ title, items }: { title: string; items: string[] }) => (
  <div>
    <FooterHeading>{title}</FooterHeading>
    <ul className="mt-6 grid gap-3 text-sm text-white/75">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

export const FurniturePage = () => (
  <div className="min-h-screen bg-white text-slate-950">
    <SiteHeader />
    <div aria-hidden="true" className="h-28 lg:h-[12.5rem]" />
    <main>
      <HeroSection />
      <CategoryBlocksSection />
      <ArticlesSection />
    </main>
    <SiteFooter />
  </div>
);
