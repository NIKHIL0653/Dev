import { useUser } from "../contexts/UserContext";
import { getCurrencySymbol, formatCurrency } from "../lib/utils";

export function useCurrency() {
  const { userData } = useUser();
  const currencyCode = userData.user?.currency || "INR";
  const currencySymbol = getCurrencySymbol(currencyCode);

  const formatAmount = (amount: number) => formatCurrency(amount, currencyCode);

  return {
    currencyCode,
    currencySymbol,
    formatAmount,
  };
}
