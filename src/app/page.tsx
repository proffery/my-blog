import { Page } from '@/components/layouts/page/page'
import { Input } from '@/components/ui/input/input'

export default function Home() {
  return (
    <Page>
      Hello, World!
      <Input cols={2} label={'234'} rows={4} />
      <Input as={'textarea'} cols={2} label={'234'} resize={false} rows={14} />
    </Page>
  )
}
