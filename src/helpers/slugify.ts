
import slugify from 'slugify'

export default function slug(url: string) {
  return slugify(url, {
    replacement: '-',
    lower: true,
    strict: true,
    trim: true  
  })
}