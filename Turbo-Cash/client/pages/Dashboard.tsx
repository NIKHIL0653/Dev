import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PieChart,
  Target,
  Calendar,
  AlertTriangle,
  Upload,
} from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { useMemo, useState, useEffect, useRef } from "react";
import { ComparisonBarChart } from "../components/ui/simple-chart";
import { TransactionForm } from "../components/forms/TransactionForm";
import { GoalForm } from "../components/forms/GoalForm";
import { useCurrency } from "../hooks/useCurrency";

export default function Dashboard() {
  const { userData } = useUser();
  const { currencySymbol, formatAmount } = useCurrency();
  const [showTransactionForm, setShowTransactionForm] = useState(false);
  const [showGoalForm, setShowGoalForm] = useState(false);

  // Refs for height synchronization
  const spendingBreakdownRef = useRef<HTMLDivElement>(null);
  const goalsProgressRef = useRef<HTMLDivElement>(null);

  // Check if user has any data
  const hasData =
    userData.transactions.length > 0 ||
    userData.goals.length > 0 ||
    userData.budgets.length > 0;

  // Calculate real-time dashboard data from user's transactions, budgets, and goals
  const dashboardData = useMemo(() => {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    // Filter current month transactions
    const currentMonthTransactions = userData.transactions.filter((t) => {
      const transactionDate = new Date(t.date);
      return (
        transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
      );
    });

    // Calculate total expenses for current month
    const totalExpenses = currentMonthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    // Calculate total income for current month
    const totalIncome = currentMonthTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    // Calculate last month expenses for comparison
    const lastMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const lastMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear;
    const lastMonthTransactions = userData.transactions.filter((t) => {
      const transactionDate = new Date(t.date);
      return (
        transactionDate.getMonth() === lastMonth &&
        transactionDate.getFullYear() === lastMonthYear
      );
    });
    const lastMonthExpenses = lastMonthTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    // Calculate savings
    const savings = totalIncome - totalExpenses;

    // Calculate category breakdown
    const categoryTotals: Record<string, number> = {};
    currentMonthTransactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        categoryTotals[t.category] =
          (categoryTotals[t.category] || 0) + t.amount;
      });

    const categories = Object.entries(categoryTotals)
      .map(([name, amount]) => ({
        name,
        amount,
        percentage: totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0,
        color: getCategoryColor(name),
      }))
      .sort((a, b) => b.amount - a.amount)
      .slice(0, 5);

    // Find top category
    const topCategory = categories[0];

    // Calculate monthly trends (last 4 months) with income and expense comparison
    const monthlyTrends = [];
    for (let i = 3; i >= 0; i--) {
      const monthDate = new Date(currentYear, currentMonth - i, 1);
      const monthTransactions = userData.transactions.filter((t) => {
        const transactionDate = new Date(t.date);
        return (
          transactionDate.getMonth() === monthDate.getMonth() &&
          transactionDate.getFullYear() === monthDate.getFullYear()
        );
      });
      const monthExpenses = monthTransactions
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
      const monthIncome = monthTransactions
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);

      monthlyTrends.push({
        month: monthDate.toLocaleDateString("en-US", { month: "short" }),
        income: monthIncome,
        expense: monthExpenses,
      });
    }

    // Generate insights
    const insights = [];
    const percentageChange =
      lastMonthExpenses > 0
        ? ((totalExpenses - lastMonthExpenses) / lastMonthExpenses) * 100
        : 0;

    if (totalExpenses === 0) {
      insights.push("Start adding transactions to see your spending insights");
    } else {
      if (percentageChange < -5) {
        insights.push(
          `You've spent ${Math.abs(percentageChange).toFixed(1)}% less than last month - great job!`,
        );
      } else if (percentageChange > 5) {
        insights.push(
          `Your spending increased by ${percentageChange.toFixed(1)}% this month`,
        );
      } else {
        insights.push(
          "Your spending is relatively stable compared to last month",
        );
      }

      if (topCategory) {
        insights.push(
          `${topCategory.name} is your top spending category at ${currencySymbol}${topCategory.amount.toFixed(2)}`,
        );
      }

      if (savings > 0) {
        insights.push(
          `You're on track to save ${currencySymbol}${savings.toFixed(2)} this month`,
        );
      } else if (savings < 0) {
        insights.push(
          `You're overspending by ${currencySymbol}${Math.abs(savings).toFixed(2)} this month`,
        );
      }
    }

    return {
      totalExpenses,
      lastMonthExpenses,
      savings,
      topCategory: topCategory?.name || "No expenses",
      topCategoryAmount: topCategory?.amount || 0,
      categories,
      monthlyTrends,
      goals: userData.goals, // Show all goals
      insights: insights.slice(0, 3), // Show first 3 insights
      percentageChange,
    };
  }, [userData.transactions, userData.goals]);

  // Height synchronization effect
  useEffect(() => {
    let resizeObserver: ResizeObserver | null = null;

    const syncHeights = () => {
      if (
        window.innerWidth >= 1024 &&
        spendingBreakdownRef.current &&
        goalsProgressRef.current
      ) {
        // Force a reflow to get accurate heights
        requestAnimationFrame(() => {
          if (spendingBreakdownRef.current && goalsProgressRef.current) {
            const spendingHeight =
              spendingBreakdownRef.current.getBoundingClientRect().height;
            const goalsContainer = goalsProgressRef.current.querySelector(
              ".goals-progress-container",
            ) as HTMLElement;

            if (goalsContainer) {
              // Calculate available height for goals content
              const goalsHeader = goalsProgressRef.current.querySelector(
                ".goals-header-height",
              ) as HTMLElement;
              const headerHeight = goalsHeader
                ? goalsHeader.getBoundingClientRect().height
                : 0;
              const cardPadding = 48; // CardContent padding
              const availableHeight = Math.max(
                spendingHeight - headerHeight - cardPadding,
                200,
              );

              goalsContainer.style.maxHeight = `${availableHeight}px`;
              goalsContainer.style.height = `${availableHeight}px`;
            }
          }
        });
      } else if (goalsProgressRef.current) {
        // Reset for mobile
        const goalsContainer = goalsProgressRef.current.querySelector(
          ".goals-progress-container",
        ) as HTMLElement;
        if (goalsContainer) {
          goalsContainer.style.maxHeight = "400px";
          goalsContainer.style.height = "auto";
        }
      }
    };

    // Initial sync
    setTimeout(syncHeights, 100);

    // Set up ResizeObserver for automatic height updates
    if (spendingBreakdownRef.current) {
      resizeObserver = new ResizeObserver(syncHeights);
      resizeObserver.observe(spendingBreakdownRef.current);
    }

    // Add resize listener for responsive changes
    window.addEventListener("resize", syncHeights);

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      }
      window.removeEventListener("resize", syncHeights);
    };
  }, [dashboardData.categories.length, dashboardData.goals.length]);

  // Helper function to get category colors
  function getCategoryColor(category: string) {
    const colors = [
      "bg-red-500",
      "bg-blue-500",
      "bg-green-500",
      "bg-yellow-500",
      "bg-purple-500",
      "bg-pink-500",
      "bg-indigo-500",
      "bg-orange-500",
    ];
    const index = category.charCodeAt(0) % colors.length;
    return colors[index];
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Financial Dashboard
          </h1>
          <p className="text-muted-foreground">
            {hasData
              ? "Welcome back! Here's your financial overview."
              : "Welcome! Start by adding your first transaction or goal to see your financial insights."}
          </p>
        </div>

        {/* Empty State for New Users */}
        {!hasData && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <div className="w-24 h-24 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <DollarSign className="w-12 h-12 text-teal-600" />
              </div>
              <h3 className="text-2xl font-semibold text-foreground mb-4">
                Get Started with TurboCash
              </h3>
              <p className="text-muted-foreground mb-8">
                Add your first transaction or set a financial goal to begin
                tracking your finances.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={() => setShowTransactionForm(true)}
                  className="bg-teal-500 hover:bg-teal-600 text-white"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Add Your First Transaction
                </Button>
                <Button
                  onClick={() => setShowGoalForm(true)}
                  variant="outline"
                  className="border-teal-500 text-teal-600"
                >
                  <Target className="w-4 h-4 mr-2" />
                  Set Your First Goal
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Content - Only show when user has data */}
        {hasData && (
          <>
            {/* Quick Actions */}
            <div className="mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Button
                      onClick={() => setShowTransactionForm(true)}
                      className="bg-teal-500 hover:bg-teal-600 text-white"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      Add Transaction
                    </Button>
                    <Button
                      onClick={() => setShowGoalForm(true)}
                      variant="outline"
                      className="border-teal-500 text-teal-600"
                    >
                      Set New Goal
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Total Expenses
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {formatAmount(dashboardData.totalExpenses)}
                      </p>
                      {dashboardData.totalExpenses > 0 ? (
                        <p
                          className={`text-sm flex items-center gap-1 ${
                            dashboardData.percentageChange < 0
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >
                          {dashboardData.percentageChange < 0 ? (
                            <TrendingDown className="w-4 h-4" />
                          ) : (
                            <TrendingUp className="w-4 h-4" />
                          )}
                          {Math.abs(dashboardData.percentageChange).toFixed(1)}%
                          vs last month
                        </p>
                      ) : (
                        <p className="text-sm text-muted-foreground">
                          This month
                        </p>
                      )}
                    </div>
                    <DollarSign className="w-8 h-8 text-teal-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Money Saved
                      </p>
                      <p
                        className={`text-2xl font-bold ${dashboardData.savings >= 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {dashboardData.savings >= 0 ? "+" : ""}
                        {formatAmount(Math.abs(dashboardData.savings))}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        This month
                      </p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Top Category
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {dashboardData.topCategory}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatAmount(dashboardData.topCategoryAmount)}
                      </p>
                    </div>
                    <PieChart className="w-8 h-8 text-teal-500" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Active Goals
                      </p>
                      <p className="text-2xl font-bold text-foreground">
                        {userData.goals.length}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        In progress
                      </p>
                    </div>
                    <Target className="w-8 h-8 text-teal-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="dashboard-section-grid grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Spending Breakdown */}
              <Card
                ref={spendingBreakdownRef}
                className="border-0 shadow-md dashboard-section-card"
              >
                <CardHeader className="flex-shrink-0">
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-teal-500" />
                    Spending Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent className="dashboard-section-content">
                  <div className="space-y-4">
                    {dashboardData.categories.length > 0 ? (
                      dashboardData.categories.map((category, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-4 h-4 rounded-full ${category.color}`}
                            ></div>
                            <span className="text-foreground font-medium">
                              {category.name}
                            </span>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-foreground">
                              {formatAmount(category.amount)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {category.percentage.toFixed(1)}%
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        No expenses this month yet
                      </div>
                    )}
                  </div>
                  {dashboardData.categories.length > 0 && (
                    <div className="mt-6 flex h-2 bg-muted rounded-full overflow-hidden">
                      {dashboardData.categories.map((category, index) => (
                        <div
                          key={index}
                          className={category.color}
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Goals Progress */}
              <Card
                ref={goalsProgressRef}
                className="border-0 shadow-md dashboard-section-card"
              >
                <CardHeader className="flex-shrink-0 goals-header-height">
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Target className="w-5 h-5 text-teal-500" />
                    Goals Progress ({dashboardData.goals.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="dashboard-section-content">
                  <div className="goals-progress-container space-y-4 pr-2 scrollbar-thin">
                    {dashboardData.goals.length > 0 ? (
                      dashboardData.goals.map((goal, index) => {
                        const percentage = Math.min(
                          (goal.currentAmount / goal.targetAmount) * 100,
                          100,
                        );
                        return (
                          <div
                            key={index}
                            className="bg-muted/50 p-4 rounded-lg"
                          >
                            <div className="flex justify-between items-center mb-2">
                              <h3 className="font-medium text-foreground text-sm truncate">
                                {goal.name}
                              </h3>
                              <span className="text-xs text-muted-foreground ml-2">
                                {percentage.toFixed(1)}%
                              </span>
                            </div>
                            <div className="w-full bg-muted rounded-full h-2 mb-2">
                              <div
                                className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>{formatAmount(goal.currentAmount)}</span>
                              <span>{formatAmount(goal.targetAmount)}</span>
                            </div>
                          </div>
                        );
                      })
                    ) : (
                      <div className="text-center py-4 text-muted-foreground">
                        No goals set yet
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Monthly Trends and Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Monthly Income vs Expense Comparison */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-teal-500" />
                    Income vs Expense (Last 4 Months)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ComparisonBarChart
                    data={dashboardData.monthlyTrends}
                    height={250}
                    currencySymbol={currencySymbol}
                  />
                </CardContent>
              </Card>

              {/* Key Insights */}
              <Card className="border-0 shadow-md">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <AlertTriangle className="w-5 h-5 text-teal-500" />
                    Key Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dashboardData.insights.map((insight, index) => (
                      <div
                        key={index}
                        className="p-4 bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg"
                      >
                        <p className="text-teal-800 dark:text-teal-200">
                          {insight}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </>
        )}

        {/* Form Modals */}
        <TransactionForm
          isOpen={showTransactionForm}
          onClose={() => setShowTransactionForm(false)}
          onSuccess={() => {
            // Transaction added successfully
          }}
        />

        <GoalForm
          isOpen={showGoalForm}
          onClose={() => setShowGoalForm(false)}
          onSuccess={() => {
            // Goal created successfully
          }}
        />
      </div>
    </div>
  );
}
