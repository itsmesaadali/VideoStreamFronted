import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { selectCurrentUser, selectIsAuthenticated, getCurrentUser } from "../store/features/authSlice";
import { Button } from "../components/UI/Button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/UI/Card";
import { Avatar, AvatarImage } from "../components/UI/Avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/UI/Tabs";
import { Users, Calendar, MapPin, LinkIcon, Settings, Upload, ThumbsUp, MessageCircle, Share2 } from "lucide-react";

export default function ProfilePage() {
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Fetch user data when component mounts or auth state changes
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCurrentUser());
    }
  }, [dispatch, isAuthenticated]);

  // Optional videos data - fallback to empty array if not available
  const userVideos = currentUser?.videos || [];

  // Format join date if available
  const joinDate = currentUser?.createdAt 
    ? new Date(currentUser.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : 'Unknown';


  return (
    <div className="bg-background flex flex-col min-h-screen items-center overflow-hidden">
      {/* Cover Image */}
      <div 
        className="relative h-48 md:h-64 w-full bg-cover bg-center"
        style={{
          backgroundImage: currentUser?.coverImage 
            ? `url(${currentUser.coverImage})` 
            : 'linear-gradient(to right, #3b82f6, #8b5cf6, #ec4899)'
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Profile Info */}
      <div className="container px-4 flex-1">
        <div className="relative -mt-16 md:-mt-20">
          <div className="flex flex-col md:flex-row items-start md:items-end gap-6 mb-8">
            <Avatar className="h-32 w-32 border-4 border-background">
              <AvatarImage src={currentUser?.avatar} />
            </Avatar>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">
                    {currentUser?.fullname || currentUser?.username || 'User'}
                  </h1>
                  <div className="flex items-center gap-4 text-muted-foreground mb-2">
                    <span>@{currentUser?.username || 'username'}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {currentUser?.subscriberCount?.toLocaleString() || '0'} subscribers
                    </span>
                    <span>•</span>
                    <span>{userVideos?.length || 0} videos</span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="rounded-2xl bg-transparent">
                    <Settings className="h-4 w-4 mr-2" />
                    Customize
                  </Button>
                  <Button className="rounded-2xl">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Video
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Card className="rounded-2xl hover:border-red-500 border-2">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {currentUser?.totalViews?.toLocaleString() || '0'}
                </div>
                <div className="text-sm text-muted-foreground">Total Views</div>
              </CardContent>
            </Card>
            <Card className="rounded-2xl hover:border-red-500 border-2">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  {currentUser?.subscriberCount?.toLocaleString() || '0'}
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
                  {currentUser?.totalLikes?.toLocaleString() || '0'}
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
                      <h3 className="font-semibold text-sm line-clamp-2 mb-2">{video.title}</h3>
                      <p className="text-xs text-muted-foreground mb-3">
                        {video.views} • {video.time}
                      </p>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="rounded-full">
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {video.likes || 0}
                        </Button>
                        <Button variant="ghost" size="sm" className="rounded-full">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {video.comments || 0}
                        </Button>
                        <Button variant="ghost" size="sm" className="rounded-full">
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
                  {currentUser?.playlists?.length ? 'Your Playlists' : 'No playlists yet'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {currentUser?.playlists?.length 
                    ? 'Your created playlists' 
                    : 'Create playlists to organize your videos'}
                </p>
                <Button className="rounded-2xl">Create Playlist</Button>
              </div>
            </TabsContent>

            <TabsContent value="community" className="mt-6">
              <div className="text-center py-12 pb-6">
                <h3 className="text-lg font-semibold mb-2">
                  {currentUser?.communityPosts?.length ? 'Community Posts' : 'No community posts'}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {currentUser?.communityPosts?.length
                    ? 'Your recent community posts'
                    : 'Share updates with your subscribers'}
                </p>
                <Button className="rounded-2xl">Create Post</Button>
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
                      <span className="text-sm">
                        Joined {joinDate}
                      </span>
                    </div>
                    {currentUser?.location && (
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{currentUser.location}</span>
                      </div>
                    )}
                    {currentUser?.website && (
                      <div className="flex items-center gap-2">
                        <LinkIcon className="h-4 w-4 text-muted-foreground" />
                        <Link 
                          href={currentUser.website} 
                          className="text-sm text-red-600 hover:underline"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {currentUser.website}
                        </Link>
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
                      <span className="text-sm text-muted-foreground">Total views</span>
                      <span className="text-sm font-medium">
                        {currentUser?.totalViews?.toLocaleString() || '0'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Subscribers</span>
                      <span className="text-sm font-medium">
                        {currentUser?.subscriberCount?.toLocaleString() || '0'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-muted-foreground">Videos uploaded</span>
                      <span className="text-sm font-medium">
                        {userVideos?.length || 0}
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
  )
}