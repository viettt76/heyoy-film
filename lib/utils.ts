import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const convertSecondsToTime = (seconds: number): string => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedHours = hours > 0 ? `${String(hours).padStart(2, '0')}:` : '';
    return `${formattedHours}${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
};
