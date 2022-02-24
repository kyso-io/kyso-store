import slugify from 'slugify';

export default function slug(url: string) {
  if (!url) {
    return '';
  }
  return slugify(url, {
    replacement: '-',
    lower: true,
    strict: true,
    trim: true,
  });
}
