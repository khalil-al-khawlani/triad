// نظام قاعدة البيانات للفنون الصحفية
// Database Schema for Journalism Arts

export type JournalismType = 
  | "article"      // مقال
  | "report"       // تقرير
  | "news"         // خبر
  | "investigation" // تحقيق
  | "infographic"  // إنفوجرافيك
  | "story";       // قصة خبرية

export type CategoryType = "heritage" | "technology" | "society";

export interface Student {
  id: string;
  name: string;
  nameEn?: string;
  avatar?: string;
  title?: string;
  email?: string;
}

export interface JournalismArticle {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  
  // معلومات الكاتب
  studentId: string;
  studentName: string;
  
  // التصنيف
  type: JournalismType;
  category: CategoryType;
  
  // الوسائط
  image?: string;
  gallery?: Array<{
    src: string;
    caption?: string;
  }>;
  video?: string;
  
  // البيانات الوصفية
  tags: string[];
  date: string;
  readTime: string;
  views?: string;
  featured?: boolean;
  
  // المصدر
  contentSource?: string;
  
  // بيانات إضافية للإنفوجرافيك
  infographicData?: {
    mainStats?: Array<{
      label: string;
      value: string;
    }>;
    sections?: Array<{
      title: string;
      items: string[];
    }>;
  };
}

export interface DatabaseStats {
  totalStudents: number;
  totalArticles: number;
  articlesByType: Record<JournalismType, number>;
  articlesByCategory: Record<CategoryType, number>;
  articlesByStudent: Record<string, number>;
}
