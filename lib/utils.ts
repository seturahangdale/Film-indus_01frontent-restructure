import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getFileUrl(path: string) {
  if (!path) return '';
  if (path.startsWith('http')) return path;

  // If path starts with /uploads or uploads/, it's served from the backend wwwroot
  const normalizedPath = path.replace(/\\/g, '/');
  if (normalizedPath.startsWith('/uploads') || normalizedPath.startsWith('uploads')) {
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
    const baseUrl = backendUrl.replace(/\/api$/, '');
    const cleanPath = normalizedPath.startsWith('/') ? normalizedPath : `/${normalizedPath}`;
    return `${baseUrl}${cleanPath}`;
  }

  return normalizedPath;
}
