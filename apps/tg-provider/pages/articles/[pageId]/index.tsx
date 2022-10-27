import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import styles from './index.module.css';
import { getParsedFileContentBySlug, MarkdownRenderingResult, renderMarkdown } from '@nx-next-messengers/markdown'
import { join } from "path";

const POSTS_PATH = join(process.cwd(), '_articles');

interface ArticleProps extends ParsedUrlQuery {
  pageId: string;
}

export const getStaticPaths: GetStaticPaths<ArticleProps> = async () => {
  console.log('getStaticPaths');
  return {
    paths: [
      { "params": { "pageId": "dynamic-routing" } },
      { params: { pageId: "nextjs-update" } }
    ],
    fallback: false,
  };
  return {
    paths: [...Array(3).keys()].map((idx) => {
      return {
        params: {
          pageId: `page${idx}`,
        },
      };
    }),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<MarkdownRenderingResult> = async ({
  params,
}: {
  params: ArticleProps;
}) => {

  const  articleMarkdownContent = getParsedFileContentBySlug(params.pageId, POSTS_PATH);

  console.log('getStaticProps', articleMarkdownContent);

  const renderedHTML = await renderMarkdown(articleMarkdownContent.content);
  console.log('getStaticProps_renderedHTML',renderedHTML);


  return {
    props: {
      frontMatter: articleMarkdownContent.frontMatter,
      html: renderedHTML
    },
  };
};

export function Article({ frontMatter, html }: MarkdownRenderingResult) {
  console.log('props', { frontMatter, html });
  return (
    <div className="md:container md:mx-auto">
    <article>
      <h1 className="text-3xl font-bold hover:text-gray-700 pb-4">
        {frontMatter.title}
      </h1>
      <div>by {frontMatter.author['name']}</div>
      <hr />

      <main dangerouslySetInnerHTML={{ __html: html }} />
    </article>
  </div>
  );
}

export default Article;
