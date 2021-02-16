import qs from 'querystring'

export interface VueQuery {
  vue?: boolean
  src?: boolean
  type?: 'script' | 'template' | 'style' | 'custom' | 'route'
  index?: number
  lang?: string
}

export function parseVueRequest(id: string) {
  const [filename, rawQuery] = id.split('?', 2)
  const query = qs.parse(rawQuery) as VueQuery
  const langPart = Object.keys(query).find(key => /lang\./i.test(key))
  if (query.vue != null)
    query.vue = true

  if (query.src != null)
    query.src = true

  if (query.index != null)
    query.index = Number(query.index)

  if (langPart) {
    const [, lang] = langPart.split('.')
    query.lang = lang
  }
  return {
    filename,
    query,
  }
}
