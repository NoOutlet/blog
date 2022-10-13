export type SiteNotification = {
  text: string;
  id: number;
  color: string;
  highlightText?: string[];
};

export type AddNotification = {
  text: string;
  color?: string;
  highlightText?: string[];
};
