/**
 * SEO & Website Audit Pure Logic Utilities
 */

export interface MetaTagAnalysis {
  titleLength: number;
  isTitleOptimal: boolean; // 50-60 chars
  descLength: number;
  isDescOptimal: boolean; // 120-160 chars
  titleScore: number;
  descScore: number;
}

export function analyzeMetaTags(title: string, description: string): MetaTagAnalysis {
  const cleanTitle = (title || '').trim();
  const cleanDesc = (description || '').trim();

  const titleLength = cleanTitle.length;
  const descLength = cleanDesc.length;

  const isTitleOptimal = titleLength >= 45 && titleLength <= 65;
  const isDescOptimal = descLength >= 120 && descLength <= 165;

  let titleScore = 0;
  if (titleLength >= 45 && titleLength <= 65) titleScore = 100;
  else if (titleLength >= 30 && titleLength <= 75) titleScore = 75;
  else if (titleLength > 0) titleScore = 40;

  let descScore = 0;
  if (descLength >= 120 && descLength <= 165) descScore = 100;
  else if (descLength >= 90 && descLength <= 180) descScore = 70;
  else if (descLength > 0) descScore = 40;

  return {
    titleLength,
    isTitleOptimal,
    descLength,
    isDescOptimal,
    titleScore,
    descScore,
  };
}

export function calculateSeoScore(factors: {
  hasTitle: boolean;
  hasMetaDesc: boolean;
  hasH1: boolean;
  hasSsl: boolean;
  mobileFriendly: boolean;
  pageSpeedScore: number; // 0-100
}): { totalScore: number; grade: 'A+' | 'A' | 'B' | 'C' | 'D' } {
  let score = 0;
  if (factors.hasTitle) score += 20;
  if (factors.hasMetaDesc) score += 20;
  if (factors.hasH1) score += 15;
  if (factors.hasSsl) score += 15;
  if (factors.mobileFriendly) score += 15;
  score += Math.round((factors.pageSpeedScore / 100) * 15);

  let grade: 'A+' | 'A' | 'B' | 'C' | 'D' = 'D';
  if (score >= 95) grade = 'A+';
  else if (score >= 85) grade = 'A';
  else if (score >= 70) grade = 'B';
  else if (score >= 50) grade = 'C';

  return { totalScore: score, grade };
}

export function calculateKeywordDensity(text: string, keyword: string): number {
  if (!text || !keyword) return 0;
  const cleanText = text.toLowerCase();
  const cleanKw = keyword.toLowerCase().trim();
  if (!cleanKw) return 0;

  const words = cleanText.match(/\b\w+\b/g) || [];
  if (words.length === 0) return 0;

  let count = 0;
  let pos = cleanText.indexOf(cleanKw);
  while (pos !== -1) {
    count++;
    pos = cleanText.indexOf(cleanKw, pos + cleanKw.length);
  }

  const keywordWordCount = (cleanKw.match(/\b\w+\b/g) || []).length || 1;
  const density = ((count * keywordWordCount) / words.length) * 100;
  return Number(density.toFixed(2));
}
