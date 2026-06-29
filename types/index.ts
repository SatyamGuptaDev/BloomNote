export interface FlowerConfig {
  type: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  zIndex: number;
}

export interface BouquetData {
  id: string;
  slug: string;
  flowers: FlowerConfig[];
  note: string | null;
  fromName: string | null;
  font: string;
  textColor: string;
  music: string | null;
  bgColor: string;
  bgImage: string | null;
  views: number;
  createdAt: string;
}

export interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  featuredImage: string | null;
  category: string;
  tags: string[];
  publishedAt: string;
}
