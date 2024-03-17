export default function countWords(str) {
  // 문자열 앞뒤의 공백을 제거하고, 공백으로 단어를 나누어 배열을 생성
  var words = str.trim().split(/\s+/);
  // 배열의 길이를 반환하여 단어의 개수를 계산
  return words.length;
}
