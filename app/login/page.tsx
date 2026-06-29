'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';

function LoginInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_ENABLED === 'true';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await signIn('credentials', { redirect: false, email, password });

    setLoading(false);
    if (res?.error) {
      setError('Incorrect email or password.');
      return;
    }
    router.push(callbackUrl);
    router.refresh();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo iconSize={34} />
        </div>

        <div className="rounded-3xl border border-[var(--blush)] bg-white p-8 shadow-xl shadow-[var(--rose)]/5">
          <h1 className="font-heading text-3xl text-[var(--charcoal)]">Welcome back</h1>
          <p className="mt-2 text-sm text-[var(--stone)]">Sign in to save and manage your gifts.</p>

          {googleEnabled && (
            <>
              <button
                onClick={() => signIn('google', { callbackUrl })}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-[var(--blush)] bg-white px-4 py-3 font-medium text-[var(--charcoal)] transition-colors hover:bg-[var(--blush)]/30"
              >
                <GoogleIcon /> Continue with Google
              </button>
              <div className="my-6 flex items-center gap-4 text-xs text-[var(--stone)]">
                <span className="h-px flex-1 bg-[var(--blush)]" /> or <span className="h-px flex-1 bg-[var(--blush)]" />
              </div>
            </>
          )}

          <form onSubmit={handleSubmit} className={googleEnabled ? 'space-y-4' : 'mt-6 space-y-4'}>
            <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" autoComplete="email" />
            <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="••••••••" autoComplete="current-password" />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--rose)] px-4 py-3 font-medium text-white shadow-lg shadow-[var(--rose)]/25 transition-all hover:bg-[var(--rose-deep)] disabled:opacity-70"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Sign in
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--stone)]">
            New here?{' '}
            <Link href="/signup" className="font-medium text-[var(--rose-deep)] hover:underline">
              Create an account
            </Link>
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-[var(--stone)]">
          <Link href="/" className="hover:text-[var(--rose)] hover:underline">← Back to home</Link>
        </p>
      </div>
    </div>
  );
}

function Field({
  label, type, value, onChange, placeholder, autoComplete,
}: {
  label: string; type: string; value: string; onChange: (v: string) => void; placeholder?: string; autoComplete?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-[var(--charcoal)]">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required
        className="w-full rounded-xl border border-[var(--blush)] bg-[var(--background)] px-4 py-3 text-[var(--charcoal)] outline-none transition-all focus:border-[var(--rose)] focus:ring-2 focus:ring-[var(--rose)]/30"
      />
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1Z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
      <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84Z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1A11 11 0 0 0 2.18 7.06l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
    </svg>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-[var(--background)]"><Loader2 className="h-6 w-6 animate-spin text-[var(--rose)]" /></div>}>
      <LoginInner />
    </Suspense>
  );
}
