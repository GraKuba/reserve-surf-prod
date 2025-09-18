import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis,
  ResponsiveContainer
} from 'recharts';
import {
  Trophy,
  Award,
  Star,
  TrendingUp,
  Activity,
  Calendar,
  Clock,
  Users,
  Waves,
  Wind,
  Target,
  Medal,
  BookOpen,
  ChevronRight,
  Download,
  Share2,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Separator } from '@/components/ui/separator';
import { format } from 'date-fns';

// Mock user data - would come from API/store in real implementation
const mockUserData = {
  name: "Alex Thompson",
  email: "alex.thompson@example.com",
  avatar: "https://i.pravatar.cc/150?img=8",
  joinDate: "2024-01-15",
  totalLessons: 24,
  currentLevel: "Intermediate",
  nextLevel: "Advanced",
  progressToNextLevel: 75,
  location: "Santa Cruz, CA",
  preferredSports: ["Surfing", "Kitesurfing"],
};

// Skill data for radar chart
const skillData = [
  { skill: 'Balance', value: 85 },
  { skill: 'Technique', value: 70 },
  { skill: 'Endurance', value: 90 },
  { skill: 'Wave Reading', value: 65 },
  { skill: 'Equipment', value: 80 },
  { skill: 'Safety', value: 95 },
];

// Achievement badges
const achievements = [
  { id: 1, name: 'First Wave', icon: Waves, description: 'Caught your first wave', earned: true, date: '2024-01-20' },
  { id: 2, name: 'Perfect Attendance', icon: Calendar, description: '10 lessons in a row', earned: true, date: '2024-02-15' },
  { id: 3, name: 'Early Bird', icon: Clock, description: '5 sunrise sessions', earned: true, date: '2024-03-01' },
  { id: 4, name: 'Storm Rider', icon: Wind, description: 'Surfed in 15ft+ waves', earned: false, date: null },
  { id: 5, name: 'Instructor', icon: Users, description: 'Helped teach a beginner', earned: true, date: '2024-03-10' },
  { id: 6, name: 'Competition Ready', icon: Trophy, description: 'Complete advanced program', earned: false, date: null },
];

// Recent lesson history
const lessonHistory = [
  { id: 1, date: '2024-03-18', instructor: 'Jake Wilson', type: 'Intermediate Surfing', duration: '2 hours', location: 'Pleasure Point', rating: 5 },
  { id: 2, date: '2024-03-15', instructor: 'Sarah Chen', type: 'Wave Selection Workshop', duration: '1.5 hours', location: 'Steamer Lane', rating: 5 },
  { id: 3, date: '2024-03-12', instructor: 'Mike Rodriguez', type: 'Advanced Maneuvers', duration: '2 hours', location: 'The Hook', rating: 4 },
  { id: 4, date: '2024-03-08', instructor: 'Jake Wilson', type: 'Intermediate Surfing', duration: '2 hours', location: 'Cowells', rating: 5 },
  { id: 5, date: '2024-03-05', instructor: 'Emily Parker', type: 'Kitesurfing Basics', duration: '3 hours', location: 'Waddell Beach', rating: 5 },
];

// Stats cards data
const statsCards = [
  { label: 'Total Lessons', value: 24, icon: BookOpen, change: '+3 this month', trend: 'up' },
  { label: 'Hours in Water', value: 48, icon: Clock, change: '+6 this month', trend: 'up' },
  { label: 'Skills Mastered', value: 12, icon: Target, change: '+2 this month', trend: 'up' },
  { label: 'Achievement Points', value: 850, icon: Trophy, change: '+150 this month', trend: 'up' },
];

