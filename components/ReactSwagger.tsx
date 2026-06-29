'use client';

import dynamic from 'next/dynamic';
import 'swagger-ui-react/swagger-ui.css';
import './swagger-dark.css';

const SwaggerUI = dynamic(() => import('swagger-ui-react'), { ssr: false });

export default function ReactSwagger({ spec }: { spec: Record<string, unknown> }) {
  return (
    <div className="swagger-dark">
      <SwaggerUI spec={spec} />
    </div>
  );
}
