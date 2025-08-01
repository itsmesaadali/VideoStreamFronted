import {Link, useNavigate } from  'react-router-dom'
import { Button } from "../components/UI/Button"
import {  Home, ArrowLeft} from "lucide-react"

export default function NotFound() {

    const navigate = useNavigate()
    

  return (

    <>


      {/* Main Content */}
      <main className="container px-4 py-12 flex justify-center">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Error Section */}
          <div className="mb-12">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-red-50 dark:bg-red-950/20 rounded-full mb-8">
              <div className="text-6xl font-bold text-red-600">404</div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-4">Oops! Page Not Found</h1>

            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              The page you're looking for seems to have disappeared. It might have been removed, renamed, or is
              temporarily unavailable.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/">
                <Button className="bg-red-600 hover:bg-red-700 rounded-2xl h-12 px-8 text-base font-medium">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Button>
              </Link>

              <Button onClick={()=> navigate(-1)} variant="outline" className="rounded-2xl h-12 px-8 text-base font-medium bg-transparent">
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Button>
            </div>

          </div>

          
        </div>
      </main>
    </>

  )
}
