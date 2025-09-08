/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Users, Calendar, TrendingUp, BarChart3, BookOpen } from "lucide-react"
import type { DashboardStats } from "../types/attendance"

interface OverviewProps {
  dashboardStats: DashboardStats
}

export function Overview({ dashboardStats }: OverviewProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Dashboard Overview</h2>
        <p className="text-muted-foreground">
          Monitor your attendance statistics and get insights into your classes.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.totalStudents}</div>
            <p className="text-xs text-muted-foreground">Across all classes</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Attendance</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.todayAttendance}</div>
            <p className="text-xs text-muted-foreground">
              {((dashboardStats.todayAttendance / dashboardStats.totalStudents) * 100).toFixed(1)}% present
              today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Attendance</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.averageAttendance}%</div>
            <p className="text-xs text-muted-foreground">This semester</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Classes Conducted</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{dashboardStats.classesConduc}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Subject Overview
          </CardTitle>
          <CardDescription>Subjects you are currently teaching</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {dashboardStats.subjects.map((subject, _index) => (
              <div key={subject} className="flex items-center justify-between rounded-lg border p-3">
                <div className="flex flex-col">
                  <span className="font-medium">{subject}</span>
                  <span className="text-sm text-muted-foreground">
                    {Math.floor(Math.random() * 40) + 20} students
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-green-600">
                    {(Math.random() * 20 + 80).toFixed(1)}%
                  </div>
                  <div className="text-xs text-muted-foreground">avg attendance</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}