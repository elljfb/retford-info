'use client';

import { FormEvent, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CalendarDays, Image as ImageIcon, Send, User } from 'lucide-react';
import {
  createAvailableObituarySlug,
  hasSupabaseObituariesConfig,
  insertObituary,
  obituaryNoticeTypes,
  uploadObituaryImage,
  type ObituaryNoticeType,
} from '@/lib/supabase-obituaries';

const maxImageSize = 5 * 1024 * 1024;

export default function ObituarySubmitForm() {
  const router = useRouter();
  const [noticeType, setNoticeType] = useState<ObituaryNoticeType>('death_notice');
  const [fullName, setFullName] = useState('');
  const [knownAs, setKnownAs] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [dateOfDeath, setDateOfDeath] = useState('');
  const [age, setAge] = useState('');
  const [town, setTown] = useState('Retford');
  const [summary, setSummary] = useState('');
  const [tribute, setTribute] = useState('');
  const [familyMessage, setFamilyMessage] = useState('');
  const [funeralDate, setFuneralDate] = useState('');
  const [funeralLocation, setFuneralLocation] = useState('');
  const [donationUrl, setDonationUrl] = useState('');
  const [submitterName, setSubmitterName] = useState('');
  const [submitterEmail, setSubmitterEmail] = useState('');
  const [submitterPhone, setSubmitterPhone] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const imagePreview = useMemo(() => {
    if (!image) return '';
    return URL.createObjectURL(image);
  }, [image]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!hasSupabaseObituariesConfig()) {
      setError('Supabase is not configured yet. Add the public Supabase environment variables first.');
      return;
    }

    if (!fullName.trim() || !dateOfDeath || !summary.trim() || !tribute.trim() || !submitterName.trim() || !submitterEmail.trim()) {
      setError('Please complete the required fields.');
      return;
    }

    if (!consent) {
      setError('Please confirm you have permission to submit this notice.');
      return;
    }

    if (image && image.size > maxImageSize) {
      setError('Please choose an image smaller than 5MB.');
      return;
    }

    try {
      setSubmitting(true);
      const slug = await createAvailableObituarySlug(fullName, dateOfDeath);
      const imageUrl = image ? await uploadObituaryImage(image, slug) : null;
      const created = await insertObituary({
        slug,
        notice_type: noticeType,
        full_name: fullName.trim(),
        known_as: knownAs.trim() || null,
        age: age ? Number(age) : null,
        date_of_birth: dateOfBirth || null,
        date_of_death: dateOfDeath || null,
        funeral_date: funeralDate ? new Date(funeralDate).toISOString() : null,
        funeral_location: funeralLocation.trim() || null,
        town: town.trim() || 'Retford',
        image_url: imageUrl,
        summary: summary.trim(),
        tribute: tribute.trim(),
        family_message: familyMessage.trim() || null,
        donation_url: donationUrl.trim() || null,
        submitter_name: submitterName.trim(),
        submitter_email: submitterEmail.trim(),
        submitter_phone: submitterPhone.trim() || null,
      });

      router.push(`/obituaries/${created.slug}?submitted=1`);
    } catch (submitError) {
      console.error(submitError);
      setError('The notice could not be submitted. Please check your details and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {error && (
        <div className="border border-red-300 bg-red-50 text-red-800 rounded-lg p-4">
          {error}
        </div>
      )}

      <section className="border border-gray-200 rounded-lg p-6 space-y-6">
        <div className="flex items-center gap-3">
          <User className="text-accent-dark" />
          <h2 className="text-2xl font-bold">Notice Details</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Notice type</span>
            <select
              value={noticeType}
              onChange={(event) => setNoticeType(event.target.value as ObituaryNoticeType)}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-accent"
            >
              {obituaryNoticeTypes.map(item => (
                <option key={item.value} value={item.value}>{item.label}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Full name *</span>
            <input
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Known as</span>
            <input
              value={knownAs}
              onChange={(event) => setKnownAs(event.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Town or village</span>
            <input
              value={town}
              onChange={(event) => setTown(event.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Date of birth</span>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(event) => setDateOfBirth(event.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Date of death *</span>
            <input
              type="date"
              value={dateOfDeath}
              onChange={(event) => setDateOfDeath(event.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Age</span>
            <input
              type="number"
              min="0"
              max="125"
              value={age}
              onChange={(event) => setAge(event.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-gray-700">Short summary *</span>
          <textarea
            value={summary}
            onChange={(event) => setSummary(event.target.value)}
            rows={3}
            maxLength={320}
            className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-gray-700">Obituary or tribute *</span>
          <textarea
            value={tribute}
            onChange={(event) => setTribute(event.target.value)}
            rows={8}
            className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-gray-700">Family message</span>
          <textarea
            value={familyMessage}
            onChange={(event) => setFamilyMessage(event.target.value)}
            rows={4}
            className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </label>
      </section>

      <section className="border border-gray-200 rounded-lg p-6 space-y-6">
        <div className="flex items-center gap-3">
          <CalendarDays className="text-accent-dark" />
          <h2 className="text-2xl font-bold">Funeral And Donations</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Funeral date and time</span>
            <input
              type="datetime-local"
              value={funeralDate}
              onChange={(event) => setFuneralDate(event.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Funeral location</span>
            <input
              value={funeralLocation}
              onChange={(event) => setFuneralLocation(event.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </label>
        </div>

        <label className="block">
          <span className="text-sm font-semibold text-gray-700">Donation link</span>
          <input
            type="url"
            value={donationUrl}
            onChange={(event) => setDonationUrl(event.target.value)}
            placeholder="https://"
            className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
          />
        </label>
      </section>

      <section className="border border-gray-200 rounded-lg p-6 space-y-6">
        <div className="flex items-center gap-3">
          <ImageIcon className="text-accent-dark" />
          <h2 className="text-2xl font-bold">Photo</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] gap-6 items-center">
          <div className="h-44 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
            {imagePreview ? (
              <img src={imagePreview} alt="Selected notice" className="w-full h-full object-cover" />
            ) : (
              <ImageIcon size={42} className="text-gray-400" />
            )}
          </div>
          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Upload an image</span>
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) => setImage(event.target.files?.[0] || null)}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 bg-white focus:outline-none focus:ring-2 focus:ring-accent"
            />
            <span className="block text-sm text-gray-500 mt-2">JPG, PNG, or WebP up to 5MB.</span>
          </label>
        </div>
      </section>

      <section className="border border-gray-200 rounded-lg p-6 space-y-6">
        <h2 className="text-2xl font-bold">Submitter Details</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Your name *</span>
            <input
              value={submitterName}
              onChange={(event) => setSubmitterName(event.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-gray-700">Your email *</span>
            <input
              type="email"
              value={submitterEmail}
              onChange={(event) => setSubmitterEmail(event.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
              required
            />
          </label>

          <label className="block md:col-span-2">
            <span className="text-sm font-semibold text-gray-700">Phone number</span>
            <input
              value={submitterPhone}
              onChange={(event) => setSubmitterPhone(event.target.value)}
              className="mt-2 w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </label>
        </div>

        <label className="flex gap-3 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={consent}
            onChange={(event) => setConsent(event.target.checked)}
            className="mt-1 h-4 w-4"
          />
          <span>I confirm I have permission to submit this notice and any photo provided for publication on Retford.info.</span>
        </label>
      </section>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex items-center gap-2 bg-accent text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-accent-dark hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Send size={18} />
        {submitting ? 'Submitting...' : 'Publish notice'}
      </button>
    </form>
  );
}
