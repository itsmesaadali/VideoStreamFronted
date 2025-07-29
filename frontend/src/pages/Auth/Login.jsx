import { Play, User, Lock } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/UI/Card";
import { Button } from "../../components/UI/Button";
import { Input } from "../../components/UI/Input";
import { Label } from "../../components/UI/Label";
import { Link } from "react-router-dom";

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 flex items-center justify-center p-4">
      {/* Logo in corner */}
      <div className="absolute top-6 left-6 hidden md:block">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="h-10 w-10 bg-red-600 rounded-full flex items-center justify-center">
            <Play className="h-6 w-6 text-white fill-white" />
          </div>
          <span className="text-2xl font-bold">VidStream</span>
        </Link>
      </div>

      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Form */}
        <Card className="rounded-3xl shadow-2xl">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-2xl">Sign In</CardTitle>
            <CardDescription>
              Enter your credentials to access your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6 p-8">
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <User className="h-4 w-4" />
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                className="rounded-2xl h-12 px-4"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="flex items-center gap-2 text-sm font-medium"
              >
                <Lock className="h-4 w-4" />
                Password
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                className="rounded-2xl h-12 px-4"
              />
            </div>

            <div className="text-right">
              <a href="#" className="text-sm text-red-600 hover:underline">
                Forgot password?
              </a>
            </div>

            <Button className="w-full bg-red-600 hover:bg-red-700 rounded-2xl h-12 text-base font-medium">
              Sign In
            </Button>

            <div className="text-center text-sm">
              {"Don't have an account? "}
              <Link
                to="/register"
                className="text-red-600 hover:underline font-medium"
              >
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
