import type { PageSlug } from '@/lib/contentBlockTypes'
import type {
  AdminPanelField,
  AdminPanelFieldGroup,
  AdminPanelImageField,
  AdminPanelTextField,
} from '@/lib/adminPanelConfig'

export type CmsImageFieldDef = {
  imageBlockKey: string
  altBlockKey: string
  label: string
}

function fieldLabel(blockKey: string): string {
  return blockKey
    .split('.')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).replace(/_/g, ' '))
    .join(' ')
}

const textField = (
  slug: PageSlug,
  blockKey: string,
  label: string,
  opts?: { multiline?: boolean },
): AdminPanelTextField => ({
  kind: 'text',
  pageSlug: slug,
  blockKey,
  label,
  ...opts,
})

function isMultilineKey(blockKey: string): boolean {
  return /body|description|answer|paragraph|subtitle|note|message|urls|benefit|bullet|content|policies|text/i.test(
    blockKey,
  )
}

export function fieldGroupsFromDefaults(
  pageSlug: PageSlug,
  defaults: Record<string, string>,
  imageFields: CmsImageFieldDef[] = [],
): AdminPanelFieldGroup[] {
  const imageKeys = new Set(
    imageFields.flatMap((f) => [f.imageBlockKey, f.altBlockKey]),
  )
  const byGroup = new Map<string, AdminPanelTextField[]>()

  for (const blockKey of Object.keys(defaults).sort()) {
    if (imageKeys.has(blockKey)) continue
    if (blockKey.endsWith('.alt')) continue
    if (blockKey.startsWith('seo.')) continue
    const groupId = blockKey.includes('.') ? blockKey.split('.')[0]! : 'content'
    if (!byGroup.has(groupId)) byGroup.set(groupId, [])
    byGroup.get(groupId)!.push(
      textField(pageSlug, blockKey, fieldLabel(blockKey), {
        multiline: isMultilineKey(blockKey),
      }),
    )
  }

  const groups: AdminPanelFieldGroup[] = []

  if (imageFields.length > 0) {
    const fields: AdminPanelField[] = imageFields.map(
      (f): AdminPanelImageField => ({
        kind: 'image',
        pageSlug,
        imageBlockKey: f.imageBlockKey,
        altBlockKey: f.altBlockKey,
        label: f.label,
      }),
    )
    groups.push({ id: 'images', label: 'Images', fields })
  }

  for (const [id, fields] of byGroup) {
    if (fields.length === 0) continue
    groups.push({
      id,
      label: id.charAt(0).toUpperCase() + id.slice(1).replace(/_/g, ' '),
      fields,
    })
  }

  return groups
}
