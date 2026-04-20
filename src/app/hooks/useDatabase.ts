// React Hook لاستخدام قاعدة البيانات
import { useMemo } from 'react';
import JournalismDatabase from '../data/database';
import type { JournalismArticle, Student, JournalismType, CategoryType } from '../data/database/schema';

export function useDatabase() {
  return useMemo(() => ({
    // المقالات
    getAllArticles: () => JournalismDatabase.getAllArticles(),
    getArticleById: (id: string) => JournalismDatabase.getArticleById(id),
    getArticleBySlug: (slug: string) => JournalismDatabase.getArticleBySlug(slug),
    getArticlesByStudent: (studentId: string) => JournalismDatabase.getArticlesByStudent(studentId),
    getArticlesByType: (type: JournalismType) => JournalismDatabase.getArticlesByType(type),
    getArticlesByCategory: (category: CategoryType) => JournalismDatabase.getArticlesByCategory(category),
    getFeaturedArticles: () => JournalismDatabase.getFeaturedArticles(),
    searchArticles: (query: string) => JournalismDatabase.searchArticles(query),
    getLatestArticles: (limit?: number) => JournalismDatabase.getLatestArticles(limit),
    getMostViewedArticles: (limit?: number) => JournalismDatabase.getMostViewedArticles(limit),
    
    // الطالبات
    getAllStudents: () => JournalismDatabase.getAllStudents(),
    getStudentById: (id: string) => JournalismDatabase.getStudentById(id),
    
    // الإحصائيات
    getStats: () => JournalismDatabase.getStats(),
  }), []);
}

// Hook للحصول على مقال واحد
export function useArticle(slugOrId: string): JournalismArticle | undefined {
  const db = useDatabase();
  return useMemo(() => {
    return db.getArticleBySlug(slugOrId) || db.getArticleById(slugOrId);
  }, [slugOrId, db]);
}

// Hook للحصول على مقالات طالبة
export function useStudentArticles(studentId: string): JournalismArticle[] {
  const db = useDatabase();
  return useMemo(() => db.getArticlesByStudent(studentId), [studentId, db]);
}

// Hook للحصول على مقالات حسب النوع
export function useArticlesByType(type: JournalismType): JournalismArticle[] {
  const db = useDatabase();
  return useMemo(() => db.getArticlesByType(type), [type, db]);
}

// Hook للحصول على مقالات حسب التصنيف
export function useArticlesByCategory(category: CategoryType): JournalismArticle[] {
  const db = useDatabase();
  return useMemo(() => db.getArticlesByCategory(category), [category, db]);
}
