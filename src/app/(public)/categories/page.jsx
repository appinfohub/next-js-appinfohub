import React from 'react';
import Link from 'next/link';
import {
  // Game Icons
  Swords,
  Compass,
  LayoutGrid,
  CreditCard,
  Smile,
  Disc,
  Music,
  Puzzle,
  Gamepad2,
  Trophy,
  Type,
  Joystick,
  Car,
  Target,
  GraduationCap,
  Dices,
  
  // App Icons
  Monitor,
  IndianRupee,
  Tv,
  MessageSquare,
  Wrench,
  ShoppingBag,
  Utensils,
  Volume2,
  Palette,
  Heart,
  Plane,
  MapPin,
  CheckSquare,
  Video,
  Briefcase,
  Users,
  Stethoscope,
  BookOpen,
  CloudSun,
  Home,
  Newspaper,
  Camera,
  HeartHandshake,
  Book,
  Sparkles,
  Baby
} from 'lucide-react';

// Games Categories Configuration
const gameCategories = [
  { name: 'Action', icon: Swords },
  { name: 'Adventure', icon: Compass },
  { name: 'Board', icon: LayoutGrid },
  { name: 'Card', icon: CreditCard },
  { name: 'Casual', icon: Smile },
  { name: 'Demo', icon: Disc },
  { name: 'Music', icon: Music },
  { name: 'Puzzle', icon: Puzzle },
  { name: 'Role Playing', icon: Gamepad2 },
  { name: 'Sports', icon: Trophy },
  { name: 'Word', icon: Type },
  { name: 'Arcade', icon: Joystick },
  { name: 'Racing', icon: Car },
  { name: 'Strategy', icon: Target },
  { name: 'Educational', icon: GraduationCap },
  { name: 'Casino', icon: Dices },
];

// Apps Categories Configuration
const appCategories = [
  { name: 'Desktop', icon: Monitor },
  { name: 'Finance', icon: IndianRupee },
  { name: 'Entertainment', icon: Tv },
  { name: 'Communication', icon: MessageSquare },
  { name: 'Tools', icon: Wrench },
  { name: 'Shopping', icon: ShoppingBag },
  { name: 'Food', icon: Utensils },
  { name: 'Audio', icon: Volume2 },
  { name: 'Personalization', icon: Palette },
  { name: 'Lifestyle', icon: Heart },
  { name: 'Travel', icon: Plane },
  { name: 'Maps', icon: MapPin },
  { name: 'Productivity', icon: CheckSquare },
  { name: 'Video', icon: Video },
  { name: 'Education', icon: GraduationCap },
  { name: 'Business', icon: Briefcase },
  { name: 'Social', icon: Users },
  { name: 'Medical', icon: Stethoscope },
  { name: 'Reference', icon: BookOpen },
  { name: 'Weather', icon: CloudSun },
  { name: 'Housing', icon: Home },
  { name: 'Art', icon: Palette },
  { name: 'News', icon: Newspaper },
  { name: 'Vehicles', icon: Car },
  { name: 'Photography', icon: Camera },
  { name: 'Dating', icon: HeartHandshake },
  { name: 'Comics', icon: Book },
  { name: 'Beauty', icon: Sparkles },
  { name: 'Parenting', icon: Baby },
];

// Helper to format category names into URL slugs (e.g., "Role Playing" -> "role_playing")
const getCategorySlug = (name) => {
  return name.toLowerCase().replace(/\s+/g, '_');
};

export default function CategoriesPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 bg-white min-h-screen">
      {/* Apps Section */}
      <section className="mb-12">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Apps</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {appCategories.map((category) => {
            const Icon = category.icon;
            const slug = getCategorySlug(category.name);

            return (
              <Link
                key={category.name}
                href={`/${slug}`}
                className="group relative flex flex-col justify-between p-4 h-28 bg-[#e8f2fe] rounded-2xl overflow-hidden hover:bg-[#d9e8fd] transition-colors duration-200"
              >
                {/* Background Large Icon Watermark */}
                <Icon className="absolute -right-3 -bottom-3 w-20 h-20 text-blue-200/40 pointer-events-none group-hover:scale-110 transition-transform duration-300" />

                {/* Top Small Icon Container */}
                <div className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center text-blue-600 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Category Title */}
                <span className="font-semibold text-blue-600 text-sm z-10">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Games Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Games</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {gameCategories.map((category) => {
            const Icon = category.icon;
            const slug = getCategorySlug(category.name);

            return (
              <Link
                key={category.name}
                href={`/${slug}`}
                className="group relative flex flex-col justify-between p-4 h-28 bg-[#e8f2fe] rounded-2xl overflow-hidden hover:bg-[#d9e8fd] transition-colors duration-200"
              >
                {/* Background Large Icon Watermark */}
                <Icon className="absolute -right-3 -bottom-3 w-20 h-20 text-blue-200/40 pointer-events-none group-hover:scale-110 transition-transform duration-300" />

                {/* Top Small Icon Container */}
                <div className="w-9 h-9 rounded-full bg-white/80 flex items-center justify-center text-blue-600 shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>

                {/* Category Title */}
                <span className="font-semibold text-blue-600 text-sm z-10">
                  {category.name}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Breadcrumb Navigation Footer */}
      <div className="flex items-center gap-2 text-xs text-gray-500 pt-4 border-t border-gray-100">
        <Link href="/" className="hover:underline flex items-center gap-1">
          <Home className="w-3.5 h-3.5" /> Home
        </Link>
        <span>&gt;</span>
        <span className="text-gray-800 font-medium">Categories</span>
      </div>
    </div>
  );
}