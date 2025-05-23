import { Collections } from '@/features';
import { MainLayout } from '@/layouts';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

export default function CollectionsPage() {
  return (
    <>
      <Head>
        <title>CollectionsPage - (AI.recycling.website)</title>
        <meta
          name="description"
          content="Meta description for the Assistant page"
        />
      </Head>
      <MainLayout>
        <Collections />
      </MainLayout>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(context.locale as string, ['common'])),
      // Will be passed to the page component as props
    },
  };
};
