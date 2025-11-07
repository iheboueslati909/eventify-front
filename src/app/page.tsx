import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      {/* Hero Section */}
      <section className="w-full py-20 bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Discover Amazing{' '}
            <span className="text-primary">Events</span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Find, create, and manage events. Connect with artists and bring your concepts to life.
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" asChild>
              <Link href="/events">Browse Events</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>For Event Goers</CardTitle>
                <CardDescription>Discover amazing events</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Find events that match your interests and connect with like-minded people.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>For Organizers</CardTitle>
                <CardDescription>Manage your events</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Create and manage events, track attendance, and grow your community.</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>For Artists</CardTitle>
                <CardDescription>Showcase your talent</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Create artist profiles, share your work, and connect with event organizers.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}