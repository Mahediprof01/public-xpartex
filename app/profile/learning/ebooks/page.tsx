"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  BookOpen,
  Download,
  Search,
  Filter,
  Calendar,
  FileText,
  Eye,
  Star,
  Clock,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface EBook {
  id: string;
  title: string;
  author: string;
  category: string;
  description: string;
  coverImage: string;
  fileSize: string;
  pages: number;
  format: "PDF" | "EPUB" | "MOBI";
  purchaseDate: string;
  downloadCount: number;
  rating: number;
  readingProgress: number;
  tags: string[];
  price: number;
  language: string;
}

export default function MyEBooksPage() {
  const [ebooks, setEbooks] = useState<EBook[]>([]);
  const [filteredEbooks, setFilteredEbooks] = useState<EBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [formatFilter, setFormatFilter] = useState("all");

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockEbooks: EBook[] = [
      {
        id: "1",
        title: "Advanced React Patterns",
        author: "John Smith",
        category: "Programming",
        description: "Deep dive into advanced React patterns and best practices for building scalable applications.",
        coverImage: "/ebook-covers/react-patterns.jpg",
        fileSize: "2.4 MB",
        pages: 156,
        format: "PDF",
        purchaseDate: "2024-01-20",
        downloadCount: 3,
        rating: 4.8,
        readingProgress: 65,
        tags: ["React", "JavaScript", "Frontend"],
        price: 29.99,
        language: "English",
      },
      {
        id: "2",
        title: "Digital Marketing Mastery",
        author: "Sarah Johnson",
        category: "Marketing",
        description: "Complete guide to digital marketing strategies, tools, and techniques for modern businesses.",
        coverImage: "/ebook-covers/marketing-mastery.jpg",
        fileSize: "3.1 MB",
        pages: 203,
        format: "EPUB",
        purchaseDate: "2024-02-05",
        downloadCount: 1,
        rating: 4.6,
        readingProgress: 25,
        tags: ["Marketing", "SEO", "Social Media"],
        price: 24.99,
        language: "English",
      },
      {
        id: "3",
        title: "UI/UX Design Fundamentals",
        author: "Mike Chen",
        category: "Design",
        description: "Essential principles and practices for creating exceptional user interfaces and experiences.",
        coverImage: "/ebook-covers/ux-fundamentals.jpg",
        fileSize: "4.2 MB",
        pages: 178,
        format: "PDF",
        purchaseDate: "2024-01-15",
        downloadCount: 5,
        rating: 4.9,
        readingProgress: 100,
        tags: ["UX", "UI", "Design", "Figma"],
        price: 34.99,
        language: "English",
      },
      {
        id: "4",
        title: "Python Data Science Handbook",
        author: "Dr. Emily Rodriguez",
        category: "Programming",
        description: "Comprehensive guide to data science with Python, covering pandas, numpy, and machine learning.",
        coverImage: "/ebook-covers/python-data.jpg",
        fileSize: "5.8 MB",
        pages: 312,
        format: "PDF",
        purchaseDate: "2024-02-10",
        downloadCount: 2,
        rating: 4.7,
        readingProgress: 0,
        tags: ["Python", "Data Science", "Machine Learning"],
        price: 39.99,
        language: "English",
      },
    ];

    setTimeout(() => {
      setEbooks(mockEbooks);
      setFilteredEbooks(mockEbooks);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter ebooks based on search and filters
  useEffect(() => {
    let filtered = ebooks;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(ebook =>
        ebook.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ebook.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ebook.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ebook.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(ebook => ebook.category === categoryFilter);
    }

    // Format filter
    if (formatFilter !== "all") {
      filtered = filtered.filter(ebook => ebook.format === formatFilter);
    }

    setFilteredEbooks(filtered);
  }, [ebooks, searchTerm, categoryFilter, formatFilter]);

  const handleDownload = (ebookId: string) => {
    // Implement download logic
    console.log(`Downloading ebook ${ebookId}`);
    // Update download count
    setEbooks(prev => prev.map(ebook => 
      ebook.id === ebookId 
        ? { ...ebook, downloadCount: ebook.downloadCount + 1 }
        : ebook
    ));
  };

  const getReadingStatusBadge = (progress: number) => {
    if (progress === 0) {
      return <Badge variant="outline">Not Started</Badge>;
    } else if (progress === 100) {
      return <Badge className="bg-green-100 text-green-800">Completed</Badge>;
    } else {
      return <Badge className="bg-blue-100 text-blue-800">Reading</Badge>;
    }
  };

  const categories = [...new Set(ebooks.map(ebook => ebook.category))];
  const formats = [...new Set(ebooks.map(ebook => ebook.format))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in-50 duration-700">
      {/* Hero Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 rounded-2xl p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">My Digital Library 📖</h1>
              <p className="text-lg text-emerald-100 max-w-2xl">
                Access your purchased eBooks and expand your knowledge with our digital collection
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <BookOpen className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-emerald-100">Total eBooks</p>
                  <p className="text-2xl font-bold">{ebooks.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Download className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-emerald-100">Downloaded</p>
                  <p className="text-2xl font-bold">{ebooks.filter(e => e.downloadCount > 0).length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Eye className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-emerald-100">Reading</p>
                  <p className="text-2xl font-bold">{ebooks.filter(e => e.readingProgress > 0 && e.readingProgress < 100).length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Star className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-emerald-100">Avg Rating</p>
                  <p className="text-2xl font-bold">{(ebooks.reduce((acc, e) => acc + e.rating, 0) / ebooks.length || 0).toFixed(1)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{ebooks.length}</p>
                <p className="text-sm text-gray-600">Total eBooks</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{ebooks.filter(e => e.readingProgress > 0).length}</p>
                <p className="text-sm text-gray-600">Started Reading</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{ebooks.filter(e => e.readingProgress === 100).length}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{ebooks.reduce((sum, e) => sum + e.downloadCount, 0)}</p>
                <p className="text-sm text-gray-600">Total Downloads</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter eBooks</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search books, authors, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={formatFilter} onValueChange={setFormatFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by format" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Formats</SelectItem>
                {formats.map(format => (
                  <SelectItem key={format} value={format}>{format}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* eBooks Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredEbooks.map((ebook) => (
          <Card key={ebook.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-[3/4] bg-gray-200 relative">
              <Image
                src={ebook.coverImage}
                alt={ebook.title}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder-book.jpg";
                }}
              />
              <div className="absolute top-2 right-2">
                {getReadingStatusBadge(ebook.readingProgress)}
              </div>
              <div className="absolute bottom-2 left-2">
                <Badge variant="secondary">{ebook.format}</Badge>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <CardTitle className="text-lg line-clamp-2">{ebook.title}</CardTitle>
              <CardDescription>by {ebook.author}</CardDescription>
              
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{ebook.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">{ebook.rating}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">{ebook.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>{ebook.pages} pages</span>
                <span>{ebook.fileSize}</span>
              </div>

              {ebook.readingProgress > 0 && (
                <div className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span>Reading Progress</span>
                    <span>{ebook.readingProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                      style={{ width: `${ebook.readingProgress}%` }}
                    ></div>
                  </div>
                </div>
              )}

              <div className="flex flex-wrap gap-1">
                {ebook.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
                {ebook.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">+{ebook.tags.length - 3}</Badge>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={() => handleDownload(ebook.id)}
                  className="flex-1" 
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Read
                </Button>
              </div>

              <div className="text-xs text-gray-500 pt-2 border-t">
                Downloaded {ebook.downloadCount} times • Purchased {new Date(ebook.purchaseDate).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredEbooks.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No eBooks found</h3>
            <p className="text-gray-600">
              {searchTerm || categoryFilter !== "all" || formatFilter !== "all"
                ? "Try adjusting your filters to see more eBooks."
                : "You haven't purchased any eBooks yet."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
