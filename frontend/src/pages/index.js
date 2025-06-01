import Image from "next/image"
import Link from "next/link"
// import { Button } from "@mui/components/button"
import { ArrowRight, ChevronDown, ClipboardList, Users, Bell } from "lucide-react"
import { Box, Typography} from "@mui/material"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      {/* <header className="sticky top-0 z-50 w-full bg-white border-b shadow-sm">
        <div className="container flex items-center justify-between h-16 mx-auto px-4 sm:px-6"> */}
          {/* <Link href="/" className="flex items-center space-x-2">
            <ClipboardList className="h-8 w-8 text-[#81a651]" />
            <span className="text-xl font-bold text-[#81a651]">Obligo</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link
              href="#features"
              className="text-[#9e8772] hover:text-[#81a651] text-sm font-medium transition-colors"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-[#9e8772] hover:text-[#81a651] text-sm font-medium transition-colors"
            >
              How It Works
            </Link>
            <Link href="#pricing" className="text-[#9e8772] hover:text-[#81a651] text-sm font-medium transition-colors">
              Pricing
            </Link>
            <Link href="/login" className="text-[#9e8772] hover:text-[#81a651] text-sm font-medium transition-colors">
              Login
            </Link>
          </nav> */}
          {/* <div className="flex items-center space-x-4">
            <Button asChild className="hidden md:flex bg-[#81a651] hover:bg-[#6a8a43] text-white">
              <Link href="/signup">Get Started</Link>
            </Button>
            <button className="flex md:hidden p-2 -m-2 text-[#9e8772]">
              <span className="sr-only">Open menu</span>
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div> */}
        {/* </div>
      </header> */}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-b from-[#f5f5d5] to-white pt-16 pb-24 md:pt-24 md:pb-32 h-screen">
          <div className="container h-full px-4 sm:px-6 mx-auto">
            <div className="grid h-full gap-12 lg:grid-cols-2 lg:gap-8 items-center">
              <div className="flex flex-col space-y-6 max-w-2xl">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#81a651]">
                  Make household chores simple and fair
                </h1>
                <p className="text-xl text-[#9e8772]">
                  Obligo helps families, roommates, and households organize, track and distribute chores effortlessly.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/login" className=" inline-flex items-center">
                  <button 
                    asChild 
                    size="lg" 
                    className="flex items-center bg-[#81a651] hover:bg-[#6a8a43] text-white pt-2 pb-2 pl-8 pr-8 rounded-md">
                      <span> Get Started</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                  </Link>
                  <Link href="#how-it-works">
                  <button 
                    asChild 
                    variant="outline" 
                    size="lg" 
                    className="border text-[#81a651] bg-white border-[#81a651] pt-2 pb-2 pl-8 pr-8 rounded-md hover:bg-[#81a651] hover:text-white transition-colors duration-300">
                    <span>See How It Works</span>
                  </button>
                  </Link>
                </div>
              </div>
              {/* <div className="relative mx-auto lg:mx-0 w-full max-w-md h-[400px]">
                <Image
                  src="/placeholder.svg?height=400&width=400"
                  alt="Obligo app demo"
                  fill
                  className="object-contain"
                  priority
                />
              </div> */}
            </div>
          </div>
          {/* <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-6">
            <a href="#features" className="text-[#9e8772] hover:text-[#81a651]">
              <ChevronDown className="h-8 w-8 animate-bounce" />
              <span className="sr-only">Scroll down</span>
            </a>
          </div> */}
        </section>

        {/* SHOWCASE OF FEATURES WITH IMAGES */}
        

        {/* FIRST ROW OF SHOWCASE */}
        
        <Box sx={{
            display: 'flex',
            flexDirection: {xs: 'column', md: 'row'},
            alignItems: 'center',
            // justifyContent: 'center',
            // width: '100%',
            margin: {xs: 1, md: 2},
            marginBottom: {xs: 12, md: 8},
            marginTop: {xs: 4, md: 0}
            }}>

              {/* This box holds the typography elements on the left half of each row.
              I need this so I can put a margin on the typographies on small screens */}

              <Box sx = {{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              // justifyContent: {xs: 'center', md: 'none'},
              margin: {xs: 4, md: 4},
              marginBottom: {xs: 2, md:4},
              width: {md: '40%'},
              }}>

          
            
                <Typography gutterBottom variant="h5" component="div" sx={
                { color: "var(--text-color)", 
                  textAlign: {xs: "start", md: 'start'},
                  width: {xs: '100%', md: '100%'} ,
                  // margin: {xs: 4, md: 0}
                }}>
                  <strong> Team up to tackle chores together! </strong>
                  <Typography gutterBottom variant="body1" component="div" sx={
                    { color: "var(--text-color)", 
                      // margin: {xs: 4, md: 4}, 
                      textAlign: {xs: "start", md: 'start'},
                      // width: {xs: '100%', md: '70%'} 
                    }
                    }>
                      {/* <strong>  */}
                        Build your family group and assign chores to each member effortlessly. 
                        Obligo ensures everyone knows what to do and when to do it.
                      {/* </strong> */}
                  </Typography >
                </Typography>
              </Box> {/* End of left half of row*/}
              
              <Box sx = {{}}>
                <Image 
                src="/Family.png"
                width= '700'
                height= '700'
                alt="Family Page"
                />
              </Box>
            </Box>


            {/* BOX FOR SECOND ROW OF FEATURE SHOWCASE
                BOX FOR SECOND ROW OF FEATURE SHOWCASE
            */}  

          <Box sx={{
            display: 'flex',
            flexDirection: {xs: 'column', md: 'row'},
            alignItems: 'center',
            // justifyContent: 'center',
            // width: '100%',
            margin: {xs: 1, md: 2},
            marginTop: {xs: 4, md: 0}
            }}>
              
              {/* want this to be on left side on medium screens but this shows up above the text on small screens
              Therefore i have to disable it for small screens */}
              <Box sx = {{ display: {xs: 'none', md: 'flex'}, width: '100%'}}>
                <Image
                src="/dashboard.png"
                width= '700'
                height= '700'
                alt="Dashboard Page"
                />
              </Box>

              {/* This box holds the typography elements on the left half of each row.
              I need this so I can put a margin on the typographies on small screens */}

              <Box sx = {{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              // justifyContent: {xs: 'center', md: 'none'},
              margin: {xs: 4, md: 4},
              marginBottom: {xs: 2, md:4} //overrides earlier margin bottom of 4 above
              // width: '100%',
              }}>

                <Typography gutterBottom variant="h5" component="div" sx={
                { color: "var(--text-color)", 
                  textAlign: {xs: "start", md: 'start'},
                  width: {xs: '100%', md: '100%'} ,
                  // margin: {xs: 4, md: 0}
                }}>
                  <strong> All your tasks in one place. </strong>
                  <Typography gutterBottom variant="body1" component="div" sx={
                    { color: "var(--text-color)", 
                      // margin: {xs: 4, md: 4}, 
                      textAlign: {xs: "start", md: 'start'},
                      // width: {xs: '100%', md: '70%'} 
                    }
                    }>
                      Stay on top of your to-dos with a centralized dashboard showing every chore, 
                      its details, and deadlines—no more guessing who’s doing what!
                  </Typography >
                </Typography>
              </Box> {/* End of right half of row*/}

              <Box sx = {{ display: {xs: 'block', md: 'none'}}}>
                <Image
                src="/dashboard.png"
                width= '700'
                height= '700'
                alt="Dashboard Page"
                />
              </Box>
            </Box>
            <br />
            <br />
            <br />


            {/* BOX FOR THIRD ROW OF SHOWCASE */}
            {/* BOX FOR THIRD ROW OF SHOWCASE */}
            {/* BOX FOR THIRD ROW OF SHOWCASE */}

            <Box sx={{
            display: 'flex',
            flexDirection: {xs: 'column', md: 'row'},
            alignItems: 'center',
            // justifyContent: 'center',
            // width: '100%',
            margin: {xs: 1, md: 2},
            marginTop: {xs: 4, md: 0},
            marginBottom: {xs: 12, md: 20}
            }}>
            

              {/* This box holds the typography elements on the left half of each row.
              I need this so I can put a margin on the typographies on small screens */}

              <Box sx = {{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              // justifyContent: {xs: 'center', md: 'none'},
              margin: {xs: 4, md: 4},
              marginBottom: {xs: 2, md:4}, //overrides earlier margin bottom of 4 above
              width: {md: '40%'}, //no width for sm cuz it fucks everything up
              }}>

                <Typography gutterBottom variant="h5" component="div" sx={
                { color: "var(--text-color)", 
                  textAlign: {xs: "start", md: 'start'},
                  width: {xs: '100%', md: '100%'} ,
                  // margin: {xs: 4, md: 0}
                }}>
                  <strong> Assign tasks in seconds. </strong>
                  <Typography gutterBottom variant="body1" component="div" sx={
                    { color: "var(--text-color)", 
                      // margin: {xs: 4, md: 4}, 
                      textAlign: {xs: "start", md: 'start'},
                      // width: {xs: '100%', md: '70%'} 
                    }
                    }>
                      Delegate chores with just a few clicks. Obligo makes assigning and managing 
                      tasks easy, so you can spend less time planning and more time doing.
                  </Typography >
                </Typography>
              </Box> {/* End of right half of row*/}

              <Box sx = {{}}>
                <Image
                src="/assign.png"
                width= '700'
                height= '700'
                alt="Assign Page"
                />
              </Box>

            </Box>



        {/* Features Section */}
        <section id="features" className="py-16 md:py-24 bg-white">
          <div className="container px-4 sm:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#81a651] mb-4">Why Households Love Obligo</h2>
              <p className="text-lg text-[#9e8772] max-w-2xl mx-auto">
                Our simple but powerful features make managing household responsibilities a breeze.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center p-6 bg-[#f5f5d5] rounded-xl shadow-sm">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#81a651]/20 mb-6">
                  <ClipboardList className="h-8 w-8 text-[#81a651]" />
                </div>
                <h3 className="text-xl font-bold text-[#81a651] mb-3">Fair Task Distribution</h3>
                <p className="text-[#9e8772]">
                  Automatically rotate and assign chores based on preferences, skills, and schedules to ensure fairness.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center p-6 bg-[#f5f5d5] rounded-xl shadow-sm">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#81a651]/20 mb-6">
                  <Users className="h-8 w-8 text-[#81a651]" />
                </div>
                <h3 className="text-xl font-bold text-[#81a651] mb-3">Household Collaboration</h3>
                <p className="text-[#9e8772]">
                  Everyone can see who's responsible for what and when tasks were last completed, improving
                  accountability.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center p-6 bg-[#f5f5d5] rounded-xl shadow-sm">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-[#81a651]/20 mb-6">
                  <Bell className="h-8 w-8 text-[#81a651]" />
                </div>
                <h3 className="text-xl font-bold text-[#81a651] mb-3">Smart Reminders</h3>
                <p className="text-[#9e8772]">
                  Gentle notifications remind household members of upcoming and overdue tasks without nagging.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 md:py-24 bg-[#f5f5d5]">
          <div className="container px-4 sm:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#81a651] mb-4">How Obligo Works</h2>
              <p className="text-lg text-[#9e8772] max-w-2xl mx-auto">
                Get your household organized in just a few simple steps.
              </p>
            </div>

            <div className="max-w-3xl mx-auto">
              <div className="space-y-12">
                {/* Step 1 */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#81a651] text-white font-bold text-xl">
                    1
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#81a651] mb-2">Create Your Household</h3>
                    <p className="text-[#9e8772]">
                      Invite family members or roommates to join your household with email or Google accounts.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#81a651] text-white font-bold text-xl">
                    2
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#81a651] mb-2">Add Your Chores</h3>
                    <p className="text-[#9e8772]">
                      Input regular household tasks, set their frequency, and indicate who can do what.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                  <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-[#81a651] text-white font-bold text-xl">
                    3
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#81a651] mb-2">Let Obligo Handle the Rest</h3>
                    <p className="text-[#9e8772]">
                      Our system automatically distributes tasks and tracks completion.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof Section */}
        {/* <section className="py-16 md:py-24 bg-white">
          <div className="container px-4 sm:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#81a651] mb-4">Loved by Households Everywhere</h2>
              <p className="text-lg text-[#9e8772] max-w-2xl mx-auto">
                Join thousands of happy households using Obligo to simplify their lives.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8"> */}
              {/* Testimonial 1 */}
              {/* <div className="flex flex-col p-6 bg-[#f5f5d5] rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-[#81a651] rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-bold text-[#81a651]">Sarah M.</h4>
                    <p className="text-sm text-[#9e8772]">Family of 4</p>
                  </div>
                </div>
                <p className="text-[#9e8772] italic">
                  "Obligo has transformed our family life. No more fighting about who did what last. The kids are
                  actually excited to complete their chores now!"
                </p>
              </div> */}

              {/* Testimonial 2 */}
              {/* <div className="flex flex-col p-6 bg-[#f5f5d5] rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-[#81a651] rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-bold text-[#81a651]">Jason K.</h4>
                    <p className="text-sm text-[#9e8772]">Shared apartment</p>
                  </div>
                </div>
                <p className="text-[#9e8772] italic">
                  "Living with roommates has never been easier. We used to have tension over chores, but Obligo keeps
                  everything fair and organized."
                </p>
              </div> */}

              {/* Testimonial 3 */}
              {/* <div className="flex flex-col p-6 bg-[#f5f5d5] rounded-xl shadow-sm">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-[#81a651] rounded-full mr-3"></div>
                  <div>
                    <h4 className="font-bold text-[#81a651]">Maria L.</h4>
                    <p className="text-sm text-[#9e8772]">Busy parent</p>
                  </div>
                </div>
                <p className="text-[#9e8772] italic">
                  "The reminders are gentle but effective. I no longer have to be the household nag - Obligo does that
                  job for me!"
                </p>
              </div>
            </div>
          </div>
        </section> */}

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-[#81a651]">
          <div className="container px-4 sm:px-6 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">Ready to transform your household?</h2>
              <p className="text-xl text-white/90 mb-8">
                Join the many households who have simplified their chore management with Obligo.
              </p>

              <div className="bg-white p-8 rounded-xl shadow-lg">
                <h3 className="text-2xl font-bold text-[#81a651] mb-6">Get Started Today</h3>

                <div className="flex flex-col space-y-4">
                <Link href="/signup">
                  <button asChild size="lg" className="inline-flex items-center justify-center bg-[#81a651] hover:bg-[#6a8a43] text-white pt-2 pb-2 pl-8 pr-8 rounded-md w-full">
                      <span>Sign Up with Email</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                  </Link>

                  {/* <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-300"></span>
                    </div>
                    <div className="relative flex justify-center text-sm">
                      <span className="px-2 bg-white text-[#9e8772]">Or continue with</span>
                    </div>
                  </div> */}

                  {/* <button asChild variant="outline" size="lg" className="border-gray-300 text-[#9e8772]">
                    <Link href="/signup-google" className="flex items-center justify-center">
                      <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                        <path
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          fill="#4285F4"
                        />
                        <path
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          fill="#34A853"
                        />
                        <path
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          fill="#FBBC05"
                        />
                        <path
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          fill="#EA4335"
                        />
                        <path d="M1 1h22v22H1z" fill="none" />
                      </svg>
                      Sign Up with Google
                    </Link>
                  </button> */}
                </div>

                <p className="text-xs text-[#9e8772] mt-6">
                  By signing up, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-12">
        <div className="container px-4 sm:px-6 mx-auto">
          <div className="flex justify-center">
            <div className="md:col-span-2">
              <Link href="/" className="flex items-center space-x-2 mb-4">
                <ClipboardList className="h-8 w-8 text-[#81a651]" />
                <span className="text-xl font-bold text-[#81a651]">Obligo</span>
              </Link>
              <p className="text-[#9e8772] mb-4 max-w-xs">
                Simplifying household chore management for families and roommates everywhere.
              </p>
              {/* Social Media Icons */}
              {/* <div className="flex space-x-4">
                <a href="#" className="text-[#9e8772] hover:text-[#81a651]">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
                <a href="#" className="text-[#9e8772] hover:text-[#81a651]">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                  </svg>
                </a>
                <a href="#" className="text-[#9e8772] hover:text-[#81a651]">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </a>
              </div> */}
            </div>
            {/* <div>
              <h3 className="text-sm font-semibold text-[#81a651] tracking-wider uppercase mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#features" className="text-[#9e8772] hover:text-[#81a651]">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#how-it-works" className="text-[#9e8772] hover:text-[#81a651]">
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#9e8772] hover:text-[#81a651]">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#9e8772] hover:text-[#81a651]">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div> */}
            {/* <div>
              <h3 className="text-sm font-semibold text-[#81a651] tracking-wider uppercase mb-4">Company</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="#" className="text-[#9e8772] hover:text-[#81a651]">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#9e8772] hover:text-[#81a651]">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#9e8772] hover:text-[#81a651]">
                    Careers
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-[#9e8772] hover:text-[#81a651]">
                    Contact
                  </Link>
                </li>
              </ul>
            </div> */}
          </div>
          <div className="pt-8 mt-8 border-t border-gray-200">
            <p className="text-sm text-[#9e8772] text-center">
              &copy; {new Date().getFullYear()} Obligo. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}




// import { Inter } from "next/font/google";
// import { useRouter } from 'next/router'
// import { useState, useEffect } from 'react'
// import { Card, Grid, Box, Typography, Container, Button } from "@mui/material";
// import EventCard from "@/components/eventCard";
// import Alert from '@mui/material/Alert';
// import CheckIcon from '@mui/icons-material/Check';
// import { useChoreContext } from '@/hooks/useChoreContext'
// import { useAuthContext } from "@/hooks/useAuthContext";
// import { useFamilyContext } from "@/hooks/useFamilyContext";
// import Image from "next/image";
// import Link from "next/link";



// const inter = Inter({ subsets: ["latin"] });

// export default function Home() {
//   const { chores, dispatch } = useChoreContext()
//   const { user, loading, dispatch: userDispatch } = useAuthContext()
//   const {family, dispatch: familyDispatch} = useFamilyContext()
//   const [showMessage, setShowMessage] = useState(false)
//   const router = useRouter()

//   return (
//     <>
//       <Container maxWidth="xl" disableGutters>

//         {/* This box is the entire green background on the top of the screen */}
//         <Box
//           sx={{
//               display: 'flex',
//               flexDirection: {xs: 'column', md: 'row'},
//               // alignItems: 'center',
//               // justifyContent: 'center',
//               width: '100vw',
//               height: '100vh',
//               bgcolor: 'var(--darker-green)', //this is what gives the box its green color
//               paddingTop: {xs:'10%', md: '5%'},
//           }}
//         >
//           <Box
//           sx={{
//               display: 'flex',
//               flexDirection:'column',
//               alignItems: 'center',
//               justifyContent: 'flex-start',
//               width: '100%',
//               height: '100%',
//               padding: '5%',
//           }}
//           >
//             <Typography gutterBottom variant="h3" component="div" sx={
//               { color: "var(--lighter-green)", margin: 2, textAlign: {xs: 'center', md:"start"}, 
//               }
//               }>
//                 Make Chores Simple and Organized
//                 {/* <strong> Make Chores Simple and Organized </strong> */}
//             </Typography>
            
//             {/* Spacing between the header and catch phrase; this is the first thing you will see */}
//             <br/>
//             <br/>
//             <br/>
//             <br/>

            
//             <Typography gutterBottom variant="h5" component="div" sx={
//               { color: "var(--lighter-green)", margin: 2, textAlign: {xs: 'center', md:"start"},
//               marginTop: {xs: 5}
//               }
//               }>
//                 {/* Get Started with Obligo and bring organization to your home today */}
//               <strong> Get Started with Obligo and bring organization to your home today </strong>
//             </Typography>

//             {/* <br/>
//             <br/>
//             <br/> */}

//             <Button
//                 variant="contained"
//                 href="/login"
//                 sx={{backgroundColor: "var(--lighter-green)", '&:hover': {'backgroundColor': 'var(--lighter-green)'},
//                   width: '70%',
//                   marginTop: {xs: '40%', md: '15%'},
//                   borderRadius: 4,
//                   paddingTop: {xs: 1, md: 2},
//                   paddingBottom: {xs: 1, md: 2},
//                 }}
//               >
//                 <Typography sx ={{color: 'var(--text-color)', textTransform: 'none'}}>
//                   Get Started Today
//                 </Typography>
//              </Button>

//           </Box>
//         </Box>

//         <br/>
//         <br/>

//         {/* FIRST ROW OF SHOWCASE
//             FIRST ROW OF SHOWCASE
//         */}
        
//           <Box sx={{
//             display: 'flex',
//             flexDirection: {xs: 'column', md: 'row'},
//             alignItems: 'center',
//             // justifyContent: 'center',
//             // width: '100%',
//             margin: {xs: 1, md: 2},
//             marginBottom: {xs: 12, md: 8},
//             marginTop: {xs: 4, md: 0}
//             }}>

//               {/* This box holds the typography elements on the left half of each row.
//               I need this so I can put a margin on the typographies on small screens */}

//               <Box sx = {{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               // justifyContent: {xs: 'center', md: 'none'},
//               margin: {xs: 4, md: 4},
//               marginBottom: {xs: 2, md:4},
//               width: {md: '40%'},
//               }}>

          
            
//                 <Typography gutterBottom variant="h5" component="div" sx={
//                 { color: "var(--text-color)", 
//                   textAlign: {xs: "start", md: 'start'},
//                   width: {xs: '100%', md: '100%'} ,
//                   // margin: {xs: 4, md: 0}
//                 }}>
//                   <strong> Team up to tackle chores together! </strong>
//                   <Typography gutterBottom variant="body1" component="div" sx={
//                     { color: "var(--text-color)", 
//                       // margin: {xs: 4, md: 4}, 
//                       textAlign: {xs: "start", md: 'start'},
//                       // width: {xs: '100%', md: '70%'} 
//                     }
//                     }>
//                       {/* <strong>  */}
//                         Build your family group and assign chores to each member effortlessly. 
//                         Obligo ensures everyone knows what to do and when to do it.
//                       {/* </strong> */}
//                   </Typography >
//                 </Typography>
//               </Box> {/* End of left half of row*/}
              
//               <Box sx = {{}}>
//                 <Image 
//                 src="/Family.png"
//                 width= '700'
//                 height= '700'
//                 alt="Family Page"
//                 />
//               </Box>

//             </Box>

//             {/* BOX FOR SECOND ROW OF FEATURE SHOWCASE
//                 BOX FOR SECOND ROW OF FEATURE SHOWCASE
//             */}  

//           <Box sx={{
//             display: 'flex',
//             flexDirection: {xs: 'column', md: 'row'},
//             alignItems: 'center',
//             // justifyContent: 'center',
//             // width: '100%',
//             margin: {xs: 1, md: 2},
//             marginTop: {xs: 4, md: 0}
//             }}>
              
//               {/* want this to be on left side on medium screens but this shows up above the text on small screens
//               Therefore i have to disable it for small screens */}
//               <Box sx = {{ display: {xs: 'none', md: 'flex'}, width: '100%'}}>
//                 <Image
//                 src="/dashboard.png"
//                 width= '700'
//                 height= '700'
//                 alt="Dashboard Page"
//                 />
//               </Box>

//               {/* This box holds the typography elements on the left half of each row.
//               I need this so I can put a margin on the typographies on small screens */}

//               <Box sx = {{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               // justifyContent: {xs: 'center', md: 'none'},
//               margin: {xs: 4, md: 4},
//               marginBottom: {xs: 2, md:4} //overrides earlier margin bottom of 4 above
//               // width: '100%',
//               }}>

//                 <Typography gutterBottom variant="h5" component="div" sx={
//                 { color: "var(--text-color)", 
//                   textAlign: {xs: "start", md: 'start'},
//                   width: {xs: '100%', md: '100%'} ,
//                   // margin: {xs: 4, md: 0}
//                 }}>
//                   <strong> All your tasks in one place. </strong>
//                   <Typography gutterBottom variant="body1" component="div" sx={
//                     { color: "var(--text-color)", 
//                       // margin: {xs: 4, md: 4}, 
//                       textAlign: {xs: "start", md: 'start'},
//                       // width: {xs: '100%', md: '70%'} 
//                     }
//                     }>
//                       Stay on top of your to-dos with a centralized dashboard showing every chore, 
//                       its details, and deadlines—no more guessing who’s doing what!
//                   </Typography >
//                 </Typography>
//               </Box> {/* End of right half of row*/}

//               <Box sx = {{ display: {xs: 'block', md: 'none'}}}>
//                 <Image
//                 src="/dashboard.png"
//                 width= '700'
//                 height= '700'
//                 alt="Dashboard Page"
//                 />
//               </Box>
//             </Box>


//             {/* BOX FOR THIRD ROW OF SHOWCASE */}
//             {/* BOX FOR THIRD ROW OF SHOWCASE */}
//             {/* BOX FOR THIRD ROW OF SHOWCASE */}

//             <Box sx={{
//             display: 'flex',
//             flexDirection: {xs: 'column', md: 'row'},
//             alignItems: 'center',
//             // justifyContent: 'center',
//             // width: '100%',
//             margin: {xs: 1, md: 2},
//             marginTop: {xs: 4, md: 0},
//             marginBottom: {xs: 12, md: 20}
//             }}>
            

//               {/* This box holds the typography elements on the left half of each row.
//               I need this so I can put a margin on the typographies on small screens */}

//               <Box sx = {{
//               display: 'flex',
//               flexDirection: 'column',
//               alignItems: 'center',
//               // justifyContent: {xs: 'center', md: 'none'},
//               margin: {xs: 4, md: 4},
//               marginBottom: {xs: 2, md:4}, //overrides earlier margin bottom of 4 above
//               width: {md: '40%'}, //no width for sm cuz it fucks everything up
//               }}>

//                 <Typography gutterBottom variant="h5" component="div" sx={
//                 { color: "var(--text-color)", 
//                   textAlign: {xs: "start", md: 'start'},
//                   width: {xs: '100%', md: '100%'} ,
//                   // margin: {xs: 4, md: 0}
//                 }}>
//                   <strong> Assign tasks in seconds. </strong>
//                   <Typography gutterBottom variant="body1" component="div" sx={
//                     { color: "var(--text-color)", 
//                       // margin: {xs: 4, md: 4}, 
//                       textAlign: {xs: "start", md: 'start'},
//                       // width: {xs: '100%', md: '70%'} 
//                     }
//                     }>
//                       Delegate chores with just a few clicks. Obligo makes assigning and managing 
//                       tasks easy, so you can spend less time planning and more time doing.
//                   </Typography >
//                 </Typography>
//               </Box> {/* End of right half of row*/}

//               <Box sx = {{}}>
//                 <Image
//                 src="/assign.png"
//                 width= '700'
//                 height= '700'
//                 alt="Assign Page"
//                 />
//               </Box>

//             </Box>
            
//             {/* THIS IS THE FOOTER
//                 THIS IS THE FOOTER
//                 THIS IS THE FOOTER
//             */}
//             <Box
//               sx={{
//                 display: 'flex',
//                 flexDirection: 'column',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 width: '100%',
//                 bgcolor: 'var(--darker-green)', //this is what gives the box its green color
//                 padding: {xs:'10%', md: '5%'},
//               }}
//             >
//               <Button
//                 variant="contained"
//                 href="/login"
//                 sx={{backgroundColor: "var(--lighter-green)", '&:hover': {'backgroundColor': 'var(--lighter-green)'},
//                   width: '70%',
//                   borderRadius: 4,
//                   paddingTop: {xs: 1, md: 2},
//                   paddingBottom: {xs: 1, md: 2},
//                 }}
//               >
//                 <Typography sx ={{color: 'var(--text-color)', textTransform: 'none'}}>
//                   Get Started Today
//                 </Typography>
//              </Button>

//             </Box>
            
//       </Container>
//     </>
//   )
// }
