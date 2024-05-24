import en from './en.json';
import ar from './ar.json';

interface LanguageDictionary {
  [key: string]: string;
}

const dictionaries: { [key: string]: () => Promise<LanguageDictionary> } = {
  en: () => Promise.resolve(en),
  ar: () => Promise.resolve(ar),
};

export default function getDictionary(lang: string): Promise<LanguageDictionary> {
  return (dictionaries[lang ? lang : 'en'])();
}
