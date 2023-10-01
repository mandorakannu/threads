import { SignIn } from "@clerk/nextjs";
 
export default function SignInPage() {
  return<section className="grid place-items-center py-20"><SignIn /></section>;
}