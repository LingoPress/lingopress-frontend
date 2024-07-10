export function isValidYouTubeUrl(url) {
  // 정규 표현식
  const regex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
  return regex.test(url);
}
