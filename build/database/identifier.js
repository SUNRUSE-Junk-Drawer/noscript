const characters = `_abcdefghijklmnopqrstuvwxyz0123456789`
let alphanumericLength = 0
while (Math.pow(characters.length, alphanumericLength + 1) < Math.pow(2, 32) - 1) {
  alphanumericLength++
}

const maxIdentifier = Math.pow(characters.length, alphanumericLength) - 1

export const toAlphanumeric = identifier => {
  if (identifier < 0) {
    throw new Error(`Identifier less than zero`)
  }

  if (identifier > maxIdentifier) {
    throw new Error(`Identifier limit of ${maxIdentifier} exceeded`)
  }

  let alphanumeric = ``
  while (identifier) {
    const remainder = identifier % characters.length
    alphanumeric = characters[remainder] + alphanumeric
    identifier -= remainder
    identifier /= characters.length
  }

  return alphanumeric.padStart(alphanumericLength, characters[0])
}

export const fromAlphanumeric = alphanumeric => {
  if (alphanumeric.length > alphanumericLength) {
    throw new Error(`Length limit of ${alphanumericLength} characters exceeded`)
  }

  let identifier = 0

  for (const character of alphanumeric) {
    const index = characters.indexOf(character.toLowerCase())
    if (index == -1) {
      throw new Error(`Unsupported character "${character}" (only a-z, 0-9 and _ are supported in identifiers)`)
    }

    identifier *= characters.length
    identifier += index
  }

  return identifier
}
