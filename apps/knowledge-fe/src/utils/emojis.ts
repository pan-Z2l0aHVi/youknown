import type { EmojiItem } from '@tiptap-pro/extension-emoji'
const { emojis } = await import('@tiptap-pro/extension-emoji')

export const defaultEmojis: EmojiItem[] = emojis

const CUSTOM_EMOJI_GROUP = 'customEmojis'
const CUSTOM_EMOJI_PREFIX = 'custom'

function createCustomEmoji(name: string, fallbackImage: string): EmojiItem {
  return {
    name: `${CUSTOM_EMOJI_PREFIX}_${name}`,
    shortcodes: [`${CUSTOM_EMOJI_PREFIX}_${name}`],
    tags: [name],
    group: CUSTOM_EMOJI_GROUP,
    fallbackImage
  }
}

const c = createCustomEmoji

export const customEmojis: EmojiItem[] = [
  c('pepe-sus', 'https://cdn.youknown.cc/pepe-emojigg-pack%2F5069-pepe-sus.png'),
  c('exhaustedpepe', 'https://cdn.youknown.cc/pepe-emojigg-pack%2F5189-exhaustedpepe.png'),
  c('EzPepe', 'https://cdn.youknown.cc/pepe-emojigg-pack%2F5492_EzPepe.png'),
  c('PepeLaugh', 'https://cdn.youknown.cc/pepe-emojigg-pack%2F6158_PepeLaugh.png'),
  c('facepalm', 'https://cdn.youknown.cc/pepe-emojigg-pack%2F7135-facepalm.png'),
  c('pepe-hmmm', 'https://cdn.youknown.cc/pepe-emojigg-pack%2F7346-pepe-hmmm.png'),
  c('FeelsBanMan', 'https://cdn.youknown.cc/pepe-emojigg-pack%2FFeelsBanMan.png'),
  c('PepeHands', 'https://cdn.youknown.cc/pepe-emojigg-pack%2FPepeHands.png'),
  c('PepeHappy', 'https://cdn.youknown.cc/pepe-emojigg-pack%2FPepeHappy.png'),
  c('PepeKMS', 'https://cdn.youknown.cc/pepe-emojigg-pack%2FPepeKMS.png'),
  c('WokePepe', 'https://cdn.youknown.cc/pepe-emojigg-pack%2FWokePepe.png'),
  c('monkaHmm', 'https://cdn.youknown.cc/pepe-emojigg-pack%2FmonkaHmm.png'),
  c('monkaS', 'https://cdn.youknown.cc/pepe-emojigg-pack%2FmonkaS.png'),
  c('pepeOK', 'https://cdn.youknown.cc/pepe-emojigg-pack%2FpepeOK.png')
]
