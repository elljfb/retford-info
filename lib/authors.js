const authors = {
  'brenda-cooper': {
    slug: 'brenda-cooper',
    name: 'Brenda Cooper',
    role: 'Local editor and contributor',
    image: '/images/brenda-cooper.jpg',
    shortBio:
      'Brenda writes and reviews Retford.info guides with a focus on practical local knowledge, town history, and everyday visitor questions.',
    bio: [
      'Brenda Cooper is a named contributor at Retford.info with longstanding family ties to Retford and the wider Bassetlaw area.',
      'Her work focuses on making local information genuinely useful: what is still open, what has changed, which details matter on the ground, and where visitors or residents should double-check official information.',
      'Where a guide includes first-hand checks, menu collection, venue visits, or source-led updates, that reporting is reflected in the article notes and review dates rather than hidden behind a generic editorial label.',
    ],
  },
};

export function getAuthorBySlug(slug) {
  if (!slug) return null;
  return authors[slug] || null;
}

export function getAllAuthors() {
  return Object.values(authors);
}
