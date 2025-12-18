
export interface UserSession {
  email: string;
  name?: string;
  isLoggedIn: boolean;
}

export interface SecurityTip {
  text: string;
  author: string;
}
