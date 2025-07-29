import { Link } from "react-router-dom";
import { useState, useRef } from "react";
import { Button } from "../../components/UI/Button";
import { Input } from "../../components/UI/Input";
import { Label } from "../../components/UI/Label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/UI/Card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/UI/Avatar";
import { Progress } from "../../components/UI/Progress";
import {
  User,
  Mail,
  Lock,
  Upload,
  Camera,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Play,
} from "lucide-react";

export default function RegisterPage() {
  const avatarInputRef = useRef(null);
  const coverInputRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    avatar: null,
    avatarPreview: null,
    coverImage: null,
    coverImagePreview: null,
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (field, e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewField = field + "Preview";

    setFormData((prev) => ({
      ...prev,
      [field]: file,
      [previewField]: URL.createObjectURL(file),
    }));
  };
  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const skipStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const progress = (currentStep / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 flex items-center justify-center p-4">
      {/* Logo in corner */}
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
            <span
              className={currentStep >= 1 ? "text-red-600 font-medium" : ""}
            >
              Account Info
            </span>
            <span
              className={currentStep >= 2 ? "text-red-600 font-medium" : ""}
            >
              Profile Picture
            </span>
            <span
              className={currentStep >= 3 ? "text-red-600 font-medium" : ""}
            >
              Cover Image
            </span>
          </div>
          <Progress value={progress} className="h-2 rounded-full" />
        </div>

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
                {/* Google Sign-In */}
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full h-12 rounded-2xl flex items-center justify-center gap-3 text-base font-medium"
                    // onClick={() => {
                    //   // TODO: Replace with real Google OAuth logic
                    //   console.log("Google Sign-In Clicked");
                    // }}
                  >
                    <img
                      src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
                      alt="Google"
                      className="h-5 w-5"
                    />
                    Continue with Google
                  </Button>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <div className="flex-grow h-px bg-muted-foreground/30" />
                    or continue with email
                    <div className="flex-grow h-px bg-muted-foreground/30" />
                  </div>
                </div>

                {/* Account Information Form Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstname"
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <User className="h-4 w-4" />
                      First Name
                    </Label>
                    <Input
                      id="firstname"
                      placeholder="John"
                      className="rounded-2xl h-12"
                      value={formData.firstname}
                      onChange={(e) =>
                        handleInputChange("firstname", e.target.value)
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastname"
                      className="flex items-center gap-2 text-sm font-medium"
                    >
                      <User className="h-4 w-4" />
                      Last Name
                    </Label>
                    <Input
                      id="lastname"
                      placeholder="Doe"
                      className="rounded-2xl h-12"
                      value={formData.lastname}
                      onChange={(e) =>
                        handleInputChange("lastname", e.target.value)
                      }
                    />
                  </div>
                </div>

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
                    placeholder="johndoe123"
                    className="rounded-2xl h-12"
                    value={formData.username}
                    onChange={(e) =>
                      handleInputChange("username", e.target.value)
                    }
                  />
                  <p className="text-xs text-muted-foreground">
                    This will be your channel name and URL
                  </p>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Mail className="h-4 w-4" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className="rounded-2xl h-12"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
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
                    placeholder="Create a strong password"
                    className="rounded-2xl h-12 pr-12"
                    value={formData.password}
                    onChange={(e) =>
                      handleInputChange("password", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="confirmPassword"
                    className="flex items-center gap-2 text-sm font-medium"
                  >
                    <Lock className="h-4 w-4" />
                    Confirm Password
                  </Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm your password"
                    className="rounded-2xl h-12 pr-12"
                    value={formData.confirmPassword}
                    onChange={(e) =>
                      handleInputChange("confirmPassword", e.target.value)
                    }
                  />
                </div>

                <Button
                  onClick={nextStep}
                  className="w-full bg-red-600 hover:bg-red-700 rounded-2xl h-12 text-base font-medium"
                >
                  Continue
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    className="text-red-600 hover:underline font-medium"
                  >
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
                  <CheckCircle className="h-6 w-6 text-green-500" />
                  Profile Picture
                </CardTitle>
                <CardDescription>
                  Add a profile picture to personalize your channel
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 bg-green-50 dark:bg-green-950/20 text-green-700 dark:text-green-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
                    <CheckCircle className="h-4 w-4" />
                    Account information saved successfully!
                  </div>
                </div>

                <div className="flex flex-col items-center space-y-6">
                  <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                    <AvatarImage
                      src={
                        formData.avatarPreview ||
                        "/placeholder.svg?height=128&width=128"
                      }
                    />
                    <AvatarFallback className="text-4xl bg-gradient-to-br from-red-400 to-orange-400 text-white">
                      {formData.firstname?.[0] || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div className="text-center space-y-4">
                    <h3 className="text-xl font-semibold">
                      Welcome, {formData.firstname}!
                    </h3>
                    <p className="text-muted-foreground">
                      Choose a profile picture that represents you
                    </p>
                  </div>

                  {/* File input hidden, triggered by button */}
                  <Button
                    variant="outline"
                    className="rounded-2xl h-12 px-8 cursor-pointer"
                    onClick={() => avatarInputRef.current?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Profile Picture
                  </Button>

                  <input
                    type="file"
                    accept="image/*"
                    ref={avatarInputRef}
                    className="hidden"
                    onChange={(e) => handleFileChange("avatar", e)}
                  />

                  <p className="text-xs text-muted-foreground text-center max-w-sm">
                    Recommended: Square image, at least 98x98 pixels. JPG, PNG,
                    or GIF format.
                  </p>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1 rounded-2xl h-12 bg-transparent"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    onClick={nextStep}
                    className="flex-1 bg-red-600 hover:bg-red-700 rounded-2xl h-12"
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
                    {formData.coverImagePreview ? (
                      <img
                        src={formData.coverImagePreview}
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

                    {/* Upload Button */}
                    <Button
                      variant="secondary"
                      size="sm"
                      className="rounded-full cursor-pointer absolute bottom-3 right-3"
                      onClick={() => coverInputRef.current?.click()}
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {formData.coverImagePreview ? "Change" : "Upload"}
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
                      Almost done, {formData.firstname}!
                    </h3>
                    <p className="text-muted-foreground">
                      A cover image helps viewers recognize your channel. You
                      can always add or change it later.
                    </p>
                  </div>

                  <div className="bg-muted/50 rounded-2xl p-4">
                    <h4 className="font-medium mb-2">Channel Preview</h4>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={
                            formData.avatarPreview ||
                            "/placeholder.svg?height=48&width=48"
                          }
                        />
                        <AvatarFallback>
                          {formData.firstname?.[0] || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {formData.firstname} {formData.lastname}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          @{formData.username.toLowerCase()}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    onClick={prevStep}
                    className="flex-1 rounded-2xl h-12 bg-transparent"
                  >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back
                  </Button>
                  <div className="flex gap-2 flex-1">
                    <Button
                      variant="outline"
                      onClick={skipStep}
                      className="flex-1 rounded-2xl h-12 bg-transparent"
                    >
                      Skip
                    </Button>
                    <Button className="flex-1 bg-red-600 hover:bg-red-700 rounded-2xl h-12">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Complete
                    </Button>
                  </div>
                </div>
              </CardContent>
            </>
          )}
        </Card>

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
