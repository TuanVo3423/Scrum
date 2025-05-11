import { SignIn } from '@/features';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';

export default function SignInPage() {
  return (
    <>
      <Head>
        <title>SignInPage - AI.recycling.website</title>
        <meta
          name="description"
          content="This is a sign-in page for the AI recycling website."
        />
      </Head>
      <SignIn />
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
