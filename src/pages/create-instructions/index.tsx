import { CreateInstructions } from '@/features';
import { LayoutInstructions } from '@/layouts';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

export default function CreateInstructionsPage() {
  console.log(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
  return (
    <>
      <Head>
        <title>CreateInstructionsPage - AI.recycling.website</title>
        <meta
          name="description"
          content="Meta description for the Assistant page"
        />
      </Head>
      <LayoutInstructions page="Home">
        <CreateInstructions />
      </LayoutInstructions>
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
