import { Logo } from "../icons/logo";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { LoginForm } from "./login-form";

export const AuthCard = () => {
  return (
    <>
      <Card className="w-full max-w-md shadow-lg rounded-xl">
        <CardHeader className="items-center text-center space-y-4 p-6">
          <div className="flex items-center gap-3">
            <Logo />
            <CardTitle className="text-3xl font-bold tracking-tight font-headline">
              VacationVisor
            </CardTitle>
          </div>
          <CardDescription>Sign in to plan your next adventure</CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <LoginForm />
        </CardContent>
      </Card>
    </>
  );
};
