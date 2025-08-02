// components/EditProfile.jsx
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile, changePassword, uploadAvatar, uploadCoverImage } from "../store/features/authSlice";
import { Button } from "./UI/Button";
import { Card, CardContent, CardHeader, CardTitle } from "./UI/Card";
import { Input } from "./UI/Input";
import { Label } from "./UI/Label";
import { Avatar, AvatarImage } from "./UI/Avatar";
import { X, Upload as UploadIcon } from "lucide-react";

export const EditProfile = ({ user, onClose }) => {
  const dispatch = useDispatch();
 
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile] = useState(null);
  const [activeTab, setActiveTab] = useState('password');
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState('');

  

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

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

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(updateUserProfile(formData)).unwrap();
      setMessage('Profile updated successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setErrors(error);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrors({ confirmPassword: "Passwords don't match" });
      return;
    }
    
    try {
      await dispatch(changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      })).unwrap();
      setMessage('Password changed successfully!');
      setPasswordData({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setErrors(error);
    }
  };

  const handleAvatarSubmit = async (e) => {
    e.preventDefault();
    if (!avatarFile) return;
    
    try {
      const formData = new FormData();
      formData.append('avatar', avatarFile);
      await dispatch(uploadAvatar(formData)).unwrap();
      setMessage('Avatar updated successfully!');
      setAvatarFile(null);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setErrors(error);
    }
  };

  const handleCoverSubmit = async (e) => {
    e.preventDefault();
    if (!coverFile) return;
    
    try {
      const formData = new FormData();
      formData.append('coverImage', coverFile);
      await dispatch(uploadCoverImage(formData)).unwrap();
      setMessage('Cover image updated successfully!');
      setCoverFile(null);
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setErrors(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-background rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 bg-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Edit Profile</h2>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex border-b mb-6">

            <button
              className={`px-4 py-2 font-medium ${activeTab === 'password' ? 'border-b-2 border-red-500' : ''}`}
              onClick={() => setActiveTab('password')}
            >
              Password
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'avatar' ? 'border-b-2 border-red-500' : ''}`}
              onClick={() => setActiveTab('avatar')}
            >
              Avatar
            </button>
            <button
              className={`px-4 py-2 font-medium ${activeTab === 'cover' ? 'border-b-2 border-red-500' : ''}`}
              onClick={() => setActiveTab('cover')}
            >
              Cover Image
            </button>
          </div>

          {message && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
              {message}
            </div>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSubmit}>
              <Card className="mb-4">
                <CardContent className="p-6 space-y-4">
                  {user?.provider === 'google' ? (
                    <div className="text-center py-4">
                      <p className="text-muted-foreground">
                        You signed up with Google. To change your password, please update it through your Google account.
                      </p>
                    </div>
                  ) : (
                    <>
                      <div>
                        <Label htmlFor="currentPassword">Current Password</Label>
                        <Input
                          id="currentPassword"
                          name="currentPassword"
                          type="password"
                          value={passwordData.currentPassword}
                          onChange={handlePasswordChange}
                          placeholder="Enter current password"
                        />
                        {errors.currentPassword && (
                          <p className="text-sm text-red-500">{errors.currentPassword}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          name="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={handlePasswordChange}
                          placeholder="Enter new password"
                        />
                        {errors.newPassword && (
                          <p className="text-sm text-red-500">{errors.newPassword}</p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="confirmPassword">Confirm Password</Label>
                        <Input
                          id="confirmPassword"
                          name="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={handlePasswordChange}
                          placeholder="Confirm new password"
                        />
                        {errors.confirmPassword && (
                          <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                        )}
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
              {user?.provider !== 'google' && (
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={onClose}>Cancel</Button>
                  <Button type="submit">Change Password</Button>
                </div>
              )}
            </form>
          )}

          {activeTab === 'avatar' && (
            <form onSubmit={handleAvatarSubmit}>
              <Card className="mb-4">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center gap-4">
                    <Avatar className="h-32 w-32">
                      <AvatarImage 
                        src={avatarFile ? URL.createObjectURL(avatarFile) : user?.avatar} 
                      />
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
                        accept="image/*"
                        onChange={handleAvatarChange}
                        className="hidden"
                      />
                      {avatarFile && (
                        <p className="text-sm mt-2">{avatarFile.name}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button type="submit" disabled={!avatarFile}>Upload Avatar</Button>
              </div>
            </form>
          )}

          {activeTab === 'cover' && (
            <form onSubmit={handleCoverSubmit}>
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
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button type="submit" disabled={!coverFile}>Upload Cover</Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};