export default function SkillPassport() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedTimeRange, setSelectedTimeRange] = useState('all');

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-accent/5 to-primary/10">
      {/* Aurora Background Effect */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-transparent animate-pulse" />
      </div>

      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-8"
        >
          {/* Header Section */}
          <motion.div variants={itemVariants} className="bg-background/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              {/* Avatar and Basic Info */}
              <div className="flex flex-col items-center md:items-start gap-4">
                <Avatar className="h-32 w-32 border-4 border-primary/20">
                  <img src={mockUserData.avatar} alt={mockUserData.name} className="object-cover" />
                </Avatar>
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold">{mockUserData.name}</h1>
                  <p className="text-muted-foreground">{mockUserData.email}</p>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="default">{mockUserData.currentLevel}</Badge>
                    <Badge variant="outline">{mockUserData.location}</Badge>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4">
                {statsCards.map((stat, index) => (
                  <Card key={index} className="border-border/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <stat.icon className="h-5 w-5 text-primary" />
                        {stat.trend === 'up' && <TrendingUp className="h-4 w-4 text-green-500" />}
                      </div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                      <p className="text-xs text-green-500 mt-1">{stat.change}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2">
                <Button variant="default" size="sm" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export Profile
                </Button>
                <Button variant="outline" size="sm" className="gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </Button>
                <Button variant="ghost" size="sm" className="gap-2">
                  <Settings className="h-4 w-4" />
                  Settings
                </Button>
              </div>
            </div>

            {/* Level Progress */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress to {mockUserData.nextLevel}</span>
                <span className="text-sm text-muted-foreground">{mockUserData.progressToNextLevel}%</span>
              </div>
              <Progress value={mockUserData.progressToNextLevel} className="h-2" />
            </div>
          </motion.div>

          {/* Tabs Section */}
          <motion.div variants={itemVariants}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
              <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="achievements">Achievements</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              {/* Overview Tab */}
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Skill Radar Chart */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Skill Assessment</CardTitle>
                      <CardDescription>Your current skill levels across different areas</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <RadarChart data={skillData}>
                            <PolarGrid stroke="hsl(var(--border))" />
                            <PolarAngleAxis 
                              dataKey="skill" 
                              className="text-xs"
                              tick={{ fill: 'hsl(var(--foreground))' }}
                            />
                            <PolarRadiusAxis 
                              angle={90} 
                              domain={[0, 100]} 
                              tick={{ fill: 'hsl(var(--muted-foreground))' }}
                            />
                            <Radar 
                              name="Skills" 
                              dataKey="value" 
                              stroke="hsl(var(--primary))" 
                              fill="hsl(var(--primary))" 
                              fillOpacity={0.3}
                              strokeWidth={2}
                            />
                          </RadarChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Achievements */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Achievements</CardTitle>
                      <CardDescription>Latest badges and milestones earned</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {achievements.filter(a => a.earned).slice(0, 4).map((achievement) => (
                          <div key={achievement.id} className="flex items-center gap-4 p-3 rounded-lg bg-accent/10">
                            <div className="p-2 rounded-full bg-primary/10">
                              <achievement.icon className="h-6 w-6 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{achievement.name}</h4>
                              <p className="text-sm text-muted-foreground">{achievement.description}</p>
                            </div>
                            <span className="text-xs text-muted-foreground">
                              {achievement.date && format(new Date(achievement.date), 'MMM d')}
                            </span>
                          </div>
                        ))}
                        <Button variant="ghost" className="w-full" onClick={() => setActiveTab('achievements')}>
                          View All Achievements
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Upcoming Lessons */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Lessons</CardTitle>
                    <CardDescription>Your next scheduled sessions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
                      <p>No upcoming lessons scheduled</p>
                      <Button className="mt-4">Book a Lesson</Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Achievements Tab */}
              <TabsContent value="achievements" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>All Achievements</CardTitle>
                    <CardDescription>Track your progress and unlock new badges</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {achievements.map((achievement) => (
                        <div 
                          key={achievement.id} 
                          className={`p-4 rounded-lg border ${
                            achievement.earned 
                              ? 'bg-primary/5 border-primary/20' 
                              : 'bg-muted/30 border-border/50 opacity-60'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-full ${
                              achievement.earned ? 'bg-primary/10' : 'bg-muted'
                            }`}>
                              <achievement.icon className={`h-6 w-6 ${
                                achievement.earned ? 'text-primary' : 'text-muted-foreground'
                              }`} />
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium">{achievement.name}</h4>
                              <p className="text-sm text-muted-foreground mt-1">
                                {achievement.description}
                              </p>
                              {achievement.earned && achievement.date && (
                                <p className="text-xs text-primary mt-2">
                                  Earned {format(new Date(achievement.date), 'MMM d, yyyy')}
                                </p>
                              )}
                              {!achievement.earned && (
                                <Badge variant="outline" className="mt-2">Locked</Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* History Tab */}
              <TabsContent value="history" className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle>Lesson History</CardTitle>
                        <CardDescription>Your past sessions and progress</CardDescription>
                      </div>
                      <select 
                        className="text-sm border rounded-md px-3 py-1"
                        value={selectedTimeRange}
                        onChange={(e) => setSelectedTimeRange(e.target.value)}
                      >
                        <option value="all">All Time</option>
                        <option value="month">This Month</option>
                        <option value="quarter">Last 3 Months</option>
                        <option value="year">This Year</option>
                      </select>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Lesson Type</TableHead>
                          <TableHead className="hidden md:table-cell">Instructor</TableHead>
                          <TableHead className="hidden lg:table-cell">Location</TableHead>
                          <TableHead>Duration</TableHead>
                          <TableHead>Rating</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {lessonHistory.map((lesson) => (
                          <TableRow key={lesson.id}>
                            <TableCell>{format(new Date(lesson.date), 'MMM d')}</TableCell>
                            <TableCell className="font-medium">{lesson.type}</TableCell>
                            <TableCell className="hidden md:table-cell">{lesson.instructor}</TableCell>
                            <TableCell className="hidden lg:table-cell">{lesson.location}</TableCell>
                            <TableCell>{lesson.duration}</TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-3 w-3 ${
                                      i < lesson.rating 
                                        ? 'fill-yellow-500 text-yellow-500' 
                                        : 'text-gray-300'
                                    }`} 
                                  />
                                ))}
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}