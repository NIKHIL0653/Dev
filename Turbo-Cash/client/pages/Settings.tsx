import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useTheme } from "../contexts/ThemeContext";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { User, DollarSign, Bell, Shield, Save, Moon } from "lucide-react";
import { currencies, getCurrencySymbol } from "../lib/utils";

export default function Settings() {
  const { userData, updateUserProfile } = useUser();
  const { theme, toggleTheme } = useTheme();
  const [profileData, setProfileData] = useState({
    firstName: userData.user?.firstName || "",
    lastName: userData.user?.lastName || "",
    email: userData.user?.email || "",
    currency: userData.user?.currency || "INR",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      if (
        !profileData.firstName ||
        !profileData.lastName ||
        !profileData.email
      ) {
        setError("Please fill in all required fields");
        return;
      }

      updateUserProfile({
        firstName: profileData.firstName,
        lastName: profileData.lastName,
        email: profileData.email,
        currency: profileData.currency,
      });

      setSuccess("Profile updated successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err) {
      setError("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account preferences and settings.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Settings */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5 text-teal-500" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleProfileUpdate} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-red-700 text-sm">{error}</p>
                  </div>
                )}

                {success && (
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 text-sm">{success}</p>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) =>
                        handleInputChange("firstName", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) =>
                        handleInputChange("lastName", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {isLoading ? "Saving..." : "Save Changes"}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Currency Settings */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-teal-500" />
                Currency Preferences
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Default Currency</Label>
                  <Select
                    value={profileData.currency}
                    onValueChange={(value) =>
                      handleInputChange("currency", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {currencies.map((currency) => (
                        <SelectItem key={currency.code} value={currency.code}>
                          <div className="flex items-center gap-2">
                            <span className="font-mono">{currency.symbol}</span>
                            <span>
                              {currency.code} - {currency.name}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="p-4 bg-teal-50 border border-teal-200 rounded-lg">
                  <p className="text-sm text-teal-800">
                    <strong>Current Currency:</strong>{" "}
                    {getCurrencySymbol(profileData.currency)}{" "}
                    {profileData.currency}
                  </p>
                  <p className="text-xs text-teal-600 mt-1">
                    All amounts will be displayed in this currency. Changing
                    this will not convert existing data.
                  </p>
                </div>

                <Button
                  onClick={handleProfileUpdate}
                  disabled={isLoading}
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Update Currency
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Appearance Settings */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Moon className="w-5 h-5 text-teal-500" />
                Appearance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <Label htmlFor="theme">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Switch between light and dark themes
                    </p>
                  </div>
                  <Button
                    onClick={toggleTheme}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Moon className="w-4 h-4" />
                    {theme === "dark" ? "Light Mode" : "Dark Mode"}
                  </Button>
                </div>
                <div className="p-4 bg-teal-50 dark:bg-teal-950 border border-teal-200 dark:border-teal-800 rounded-lg">
                  <p className="text-sm text-teal-800 dark:text-teal-200">
                    <strong>Current Theme:</strong>{" "}
                    {theme === "dark" ? "Dark" : "Light"}
                  </p>
                  <p className="text-xs text-teal-600 dark:text-teal-400 mt-1">
                    Your theme preference will be saved and applied across the
                    application.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Account Information */}
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-teal-500" />
                Account Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center py-2">
                  <span className="text-foreground">Account ID:</span>
                  <span className="text-muted-foreground font-mono text-sm">
                    {userData.user?.id}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-foreground">Member Since:</span>
                  <span className="text-muted-foreground">
                    {userData.user?.createdAt
                      ? new Date(userData.user.createdAt).toLocaleDateString()
                      : "Unknown"}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-foreground">Total Transactions:</span>
                  <span className="text-muted-foreground">
                    {userData.transactions.length}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-foreground">Active Goals:</span>
                  <span className="text-muted-foreground">
                    {userData.goals.length}
                  </span>
                </div>
                <div className="flex justify-between items-center py-2">
                  <span className="text-foreground">Active Budgets:</span>
                  <span className="text-muted-foreground">
                    {userData.budgets.length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
