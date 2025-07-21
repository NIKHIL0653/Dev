import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Plus,
  Edit,
  Trash2,
  Target,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Clock,
  Star,
  Users,
} from "lucide-react";
import { useUser } from "../contexts/UserContext";
import { GoalForm } from "../components/forms/GoalForm";
import { EditGoalForm } from "../components/forms/EditGoalForm";
import { GoalContributionForm } from "../components/forms/GoalContributionForm";
import { useCurrency } from "../hooks/useCurrency";

interface Goal {
  id: string;
  name: string;
  description: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  priority: "high" | "medium" | "low";
  createdAt: string;
  userId: string;
}

export default function Goals() {
  const { userData, deleteGoal } = useUser();
  const { currencySymbol, formatAmount } = useCurrency();
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [editingGoal, setEditingGoal] = useState<Goal | null>(null);
  const [contributionGoal, setContributionGoal] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const totalTargetAmount = userData.goals.reduce(
    (sum, goal) => sum + goal.targetAmount,
    0,
  );
  const totalCurrentAmount = userData.goals.reduce(
    (sum, goal) => sum + goal.currentAmount,
    0,
  );
  const completedGoals = userData.goals.filter(
    (goal) => goal.currentAmount >= goal.targetAmount,
  );
  const activeGoals = userData.goals.filter(
    (goal) => goal.currentAmount < goal.targetAmount,
  );

  const getGoalStatus = (goal: Goal) => {
    const percentage = (goal.currentAmount / goal.targetAmount) * 100;
    const deadline = new Date(goal.deadline);
    const today = new Date();
    const daysRemaining = Math.ceil(
      (deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24),
    );

    if (percentage >= 100) return "completed";
    if (daysRemaining < 0) return "overdue";
    if (daysRemaining <= 30 && percentage < 80) return "at-risk";
    if (percentage >= 75) return "on-track";
    return "in-progress";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "overdue":
        return "bg-red-500";
      case "at-risk":
        return "bg-orange-500";
      case "on-track":
        return "bg-blue-500";
      default:
        return "bg-teal-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "completed":
        return "Completed";
      case "overdue":
        return "Overdue";
      case "at-risk":
        return "At Risk";
      case "on-track":
        return "On Track";
      default:
        return "In Progress";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "overdue":
      case "at-risk":
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-600 bg-red-100 dark:text-red-400 dark:bg-red-900/20";
      case "medium":
        return "text-yellow-600 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/20";
      default:
        return "text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/20";
    }
  };

  const getDaysRemaining = (deadline: string) => {
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const timeDiff = deadlineDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    return daysDiff;
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Financial Goals
          </h1>
          <p className="text-muted-foreground">
            Set, track, and achieve your financial milestones with visual
            progress tracking.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Total Goals
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {userData.goals.length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {activeGoals.length} active
                  </p>
                </div>
                <Target className="w-8 h-8 text-teal-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Target Amount
                  </p>
                  <p className="text-2xl font-bold text-foreground">
                    {formatAmount(totalTargetAmount)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    All goals combined
                  </p>
                </div>
                <DollarSign className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Saved So Far
                  </p>
                  <p className="text-2xl font-bold text-green-600">
                    {formatAmount(totalCurrentAmount)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {totalTargetAmount > 0
                      ? (
                          (totalCurrentAmount / totalTargetAmount) *
                          100
                        ).toFixed(1)
                      : 0}
                    % complete
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
                    Completed
                  </p>
                  <p className="text-2xl font-bold text-teal-600">
                    {completedGoals.length}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Goals achieved
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-teal-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Add Goal Button */}
        <div className="mb-8">
          <Button
            onClick={() => setIsAddingGoal(true)}
            className="bg-teal-500 hover:bg-teal-600 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Goal
          </Button>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {userData.goals.length > 0 ? (
            userData.goals.map((goal) => {
              const percentage = Math.min(
                (goal.currentAmount / goal.targetAmount) * 100,
                100,
              );
              const status = getGoalStatus(goal);
              const statusColor = getStatusColor(status);
              const statusText = getStatusText(status);
              const statusIcon = getStatusIcon(status);
              const daysRemaining = getDaysRemaining(goal.deadline);

              return (
                <Card key={goal.id} className="border-0 shadow-md">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <CardTitle className="text-lg text-foreground">
                            {goal.name}
                          </CardTitle>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                              goal.priority,
                            )}`}
                          >
                            {goal.priority}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {goal.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {daysRemaining > 0
                              ? `${daysRemaining} days left`
                              : `${Math.abs(daysRemaining)} days overdue`}
                          </span>
                          <span>{goal.category}</span>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-1"
                          onClick={() => setEditingGoal(goal)}
                        >
                          <Edit className="w-4 h-4 text-muted-foreground" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="p-1"
                          onClick={() => deleteGoal(goal.id)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      {/* Compact Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-foreground">
                            {formatAmount(goal.currentAmount)} /{" "}
                            {formatAmount(goal.targetAmount)}
                          </span>
                          <span className="text-sm font-bold text-teal-600">
                            {percentage.toFixed(0)}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-teal-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>

                      {/* Compact Details */}
                      <div className="text-xs text-muted-foreground">
                        Remaining:{" "}
                        <span className="font-semibold text-foreground">
                          {formatAmount(goal.targetAmount - goal.currentAmount)}
                        </span>
                        {status !== "completed" && (
                          <span className="ml-2">
                            • Monthly target:{" "}
                            <span className="font-semibold">
                              {formatAmount(
                                Math.ceil(
                                  (goal.targetAmount - goal.currentAmount) /
                                    Math.max(daysRemaining / 30, 1),
                                ),
                              )}
                            </span>
                          </span>
                        )}
                      </div>

                      {/* Status and Actions */}
                      <div className="flex items-center justify-between">
                        <div
                          className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium text-white ${statusColor}`}
                        >
                          {statusIcon}
                          {statusText}
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() =>
                            setContributionGoal({
                              id: goal.id,
                              name: goal.name,
                            })
                          }
                          className="text-teal-600 border-teal-600 hover:bg-teal-50 h-7 px-3 text-xs"
                        >
                          Add {currencySymbol}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
              <Target className="w-16 h-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold text-foreground mb-2">
                No Goals Yet
              </h3>
              <p className="text-muted-foreground mb-4 max-w-md">
                Start setting financial goals to track your progress and stay
                motivated.
              </p>
              <Button
                onClick={() => setIsAddingGoal(true)}
                className="bg-teal-500 hover:bg-teal-600 text-white"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Goal
              </Button>
            </div>
          )}
        </div>

        {/* Goal Tips */}
        <Card className="border-0 shadow-md mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-foreground">
              <Star className="w-5 h-5 text-teal-500" />
              Goal Setting Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="p-4 bg-teal-50 dark:bg-teal-900/20 rounded-lg">
                <h3 className="font-semibold text-teal-800 dark:text-teal-200 mb-2">
                  Be Specific
                </h3>
                <p className="text-sm text-teal-700 dark:text-teal-300">
                  Set clear, measurable goals with specific amounts and
                  deadlines.
                </p>
              </div>
              <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                  Start Small
                </h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Begin with achievable goals to build momentum and confidence.
                </p>
              </div>
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                  Automate
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Set up automatic transfers to make saving effortless and
                  consistent.
                </p>
              </div>
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <h3 className="font-semibold text-purple-800 dark:text-purple-200 mb-2">
                  Celebrate
                </h3>
                <p className="text-sm text-purple-700 dark:text-purple-300">
                  Acknowledge milestones and celebrate when you achieve your
                  goals.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Forms */}
        <GoalForm
          isOpen={isAddingGoal}
          onClose={() => setIsAddingGoal(false)}
          onSuccess={() => {
            // Goal created successfully
          }}
        />

        <EditGoalForm
          isOpen={!!editingGoal}
          onClose={() => setEditingGoal(null)}
          goal={editingGoal}
          onSuccess={() => {
            // Goal updated successfully
          }}
        />

        <GoalContributionForm
          isOpen={!!contributionGoal}
          onClose={() => setContributionGoal(null)}
          goalId={contributionGoal?.id || ""}
          goalName={contributionGoal?.name || ""}
          onSuccess={() => {
            // Contribution added successfully
          }}
        />
      </div>
    </div>
  );
}
