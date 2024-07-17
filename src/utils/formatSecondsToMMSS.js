/**
 * 초를 "MM:SS" 형식으로 변환하는 함수
 * @param {number} seconds - 변환할 초
 * @returns {string} "MM:SS" 형식의 문자열
 */
export default function formatSecondsToMMSS(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}
