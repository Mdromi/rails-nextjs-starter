// export type SafeUser = {
//   id: number;
//   email: string;
//   createdAt: string | null;
//   updatedAt: string | null;
//   verified: boolean | false;
// };
export type SafeUser = {
  id: number;
  email: string;
  name: string;
  role: string;
  avatar: string | null;
};
