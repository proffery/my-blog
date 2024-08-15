import { Page } from '@/components/layouts/page/page'

type Props = {
  params: {
    postId: string
  }
}

export default function Post({ params: { postId } }: Props) {
  return <Page>Post {postId}</Page>
}
