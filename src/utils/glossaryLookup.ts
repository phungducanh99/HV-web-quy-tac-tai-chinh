import { glossaryData } from '../data/glossaryData';
import { GlossaryItem } from '../types/glossary';

export const findGlossaryTerm = (termOrId: string): GlossaryItem | undefined => {
  const query = termOrId.toLowerCase().trim();
  return glossaryData.find(
    (g) =>
      g.id === query ||
      g.term.toLowerCase() === query ||
      (g.engTerm && g.engTerm.toLowerCase() === query) ||
      g.term.toLowerCase().includes(query)
  );
};
