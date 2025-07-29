import { Avatar, AvatarFallback, AvatarImage } from '../components/UI/Avatar'
import { Card, CardContent } from "../components/UI/Card"
import { videos } from '../DummyData/data.js'

export const Home = () => {
  return (
    <>
      {/* Main Content */}
      <main className="px-6 py-6 mx-auto max-w-8xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
          {videos.map((video) => (
            <div key={video.id} className="flex flex-col">
              {/* Thumbnail */}
              <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-3 ">
                <img
                  src={video.thumbnail || "/placeholder.svg"}
                  alt={video.title}
                  className="w-full h-full object-cover "
                />
                <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                  {video.duration || "12:34"}
                </div>
              </div>
              
              {/* Video Info */}
              <div className="flex gap-3">
                <Avatar className="w-9 h-9 flex-shrink-0">
                  <AvatarImage src={video.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{video.channel[0]}</AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm line-clamp-2 mb-0.5 leading-tight">
                    {video.title}
                  </h3>
                  <p className="text-xs text-muted-foreground hover:text-foreground">
                    {video.channel}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {video.views} • {video.time}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>  
    </> 
  )
}