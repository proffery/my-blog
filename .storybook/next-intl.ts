import en from '../messages/en.json'
import ru from '../messages/ru.json'

const messagesByLocale: Record<string, any> = { en, ru }

const nextIntl = {
  defaultLocale: 'en',
  messagesByLocale,
}

export default nextIntl
