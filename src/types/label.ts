export type LabelListVisibility = 'labelShow' | 'labelShowIfUnread' | 'labelHide';
export type MessageListVisibility = 'show' | 'hide';

export interface LabelRequest {
  id: string;
  name: string;
}

export interface LabelResponse extends LabelRequest {
  type: 'system' | 'user';
  labelListVisibility?: LabelListVisibility;
  messageListVisibility?: MessageListVisibility;
}