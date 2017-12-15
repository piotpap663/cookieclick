export default function beautifyNumber(num) {
  if (num >= 1e30) {
    return `${(num / 1e30).toFixed(1).replace(/\.0$/, "")} Nonillion`;
  }
  if (num >= 1e27) {
    return `${(num / 1e27).toFixed(1).replace(/\.0$/, "")} Octillion`;
  }
  if (num >= 1e24) {
    return `${(num / 1e24).toFixed(1).replace(/\.0$/, "")}Y`;
  }
  if (num >= 1e21) {
    return `${(num / 1e21).toFixed(1).replace(/\.0$/, "")}Z`;
  }
  if (num >= 1e18) {
    return `${(num / 1e18).toFixed(1).replace(/\.0$/, "")}E`;
  }
  if (num >= 1e15) {
    return `${(num / 1e15).toFixed(1).replace(/\.0$/, "")}P`;
  }
  if (num >= 1e12) {
    return `${(num / 1e12).toFixed(1).replace(/\.0$/, "")}T`;
  }
  if (num >= 1e9) {
    return `${(num / 1e9).toFixed(1).replace(/\.0$/, "")}G`;
  }
  if (num >= 1e6) {
    return `${(num / 1e6).toFixed(1).replace(/\.0$/, "")}M`;
  }
  if (num >= 1e3) {
    return `${(num / 1e3).toFixed(1).replace(/\.0$/, "")}K`;
  }
  return num;
}
