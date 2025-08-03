import React, { useState, useEffect } from 'react';
import { MapPin, Clock, Users, Recycle, Award, Bell, Settings, Menu, Plus, X, QrCode, Download, CheckCircle } from 'lucide-react';
import QRCode from 'qrcode';

// Define types for better TypeScript support
interface EcoPoint {
  id: number;
  name: string;
  address: string;
  distance: string;
  status: string;
  fullness: number;
  lastUpdated: string;
  accepts: string[];
  hours: string;
  coordinates: { lat: number; lng: number };
}

interface QRCodeData {
  userId: string;
  userName: string;
  timestamp: string;
  qrType: string;
}

const EcoPointApp = () => {
  const [selectedLocation, setSelectedLocation] = useState<EcoPoint | null>(null);
  const [showQRModal, setShowQRModal] = useState(false);
  const [qrCodeData, setQrCodeData] = useState<QRCodeData | null>(null);
  const [qrCodeImage, setQrCodeImage] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [currentUser] = useState({ id: 'ECO-MC5XJQ6G', name: 'Alex Demo' });
  
  // Admin data
  const adminData = {
    approvedToday: 24,
    activeEcoPoints: 15,
    totalUsers: 1247,
    adminName: 'Alex',
    adminRole: 'Senior Admin'
  };

  // Sample pending submissions data
  const pendingSubmissions = [
    {
      id: 1,
      user: { name: 'Sarah Johnson', email: 'sarah@example.com' },
      category: 'Plastic',
      quantity: 5,
      unit: 'items',
      weight: '2.5 kg',
      location: 'Downtown Community Center',
      points: 25,
      submitted: '2 hours ago',
      status: 'pending'
    },
    {
      id: 2,
      user: { name: 'Mike Chen', email: 'mike@example.com' },
      category: 'Paper',
      quantity: 12,
      unit: 'items',
      weight: '3.2 kg',
      location: 'Shopping Mall - North Entrance',
      points: 60,
      submitted: '4 hours ago',
      status: 'pending'
    },
    {
      id: 3,
      user: { name: 'Emma Wilson', email: 'emma@example.com' },
      category: 'Electronics',
      quantity: 2,
      unit: 'items',
      weight: '1.8 kg',
      location: 'Central Park Visitor Center',
      points: 50,
      submitted: '1 day ago',
      status: 'pending'
    },
    {
      id: 4,
      user: { name: 'David Brown', email: 'david@example.com' },
      category: 'Glass',
      quantity: 8,
      unit: 'items',
      weight: '4.1 kg',
      location: 'Public Library - Main Branch',
      points: 64,
      submitted: '2 days ago',
      status: 'pending'
    }
  ];

  // Rewards data
  const rewards = [
    {
      id: 1,
      name: 'Eco-Friendly Water Bottle',
      description: 'Reusable stainless steel water bottle with EcoPoint branding',
      points: 500,
      category: 'Eco Products',
      popularity: 95,
      isNew: false,
      isFeatured: true,
      image: '💧',
      redeemedCount: 127
    },
    {
      id: 2,
      name: 'Plant a Tree Certificate',
      description: 'Certificate for planting a tree in your name in a local forest',
      points: 1000,
      category: 'Environmental',
      popularity: 88,
      isNew: true,
      isFeatured: true,
      image: '🌳',
      redeemedCount: 89
    },
    {
      id: 3,
      name: 'Local Coffee Shop Voucher',
      description: '$10 voucher for participating local coffee shops',
      points: 750,
      category: 'Local Business',
      popularity: 92,
      isNew: false,
      isFeatured: true,
      image: '☕',
      redeemedCount: 156
    },
    {
      id: 4,
      name: 'Recycling Workshop Ticket',
      description: 'Free entry to monthly recycling education workshop',
      points: 300,
      category: 'Education',
      popularity: 76,
      isNew: true,
      isFeatured: false,
      image: '📚',
      redeemedCount: 45
    },
    {
      id: 5,
      name: 'EcoPoint T-Shirt',
      description: 'Organic cotton t-shirt with EcoPoint logo',
      points: 800,
      category: 'Eco Products',
      popularity: 84,
      isNew: false,
      isFeatured: false,
      image: '👕',
      redeemedCount: 203
    },
    {
      id: 6,
      name: 'Community Garden Plot',
      description: 'Monthly access to community garden plot for growing vegetables',
      points: 1200,
      category: 'Community',
      popularity: 68,
      isNew: false,
      isFeatured: false,
      image: '🌱',
      redeemedCount: 32
    },
    {
      id: 7,
      name: 'Bike Repair Voucher',
      description: '$15 voucher for local bike repair shop',
      points: 600,
      category: 'Local Business',
      popularity: 79,
      isNew: false,
      isFeatured: false,
      image: '🚲',
      redeemedCount: 78
    },
    {
      id: 8,
      name: 'EcoPoint Hoodie',
      description: 'Warm hoodie made from recycled materials',
      points: 1500,
      category: 'Eco Products',
      popularity: 91,
      isNew: false,
      isFeatured: false,
      image: '🧥',
      redeemedCount: 167
    }
  ];

  // Recent redemptions data
  const recentRedemptions = [
    {
      id: 1,
      user: { name: 'Sarah J.', avatar: '👩‍🦰' },
      reward: 'Eco-Friendly Water Bottle',
      points: 500,
      redeemed: '2 hours ago'
    },
    {
      id: 2,
      user: { name: 'Mike C.', avatar: '👨‍🦱' },
      reward: 'Local Coffee Shop Voucher',
      points: 750,
      redeemed: '4 hours ago'
    },
    {
      id: 3,
      user: { name: 'Emma W.', avatar: '👩‍🦳' },
      reward: 'Plant a Tree Certificate',
      points: 1000,
      redeemed: '1 day ago'
    },
    {
      id: 4,
      user: { name: 'David B.', avatar: '👨‍🦲' },
      reward: 'EcoPoint T-Shirt',
      points: 800,
      redeemed: '2 days ago'
    },
    {
      id: 5,
      user: { name: 'Lisa K.', avatar: '👩‍🦱' },
      reward: 'Recycling Workshop Ticket',
      points: 300,
      redeemed: '3 days ago'
    }
  ];

  // Sample data for eco points
  const ecoPoints: EcoPoint[] = [
    {
      id: 1,
      name: "Downtown Community Center",
      address: "123 Main Street",
      distance: "1.5 miles away",
      status: "Open",
      fullness: 75,
      lastUpdated: "4 days ago",
      accepts: ["plastic", "paper", "glass"],
      hours: "Mon-Fri: 8AM-6PM, Sat-Sun: 9AM-5PM",
      coordinates: { lat: 40.7589, lng: -73.9851 }
    },
    {
      id: 2,
      name: "Shopping Mall - North Entrance",
      address: "456 Oak Avenue",
      distance: "1.4 miles away",
      status: "Open",
      fullness: 85,
      lastUpdated: "3 days ago",
      accepts: ["plastic", "paper", "glass", "metal"],
      hours: "Daily: 10AM-9PM",
      coordinates: { lat: 40.7614, lng: -73.9776 }
    },
    {
      id: 3,
      name: "Central Park Visitor Center",
      address: "789 Park Drive",
      distance: "0.7 miles away",
      status: "Nearly Full",
      fullness: 90,
      lastUpdated: "2 days ago",
      accepts: ["plastic", "metal"],
      hours: "Daily: 6AM-8PM",
      coordinates: { lat: 40.7829, lng: -73.9654 }
    },
    {
      id: 4,
      name: "Green Valley High School",
      address: "321 School Road",
      distance: "0.7 miles away",
      status: "Open",
      fullness: 35,
      lastUpdated: "4 days ago",
      accepts: ["paper", "plastic"],
      hours: "Mon-Fri: 7AM-5PM (School days only)",
      coordinates: { lat: 40.7505, lng: -73.9934 }
    },
    {
      id: 5,
      name: "Public Library - Main Branch",
      address: "654 Library Ave",
      distance: "2.6 miles away",
      status: "Open",
      fullness: 58,
      lastUpdated: "1 day ago",
      accepts: ["paper", "electronics"],
      hours: "Mon-Thu: 9AM-8PM, Fri-Sun: 10AM-6PM",
      coordinates: { lat: 40.7282, lng: -73.9942 }
    }
  ];

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'Open': return 'text-green-600';
      case 'Nearly Full': return 'text-yellow-600';
      case 'Temporarily Closed': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusDot = (status: string): string => {
    switch (status) {
      case 'Open': return 'bg-green-500';
      case 'Nearly Full': return 'bg-yellow-500';
      case 'Temporarily Closed': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getFullnessColor = (fullness: number): string => {
    if (fullness >= 90) return 'bg-red-500';
    if (fullness >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getCategoryColor = (category: string): string => {
    switch (category) {
      case 'Plastic': return 'bg-blue-100 text-blue-800';
      case 'Paper': return 'bg-green-100 text-green-800';
      case 'Glass': return 'bg-purple-100 text-purple-800';
      case 'Metal': return 'bg-orange-100 text-orange-800';
      case 'Electronics': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApproveSubmission = (id: number) => {
    alert(`Submission ${id} approved!`);
  };

  const handleRejectSubmission = (id: number) => {
    alert(`Submission ${id} rejected!`);
  };

  const handleDeleteSubmission = (id: number) => {
    alert(`Submission ${id} deleted!`);
  };

  const handleRedeemReward = (reward: any) => {
    if (userPoints >= reward.points) {
      setSelectedReward(reward);
      setShowRedeemModal(true);
    } else {
      alert('Not enough points to redeem this reward!');
    }
  };

  const confirmRedeem = () => {
    if (selectedReward) {
      setUserPoints(userPoints - selectedReward.points);
      setShowRedeemModal(false);
      setSelectedReward(null);
    }
  };

  const getFilteredRewards = () => {
    let filtered = rewards;
    
    if (rewardFilter === 'new') {
      filtered = rewards.filter(reward => reward.isNew);
    } else if (rewardFilter === 'popular') {
      filtered = rewards.filter(reward => reward.redeemedCount > 100);
    } else if (rewardFilter === 'lowest') {
      filtered = [...rewards].sort((a, b) => a.points - b.points);
    } else if (rewardFilter === 'featured') {
      filtered = rewards.filter(reward => reward.isFeatured);
    }
    
    return filtered;
  };

  const [currentPage, setCurrentPage] = useState('dashboard');
  const [userPoints, setUserPoints] = useState(2847);
  const [activeTab, setActiveTab] = useState('submissions');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [rewardFilter, setRewardFilter] = useState('all');
  const [showRecentRedemptions, setShowRecentRedemptions] = useState(true);

  // Generate personal QR code data
  const generatePersonalQRCodeData = (): QRCodeData => {
    return {
      userId: currentUser.id,
      userName: currentUser.name,
      timestamp: new Date().toISOString(),
      qrType: 'personal_recycling_id'
    };
  };

  // Generate personal QR code
  const generatePersonalQRCode = async () => {
    try {
      const qrData = generatePersonalQRCodeData();
      const qrImage = await QRCode.toDataURL(JSON.stringify(qrData), {
        width: 300,
        margin: 2,
        color: {
          dark: '#059669', // Green color matching the app theme
          light: '#FFFFFF'
        }
      });
      setQrCodeImage(qrImage);
      setQrCodeData(qrData);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };

  // Handle submit button click
  const handleSubmitClick = () => {
    if (!isLoggedIn) {
      alert('Please log in to submit recycling activity');
      return;
    }
    
    // Generate personal QR code directly
    generatePersonalQRCode();
    setShowQRModal(true);
  };

  // Download QR code
  const downloadQRCode = () => {
    if (qrCodeImage) {
      const link = document.createElement('a');
      link.href = qrCodeImage;
      link.download = `ecopoint-personal-qr-${qrCodeData?.userId}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Dashboard Page Component (Full User Dashboard)
  const DashboardPage = () => (
    <div className="space-y-6">
      {/* Welcome Greeting */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Alex!</h1>
        <p className="text-gray-600 text-lg">You've helped save 24 trees this month. Keep up the great work!</p>
      </div>

      {/* Info Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* ECO NEWS Card */}
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <Recycle className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-blue-700 bg-blue-200 px-2 py-1 rounded-full">NEWS</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">ECO NEWS</h3>
          <p className="text-sm text-gray-600">Uzbekistan launches new recycling initiative in Tashkent</p>
        </div>

        {/* TIPS Card */}
        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <Award className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-green-700 bg-green-200 px-2 py-1 rounded-full">TIPS</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">ENVIRONMENTAL TIPS</h3>
          <p className="text-sm text-gray-600">Separate your waste properly to maximize recycling efficiency</p>
        </div>

        {/* POLLUTION FACTS Card */}
        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
              <MapPin className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-orange-700 bg-orange-200 px-2 py-1 rounded-full">FACTS</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">POLLUTION FACTS</h3>
          <p className="text-sm text-gray-600">Uzbekistan recycles 15% of plastic waste annually</p>
        </div>

        {/* CITY RANKING Card */}
        <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
              <Users className="h-6 w-6 text-white" />
            </div>
            <span className="text-xs font-semibold text-purple-700 bg-purple-200 px-2 py-1 rounded-full">RANK</span>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">CITY RANKING</h3>
          <p className="text-2xl font-bold text-purple-600">#12</p>
          <p className="text-sm text-gray-600">in Tashkent</p>
        </div>
      </div>

      {/* Recent Activity and Weekly Progress Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Recent Activity</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Recycle className="h-5 w-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">5 Plastic Bottles</h3>
                  <span className="text-sm font-medium text-green-600">+25 pts</span>
                </div>
                <p className="text-sm text-gray-600">Downtown Community Center</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Recycle className="h-5 w-5 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">12 Paper Items</h3>
                  <span className="text-sm font-medium text-green-600">+60 pts</span>
                </div>
                <p className="text-sm text-gray-600">Shopping Mall - North Entrance</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <Recycle className="h-5 w-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">2 Electronics</h3>
                  <span className="text-sm font-medium text-green-600">+50 pts</span>
                </div>
                <p className="text-sm text-gray-600">Central Park Visitor Center</p>
                <p className="text-xs text-gray-500">3 days ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Progress */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900">Weekly Progress</h2>
          </div>
          <div className="p-6 space-y-4">
            {[
              { day: 'Mon', points: 45, progress: 75 },
              { day: 'Tue', points: 32, progress: 60 },
              { day: 'Wed', points: 58, progress: 90 },
              { day: 'Thu', points: 28, progress: 45 },
              { day: 'Fri', points: 65, progress: 100 },
              { day: 'Sat', points: 42, progress: 70 }
            ].map((item, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="w-12 text-sm font-medium text-gray-600">{item.day}</div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${item.progress}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-16 text-sm font-medium text-green-600 text-right">+{item.points}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Recyclers This Month */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900">Top Recyclers This Month</h2>
        </div>
        <div className="p-6 space-y-4">
          {[
            { name: 'Sarah Johnson', points: 2847, rank: 1, medal: '🥇' },
            { name: 'Mike Chen', points: 2156, rank: 2, medal: '🥈' },
            { name: 'Emma Wilson', points: 1892, rank: 3, medal: '🥉' }
          ].map((recycler, index) => (
            <div key={index} className="flex items-center space-x-4">
              <div className="w-8 h-8 flex items-center justify-center text-xl">
                {recycler.medal}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{recycler.name}</h3>
                <p className="text-sm text-gray-600">#{recycler.rank} this month</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">{recycler.points.toLocaleString()} pts</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Map Page Component (With Dashboard Content)
  const MapPage = () => (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your recycling overview</p>
      </div>

      {/* User Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <Award className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Points</p>
              <p className="text-2xl font-bold text-gray-900">{userPoints.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Recycle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Recycling Sessions</p>
              <p className="text-2xl font-bold text-gray-900">24</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <MapPin className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Locations Visited</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={handleSubmitClick}
            className="flex items-center p-4 border-2 border-green-200 rounded-lg hover:border-green-300 transition-colors"
          >
            <QrCode className="h-8 w-8 text-green-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Generate QR Code</div>
              <div className="text-sm text-gray-600">Get your personal recycling QR</div>
            </div>
          </button>
          <button className="flex items-center p-4 border-2 border-blue-200 rounded-lg hover:border-blue-300 transition-colors">
            <MapPin className="h-8 w-8 text-blue-600 mr-3" />
            <div className="text-left">
              <div className="font-medium text-gray-900">Find Locations</div>
              <div className="text-sm text-gray-600">Discover nearby EcoPoints</div>
            </div>
          </button>
        </div>
      </div>



      {/* EcoPoint Locations Section */}
      <div className="space-y-6">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-2">EcoPoint Locations</h2>
          <p className="text-gray-600">Find recycling centers and drop-off points near you</p>
        </div>

        {/* Legend */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Active EcoPoints</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Temporarily Closed</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <span className="text-sm text-gray-700">Nearly Full</span>
            </div>
          </div>
        </div>

        {/* Map Container */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="h-80 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg relative overflow-hidden">
            {/* Simulated Map Background */}
            <div className="absolute inset-0 opacity-30">
              <svg className="w-full h-full" viewBox="0 0 400 300">
                {/* Streets */}
                <path d="M0,150 L400,150" stroke="#94a3b8" strokeWidth="2" />
                <path d="M200,0 L200,300" stroke="#94a3b8" strokeWidth="2" />
                <path d="M50,50 L350,250" stroke="#cbd5e1" strokeWidth="1" />
                <path d="M350,50 L50,250" stroke="#cbd5e1" strokeWidth="1" />
                
                {/* Water/Park areas */}
                <circle cx="200" cy="150" r="40" fill="#3b82f6" opacity="0.3" />
                <rect x="280" y="80" width="60" height="40" fill="#10b981" opacity="0.3" />
              </svg>
            </div>
            
            {/* Map Markers */}
            {ecoPoints.map((point, index) => (
              <div
                key={point.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                style={{
                  left: `${20 + (index * 15) + Math.sin(index) * 30}%`,
                  top: `${30 + (index * 12) + Math.cos(index) * 20}%`
                }}
                onClick={() => setSelectedLocation(point)}
              >
                <div className={`w-6 h-6 ${getStatusDot(point.status)} rounded-full border-2 border-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform`}>
                  <MapPin className="h-3 w-3 text-white" />
                </div>
                {selectedLocation?.id === point.id && (
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-3 min-w-48 z-10">
                    <h3 className="font-semibold text-sm">{point.name}</h3>
                    <p className="text-xs text-gray-600">{point.address}</p>
                    <p className="text-xs text-gray-500 mt-1">{point.distance}</p>
                  </div>
                )}
              </div>
            ))}
            
            {/* Map Controls */}
            <div className="absolute top-4 left-4 bg-white rounded shadow">
              <button className="p-2 text-gray-600 hover:bg-gray-50">+</button>
              <div className="border-t"></div>
              <button className="p-2 text-gray-600 hover:bg-gray-50">-</button>
            </div>
          </div>
        </div>

        {/* Nearby EcoPoints List */}
        <div className="bg-white rounded-lg shadow-sm">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Nearby EcoPoints</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {ecoPoints.map((point) => (
              <div key={point.id} className="p-6 hover:bg-gray-50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-gray-900">{point.name}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        point.status === 'Open' ? 'bg-green-100 text-green-800' : 
                        point.status === 'Nearly Full' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'
                      }`}>
                        {point.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{point.address} • {point.distance}</p>
                    <p className="text-sm text-gray-500 mb-2">Accepts: {point.accepts.join(', ')}</p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{point.hours}</span>
                    </div>
                  </div>
                  <div className="ml-4 text-right">
                    <div className="text-sm font-medium text-gray-900 mb-1">{point.fullness}% Full</div>
                    <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-300 ${getFullnessColor(point.fullness)}`}
                        style={{ width: `${point.fullness}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Last updated: {point.lastUpdated}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Admin Page Component
  const AdminPage = () => {
    const filteredSubmissions = categoryFilter === 'all' 
      ? pendingSubmissions 
      : pendingSubmissions.filter(sub => sub.category === categoryFilter);

    return (
      <div className="space-y-6">
        {/* Admin Greeting */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
              <Users className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Hi, {adminData.adminName}!</h1>
              <p className="text-gray-600">How are you feeling today?</p>
              <p className="text-sm text-gray-500">{adminData.adminRole}</p>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6 border border-green-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-green-700 bg-green-200 px-2 py-1 rounded-full">TODAY</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Approved Today</h3>
            <p className="text-2xl font-bold text-green-600">{adminData.approvedToday}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-blue-700 bg-blue-200 px-2 py-1 rounded-full">ACTIVE</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Active EcoPoints</h3>
            <p className="text-2xl font-bold text-blue-600">{adminData.activeEcoPoints}</p>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 border border-purple-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-purple-700 bg-purple-200 px-2 py-1 rounded-full">TOTAL</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Total Users</h3>
            <p className="text-2xl font-bold text-purple-600">{adminData.totalUsers.toLocaleString()}</p>
          </div>

          <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6 border border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                <Recycle className="h-6 w-6 text-white" />
              </div>
              <span className="text-xs font-semibold text-orange-700 bg-orange-200 px-2 py-1 rounded-full">PENDING</span>
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Pending Submissions</h3>
            <p className="text-2xl font-bold text-orange-600">{pendingSubmissions.length}</p>
          </div>
        </div>

        {/* Main Content Box with Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          {/* Tabs */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'submissions', name: 'Submissions', icon: Recycle },
                { id: 'ecopoints', name: 'EcoPoints', icon: MapPin },
                { id: 'users', name: 'Users', icon: Users },
                { id: 'analytics', name: 'Analytics', icon: Award }
              ].map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab.id
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'submissions' && (
              <div>
                {/* Filter and Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-gray-900">Pending Submissions</h2>
                  <div className="flex items-center space-x-4">
                    <select
                      value={categoryFilter}
                      onChange={(e) => setCategoryFilter(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    >
                      <option value="all">All Categories</option>
                      <option value="Plastic">Plastic</option>
                      <option value="Paper">Paper</option>
                      <option value="Glass">Glass</option>
                      <option value="Metal">Metal</option>
                      <option value="Electronics">Electronics</option>
                    </select>
                  </div>
                </div>

                {/* Submissions Table */}
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Points</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Submitted</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredSubmissions.map((submission) => (
                        <tr key={submission.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div>
                              <div className="text-sm font-medium text-gray-900">{submission.user.name}</div>
                              <div className="text-sm text-gray-500">{submission.user.email}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCategoryColor(submission.category)}`}>
                              {submission.category}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            <div>{submission.quantity} {submission.unit}</div>
                            <div className="text-gray-500">{submission.weight}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                            {submission.location}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-green-600">
                            +{submission.points} pts
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {submission.submitted}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleApproveSubmission(submission.id)}
                                className="text-green-600 hover:text-green-900 p-1 rounded"
                                title="Approve"
                              >
                                <CheckCircle className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleRejectSubmission(submission.id)}
                                className="text-red-600 hover:text-red-900 p-1 rounded"
                                title="Reject"
                              >
                                <X className="h-4 w-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteSubmission(submission.id)}
                                className="text-gray-600 hover:text-gray-900 p-1 rounded"
                                title="Delete"
                              >
                                <Menu className="h-4 w-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'ecopoints' && (
              <div className="text-center py-12">
                <MapPin className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">EcoPoints Management</h3>
                <p className="text-gray-600">Manage EcoPoint locations and settings</p>
              </div>
            )}

            {activeTab === 'users' && (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">User Management</h3>
                <p className="text-gray-600">Manage user accounts and permissions</p>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="text-center py-12">
                <Award className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Analytics Dashboard</h3>
                <p className="text-gray-600">View detailed analytics and reports</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  // Rewards Page Component
  const RewardsPage = () => {
    const filteredRewards = getFilteredRewards();
    const hasExpiringPoints = userPoints > 2000; // Simulate expiring points

    return (
      <div className="space-y-6">
        {/* Expiring Points Alert */}
        {hasExpiringPoints && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center">
              <Bell className="h-5 w-5 text-yellow-600 mr-3" />
              <div>
                <h3 className="text-sm font-medium text-yellow-800">Points Expiring Soon!</h3>
                <p className="text-sm text-yellow-700">You have {userPoints} points that will expire in 30 days. Redeem them now!</p>
              </div>
            </div>
          </div>
        )}

        {/* Featured Rewards Section */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Rewards</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {rewards.filter(reward => reward.isFeatured).map((reward) => (
              <div
                key={reward.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 group relative"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{reward.image}</span>
                  {reward.isNew && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{reward.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">{reward.points} pts</span>
                  <span className="text-sm text-gray-500">{reward.redeemedCount} redeemed</span>
                </div>
                
                {/* Hover Effect - Redeem Button */}
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => handleRedeemReward(reward)}
                    className="bg-green-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Redeem Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">All Rewards</h2>
            <div className="flex space-x-2">
              {[
                { id: 'all', name: 'All', color: 'bg-gray-100 text-gray-700' },
                { id: 'featured', name: 'Featured', color: 'bg-green-100 text-green-700' },
                { id: 'new', name: 'New This Month', color: 'bg-blue-100 text-blue-700' },
                { id: 'popular', name: 'Most Redeemed', color: 'bg-purple-100 text-purple-700' },
                { id: 'lowest', name: 'Lowest Cost', color: 'bg-orange-100 text-orange-700' }
              ].map((filter) => (
                <button
                  key={filter.id}
                  onClick={() => setRewardFilter(filter.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    rewardFilter === filter.id
                      ? filter.color
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>

          {/* All Rewards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRewards.map((reward) => (
              <div
                key={reward.id}
                className="bg-gray-50 rounded-lg p-4 hover:shadow-md transition-all duration-200 group relative cursor-pointer"
                title={`${reward.name} - ${reward.description}`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl">{reward.image}</span>
                  {reward.isNew && (
                    <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{reward.name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{reward.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-green-600">{reward.points} pts</span>
                  <span className="text-sm text-gray-500">{reward.redeemedCount} redeemed</span>
                </div>
                
                {/* Hover Effect - Redeem Button */}
                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <button
                    onClick={() => handleRedeemReward(reward)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors"
                  >
                    Redeem Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Redemptions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div 
            className="p-6 cursor-pointer"
            onClick={() => setShowRecentRedemptions(!showRecentRedemptions)}
          >
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Recent Redemptions</h2>
              <button className="text-gray-500 hover:text-gray-700">
                {showRecentRedemptions ? '−' : '+'}
              </button>
            </div>
          </div>
          
          {showRecentRedemptions && (
            <div className="px-6 pb-6">
              <div className="space-y-4">
                {recentRedemptions.map((redemption) => (
                  <div key={redemption.id} className="flex items-center space-x-4 p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl">{redemption.user.avatar}</div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{redemption.user.name}</div>
                      <div className="text-sm text-gray-600">{redemption.reward}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-green-600">-{redemption.points} pts</div>
                      <div className="text-xs text-gray-500">{redemption.redeemed}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Redeem Confirmation Modal
  const RedeemModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Reward Redeemed!</h2>
            <p className="text-gray-600 mb-6">
              You successfully redeemed <strong>{selectedReward?.name}</strong> for {selectedReward?.points} points.
            </p>
            
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">New Points Balance:</span>
                <span className="text-lg font-bold text-green-600">{userPoints - (selectedReward?.points || 0)} pts</span>
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={confirmRedeem}
                className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowRedeemModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // QR Code Modal Component
  const QRCodeModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Your Personal Recycling QR Code</h2>
            <button
              onClick={() => setShowQRModal(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="text-center space-y-4">
            {/* QR Code */}
            {qrCodeImage && (
              <div className="bg-white p-4 rounded-lg border-2 border-gray-200 inline-block">
                <img src={qrCodeImage} alt="QR Code" className="w-64 h-64" />
              </div>
            )}

            {/* Personal Details */}
            {qrCodeData && (
              <div className="bg-gray-50 rounded-lg p-4 text-left">
                <h3 className="font-semibold text-gray-900 mb-3">Personal Recycling ID</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">User ID:</span>
                    <span className="font-medium text-gray-900">{qrCodeData.userId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Name:</span>
                    <span className="font-medium text-gray-900">{qrCodeData.userName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Generated:</span>
                    <span className="font-medium text-gray-900">
                      {new Date(qrCodeData.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="bg-blue-50 rounded-lg p-4">
              <h4 className="font-semibold text-blue-900 mb-2">How to Use Your QR Code</h4>
              <div className="text-sm text-blue-800 space-y-1">
                <p>1. Show this QR code at any EcoPoint recycling station</p>
                <p>2. Staff will scan it to identify your account</p>
                <p>3. Deposit your sorted recyclables</p>
                <p>4. Points will be automatically credited to your account</p>
                <p>5. Save this QR code to your phone for quick access</p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 pt-4">
              <button
                onClick={downloadQRCode}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Download className="h-4 w-4 mr-2" />
                Download QR
              </button>
              <button
                onClick={() => setShowQRModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setCurrentPage('dashboard')}
                className="flex items-center space-x-2 hover:opacity-80 transition-opacity"
              >
                <Recycle className="h-8 w-8 text-green-600" />
                <span className="text-xl font-bold text-gray-900">EcoPoint</span>
              </button>
              <nav className="hidden md:flex space-x-8 ml-8">
                <button 
                  onClick={() => setCurrentPage('dashboard')}
                  className={`${currentPage === 'dashboard' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Dashboard
                </button>
                <button 
                  onClick={handleSubmitClick}
                  className="text-gray-600 hover:text-gray-900 flex items-center"
                >
                  <Plus className="h-4 w-4 mr-1" />
                  Submit
                </button>
                <button 
                  onClick={() => setCurrentPage('rewards')}
                  className={`${currentPage === 'rewards' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'} flex items-center`}
                >
                  <Award className="h-4 w-4 mr-1 text-orange-500" />
                  Rewards
                </button>
                <button 
                  onClick={() => setCurrentPage('map')}
                  className={`${currentPage === 'map' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'} flex items-center`}
                >
                  <MapPin className="h-4 w-4 mr-1" />
                  Map
                </button>
                <button 
                  onClick={() => setCurrentPage('admin')}
                  className={`${currentPage === 'admin' ? 'text-blue-600 font-medium' : 'text-gray-600 hover:text-gray-900'}`}
                >
                  Admin
                </button>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-orange-100 px-3 py-1 rounded-full">
                <Award className="h-4 w-4 text-orange-600" />
                <span className="font-semibold text-orange-700">{userPoints.toLocaleString()}</span>
              </div>
              <Bell className="h-5 w-5 text-gray-600" />
              <div className="h-8 w-8 bg-gray-300 rounded-full flex items-center justify-center">
                <Users className="h-4 w-4 text-gray-600" />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentPage === 'dashboard' ? <DashboardPage /> : 
         currentPage === 'admin' ? <AdminPage /> :
         currentPage === 'rewards' ? <RewardsPage /> : <MapPage />}
      </div>

      {/* QR Code Modal */}
      {showQRModal && <QRCodeModal />}
      
      {/* Redeem Confirmation Modal */}
      {showRedeemModal && <RedeemModal />}
    </div>
  );
};

export default EcoPointApp;