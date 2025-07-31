import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearAuthError } from "../../store/features/authSlice";
import { Play, User, Lock, Mail } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/UI/Card";
import { Button } from "../../components/UI/Button";
import { Input } from "../../components/UI/Input";
import { Label } from "../../components/UI/Label";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loading = useSelector((state) => state.auth.loading);
  const error = useSelector((state) => state.auth.error);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors
  } = useForm({
    defaultValues: {
      login: '',
      password: ''
    }
  });

  // Clear errors and reset auth state when component mounts
  useEffect(() => {
    dispatch(clearAuthError());
    clearErrors();
  }, [dispatch, clearErrors]);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  // Handle server errors
  useEffect(() => {
    if (error) {
      setError('root', {
        type: 'server',
        message: error
      });
    }
  }, [error, setError]);

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data));
    } catch (error) {
      console.error('Login error', error);
    }
  };

  const validateEmailOrUsername = (value) => {
    if (!value) return 'Email or username is required';
    
    if (value.includes('@')) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Please enter a valid email address';
      }
    } else {
      if (value.length < 3) {
        return 'Username must be at least 3 characters';
      }
    }
    return true;
  };

  const currentLogin = watch('login');
  const isEmail = currentLogin?.includes('@');

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
            <form onSubmit={handleSubmit(onSubmit)}>
              {/* Login field */}
              <div className="space-y-2 mb-4">
                <Label htmlFor="login" className="flex items-center gap-2 text-sm font-medium">
                  {isEmail ? <Mail className="h-4 w-4" /> : <User className="h-4 w-4" />}
                  {isEmail ? 'Email' : 'Username'}
                </Label>
                <Input
                  id="login"
                  type="text"
                  placeholder={isEmail ? 'Enter your email' : 'Enter your username'}
                  className="rounded-2xl h-12 px-4"
                  {...register("login", {
                    required: "Email or username is required",
                    validate: validateEmailOrUsername
                  })}
                />
                {errors.login && (
                  <p className="text-red-500 text-sm mt-1">{errors.login.message}</p>
                )}
              </div>

              {/* Password field */}
              <div className="space-y-2 mb-4">
                <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium">
                  <Lock className="h-4 w-4" />
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  className="rounded-2xl h-12 px-4"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters"
                    }
                  })}
                />
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
              </div>

              {/* Error message and submit button */}
              {errors.root && (
                <div className="text-red-500 text-sm mb-4 text-center">
                  {errors.root.message}
                </div>
              )}

              <div className="text-right mb-4">
                <Link to="/forgot-password" className="text-sm text-red-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <Button 
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 rounded-2xl h-12 text-base font-medium"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : "Sign In"}
              </Button>
            </form>

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