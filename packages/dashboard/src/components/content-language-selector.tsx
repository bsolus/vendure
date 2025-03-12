import * as React from 'react';
import { useServerConfig } from '@/providers/server-config.js';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select.js';
import { cn } from '@/lib/utils.js';
import { getLocalizedLanguageName } from '@/lib/locale-utils.js';
import { useUserSettings } from '@/providers/user-settings.js';

interface ContentLanguageSelectorProps {
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
}

export function ContentLanguageSelector({ value, onChange, className }: ContentLanguageSelectorProps) {
    const serverConfig = useServerConfig();
    const { settings: { contentLanguage, displayLanguage }, setContentLanguage} = useUserSettings();

    // Fallback to empty array if serverConfig is null
    const languages = serverConfig?.availableLanguages || [];

    // If no value is provided but languages are available, use the first language
    const currentValue = contentLanguage;

    return (
        <Select value={currentValue} onValueChange={value => {
            onChange?.(value);
            setContentLanguage(value);
            }}>
            <SelectTrigger className={cn('w-[200px]', className)}>
                <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
                {languages.map(language => (
                    <SelectItem key={language} value={language}>
                        {getLocalizedLanguageName(language, displayLanguage)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
