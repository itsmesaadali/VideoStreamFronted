// components/EditProfile.jsx
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import {
  changePassword,
  uploadAvatar,
  uploadCoverImage,
} from "../store/features/authSlice";
import { Button } from "./UI/Button";
import { Card, CardContent } from "./UI/Card";
import { Input } from "./UI/Input";
import { Label } from "./UI/Label";
import { Avatar, AvatarImage } from "./UI/Avatar";
import { X, Upload as UploadIcon } from "lucide-react";

export const EditProfile = ({ user, onClose }) => {
  const dispatch = useDispatch();
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [activeTab, setActiveTab] = useState("password");
  const [message, setMessage] = useState("");

  // Password form
  const {
    register,
    handleSubmit,
    formState: { errors },
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

const onSubmitPassword = async (data) => {  // Remove the 'e' parameter
  if (data.newPassword !== data.confirmPassword) {
    setError("confirmPassword", {
      type: "manual",
      message: "Passwords don't match"
    });
    return;
  }

  try {
    await dispatch(changePassword({
      currentPassword: data.currentPassword,
      newPassword: data.newPassword
    })).unwrap();
    
    setMessage('Password changed successfully!');
    reset();
    setTimeout(() => setMessage(''), 3000);
  } catch (error) {
    if (error.message === "Invalid old password") {
      setError('currentPassword', {
        type: 'manual',
        message: 'Current password is incorrect'
      });
    } else {
      setMessage(error.message || 'An error occurred');
      setTimeout(() => setMessage(''), 3000);
    }
  }
};

  const onSubmitAvatar = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!avatarFile) {
      setMessage("Please select an avatar image");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("avatar", avatarFile);

      const result = await dispatch(uploadAvatar(formData)).unwrap();

      setMessage("Avatar updated successfully!");
      setAvatarFile(null);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error.message || "Failed to update avatar");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const onSubmitCover = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!coverFile) {
      setMessage("Please select a cover image");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    try {
      const formData = new FormData();
      formData.append("coverImage", coverFile);

      const result = await dispatch(uploadCoverImage(formData)).unwrap();

      setMessage("Cover image updated successfully!");
      setCoverFile(null);
      setTimeout(() => setMessage(""), 3000);
    } catch (error) {
      setMessage(error.message || "Failed to update cover image");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Edit Profile</h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <X className="h-5 w-5" />
            </button>
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

          {message && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
              {message}
            </div>
          )}

          {activeTab === "password" && (
            <form onSubmit={handleSubmit(onSubmitPassword)}>
              <Card className="mb-4">
                <CardContent className="p-6 space-y-4">
                  {user?.isGoogleAuth === true ? (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">
                        You signed up with Google. To change your password,
                        please update it through your Google account.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <Label htmlFor="currentPassword">
                          Current Password
                        </Label>
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
                        <Label htmlFor="confirmPassword">
                          Confirm Password
                        </Label>
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
              {user?.isGoogleAuth !== true && (
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit">Change Password</Button>
                </div>
              )}
            </form>
          )}

          {activeTab === "avatar" && (
            <form onSubmit={onSubmitAvatar}>
              <Card className="mb-4">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-32 w-32">
                      {avatarFile ? (
                        <img
                          src={URL.createObjectURL(avatarFile)}
                          alt="Preview"
                          className="h-full w-full object-cover rounded-full"
                        />
                      ) : user?.avatar ? (
                        <AvatarImage src={user.avatar} alt="User Avatar" />
                      ) : (
                        <span className="text-4xl font-bold text-white bg-gray-500 h-full w-full flex items-center justify-center rounded-full">
                          {user?.username?.charAt(0).toUpperCase() || "U"}
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
                <Button variant="outline" onClick={onClose}>
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
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-4">
                    <div className="relative w-full h-40 rounded-lg overflow-hidden bg-gray-100">
                      {coverFile ? (
                        <img
                          src={URL.createObjectURL(coverFile)}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : user?.coverImage ? (
                        <img
                          src={user.coverImage}
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
                <Button variant="outline" onClick={onClose}>
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
    </div>
  );
};
