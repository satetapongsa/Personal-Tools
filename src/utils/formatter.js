/**
 * Formats a number as USD currency
 * @param {number} value 
 */
export const formatCurrency = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
};

/**
 * Formats a number with commas
 * @param {number} value 
 */
export const formatNumber = (value) => {
  return new Intl.NumberFormat('en-US').format(value);
};

/**
 * Formats a percentage
 * @param {number} value 
 */
export const formatPercent = (value) => {
  return `${value >= 0 ? '+' : ''}${value}%`;
};
