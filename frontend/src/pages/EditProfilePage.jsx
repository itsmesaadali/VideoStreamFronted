import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  changePassword,
  uploadAvatar,
  uploadCoverImage,
  selectCurrentUser,
} from "../store/features/authSlice";
import { Button } from "../components/UI/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/UI/Card";
import { Input } from "../components/UI/Input";
import { Label } from "../components/UI/Label";
import { Avatar, AvatarImage } from "../components/UI/Avatar";
import { Upload as UploadIcon } from "lucide-react";
import { toast } from "react-hot-toast";

export default function EditProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector(selectCurrentUser);
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [activeTab, setActiveTab] = useState("password");

  // Password form
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError,
    watch,
  } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const newPassword = watch("newPassword");

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setAvatarFile(e.target.files[0]);
    }
  };

  const handleCoverChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setCoverFile(e.target.files[0]);
    }
  };

  const onSubmitPassword = async (data) => {
    if (data.newPassword !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords don't match",
      });
      return;
    }

    try {
      await dispatch(
        changePassword({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
        })
      ).unwrap();

      toast.success("Password changed successfully!");
      reset();
      navigate("/profile");
    } catch (error) {
      if (error.message === "Invalid old password") {
        setError("currentPassword", {
          type: "manual",
          message: "Current password is incorrect",
        });
      } else {
        toast.error(error.message || "An error occurred");
      }
    }
  };

  const onSubmitAvatar = async (e) => {
    e.preventDefault();
    if (!avatarFile) {
      toast.error("Please select an avatar image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);

      await dispatch(uploadAvatar(formData)).unwrap();

      toast.success("Avatar updated successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error(error.message || "Failed to update avatar");
    }
  };

  const onSubmitCover = async (e) => {
    e.preventDefault();
    if (!coverFile) {
      toast.error("Please select a cover image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("coverImage", coverFile);

      await dispatch(uploadCoverImage(formData)).unwrap();

      toast.success("Cover image updated successfully!");
      navigate("/profile");
    } catch (error) {
      toast.error(error.message || "Failed to update cover image");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Edit Profile</h1>
          <Button variant="outline" onClick={() => navigate("/profile")}>
            Back to Profile
          </Button>
        </div>

        <div className="flex border-b mb-6">
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "password" ? "border-b-2 border-red-500" : ""
            }`}
            onClick={() => setActiveTab("password")}
          >
            Password
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "avatar" ? "border-b-2 border-red-500" : ""
            }`}
            onClick={() => setActiveTab("avatar")}
          >
            Avatar
          </button>
          <button
            className={`px-4 py-2 font-medium ${
              activeTab === "cover" ? "border-b-2 border-red-500" : ""
            }`}
            onClick={() => setActiveTab("cover")}
          >
            Cover Image
          </button>
        </div>

        {activeTab === "password" && (
          <form onSubmit={handleSubmit(onSubmitPassword)}>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentUser?.isGoogleAuth === true ? (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">
                      You signed up with Google. To change your password, please
                      update it through your Google account.
                    </p>
                  </div>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        placeholder="Enter current password"
                        {...register("currentPassword", {
                          required: "Current password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                      />
                      {errors.currentPassword && (
                        <p className="text-sm text-red-500">
                          {errors.currentPassword.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        type="password"
                        placeholder="Enter new password"
                        {...register("newPassword", {
                          required: "New password is required",
                          minLength: {
                            value: 6,
                            message: "Password must be at least 6 characters",
                          },
                        })}
                      />
                      {errors.newPassword && (
                        <p className="text-sm text-red-500">
                          {errors.newPassword.message}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="confirmPassword">Confirm Password</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirm new password"
                        {...register("confirmPassword", {
                          required: "Please confirm your password",
                          validate: (value) =>
                            value === newPassword || "Passwords don't match",
                        })}
                      />
                      {errors.confirmPassword && (
                        <p className="text-sm text-red-500">
                          {errors.confirmPassword.message}
                        </p>
                      )}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
            {currentUser?.isGoogleAuth !== true && (
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => navigate("/profile")}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? "Changing..." : "Change Password"}
                </Button>
              </div>
            )}
          </form>
        )}

        {activeTab === "avatar" && (
          <form onSubmit={onSubmitAvatar}>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Update Avatar</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-4">
                  <Avatar className="h-32 w-32">
                    {avatarFile ? (
                      <img
                        src={URL.createObjectURL(avatarFile)}
                        alt="Preview"
                        className="h-full w-full object-cover rounded-full"
                      />
                    ) : currentUser?.avatar ? (
                      <AvatarImage src={currentUser.avatar} alt="User Avatar" />
                    ) : (
                      <span className="text-4xl font-bold text-white bg-gray-500 h-full w-full flex items-center justify-center rounded-full">
                        {currentUser?.username?.charAt(0).toUpperCase() || "U"}
                      </span>
                    )}
                  </Avatar>
                  <div>
                    <Label htmlFor="avatar-upload" className="cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80">
                        <UploadIcon className="h-4 w-4" />
                        <span>Choose Avatar</span>
                      </div>
                    </Label>
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/png, image/jpeg, image/jpg, image/webp"
                      onChange={handleAvatarChange}
                      className="hidden"
                    />
                    {avatarFile && (
                      <p className="text-sm mt-2 text-center">
                        {avatarFile.name}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => navigate("/profile")}>
                Cancel
              </Button>
              <Button type="submit" disabled={!avatarFile}>
                Upload Avatar
              </Button>
            </div>
          </form>
        )}

        {activeTab === "cover" && (
          <form onSubmit={onSubmitCover}>
            <Card className="mb-4">
              <CardHeader>
                <CardTitle>Update Cover Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100">
                    {coverFile ? (
                      <img
                        src={URL.createObjectURL(coverFile)}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    ) : currentUser?.coverImage ? (
                      <img
                        src={currentUser.coverImage}
                        alt="Cover"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-r from-blue-500 to-purple-500" />
                    )}
                  </div>
                  <div>
                    <Label htmlFor="cover-upload" className="cursor-pointer">
                      <div className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/80">
                        <UploadIcon className="h-4 w-4" />
                        <span>Choose Cover Image</span>
                      </div>
                    </Label>
                    <input
                      id="cover-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleCoverChange}
                      className="hidden"
                    />
                    {coverFile && (
                      <p className="text-sm mt-2">{coverFile.name}</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => navigate("/profile")}>
                Cancel
              </Button>
              <Button type="submit" disabled={!coverFile}>
                Upload Cover
              </Button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}