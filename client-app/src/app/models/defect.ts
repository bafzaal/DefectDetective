export interface IDefect {
    id: string;
    title: string;
    date: Date | null;
    description: string;
    category: string;
    priority: string;
    status: string;
  }