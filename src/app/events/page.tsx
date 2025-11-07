import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function EventsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">All Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Event cards will be populated here */}
        <Card>
          <CardHeader>
            <CardTitle>Sample Event</CardTitle>
            <CardDescription>Event description</CardDescription>
          </CardHeader>
          <CardContent>
            <p>Event details will appear here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}