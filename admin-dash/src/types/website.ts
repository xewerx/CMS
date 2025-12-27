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
}

export interface WebsiteDetail {
  id: string
  name: string
  content: Content[]
}

export interface UpdateWebsiteDto {
  name: string
  content: Content[]
  redactors: string[]
}

