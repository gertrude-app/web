import path from 'path';
import Markdoc from '@markdoc/markdoc';
import React from 'react';
import type { Metadata, NextPage } from 'next';
import PageBottomCTA from '@/components/PageBottomCTA';
import Prose from '@/components/articles/Prose';
import { createMetadata } from '@/lib/seo';
import { components } from '@/markdoc/config';
import { getArticle, getArticlePaths } from '@/markdoc/files';

type Params = {
  slug: string;
};

type PageProps = {
  params: Params;
};

export async function generateStaticParams(): Promise<Params[]> {
  const articlePaths = await getArticlePaths(`docs`);
  return articlePaths.map((postPath) => ({
    slug: path.basename(postPath, path.extname(postPath)),
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { title, description, image } = await getArticle(params.slug, `docs`);
  return createMetadata(
    `${title} | Gertrude Internet Filter and Parental Controls`,
    description,
    image,
  );
}

const DocumentationArticle: NextPage<PageProps> = async ({ params: { slug } }) => {
  const { title, content } = await getArticle(slug, `docs`);

  return (
    <div className="flex justify-center">
      <div className="lg:max-w-3xl pt-12 lg:pt-36 relative mx-6 xs:mx-8 pb-20">
        <h1 className="text-4xl font-bold mb-8 mt-2">{title}</h1>
        <Prose>{Markdoc.renderers.react(content, React, { components })}</Prose>
        <PageBottomCTA clickId="docs-cta" />
      </div>
    </div>
  );
};

export default DocumentationArticle;
