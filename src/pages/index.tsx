import { GetServerSideProps } from 'next';
import { Features } from '../components/Features';
import { Hero } from '../components/Hero';
import { Pricing } from '../components/Pricing';
import { usePageQuery, PageDocument } from '../generated/graphql';
import { client, ssrCache } from '../lib/urql';

// Loading everything as client side
export default function Home() {
  const [{ data }] = usePageQuery({ variables: { slug: 'home' } });

  return (
    <>
      <Hero title={data.page.title} subtitle={data.page.subtitle} />
      <Features />
      <Pricing />
    </>
  )
}

// Makes everything loads as server side, caching data
export const getServerSideProps: GetServerSideProps = async () => {
  await client.query(PageDocument, { slug: 'home'}).toPromise()

  return {
    props: {
      urqlState: ssrCache.extractData()
    }
  }
}