"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Download,
  Search,
  Filter,
  FileText,
  Image as ImageIcon,
  Video,
  Archive,
  Calendar,
  Eye,
  Star,
  Folder,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface DigitalAsset {
  id: string;
  title: string;
  description: string;
  type: "template" | "resource" | "tool" | "media" | "document";
  category: string;
  fileFormat: string;
  fileSize: string;
  thumbnail: string;
  downloadCount: number;
  purchaseDate: string;
  price: number;
  rating: number;
  tags: string[];
  author: string;
  version: string;
  lastUpdated: string;
}

export default function MyAssetsPage() {
  const [assets, setAssets] = useState<DigitalAsset[]>([]);
  const [filteredAssets, setFilteredAssets] = useState<DigitalAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockAssets: DigitalAsset[] = [
      {
        id: "1",
        title: "Fashion Design Course Materials",
        description: "Complete set of fashion design templates, patterns, and educational resources for aspiring designers.",
        type: "template",
        category: "Fashion Design",
        fileFormat: "ZIP",
        fileSize: "15.2 MB",
        thumbnail: "/fashion-design-course.jpg",
        downloadCount: 5,
        purchaseDate: "2024-01-20",
        price: 49.99,
        rating: 4.8,
        tags: ["Fashion", "Design", "Templates", "Patterns"],
        author: "Fashion Academy",
        version: "2.1.0",
        lastUpdated: "2024-02-15",
      },
      {
        id: "2",
        title: "Garment Export Guidelines",
        description: "Professional documentation and templates for garment export procedures and compliance.",
        type: "document",
        category: "Export",
        fileFormat: "PDF",
        fileSize: "8.7 MB",
        thumbnail: "/export-guidelines-book-cover.jpg",
        downloadCount: 3,
        purchaseDate: "2024-02-05",
        price: 29.99,
        rating: 4.6,
        tags: ["Export", "Guidelines", "Garment", "Compliance"],
        author: "Trade Experts",
        version: "1.5.0",
        lastUpdated: "2024-02-10",
      },
      {
        id: "3",
        title: "Textile Production Resources",
        description: "Complete resource pack with production guides, quality control checklists, and industry standards.",
        type: "resource",
        category: "Production",
        fileFormat: "ZIP",
        fileSize: "23.4 MB",
        thumbnail: "/textile-production-course.jpg",
        downloadCount: 7,
        purchaseDate: "2024-01-15",
        price: 79.99,
        rating: 4.9,
        tags: ["Textile", "Production", "Quality", "Standards"],
        author: "Textile Pro",
        version: "3.0.0",
        lastUpdated: "2024-02-20",
      },
      {
        id: "4",
        title: "Fashion Photography Bundle",
        description: "High-quality fashion photography collection for marketing materials and portfolio development.",
        type: "media",
        category: "Photography",
        fileFormat: "JPG",
        fileSize: "156.8 MB",
        thumbnail: "/fashion-designer-woman.jpg",
        downloadCount: 2,
        purchaseDate: "2024-02-10",
        price: 39.99,
        rating: 4.7,
        tags: ["Photography", "Fashion", "Marketing", "Portfolio"],
        author: "Fashion Photos",
        version: "1.0.0",
        lastUpdated: "2024-02-10",
      },
      {
        id: "5",
        title: "Sustainable Fashion Guide",
        description: "Comprehensive guide to sustainable fashion practices, eco-friendly materials, and green manufacturing.",
        type: "document",
        category: "Sustainability",
        fileFormat: "PDF",
        fileSize: "2.1 MB",
        thumbnail: "/sustainable-textile-book-cover.jpg",
        downloadCount: 1,
        purchaseDate: "2024-02-12",
        price: 19.99,
        rating: 4.5,
        tags: ["Sustainability", "Eco-friendly", "Green", "Fashion"],
        author: "Green Fashion",
        version: "2.0.0",
        lastUpdated: "2024-01-30",
      },
      {
        id: "6",
        title: "Garment Manufacturing Handbook",
        description: "Essential handbook covering all aspects of garment manufacturing from design to production.",
        type: "document",
        category: "Manufacturing",
        fileFormat: "PDF",
        fileSize: "12.3 MB",
        thumbnail: "/garment-manufacturing-book-cover.jpg",
        downloadCount: 4,
        purchaseDate: "2024-01-25",
        price: 34.99,
        rating: 4.7,
        tags: ["Manufacturing", "Garment", "Production", "Handbook"],
        author: "Industry Experts",
        version: "1.8.0",
        lastUpdated: "2024-02-18",
      },
      {
        id: "7",
        title: "Fashion Trends Analysis",
        description: "Detailed analysis of current and upcoming fashion trends with market insights and predictions.",
        type: "document",
        category: "Market Research",
        fileFormat: "PDF",
        fileSize: "5.6 MB",
        thumbnail: "/fashion-trends-book-cover.jpg",
        downloadCount: 6,
        purchaseDate: "2024-02-01",
        price: 24.99,
        rating: 4.4,
        tags: ["Trends", "Analysis", "Market", "Fashion"],
        author: "Trend Analysts",
        version: "1.2.0",
        lastUpdated: "2024-02-12",
      },
      {
        id: "8",
        title: "Quality Control Templates",
        description: "Professional quality control templates and checklists for textile and garment production.",
        type: "template",
        category: "Quality Control",
        fileFormat: "XLSX",
        fileSize: "3.4 MB",
        thumbnail: "/textile-quality-control.jpg",
        downloadCount: 8,
        purchaseDate: "2024-01-30",
        price: 18.99,
        rating: 4.6,
        tags: ["Quality", "Control", "Templates", "Checklists"],
        author: "QC Solutions",
        version: "2.3.0",
        lastUpdated: "2024-02-14",
      }
    ];

    setTimeout(() => {
      setAssets(mockAssets);
      setFilteredAssets(mockAssets);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter assets based on search and filters
  useEffect(() => {
    let filtered = assets;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(asset =>
        asset.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Type filter
    if (typeFilter !== "all") {
      filtered = filtered.filter(asset => asset.type === typeFilter);
    }

    // Category filter
    if (categoryFilter !== "all") {
      filtered = filtered.filter(asset => asset.category === categoryFilter);
    }

    setFilteredAssets(filtered);
  }, [assets, searchTerm, typeFilter, categoryFilter]);

  const handleDownload = (assetId: string) => {
    // Implement download logic
    console.log(`Downloading asset ${assetId}`);
    // Update download count
    setAssets(prev => prev.map(asset => 
      asset.id === assetId 
        ? { ...asset, downloadCount: asset.downloadCount + 1 }
        : asset
    ));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "template":
        return <FileText className="h-5 w-5" />;
      case "media":
        return <ImageIcon className="h-5 w-5" />;
      case "resource":
        return <Folder className="h-5 w-5" />;
      case "tool":
        return <Archive className="h-5 w-5" />;
      case "document":
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  const getTypeBadgeColor = (type: string) => {
    switch (type) {
      case "template":
        return "bg-gradient-to-r from-blue-500 to-indigo-600 text-white shadow-lg";
      case "media":
        return "bg-gradient-to-r from-purple-500 to-violet-600 text-white shadow-lg";
      case "resource":
        return "bg-gradient-to-r from-emerald-500 to-green-600 text-white shadow-lg";
      case "tool":
        return "bg-gradient-to-r from-orange-500 to-amber-600 text-white shadow-lg";
      case "document":
        return "bg-gradient-to-r from-gray-500 to-slate-600 text-white shadow-lg";
      default:
        return "bg-gradient-to-r from-gray-500 to-slate-600 text-white shadow-lg";
    }
  };

  const types = [...new Set(assets.map(asset => asset.type))];
  const categories = [...new Set(assets.map(asset => asset.category))];

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
      <div className="relative overflow-hidden bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-2xl p-8 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold tracking-tight">My Digital Assets 🎨</h1>
              <p className="text-lg text-violet-100 max-w-2xl">
                Access your purchased templates, resources, and digital tools to enhance your projects
              </p>
            </div>
            <div className="hidden lg:block">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                <Folder className="h-16 w-16 text-white" />
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Folder className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-violet-100">Total Assets</p>
                  <p className="text-2xl font-bold">{assets.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <FileText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-violet-100">Templates</p>
                  <p className="text-2xl font-bold">{assets.filter(a => a.type === "template").length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <ImageIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-violet-100">Media</p>
                  <p className="text-2xl font-bold">{assets.filter(a => a.type === "media").length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Archive className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-violet-100">Resources</p>
                  <p className="text-2xl font-bold">{assets.filter(a => a.type === "resource").length}</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                  <Download className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm text-violet-100">Downloads</p>
                  <p className="text-2xl font-bold">{assets.reduce((sum, a) => sum + a.downloadCount, 0)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>
      </div>

      {/* Enhanced Filters */}
      <Card className="bg-gradient-to-br from-slate-50 to-gray-100 border-slate-200">
        <CardHeader className="bg-white/50 backdrop-blur-sm">
          <CardTitle className="text-xl text-gray-900 flex items-center gap-2">
            <Filter className="h-5 w-5 text-violet-600" />
            Filter & Search Assets
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search assets, descriptions, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-violet-200 focus:border-violet-400 focus:ring-violet-400"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px] border-violet-200 focus:border-violet-400 focus:ring-violet-400">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map(type => (
                  <SelectItem key={type} value={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px] border-violet-200 focus:border-violet-400 focus:ring-violet-400">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>{category}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset, index) => (
          <Card
            key={asset.id}
            className="group overflow-hidden hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white border-gray-200 hover:border-violet-300"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
              <Image
                src={asset.thumbnail}
                alt={asset.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder.jpg";
                }}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

              <div className="absolute top-3 right-3">
                <Badge className={`${getTypeBadgeColor(asset.type)} shadow-lg backdrop-blur-sm`}>
                  {asset.type.charAt(0).toUpperCase() + asset.type.slice(1)}
                </Badge>
              </div>
              <div className="absolute bottom-3 left-3">
                <Badge variant="secondary" className="bg-white/90 text-gray-800 shadow-lg backdrop-blur-sm">
                  {asset.fileFormat}
                </Badge>
              </div>

              {/* Download overlay on hover */}
              <div className="absolute inset-0 bg-violet-600/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <Button
                  onClick={() => handleDownload(asset.id)}
                  className="bg-white text-violet-600 hover:bg-gray-100 shadow-lg transform scale-90 group-hover:scale-100 transition-transform duration-300"
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Quick Download
                </Button>
              </div>
            </div>

            <CardHeader className="pb-4">
              <div className="flex items-start gap-3">
                <div className="p-3 bg-gradient-to-br from-violet-100 to-purple-100 rounded-xl group-hover:from-violet-200 group-hover:to-purple-200 transition-colors duration-300">
                  {getTypeIcon(asset.type)}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg font-bold text-gray-900 line-clamp-2 group-hover:text-violet-900 transition-colors duration-200">
                    {asset.title}
                  </CardTitle>
                  <CardDescription className="text-gray-600 font-medium">by {asset.author}</CardDescription>
                </div>
              </div>

              <div className="flex items-center gap-3 mt-3">
                <Badge variant="outline" className="border-violet-200 text-violet-700 bg-violet-50">
                  {asset.category}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-semibold text-gray-700">{asset.rating}</span>
                </div>
                <div className="text-sm font-bold text-violet-600">${asset.price}</div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-700 line-clamp-2 leading-relaxed">{asset.description}</p>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 font-medium">v{asset.version}</span>
                <span className="text-gray-600 font-medium">{asset.fileSize}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {asset.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs bg-gray-50 border-gray-200 text-gray-700 hover:bg-violet-50 hover:border-violet-200 hover:text-violet-700 transition-colors duration-200">
                    {tag}
                  </Badge>
                ))}
                {asset.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs bg-gray-50 border-gray-200 text-gray-700">
                    +{asset.tags.length - 3}
                  </Badge>
                )}
              </div>

              <div className="flex gap-2 pt-3">
                <Button
                  onClick={() => handleDownload(asset.id)}
                  className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm" className="border-violet-200 text-violet-700 hover:bg-violet-50 hover:border-violet-300">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>

              <div className="text-xs text-gray-500 pt-3 border-t border-gray-100 flex items-center justify-between">
                <span>Downloaded {asset.downloadCount} times</span>
                <span>Updated {new Date(asset.lastUpdated).toLocaleDateString()}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <Card className="bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200">
          <CardContent className="text-center py-16">
            <div className="w-24 h-24 bg-gradient-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Folder className="h-12 w-12 text-violet-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">No assets found</h3>
            <p className="text-gray-600 max-w-md mx-auto leading-relaxed">
              {searchTerm || typeFilter !== "all" || categoryFilter !== "all"
                ? "Try adjusting your search terms or filters to discover more digital assets."
                : "Start building your digital asset collection by purchasing templates, resources, and tools."}
            </p>
            {!(searchTerm || typeFilter !== "all" || categoryFilter !== "all") && (
              <Button className="mt-6 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg">
                Browse Asset Store
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
