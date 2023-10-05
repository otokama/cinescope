function runtimeFormatter(min: number) {
  const m = min % 60;
  const hr = (min - m) / 60;
  return `${hr}:${m}`;
}
export { runtimeFormatter };
