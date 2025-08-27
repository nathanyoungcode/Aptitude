import { Activity, BarChart3, TrendingUp, Users } from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const stats = [
  {
    title: 'Total Users',
    value: '2,341',
    change: '+12%',
    trend: 'up',
    icon: Users,
  },
  {
    title: 'Revenue',
    value: '$45,231',
    change: '+8%',
    trend: 'up',
    icon: TrendingUp,
  },
  {
    title: 'Active Sessions',
    value: '1,423',
    change: '-3%',
    trend: 'down',
    icon: Activity,
  },
  {
    title: 'Conversion Rate',
    value: '3.2%',
    change: '+0.5%',
    trend: 'up',
    icon: BarChart3,
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here&apos;s what&apos;s happening with your app.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Export</Button>
          <Button>Add Widget</Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Badge
                    variant={stat.trend === 'up' ? 'default' : 'destructive'}
                    className="text-xs"
                  >
                    {stat.change}
                  </Badge>
                  <span>from last month</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Analytics Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="flex items-center justify-center h-[300px] text-muted-foreground">
              <div className="text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4" />
                <p>Chart component would go here</p>
                <p className="text-sm">Connect your analytics service</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  user: 'John Doe',
                  action: 'created a new project',
                  time: '2 minutes ago',
                },
                {
                  user: 'Sarah Wilson',
                  action: 'updated dashboard',
                  time: '5 minutes ago',
                },
                {
                  user: 'Mike Chen',
                  action: 'joined the team',
                  time: '1 hour ago',
                },
                {
                  user: 'Emma Davis',
                  action: 'completed task',
                  time: '2 hours ago',
                },
              ].map((activity, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {activity.user}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {activity.action}
                    </p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {activity.time}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
