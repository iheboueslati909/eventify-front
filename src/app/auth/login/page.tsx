// Server component
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export default async function LoginPage({ searchParams }: { searchParams?: Promise<{ error?: string }> }) {
  // Server-rendered login form that posts to the server API route.
  // The API route will set cookies and redirect on success.
  const resolvedParams = await searchParams
  const error = resolvedParams?.error ? decodeURIComponent(resolvedParams.error) : null

  return (
    <div>
      <div className="container mx-auto flex items-center justify-center min-h-[80vh]">
        <Card className="mx-auto max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 text-sm text-red-600">{error}</div>
            )}
            <form action="/api/auth/login" method="post">
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input defaultValue={"iheb@gmail.com"} id="email" name="email" type="email" placeholder="m@example.com" required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input defaultValue={"123456"} id="password" name="password" type="password" required />
                </div>
                <button type="submit" className="w-full btn-primary">
                  Sign in
                </button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="underline">
                Sign up
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}