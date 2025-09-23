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
        title: "React Component Library",
        description: "Complete set of reusable React components with TypeScript support and Storybook documentation.",
        type: "template",
        category: "Development",
        fileFormat: "ZIP",
        fileSize: "15.2 MB",
        thumbnail: "/asset-thumbnails/react-components.jpg",
        downloadCount: 5,
        purchaseDate: "2024-01-20",
        price: 49.99,
        rating: 4.8,
        tags: ["React", "TypeScript", "Components", "UI"],
        author: "DevTools Inc.",
        version: "2.1.0",
        lastUpdated: "2024-02-15",
      },
      {
        id: "2",
        title: "Marketing Email Templates",
        description: "Professional email templates for marketing campaigns, newsletters, and promotional content.",
        type: "template",
        category: "Marketing",
        fileFormat: "HTML",
        fileSize: "8.7 MB",
        thumbnail: "/asset-thumbnails/email-templates.jpg",
        downloadCount: 3,
        purchaseDate: "2024-02-05",
        price: 29.99,
        rating: 4.6,
        tags: ["Email", "Marketing", "HTML", "Templates"],
        author: "MarketPro",
        version: "1.5.0",
        lastUpdated: "2024-02-10",
      },
      {
        id: "3",
        title: "UI Design System",
        description: "Complete design system with Figma files, icons, and style guide for modern web applications.",
        type: "resource",
        category: "Design",
        fileFormat: "FIG",
        fileSize: "23.4 MB",
        thumbnail: "/asset-thumbnails/design-system.jpg",
        downloadCount: 7,
        purchaseDate: "2024-01-15",
        price: 79.99,
        rating: 4.9,
        tags: ["Figma", "Design System", "UI", "Icons"],
        author: "DesignStudio",
        version: "3.0.0",
        lastUpdated: "2024-02-20",
      },
      {
        id: "4",
        title: "Stock Photo Bundle",
        description: "High-quality stock photos for web design, marketing materials, and social media content.",
        type: "media",
        category: "Photography",
        fileFormat: "JPG",
        fileSize: "156.8 MB",
        thumbnail: "/asset-thumbnails/stock-photos.jpg",
        downloadCount: 2,
        purchaseDate: "2024-02-10",
        price: 39.99,
        rating: 4.7,
        tags: ["Photography", "Stock", "Marketing", "Web"],
        author: "PhotoPro",
        version: "1.0.0",
        lastUpdated: "2024-02-10",
      },
      {
        id: "5",
        title: "Business Plan Template",
        description: "Comprehensive business plan template with financial projections and market analysis sections.",
        type: "document",
        category: "Business",
        fileFormat: "DOCX",
        fileSize: "2.1 MB",
        thumbnail: "/asset-thumbnails/business-plan.jpg",
        downloadCount: 1,
        purchaseDate: "2024-02-12",
        price: 19.99,
        rating: 4.5,
        tags: ["Business", "Planning", "Template", "Finance"],
        author: "BizTemplates",
        version: "2.0.0",
        lastUpdated: "2024-01-30",
      },
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
        return "bg-blue-100 text-blue-800";
      case "media":
        return "bg-purple-100 text-purple-800";
      case "resource":
        return "bg-green-100 text-green-800";
      case "tool":
        return "bg-orange-100 text-orange-800";
      case "document":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">My Digital Assets</h1>
        <p className="text-gray-600 mt-2">
          Access your purchased templates, resources, and digital tools
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Folder className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{assets.length}</p>
                <p className="text-sm text-gray-600">Total Assets</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{assets.filter(a => a.type === "template").length}</p>
                <p className="text-sm text-gray-600">Templates</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{assets.filter(a => a.type === "media").length}</p>
                <p className="text-sm text-gray-600">Media</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Archive className="h-5 w-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{assets.filter(a => a.type === "resource").length}</p>
                <p className="text-sm text-gray-600">Resources</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Download className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{assets.reduce((sum, a) => sum + a.downloadCount, 0)}</p>
                <p className="text-sm text-gray-600">Downloads</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Filter Assets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Search assets, descriptions, or tags..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
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
          </div>
        </CardContent>
      </Card>

      {/* Assets Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssets.map((asset) => (
          <Card key={asset.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="aspect-video bg-gray-200 relative">
              <Image
                src={asset.thumbnail}
                alt={asset.title}
                fill
                className="object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "/placeholder-asset.jpg";
                }}
              />
              <div className="absolute top-2 right-2">
                <Badge className={getTypeBadgeColor(asset.type)}>
                  {asset.type.charAt(0).toUpperCase() + asset.type.slice(1)}
                </Badge>
              </div>
              <div className="absolute bottom-2 left-2">
                <Badge variant="secondary">{asset.fileFormat}</Badge>
              </div>
            </div>
            
            <CardHeader className="pb-3">
              <div className="flex items-start gap-2">
                <div className="p-2 bg-gray-100 rounded-lg">
                  {getTypeIcon(asset.type)}
                </div>
                <div className="flex-1">
                  <CardTitle className="text-lg line-clamp-2">{asset.title}</CardTitle>
                  <CardDescription>by {asset.author}</CardDescription>
                </div>
              </div>
              
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="outline">{asset.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  <span className="text-xs">{asset.rating}</span>
                </div>
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              <p className="text-sm text-gray-600 line-clamp-2">{asset.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <span>v{asset.version}</span>
                <span>{asset.fileSize}</span>
              </div>

              <div className="flex flex-wrap gap-1">
                {asset.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
                ))}
                {asset.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">+{asset.tags.length - 3}</Badge>
                )}
              </div>

              <div className="flex gap-2 pt-2">
                <Button 
                  onClick={() => handleDownload(asset.id)}
                  className="flex-1" 
                  size="sm"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>

              <div className="text-xs text-gray-500 pt-2 border-t">
                Downloaded {asset.downloadCount} times • Updated {new Date(asset.lastUpdated).toLocaleDateString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredAssets.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <Folder className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No assets found</h3>
            <p className="text-gray-600">
              {searchTerm || typeFilter !== "all" || categoryFilter !== "all"
                ? "Try adjusting your filters to see more assets."
                : "You haven't purchased any digital assets yet."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
