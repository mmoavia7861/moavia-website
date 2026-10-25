/**
 * Admin Security, RBAC & Email Registry Logic
 */

export type AdminRole = 'Super Admin' | 'Manager' | 'Content Editor' | 'Viewer';

export interface AdminPermissions {
  canManageAdmins: boolean;
  canManageSettings: boolean;
  canViewLeads: boolean;
  canEditLeads: boolean;
  canEditProjects: boolean;
  canPublishBlog: boolean;
  canEditPricing: boolean;
}

export function normalizeEmail(email: string): string {
  if (!email) return '';
  return email.trim().toLowerCase();
}

export function isValidAdminEmail(email: string): boolean {
  const normalized = normalizeEmail(email);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(normalized);
}

export function getRolePermissions(role: AdminRole): AdminPermissions {
  switch (role) {
    case 'Super Admin':
      return {
        canManageAdmins: true,
        canManageSettings: true,
        canViewLeads: true,
        canEditLeads: true,
        canEditProjects: true,
        canPublishBlog: true,
        canEditPricing: true,
      };
    case 'Manager':
      return {
        canManageAdmins: false,
        canManageSettings: false,
        canViewLeads: true,
        canEditLeads: true,
        canEditProjects: true,
        canPublishBlog: false,
        canEditPricing: false,
      };
    case 'Content Editor':
      return {
        canManageAdmins: false,
        canManageSettings: false,
        canViewLeads: false,
        canEditLeads: false,
        canEditProjects: false,
        canPublishBlog: true,
        canEditPricing: false,
      };
    case 'Viewer':
    default:
      return {
        canManageAdmins: false,
        canManageSettings: false,
        canViewLeads: true,
        canEditLeads: false,
        canEditProjects: false,
        canPublishBlog: false,
        canEditPricing: false,
      };
  }
}

export function isPrimaryAdministrator(email: string): boolean {
  const norm = normalizeEmail(email);
  return norm === 'moaviahassan124@gmail.com' || norm === 'moavia400@gmail.com';
}
