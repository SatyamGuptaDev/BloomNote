import { getApiDocs } from '@/lib/swagger';
import ReactSwagger from '@/components/ReactSwagger';

export const metadata = {
  title: 'API Docs',
  robots: { index: false, follow: false },
};

export default async function ApiDocsPage() {
  const spec = await getApiDocs();
  return (
    <main className="min-h-screen bg-[#0f1117]">
      <ReactSwagger spec={spec as Record<string, unknown>} />
    </main>
  );
}
