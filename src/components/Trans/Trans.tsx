import { FC, Fragment } from 'react'

const tagsRegex = /(<\d+>[^<>]*<\/\d+>)/
const openCloseTagRegex = /<(\d+)>([^<>]*)<\/(\d+)>/

type TransType = {
  tags?: Record<string, (str: string) => JSX.Element>
  text: string
}

export const Trans: FC<TransType> = props => {
  return <>{interpolateTags(props)}</>
}

const interpolateTags = (data: TransType) => {
  const { tags, text } = data

  if (!tags) {
    return text
  }

  const tokens = text.split(tagsRegex)

  return tokens.map(token => {
    const matchResult = openCloseTagRegex.exec(token)

    if (!matchResult) {
      return token
    }

    const [, openTag, content, closeTag] = matchResult

    if (!openTag || !closeTag || openTag !== closeTag) {
      return token
    }

    return <Fragment key={content}>{tags[openTag]?.(content ?? '')}</Fragment>
  })
}

// NEXT_PUBLIC_BASE_API_URL=https://navaibe.ru/api
// NEXT_PUBLIC_RECAPTCHA_PUBLIC_KEY=6LcEBTQqAAAAALUUjdW183G9rABcyfnYqqa7pMkr
// NEXT_PUBLIC_GOOGLE_AUTH_URL=https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=https%3A%2F%2Fnavaibe.ru%2Fapi%2Fv1%2Fauth%2Fgoogle%2Fredirect&scope=profile%20email&client_id=145106821045-oud30j9s8m88l6icdc536vqhoc3k7un7.apps.googleusercontent.com
// NEXT_PUBLIC_GITHUB_AUTH_URL=https://github.com/login/oauth/authorize?response_type=code&redirect_uri=http%3A%2F%2Fnavaibe.ru%2Fapi%2Fv1%2Fauth%2Fgithub%2Fcallback&scope=user%3Aemail&client_id=Ov23liPXUAuNE4Qn65BU
