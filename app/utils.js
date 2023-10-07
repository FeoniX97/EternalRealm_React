export function toPercent(percentDecimal) {
  if (percentDecimal == null) return "N/A%";

  return percentDecimal * 100 + "%";
}

export function toInt(number) {
  return Math.round(number);
}
