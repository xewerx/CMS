export interface Content {
  type: 'text' | 'image' | 'container' | 'list'
  id?: string
  value: string
  path?: string
  elements?: Content[]
}

export interface Website {
  id: string
  name: string
  available_languages: string[]
}

export interface WebsiteDetail {
  id: string
  name: string
  language: string
  content: Content[]
}

export interface UpdateWebsiteDto {
  name: string
  language: string
  content: Content[]
  redactors: string[]
}

export interface CreateWebsiteDto {
  name: string
  language: string
  content: Content[]
  redactors: string[]
}

export const SUPPORTED_LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'pl', name: 'Polish' },
  { code: 'de', name: 'German' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' },
] as const

export type LanguageCode = typeof SUPPORTED_LANGUAGES[number]['code']

