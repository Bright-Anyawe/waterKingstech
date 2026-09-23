/**
 * Builds a sized Unsplash URL so the Next.js image optimizer fetches a
 * reasonably sized source instead of the full-resolution original.
 * All photos used are free to use under the Unsplash License.
 */
export function unsplash(photoId: string, width = 1200): string {
  return `https://images.unsplash.com/photo-${photoId}?w=${width}&q=80&fm=jpg&fit=crop`;
}
