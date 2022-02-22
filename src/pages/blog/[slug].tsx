import { GetStaticPaths, GetStaticProps } from "next";
import { PostDocument } from "../../generated/graphql"
import { client, ssrCache } from "../../lib/urql"

export default function Post() {
  return (
    <h1>Post</h1>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  await client.query(PostDocument, { slug: params.slug }).toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData()
    }
  }
}