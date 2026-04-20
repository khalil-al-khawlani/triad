// نظام قاعدة البيانات للفنون الصحفية
// Database System for Journalism Arts

import type { Student, JournalismArticle, DatabaseStats, JournalismType, CategoryType } from './schema';

// استيراد البيانات
import studentsJson from './students.json';
import articlesJson from './articles.json';

// تعريف أنواع البيانات المستوردة
interface StudentsData {
  students: Student[];
}

interface ArticlesData {
  articles: JournalismArticle[];
  metadata?: {
    lastUpdated: string;
    totalArticles: number;
    version: string;
  };
}

// تحميل البيانات
export const students: Student[] = (studentsJson as StudentsData).students;
export const articles: JournalismArticle[] = (articlesJson as ArticlesData).articles;

// دوال البحث والفلترة
export class JournalismDatabase {
  
  // الحصول على جميع المقالات
  static getAllArticles(): JournalismArticle[] {
    return articles;
  }

  // الحصول على مقال بواسطة ID
  static getArticleById(id: string): JournalismArticle | undefined {
    return articles.find(article => article.id === id);
  }

  // الحصول على مقال بواسطة Slug
  static getArticleBySlug(slug: string): JournalismArticle | undefined {
    return articles.find(article => article.slug === slug);
  }

  // الحصول على مقالات طالبة معينة
  static getArticlesByStudent(studentId: string): JournalismArticle[] {
    return articles.filter(article => article.studentId === studentId);
  }

  // الحصول على مقالات حسب النوع
  static getArticlesByType(type: JournalismType): JournalismArticle[] {
    return articles.filter(article => article.type === type);
  }

  // الحصول على مقالات حسب التصنيف
  static getArticlesByCategory(category: CategoryType): JournalismArticle[] {
    return articles.filter(article => article.category === category);
  }

  // الحصول على المقالات المميزة
  static getFeaturedArticles(): JournalismArticle[] {
    return articles.filter(article => article.featured === true);
  }

  // البحث في المقالات
  static searchArticles(query: string): JournalismArticle[] {
    const lowerQuery = query.toLowerCase();
    return articles.filter(article => 
      article.title.toLowerCase().includes(lowerQuery) ||
      article.excerpt.toLowerCase().includes(lowerQuery) ||
      article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
    );
  }

  // الحصول على جميع الطالبات
  static getAllStudents(): Student[] {
    return students;
  }

  // الحصول على طالبة بواسطة ID
  static getStudentById(id: string): Student | undefined {
    return students.find(student => student.id === id);
  }

  // الحصول على إحصائيات قاعدة البيانات
  static getStats(): DatabaseStats {
    const articlesByType: Record<string, number> = {};
    const articlesByCategory: Record<string, number> = {};
    const articlesByStudent: Record<string, number> = {};

    articles.forEach(article => {
      // حساب حسب النوع
      articlesByType[article.type] = (articlesByType[article.type] || 0) + 1;
      
      // حساب حسب التصنيف
      articlesByCategory[article.category] = (articlesByCategory[article.category] || 0) + 1;
      
      // حساب حسب الطالبة
      articlesByStudent[article.studentId] = (articlesByStudent[article.studentId] || 0) + 1;
    });

    return {
      totalStudents: students.length,
      totalArticles: articles.length,
      articlesByType: articlesByType as Record<JournalismType, number>,
      articlesByCategory: articlesByCategory as Record<CategoryType, number>,
      articlesByStudent
    };
  }

  // الحصول على أحدث المقالات
  static getLatestArticles(limit: number = 10): JournalismArticle[] {
    return [...articles]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  }

  // الحصول على المقالات الأكثر مشاهدة
  static getMostViewedArticles(limit: number = 10): JournalismArticle[] {
    return [...articles]
      .filter(article => article.views)
      .sort((a, b) => {
        const viewsA = parseInt(a.views?.replace(/[,،]/g, '') || '0');
        const viewsB = parseInt(b.views?.replace(/[,،]/g, '') || '0');
        return viewsB - viewsA;
      })
      .slice(0, limit);
  }
}

// تصدير افتراضي
export default JournalismDatabase;
