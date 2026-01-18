import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]) {
    return clsx(inputs);
}

export function formatDate(date: Date | string): string {
    const d = new Date(date);
    return d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
    });
}

export function formatRelativeTime(date: Date | string): string {
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (years > 0) return `${years} tahun yang lalu`;
    if (months > 0) return `${months} bulan yang lalu`;
    if (days > 0) return `${days} hari yang lalu`;
    if (hours > 0) return `${hours} jam yang lalu`;
    if (minutes > 0) return `${minutes} menit yang lalu`;
    return 'Baru saja';
}

export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
}

export function generateExcerpt(content: string, maxLength: number = 150): string {
    const lines = content.split('\n').filter(line => line.trim());
    const firstLines = lines.slice(0, 2).join(' ');
    return truncateText(firstLines, maxLength);
}

export function capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');
}

export function getInitials(name: string): string {
    return name
        .split(' ')
        .map(part => part[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
}

export const literatureTypeNames: Record<string, string> = {
    puisi: 'Puisi',
    pantun: 'Pantun',
    cerpen: 'Cerpen',
    gurindam: 'Gurindam',
    syair: 'Syair',
    prosa: 'Prosa',
};

export const styleNames: Record<string, string> = {
    klasik: 'Klasik',
    modern: 'Modern',
    kontemporer: 'Kontemporer',
};

export const moodNames: Record<string, string> = {
    romantis: 'Romantis',
    melankolis: 'Melankolis',
    gembira: 'Gembira',
    inspiratif: 'Inspiratif',
    filosofis: 'Filosofis',
};

export const difficultyNames: Record<string, string> = {
    pemula: 'Pemula',
    menengah: 'Menengah',
    lanjut: 'Lanjut',
};

export const difficultyColors: Record<string, string> = {
    pemula: 'bg-green-100 text-green-800',
    menengah: 'bg-yellow-100 text-yellow-800',
    lanjut: 'bg-red-100 text-red-800',
};
