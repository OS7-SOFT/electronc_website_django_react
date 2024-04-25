//deal with starts
export function HandelStars(starCount) {
  let stars = [];
  let isFull = true;
  for (let i = 0; i < 5; i++) {
    isFull = i >= starCount ? false : true;
    isFull === true
      ? stars.push({ id: i, rate: "fas" })
      : stars.push({ id: i, rate: "far" });
  }
  return stars;
}
