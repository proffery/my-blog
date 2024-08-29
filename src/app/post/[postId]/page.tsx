import { GetPostParams } from '@/app/api/posts/post/[postId]/route'
import { endpoints } from '@/common/constants/endpoints'
import { Page } from '@/components/layouts/page/page'
import { TextEditor } from '@/components/ui/text-editor/text-editor'
import { Typography } from '@/components/ui/typography/typography'
import { createDatabaseClient } from '@/server/posts'
import { getData } from '@/server/utils/get-data'
import { GetPostResponse } from '@/services/posts/posts.types'

type Props = {
  params: {
    postId: string
  }
}

export const dynamicParams = true

export const generateStaticParams = async () => {
  const { databases } = await createDatabaseClient()
  const postsData = await databases.listDocuments(
    `${process.env.NEXT_PUBLIC_APPWRITE_DB}`,
    `${process.env.NEXT_PUBLIC_APPWRITE_POSTS}`
  )

  return postsData.documents?.map(post => ({
    postId: post.$id,
  })) as any[]
}

export default async function Post({ params: { postId } }: Props) {
  const postData = await getData<GetPostResponse, GetPostParams>(
    `${endpoints.posts_get_post + '/' + postId}`,
    { cache: 'no-store', method: 'GET' }
  )

  return (
    <Page>
      <Typography.H1>{postData?.title}</Typography.H1>
      <TextEditor defaultContent={postData?.post} isEditable={false} />
    </Page>
  )
}
