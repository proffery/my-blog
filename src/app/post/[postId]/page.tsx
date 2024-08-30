import { Page } from '@/components/layouts/page/page'
import { TextEditor } from '@/components/ui/text-editor/text-editor'
import { Typography } from '@/components/ui/typography/typography'
import { createDatabaseClient } from '@/server/database-config'
import { allPosts } from '@/server/functions/database/posts/all-posts'
import { postById } from '@/server/functions/database/posts/post-by-id'

type Props = {
  params: {
    postId: string
  }
}

export const dynamicParams = true

export const generateStaticParams = async () => {
  const { databasesInstance } = await createDatabaseClient()
  const postsData = await allPosts({ databasesInstance })

  return postsData.documents?.map(post => ({
    postId: post.$id,
  })) as any[]
}

export default async function Post({ params: { postId } }: Props) {
  const { databasesInstance } = await createDatabaseClient()

  const postData = await postById({ databasesInstance, postId })

  return (
    <Page>
      <Typography.H1>{postData?.title}</Typography.H1>
      <TextEditor defaultContent={postData?.post} isEditable={false} />
    </Page>
  )
}
