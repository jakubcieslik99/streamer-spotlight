export const saveStreamerErrors = {
  streamerName: {
    required: { value: true, message: 'Name is required.' },
    maxLength: { value: 40, message: 'Maximum name length is 40.' },
  },
  streamerDescription: {
    required: { value: true, message: 'Description is required.' },
    maxLength: { value: 200, message: 'Maximum description length is 200.' },
  },
  streamerImage: {
    required: { value: true, message: 'Image link is required.' },
    pattern: {
      value: /(https:\/\/)([^\s(["<,>/]*)(\/)[^\s[",><]*(.png|.jpg|.jpeg|.webp|-no-rj)(\?[^\s[",><]*)?/,
      message: 'Invalid image link format.',
    },
  },
}
