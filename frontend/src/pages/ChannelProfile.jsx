import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import {
  fetchUserChannelProfile,
  clearChannelProfile,
} from "../store/features/userProfileSlice";
import { selectCurrentUser } from "../store/features/authSlice";
import { Button } from "../components/UI/Button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/UI/Card";
import { Avatar, AvatarImage } from "../components/UI/Avatar";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/UI/Tabs";
import {
  Users,
  Calendar,
  MapPin,
  LinkIcon,
  Upload,
  ThumbsUp,
  MessageCircle,
  Share2,
  Mail,
  History,
} from "lucide-react";

const ChannelProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { channelProfile, loading, error } = useSelector(
    (state) => state.userProfile
  );

  // Inside your ChannelProfile component:
  const currentUser = useSelector(selectCurrentUser);
  const isOwnProfile = currentUser?.username === username;

  useEffect(() => {
    dispatch(fetchUserChannelProfile(username));

    return () => {
      dispatch(clearChannelProfile());
    };
  }, [dispatch, username]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );

  if (error)
    return (
      <div className="p-4 bg-red-100 text-red-700 rounded-lg max-w-md mx-auto mt-8">
        Error: {error}
      </div>
    );

  if (!channelProfile)
    return (
      <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg max-w-md mx-auto mt-8">
        Channel not found
      </div>
    );

  const userVideos = channelProfile?.videos || [];
  const joinDate = channelProfile?.createdAt
    ? new Date(channelProfile.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Unknown";

  return (
    <div className="bg-background flex flex-col min-h-screen items-center overflow-hidden">
      {/* Cover Image */}
      <div
        className="relative h-48 md:h-64 w-full bg-cover bg-center"
        style={{
          backgroundImage: channelProfile?.coverImage
            ? `url(${channelProfile.coverImage})`
            : "linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)",
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Profile Info */}
      <div className="container px-4 flex-1">
        <div className="relative -mt-16 md:-mt-20">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={channelProfile?.avatar} />
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {channelProfile?.fullname ||
                      channelProfile?.username ||
                      "User"}
                  </h1>
                  <div className="flex items-center gap-4 text-muted-foreground mb-2">
                    <span>@{channelProfile?.username || "username"}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {channelProfile?.subscribersCount?.toLocaleString() ||
                        "0"}{" "}
                      subscribers
                    </span>
                    <span>•</span>
                    <span>{userVideos?.length || 0} videos</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  
                  {!isOwnProfile && (
                    <Button
                      variant={
                        channelProfile?.isSubscribed ? "outline" : "default"
                      }
                      className="rounded-2xl"
                    >
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      {channelProfile?.isSubscribed
                        ? "Subscribed"
                        : "Subscribe"}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="rounded-2xl hover:border-red-500 border-2">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {channelProfile?.totalViews?.toLocaleString() || "0"}
                </div>
                <div className="text-sm text-muted-foreground">Total Views</div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl hover:border-red-500 border-2">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {channelProfile?.subscribersCount?.toLocaleString() || "0"}
                </div>
                <div className="text-sm text-muted-foreground">Subscribers</div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl hover:border-red-500 border-2">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {userVideos?.length || 0}
                </div>
                <div className="text-sm text-muted-foreground">Videos</div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl hover:border-red-500 border-2">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {channelProfile?.totalLikes?.toLocaleString() || "0"}
                </div>
                <div className="text-sm text-muted-foreground">Likes</div>
              </CardContent>
            </Card>
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="videos" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="playlists">Playlists</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
            </TabsList>

            <TabsContent value="videos" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-6">
                {userVideos?.map((video) => (
                  <Card
                    key={video.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer rounded-2xl"
                  >
                    <div className="relative">
                      <img
                        src={video.thumbnail || "/placeholder.svg"}
                        alt={video.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                        {video.duration}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-sm line-clamp-2 mb-2">
                        {video.title}
                      </h3>
                      <p className="text-xs text-muted-foreground mb-3">
                        {video.views} • {video.time}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full"
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {video.likes || 0}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full"
                        >
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {video.comments || 0}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="rounded-full"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="playlists" className="mt-6">
              <div className="text-center py-12 pb-6">
                <h3 className="text-lg font-semibold mb-2">
                  {channelProfile?.playlists?.length
                    ? "Playlists"
                    : "No playlists yet"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {channelProfile?.playlists?.length
                    ? "Created playlists"
                    : "This channel hasn't created any playlists"}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="community" className="mt-6">
              <div className="text-center py-12 pb-6">
                <h3 className="text-lg font-semibold mb-2">
                  {channelProfile?.communityPosts?.length
                    ? "Community Posts"
                    : "No community posts"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {channelProfile?.communityPosts?.length
                    ? "Recent community posts"
                    : "This channel hasn't posted anything to the community"}
                </p>
              </div>
            </TabsContent>

            <TabsContent value="about" className="mt-6 pb-6">
              <div className="grid md:grid-cols-2 gap-5">
                <Card className="rounded-2xl">
                  <CardHeader>
                    <CardTitle>Channel Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">Joined {joinDate}</span>
                    </div>
                    {channelProfile?.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">
                          {channelProfile.location}
                        </span>
                      </div>
                    )}
                    {channelProfile?.website && (
                      <div className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4 text-muted-foreground" />
                        <Link
                          to={channelProfile.website}
                          className="text-sm text-red-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {channelProfile.website}
                        </Link>
                      </div>
                    )}
                    {channelProfile?.email && (
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{channelProfile.email}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card className="rounded-2xl">
                  <CardHeader>
                    <CardTitle>Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Total views
                      </span>
                      <span className="text-sm font-medium">
                        {channelProfile?.totalViews?.toLocaleString() || "0"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Subscribers
                      </span>
                      <span className="text-sm font-medium">
                        {channelProfile?.subscribersCount?.toLocaleString() ||
                          "0"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Videos uploaded
                      </span>
                      <span className="text-sm font-medium">
                        {userVideos?.length || 0}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">
                        Channels subscribed
                      </span>
                      <span className="text-sm font-medium">
                        {channelProfile?.channelsSubscribedToCount || "0"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ChannelProfile;
