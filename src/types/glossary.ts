export interface GlossaryItem {
  id: string;
  term: string;
  engTerm?: string;
  category: 'identity' | 'finance' | 'vptgd' | 'governance';
  categoryName: string;
  definition: string;
  source: string;
  tags?: string[];
  interactiveTabLink?: {
    tabId: 'tab1' | 'tab2' | 'tab3';
    label: string;
  };
}
