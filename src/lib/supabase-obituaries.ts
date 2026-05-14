export const obituaryNoticeTypes = [
  { value: 'death_notice', label: 'Death notice' },
  { value: 'obituary', label: 'Obituary' },
  { value: 'funeral_notice', label: 'Funeral notice' },
  { value: 'thanks', label: 'Thanks' },
  { value: 'memorial', label: 'In memoriam' },
] as const;

export type ObituaryNoticeType = (typeof obituaryNoticeTypes)[number]['value'];

export interface Obituary {
  id: string;
  created_at: string;
  updated_at?: string;
  slug: string;
  notice_type: ObituaryNoticeType;
  status: 'published' | 'hidden';
  full_name: string;
  known_as?: string | null;
  age?: number | null;
  date_of_birth?: string | null;
  date_of_death?: string | null;
  funeral_date?: string | null;
  funeral_location?: string | null;
  town?: string | null;
  image_url?: string | null;
  summary?: string | null;
  tribute?: string | null;
  family_message?: string | null;
  donation_url?: string | null;
  submitter_name?: string | null;
  submitter_email?: string | null;
  submitter_phone?: string | null;
  comment_count: number;
}

export interface ObituaryComment {
  id: string;
  obituary_id: string;
  created_at: string;
  status: 'published' | 'hidden';
  commenter_name: string;
  commenter_email?: string | null;
  message: string;
}

export type NewObituary = Omit<Obituary, 'id' | 'created_at' | 'updated_at' | 'status' | 'comment_count'> & {
  status?: 'published';
};

export type NewObituaryComment = Pick<ObituaryComment, 'obituary_id' | 'commenter_name' | 'commenter_email' | 'message'> & {
  status?: 'published';
};

const obituarySelect = [
  'id',
  'created_at',
  'updated_at',
  'slug',
  'notice_type',
  'status',
  'full_name',
  'known_as',
  'age',
  'date_of_birth',
  'date_of_death',
  'funeral_date',
  'funeral_location',
  'town',
  'image_url',
  'summary',
  'tribute',
  'family_message',
  'donation_url',
  'comment_count',
].join(',');

const obituaryCommentSelect = [
  'id',
  'obituary_id',
  'created_at',
  'status',
  'commenter_name',
  'message',
].join(',');

function getSupabaseConfig() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  return {
    url: url.replace(/\/$/, ''),
    anonKey,
  };
}

export function hasSupabaseObituariesConfig() {
  return Boolean(getSupabaseConfig());
}

async function supabaseRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const config = getSupabaseConfig();

  if (!config) {
    throw new Error('Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.');
  }

  const response = await fetch(`${config.url}${path}`, {
    ...init,
    cache: 'no-store',
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${config.anonKey}`,
      ...(typeof File !== 'undefined' && init.body instanceof File ? {} : { 'Content-Type': 'application/json' }),
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || `Supabase request failed with ${response.status}`);
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json() as Promise<T>;
}

export async function fetchPublishedObituaries(limit = 100): Promise<Obituary[]> {
  const params = new URLSearchParams({
    select: obituarySelect,
    status: 'eq.published',
    order: 'created_at.desc',
    limit: String(limit),
  });

  return supabaseRequest<Obituary[]>(`/rest/v1/obituaries?${params.toString()}`);
}

export async function fetchObituaryBySlug(slug: string): Promise<Obituary | null> {
  const params = new URLSearchParams({
    select: obituarySelect,
    slug: `eq.${slug}`,
    status: 'eq.published',
    limit: '1',
  });

  const obituaries = await supabaseRequest<Obituary[]>(`/rest/v1/obituaries?${params.toString()}`);
  return obituaries[0] || null;
}

export async function createAvailableObituarySlug(fullName: string, dateOfDeath: string): Promise<string> {
  const baseSlug = slugifyObituaryName(`${fullName}-${dateOfDeath}`) || `notice-${dateOfDeath}`;

  for (let suffix = 0; suffix < 20; suffix += 1) {
    const slug = suffix === 0 ? baseSlug : `${baseSlug}-${suffix + 1}`;
    const existing = await fetchObituaryBySlug(slug);

    if (!existing) {
      return slug;
    }
  }

  return `${baseSlug}-${Date.now().toString(36)}`;
}

export async function fetchObituaryComments(obituaryId: string): Promise<ObituaryComment[]> {
  const params = new URLSearchParams({
    select: obituaryCommentSelect,
    obituary_id: `eq.${obituaryId}`,
    status: 'eq.published',
    order: 'created_at.asc',
  });

  return supabaseRequest<ObituaryComment[]>(`/rest/v1/obituary_comments?${params.toString()}`);
}

export async function insertObituary(obituary: NewObituary): Promise<Obituary> {
  const params = new URLSearchParams({
    select: obituarySelect,
  });

  const rows = await supabaseRequest<Obituary[]>(`/rest/v1/obituaries?${params.toString()}`, {
    method: 'POST',
    headers: {
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      ...obituary,
      status: 'published',
    }),
  });

  return rows[0];
}

export async function insertObituaryComment(comment: NewObituaryComment): Promise<ObituaryComment> {
  const params = new URLSearchParams({
    select: obituaryCommentSelect,
  });

  const rows = await supabaseRequest<ObituaryComment[]>(`/rest/v1/obituary_comments?${params.toString()}`, {
    method: 'POST',
    headers: {
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      ...comment,
      status: 'published',
    }),
  });

  return rows[0];
}

export async function uploadObituaryImage(file: File, slug: string): Promise<string> {
  const config = getSupabaseConfig();

  if (!config) {
    throw new Error('Supabase is not configured.');
  }

  const extension = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const safeExtension = extension.replace(/[^a-z0-9]/g, '') || 'jpg';
  const objectPath = `${slug}/${Date.now()}.${safeExtension}`;
  const encodedPath = objectPath.split('/').map(encodeURIComponent).join('/');
  const response = await fetch(`${config.url}/storage/v1/object/obituary-images/${encodedPath}`, {
    method: 'POST',
    headers: {
      apikey: config.anonKey,
      Authorization: `Bearer ${config.anonKey}`,
      'Content-Type': file.type || 'application/octet-stream',
      'x-upsert': 'false',
    },
    body: file,
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(detail || 'Image upload failed');
  }

  return `${config.url}/storage/v1/object/public/obituary-images/${encodedPath}`;
}

export function slugifyObituaryName(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/['"]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function formatNoticeType(type: ObituaryNoticeType) {
  return obituaryNoticeTypes.find(item => item.value === type)?.label || 'Notice';
}
