'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import { Logo } from '@/components/layout/Logo';

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Could not create account.');
        setLoading(false);
        return;
      }

      // Auto sign-in after successful signup
      const login = await signIn('credentials', { redirect: false, email, password });
      setLoading(false);
      if (login?.error) {
        router.push('/login');
        return;
      }
      router.push('/');
      router.refresh();
    } catch {
      setError('Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--background)] px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo iconSize={34} />
        </div>

        <div className="rounded-3xl border border-[var(--blush)] bg-white p-8 shadow-xl shadow-[var(--rose)]/5">
          <h1 className="font-heading text-3xl text-[var(--charcoal)]">Create your account</h1>
          <p className="mt-2 text-sm text-[var(--stone)]">Save your gifts and pick up right where you left off.</p>

          <form onSubmit={handleSubmit} className="mt-6 space-y-4">
            <Field label="Name" type="text" value={name} onChange={setName} placeholder="Your name" autoComplete="name" />
            <Field label="Email" type="email" value={email} onChange={setEmail} placeholder="you@example.com" autoComplete="email" />
            <Field label="Password" type="password" value={password} onChange={setPassword} placeholder="At least 6 characters" autoComplete="new-password" />

            {error && <p className="text-sm text-red-500">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-[var(--rose)] px-4 py-3 font-medium text-white shadow-lg shadow-[var(--rose)]/25 transition-all hover:bg-[var(--rose-deep)] disabled:opacity-70"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin" />}
              Create account
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-[var(--stone)]">
            Already have an account?{' '}
            <Link href="/login" className="font-medium text-[var(--rose-deep)] hover:underline">
              Sign in
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
