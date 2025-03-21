"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Search, Menu, X, Bell, Bookmark, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"

export default function NewsHomepage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  // Featured news slides
  const featuredNews = [
    {
      id: 1,
      title: "Global Climate Summit Reaches Historic Agreement",
      category: "World",
      image: "/placeholder.svg?height=600&width=1200",
      excerpt: "World leaders have reached a landmark agreement to reduce carbon emissions by 50% by 2030.",
    },
    {
      id: 2,
      title: "Tech Giants Announce Breakthrough in Quantum Computing",
      category: "Technology",
      image: "/placeholder.svg?height=600&width=1200",
      excerpt: "Major tech companies unveil new quantum processors that could revolutionize computing.",
    },
    {
      id: 3,
      title: "Scientists Discover Potential Cure for Rare Disease",
      category: "Health",
      image: "/placeholder.svg?height=600&width=1200",
      excerpt: "Researchers announce promising results in clinical trials for a previously untreatable condition.",
    },
  ]

  // Latest news articles
  const latestNews = [
    {
      id: 1,
      title: "Stock Markets Hit All-Time High Amid Economic Recovery",
      category: "Business",
      image: "/placeholder.svg?height=400&width=600",
      time: "2 hours ago",
    },
    {
      id: 2,
      title: "New Film Breaks Box Office Records on Opening Weekend",
      category: "Entertainment",
      image: "/placeholder.svg?height=400&width=600",
      time: "3 hours ago",
    },
    {
      id: 3,
      title: "National Team Advances to Finals After Stunning Victory",
      category: "Sports",
      image: "/placeholder.svg?height=400&width=600",
      time: "5 hours ago",
    },
    {
      id: 4,
      title: "City Unveils Plans for New Public Transportation System",
      category: "Local",
      image: "/placeholder.svg?height=400&width=600",
      time: "6 hours ago",
    },
  ]

  // Trending topics
  const trendingTopics = [
    "Climate Change",
    "Artificial Intelligence",
    "Economic Recovery",
    "Space Exploration",
    "Public Health",
    "Renewable Energy",
  ]

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === featuredNews.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [featuredNews.length])

  // Simulate page loading
  useEffect(() => {
    setTimeout(() => {
      setIsLoaded(true)
    }, 500)
  }, [])

  // Handle slide navigation
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === featuredNews.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? featuredNews.length - 1 : prev - 1))
  }

  // Initial loading animation
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-primary flex items-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="mr-3"
          >
            <TrendingUp className="h-8 w-8" />
          </motion.div>
          NewsGPT
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="sticky top-0 z-50 bg-background border-b border-border"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Mobile menu button */}
            <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setIsMenuOpen(true)}>
              <Menu className="h-6 w-6" />
            </Button>

            {/* Logo */}
            <motion.div className="flex items-center text-2xl font-bold text-primary" whileHover={{ scale: 1.05 }}>
              <TrendingUp className="mr-2 h-6 w-6" />
              NewsGPT
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-6">
              {["Home", "World", "Business", "Technology", "Entertainment", "Sports"].map((item) => (
                <motion.div key={item} whileHover={{ y: -2 }} className="relative">
                  <Link href="#" className="text-foreground hover:text-primary transition-colors">
                    {item}
                  </Link>
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </motion.div>
              ))}
            </nav>

            {/* Search and actions */}
            <div className="flex items-center space-x-2">
              {isSearchOpen ? (
                <motion.div
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "200px", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="relative"
                >
                  <Input type="text" placeholder="Search..." className="pr-8" autoFocus />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0"
                    onClick={() => setIsSearchOpen(false)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </motion.div>
              ) : (
                <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(true)}>
                  <Search className="h-5 w-5" />
                </Button>
              )}

              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>

              <Button variant="ghost" size="icon">
                <Bookmark className="h-5 w-5" />
              </Button>

              <Button variant="primary" size="sm" className="hidden md:inline-flex">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-50 bg-background"
          >
            <div className="flex justify-between items-center p-4 border-b">
              <div className="text-xl font-bold text-primary flex items-center">
                <TrendingUp className="mr-2 h-6 w-6" />
                NewsGPT
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(false)}>
                <X className="h-6 w-6" />
              </Button>
            </div>
            <nav className="p-4">
              <ul className="space-y-4">
                {["Home", "World", "Business", "Technology", "Entertainment", "Sports"].map((item) => (
                  <motion.li key={item} whileTap={{ scale: 0.95 }}>
                    <Link
                      href="#"
                      className="block py-2 text-lg font-medium border-b border-border"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content - 9 columns on large screens */}
          <div className="lg:col-span-9">
            {/* Featured News Carousel */}
            <section className="mb-12">
              <div className="relative overflow-hidden rounded-xl">
                <div className="absolute top-4 left-4 z-10">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Badge className="bg-primary text-primary-foreground">Breaking News</Badge>
                  </motion.div>
                </div>

                <div className="relative h-[400px] md:h-[500px]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentSlide}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                      className="absolute inset-0"
                    >
                      <Image
                        src={featuredNews[currentSlide].image || "/placeholder.svg"}
                        alt={featuredNews[currentSlide].title}
                        fill
                        className="object-cover"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />

                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.3 }}
                        >
                          <Badge className="mb-3 bg-primary/80">{featuredNews[currentSlide].category}</Badge>
                          <h2 className="text-2xl md:text-4xl font-bold mb-2">{featuredNews[currentSlide].title}</h2>
                          <p className="text-sm md:text-base text-gray-200 mb-4 max-w-2xl">
                            {featuredNews[currentSlide].excerpt}
                          </p>
                          <Button className="mt-2">Read More</Button>
                        </motion.div>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Carousel controls */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 z-10"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/50 z-10"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Carousel indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
                  {featuredNews.map((_, index) => (
                    <button
                      key={index}
                      className={`w-2.5 h-2.5 rounded-full transition-colors ${
                        currentSlide === index ? "bg-primary" : "bg-white/50"
                      }`}
                      onClick={() => setCurrentSlide(index)}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* Trending Topics */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="mb-12"
            >
              <div className="flex items-center mb-4">
                <TrendingUp className="mr-2 h-5 w-5 text-primary" />
                <h2 className="text-xl font-bold">Trending Topics</h2>
              </div>

              <div className="flex flex-wrap gap-2">
                {trendingTopics.map((topic, index) => (
                  <motion.div
                    key={topic}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Badge
                      variant="outline"
                      className="cursor-pointer bg-muted hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      {topic}
                    </Badge>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* Latest News Grid */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Latest News</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {latestNews.map((article, index) => (
                  <motion.div
                    key={article.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="overflow-hidden h-full">
                      <div className="relative h-48">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          fill
                          className="object-cover transition-transform hover:scale-105 duration-500"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge>{article.category}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <div className="text-sm text-muted-foreground mb-2">{article.time}</div>
                        <h3 className="font-semibold mb-2 line-clamp-2 hover:text-primary transition-colors">
                          <Link href="#">{article.title}</Link>
                        </h3>
                        <div className="flex justify-between items-center mt-4">
                          <Button variant="ghost" size="sm" className="p-0 h-auto text-primary">
                            Read more
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Bookmark className="h-4 w-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* Newsletter Section */}
            <motion.section
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="mb-12 bg-muted rounded-xl p-8"
            >
              <div className="max-w-2xl mx-auto text-center">
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold mb-4">Stay Updated with Our Newsletter</h2>
                  <p className="text-muted-foreground mb-6">
                    Get the latest news delivered directly to your inbox. No spam, just the stories that matter.
                  </p>
                </motion.div>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto"
                >
                  <Input type="email" placeholder="Your email address" className="flex-1" />
                  <Button>Subscribe</Button>
                </motion.div>
              </div>
            </motion.section>

            {/* Business Insights & Analysis Section */}
            <section className="mb-12">
              <h2 className="text-2xl font-bold mb-6">Business Insights & Analysis</h2>

              <div className="grid grid-cols-1 gap-8">
                {/* Market Overview Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-muted/30 rounded-xl overflow-hidden border border-border"
                >
                  <div className="p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-xl font-bold">Market Overview</h3>
                      <Badge variant="outline">Daily Update</Badge>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                      {[
                        { index: "S&P 500", value: "4,891.15", change: "+1.2%", trend: "up" },
                        { index: "Nasdaq", value: "15,628.92", change: "+1.6%", trend: "up" },
                        { index: "Dow Jones", value: "38,239.05", change: "-0.3%", trend: "down" },
                      ].map((item) => (
                        <div key={item.index} className="bg-background rounded-lg p-4">
                          <div className="text-sm text-muted-foreground mb-1">{item.index}</div>
                          <div className="text-xl font-semibold mb-1">{item.value}</div>
                          <div
                            className={`text-sm ${item.trend === "up" ? "text-green-500" : "text-red-500"} flex items-center`}
                          >
                            {item.trend === "up" ? (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12 7a1 1 0 01-1 1H9v9a1 1 0 01-2 0V8H5a1 1 0 110-2h6a1 1 0 011 1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            ) : (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4 mr-1"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M12 13a1 1 0 01-1 1H9v-9a1 1 0 00-2 0v9H5a1 1 0 110 2h6a1 1 0 001-1z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            )}
                            {item.change}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="h-48 bg-background rounded-lg p-4 flex items-center justify-center">
                      <div className="w-full h-32 relative">
                        {/* Simulated chart with SVG */}
                        <svg className="w-full h-full" viewBox="0 0 100 40">
                          <defs>
                            <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          {/* Line chart */}
                          <path
                            d="M0,35 L5,32 L10,34 L15,30 L20,28 L25,30 L30,25 L35,20 L40,22 L45,18 L50,15 L55,10 L60,12 L65,8 L70,15 L75,18 L80,14 L85,12 L90,8 L95,5 L100,10"
                            fill="none"
                            stroke="hsl(var(--primary))"
                            strokeWidth="2"
                          />
                          {/* Area under the line */}
                          <path
                            d="M0,35 L5,32 L10,34 L15,30 L20,28 L25,30 L30,25 L35,20 L40,22 L45,18 L50,15 L55,10 L60,12 L65,8 L70,15 L75,18 L80,14 L85,12 L90,8 L95,5 L100,10 L100,40 L0,40 Z"
                            fill="url(#gradient)"
                          />
                        </svg>

                        {/* Chart labels */}
                        <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-muted-foreground">
                          <span>Jan</span>
                          <span>Feb</span>
                          <span>Mar</span>
                          <span>Apr</span>
                          <span>May</span>
                          <span>Jun</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Expert Analysis */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-muted/30 rounded-xl overflow-hidden border border-border"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">Expert Analysis</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-background rounded-lg p-5">
                        <div className="flex items-start mb-4">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                            <Image
                              src="/placeholder.svg?height=100&width=100"
                              alt="Sarah Johnson"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold">Sarah Johnson</h4>
                            <p className="text-sm text-muted-foreground">Chief Economist, Global Finance</p>
                          </div>
                        </div>
                        <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground">
                          "The recent Fed decision signals a cautious approach to inflation management. We expect two
                          rate cuts by year-end, which should provide a moderate boost to equity markets."
                        </blockquote>
                        <div className="mt-4 text-sm">
                          <span className="font-medium">Key prediction:</span> Tech sector growth to outpace broader
                          market by 8-10% in Q3.
                        </div>
                      </div>

                      <div className="bg-background rounded-lg p-5">
                        <div className="flex items-start mb-4">
                          <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                            <Image
                              src="/placeholder.svg?height=100&width=100"
                              alt="Michael Chen"
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold">Michael Chen</h4>
                            <p className="text-sm text-muted-foreground">Director of Research, Tech Insights</p>
                          </div>
                        </div>
                        <blockquote className="border-l-2 border-primary pl-4 italic text-muted-foreground">
                          "AI integration is accelerating across all business sectors. Companies that fail to implement
                          AI strategies in the next 18 months risk falling significantly behind competitors."
                        </blockquote>
                        <div className="mt-4 text-sm">
                          <span className="font-medium">Key prediction:</span> 35% increase in enterprise AI spending
                          through 2025.
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Industry Trends */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-muted/30 rounded-xl overflow-hidden border border-border"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-4">Industry Trends</h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {[
                        {
                          industry: "Renewable Energy",
                          trend: "Rapid Growth",
                          description:
                            "Solar and wind capacity expanding at 22% annually, driven by policy incentives and falling costs.",
                          metric: "22%",
                          metricLabel: "Annual Growth",
                        },
                        {
                          industry: "E-commerce",
                          trend: "Steady Expansion",
                          description:
                            "Post-pandemic shift to online shopping continues with 15% YoY growth in digital retail sales.",
                          metric: "15%",
                          metricLabel: "YoY Growth",
                        },
                        {
                          industry: "Automotive",
                          trend: "EV Transition",
                          description:
                            "Electric vehicle sales now represent 14% of new car sales, up from 8% last year.",
                          metric: "14%",
                          metricLabel: "Market Share",
                        },
                      ].map((item, index) => (
                        <motion.div
                          key={item.industry}
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.1 * index }}
                          whileHover={{ y: -5 }}
                          className="bg-background rounded-lg p-5"
                        >
                          <div className="flex justify-between items-start mb-3">
                            <h4 className="font-semibold">{item.industry}</h4>
                            <Badge>{item.trend}</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-4">{item.description}</p>
                          <div className="flex items-end justify-between">
                            <div className="text-sm text-muted-foreground">{item.metricLabel}</div>
                            <div className="text-2xl font-bold text-primary">{item.metric}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-primary text-primary-foreground rounded-xl p-6"
                >
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <h3 className="text-xl font-bold mb-2">Get Premium Business Intelligence</h3>
                      <p className="text-primary-foreground/80">
                        Access in-depth analysis, market forecasts, and exclusive expert interviews.
                      </p>
                    </div>
                    <Button variant="secondary" size="lg">
                      Upgrade to Premium
                    </Button>
                  </div>
                </motion.div>
              </div>
            </section>
          </div>

          {/* Right Sidebar - 3 columns on large screens */}
          <div className="lg:col-span-3">
            <div className="sticky top-20">
              {/* Vertical Articles Section */}
              <motion.section
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="mb-8"
              >
                <div className="flex items-center mb-4">
                  <h2 className="text-xl font-bold">Top Stories</h2>
                  <div className="ml-2 px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full">New</div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      title: "Global Economic Forum Announces New Climate Initiative",
                      category: "Economy",
                      time: "1 hour ago",
                      image: "/placeholder.svg?height=200&width=300",
                    },
                    {
                      title: "Tech Company Unveils Revolutionary AI Assistant",
                      category: "Technology",
                      time: "2 hours ago",
                      image: "/placeholder.svg?height=200&width=300",
                    },
                    {
                      title: "Scientists Make Breakthrough in Renewable Energy Storage",
                      category: "Science",
                      time: "3 hours ago",
                      image: "/placeholder.svg?height=200&width=300",
                    },
                    {
                      title: "Major Sports League Announces Expansion Teams",
                      category: "Sports",
                      time: "4 hours ago",
                      image: "/placeholder.svg?height=200&width=300",
                    },
                    {
                      title: "New Study Reveals Benefits of Mediterranean Diet",
                      category: "Health",
                      time: "5 hours ago",
                      image: "/placeholder.svg?height=200&width=300",
                    },
                  ].map((article, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      whileHover={{ x: -3 }}
                      className="group"
                    >
                      <Link href="#" className="flex gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={article.image || "/placeholder.svg"}
                            alt={article.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105 duration-300"
                          />
                        </div>
                        <div className="flex-1">
                          <Badge variant="outline" className="mb-1 text-xs">
                            {article.category}
                          </Badge>
                          <h3 className="font-medium text-sm line-clamp-2 group-hover:text-primary transition-colors">
                            {article.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mt-1">{article.time}</p>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <Button variant="ghost" className="w-full mt-4 text-primary">
                  View All Stories
                </Button>
              </motion.section>

              {/* Popular Tags */}
              <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="mb-8 bg-muted/50 p-4 rounded-lg"
              >
                <h3 className="font-bold mb-3">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Politics",
                    "Health",
                    "Technology",
                    "Science",
                    "Business",
                    "Culture",
                    "Environment",
                    "Education",
                  ].map((tag, index) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.05 * index }}
                      whileHover={{ scale: 1.05 }}
                    >
                      <Badge variant="secondary" className="cursor-pointer">
                        {tag}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* Advertisement */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
                className="relative rounded-lg overflow-hidden mb-8"
              >
                <div className="aspect-[4/5] bg-muted/30 border border-border flex items-center justify-center p-4 text-center">
                  <div>
                    <p className="text-xs text-muted-foreground mb-2">Advertisement</p>
                    <div className="font-bold mb-2">Subscribe to Premium</div>
                    <p className="text-sm text-muted-foreground mb-4">Get unlimited access to all articles</p>
                    <Button size="sm" variant="outline" className="bg-background">
                      Learn More
                    </Button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="bg-muted py-12 border-t"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center text-xl font-bold text-primary mb-4">
                <TrendingUp className="mr-2 h-5 w-5" />
                NewsGPT
              </div>
              <p className="text-muted-foreground mb-4">
                Delivering the latest and most important news from around the world.
              </p>
              <div className="flex space-x-4">
                {["twitter", "facebook", "instagram", "youtube"].map((social) => (
                  <motion.a
                    key={social}
                    href="#"
                    whileHover={{ y: -3 }}
                    className="w-10 h-10 rounded-full bg-background flex items-center justify-center"
                  >
                    <span className="sr-only">{social}</span>
                    <div className="w-5 h-5 bg-foreground mask-image-[url('/icons/${social}.svg')]" />
                  </motion.a>
                ))}
              </div>
            </div>

            {["Categories", "Company", "Support"].map((section) => (
              <div key={section}>
                <h3 className="font-semibold mb-4">{section}</h3>
                <ul className="space-y-2">
                  {[1, 2, 3, 4, 5].map((item) => (
                    <motion.li key={item} whileHover={{ x: 2 }}>
                      <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                        {section} Link {item}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} NewsGPT. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Privacy Policy
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Terms of Service
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  )
}

