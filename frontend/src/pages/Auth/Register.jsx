import { Link, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from '../../store/features/authSlice';
import { Button } from "../../components/UI/Button";
import { Input } from "../../components/UI/Input";
import { Label } from "../../components/UI/Label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/UI/Card";
import { Avatar, AvatarFallback, AvatarImage } from "../../components/UI/Avatar";
import { Progress } from "../../components/UI/Progress";
import { User, Mail, Lock, Upload, Camera, CheckCircle, ArrowRight, ArrowLeft, Play } from "lucide-react";

export default function RegisterPage() {
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
    trigger
  } = useForm({
    defaultValues: {
      fullname: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: null,
      coverImage: null,
    },
    mode: "onChange"
  });

  const [avatarPreview, setAvatarPreview] = useState(null);
  const [coverImagePreview, setCoverImagePreview] = useState(null);

  // Handle successful registration
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);



  const handleFileChange = (field, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue(field, file, { shouldValidate: true });
    
    const previewUrl = URL.createObjectURL(file);
    if (field === "avatar") {
      setAvatarPreview(previewUrl);
    } else {
      setCoverImagePreview(previewUrl);
    }
  };

  const nextStep = async () => {
    if (currentStep === 1) {
      const isValid = await trigger([
        "fullname", 
        "username", 
        "email", 
        "password", 
        "confirmPassword"
      ]);
      if (!isValid) return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 3));
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

 

  const onSubmit = async (data) => {
    if (!data.avatar) {
      setError("avatar", { 
        type: "manual", 
        message: "Profile picture is required" 
      });
      setCurrentStep(2);
      return;
    }

    const formData = new FormData();
    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("avatar", data.avatar);
    
    if (data.coverImage) {
      formData.append("coverImage", data.coverImage);
    }

    try {
      await dispatch(registerUser(formData));
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const progress = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 flex items-center justify-center p-4">
      {/* Logo */}
      <div className="absolute top-6 left-6 hidden md:block">
        <Link to="/" className="inline-flex items-center gap-2">
          <div className="h-10 w-10 bg-red-600 rounded-full flex items-center justify-center">
            <Play className="h-6 w-6 text-white fill-white" />
          </div>
          <span className="text-2xl font-bold">VidStream</span>
        </Link>
      </div>

      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Create Account</h1>
          <p className="text-muted-foreground">
            Join our community and start sharing your videos
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-muted-foreground mb-2">
            <span className={currentStep >= 1 ? "text-red-600 font-medium" : ""}>
              Account Info
            </span>
            <span className={currentStep >= 2 ? "text-red-600 font-medium" : ""}>
              Profile Picture
            </span>
            <span className={currentStep >= 3 ? "text-red-600 font-medium" : ""}>
              Cover Image
            </span>
          </div>
          <Progress value={progress} className="h-2 rounded-full" />
        </div>

        <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
          <Card className="rounded-3xl shadow-2xl">
            {/* Step 1: Account Information */}
            {currentStep === 1 && (
              <>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl">Account Information</CardTitle>
                  <CardDescription>
                    Fill in your basic information to get started
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-8">

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullname" className="flex items-center gap-2 text-sm font-medium">
                        <User className="h-4 w-4" />
                        Full Name
                      </Label>
                      <Input
                        id="fullname"
                        placeholder="John Doe"
                        className="rounded-2xl h-12"
                        {...register("fullname", { 
                          required: "Full name is required",
                          minLength: {
                            value: 3,
                            message: "Name must be at least 3 characters"
                          }
                        })}
                      />
                      {errors.fullname && (
                        <p className="text-red-500 text-sm">{errors.fullname.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="username" className="flex items-center gap-2 text-sm font-medium">
                        <User className="h-4 w-4" />
                        Username
                      </Label>
                      <Input
                        id="username"
                        placeholder="johndoe123"
                        className="rounded-2xl h-12"
                        {...register("username", { 
                          required: "Username is required",
                          pattern: {
                            value: /^[a-zA-Z0-9_]+$/,
                            message: "Username can only contain letters, numbers and underscores"
                          },
                          minLength: {
                            value: 3,
                            message: "Username must be at least 3 characters"
                          }
                        })}
                      />
                      {errors.username && (
                        <p className="text-red-500 text-sm">{errors.username.message}</p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        This will be your channel name and URL
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center gap-2 text-sm font-medium">
                        <Mail className="h-4 w-4" />
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        className="rounded-2xl h-12"
                        {...register("email", { 
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }
                        })}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-sm">{errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="flex items-center gap-2 text-sm font-medium">
                        <Lock className="h-4 w-4" />
                        Password
                      </Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Create a strong password"
                        className="rounded-2xl h-12 pr-12"
                        {...register("password", { 
                          required: "Password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters"
                          }
                        })}
                      />
                      {errors.password && (
                        <p className="text-red-500 text-sm">{errors.password.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword" className="flex items-center gap-2 text-sm font-medium">
                        <Lock className="h-4 w-4" />
                        Confirm Password
                      </Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm your password"
                        className="rounded-2xl h-12 pr-12"
                        {...register("confirmPassword", { 
                          required: "Please confirm your password",
                          validate: value => 
                            value === watch('password') || "Passwords don't match"
                        })}
                      />
                      {errors.confirmPassword && (
                        <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                      )}
                    </div>
                  </div>

                  {error && (
                    <div className="text-red-500 text-center">{error}</div>
                  )}

                  <Button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-red-600 hover:bg-red-700 rounded-2xl h-12 text-base font-medium"
                    disabled={loading}
                  >
                    Continue
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  <div className="text-center text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-red-600 hover:underline font-medium">
                      Sign in
                    </Link>
                  </div>
                </CardContent>
              </>
            )}

            {/* Step 2: Avatar Upload */}
            {currentStep === 2 && (
              <>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl flex items-center justify-center gap-2">
                    {watch('avatar') ? (
                      <CheckCircle className="h-6 w-6 text-green-500" />
                    ) : (
                      <Camera className="h-6 w-6 text-red-600" />
                    )}
                    Profile Picture
                  </CardTitle>
                  <CardDescription>
                    Add a profile picture to personalize your channel
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                  <div className="flex flex-col items-center space-y-6">
                    <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                      <AvatarImage src={avatarPreview || "/placeholder.svg?height=128&width=128"} />
                      <AvatarFallback className="text-4xl bg-gradient-to-br from-red-400 to-orange-400 text-white">
                        {watch('fullname')?.[0] || "U"}
                      </AvatarFallback>
                    </Avatar>

                    <div className="text-center space-y-4">
                      <h3 className="text-xl font-semibold">
                        Welcome, {watch('fullname')}!
                      </h3>
                      <p className="text-muted-foreground">
                        Choose a profile picture that represents you
                      </p>
                    </div>

                    {errors.avatar && (
                      <p className="text-red-500 text-sm text-center">
                        {errors.avatar.message}
                      </p>
                    )}

                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-2xl h-12 px-8 cursor-pointer"
                      onClick={() => avatarInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {watch('avatar') ? "Change Profile Picture" : "Upload Profile Picture"}
                    </Button>

                    <input
                      type="file"
                      accept="image/*"
                      ref={avatarInputRef}
                      className="hidden"
                      onChange={(e) => handleFileChange("avatar", e)}
                    />

                    <p className="text-xs text-muted-foreground text-center max-w-sm">
                      Recommended: Square image, at least 98x98 pixels. JPG, PNG, or GIF format.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="flex-1 rounded-2xl h-12 bg-transparent"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      type="button"
                      onClick={nextStep}
                      className="flex-1 bg-red-600 hover:bg-red-700 rounded-2xl h-12"
                      disabled={!watch('avatar')}
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </>
            )}

            {/* Step 3: Cover Image (Optional) */}
            {currentStep === 3 && (
              <>
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl flex items-center justify-center gap-2">
                    <Camera className="h-6 w-6 text-red-600" />
                    Cover Image
                  </CardTitle>
                  <CardDescription>
                    Add a cover image to make your channel stand out (Optional)
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 p-8">
                  <div className="space-y-6 relative">
                    <div className="w-full h-40 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 rounded-2xl flex items-center justify-center overflow-hidden relative">
                      {coverImagePreview ? (
                        <img
                          src={coverImagePreview}
                          alt="Cover"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="text-center text-white">
                          <Camera className="h-12 w-12 mx-auto mb-3 opacity-80" />
                          <p className="text-lg font-medium">
                            Your Channel Cover
                          </p>
                          <p className="text-sm opacity-80">Click to upload</p>
                        </div>
                      )}

                      <Button
                        type="button"
                        variant="secondary"
                        size="sm"
                        className="rounded-full cursor-pointer absolute bottom-3 right-3"
                        onClick={() => coverInputRef.current?.click()}
                      >
                        <Upload className="h-4 w-4 mr-2" />
                        {coverImagePreview ? "Change" : "Upload"}
                      </Button>

                      <input
                        type="file"
                        accept="image/*"
                        ref={coverInputRef}
                        className="hidden"
                        onChange={(e) => handleFileChange("coverImage", e)}
                      />
                    </div>

                    <div className="text-center space-y-2">
                      <h3 className="text-lg font-semibold">
                        Almost done, {watch('fullname')}!
                      </h3>
                      <p className="text-muted-foreground">
                        A cover image helps viewers recognize your channel. You can always add or change it later.
                      </p>
                    </div>

                    <div className="bg-muted/50 rounded-2xl p-4">
                      <h4 className="font-medium mb-2">Channel Preview</h4>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={avatarPreview || "/placeholder.svg?height=48&width=48"} />
                          <AvatarFallback>
                            {watch('fullname')?.[0] || "U"}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{watch('fullname')}</p>
                          <p className="text-sm text-muted-foreground">
                            @{watch('username')?.toLowerCase()}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={prevStep}
                      className="flex-1 rounded-2xl h-12 bg-transparent"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 bg-red-600 hover:bg-red-700 rounded-2xl h-12"
                      disabled={loading || !watch('avatar')}
                    >
                      {loading ? (
                        <span className="flex items-center justify-center">
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Creating account...
                        </span>
                      ) : (
                        <>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Complete Registration
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </>
            )}
          </Card>
        </form>

        {currentStep === 3 && (
          <div className="text-xs text-muted-foreground text-center mt-4">
            By creating an account, you agree to our{" "}
            <Link to="#" className="text-red-600 hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="#" className="text-red-600 hover:underline">
              Privacy Policy
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}