function binarySearch(arr, target, start, end) {
  // arr은 배열
  // target은 찾고자 하는 값
  // start는 탐색 범위의 시작 인덱스
  // end는 탐색 범위의 끝 인덱스

  if (start > end) {
    // 반으로 나누어 탐색할 때, 시작 인덱스가 끝 인덱스보다 크면 탐색이 종료된 것으로 간주
    return null;
    // 탐색이 종료된 경우 null을 반환하여 찾고자 하는 값이 배열에 없음을 나타냄
  }

  let mid = Math.floor((start + end) / 2);
  // 탐색 범위의 중간 인덱스를 계산하여 mid 변수에 저장
  // Math.floor() 함수를 사용하여 소수점 이하를 버리고 정수로 만듦

  if (arr[mid] === target) {
    // 중간 인덱스에 있는 값이 찾고자 하는 값과 일치하는 경우
    return mid;
    // 중간 인덱스를 반환하여 찾고자 하는 값이 배열의 어느 위치에 있는지 나타냄
  } else if (target > arr[mid]){
    return binarySearch(arr, target, mid + 1, end);
    // 찾고자 하는 값이 중간 인덱스에 있는 값보다 큰 경우, 탐색 범위를 중간 인덱스의 오른쪽 절반으로 좁혀서 재귀적으로 binarySearch 함수를 호출
  } else {
    return binarySearch(arr, target, start, mid - 1);
    // 찾고자 하는 값이 중간 인덱스에 있는 값보다 작은 경우, 탐색 범위를 중간 인덱스의 왼쪽 절반으로 좁혀서 재귀적으로 binarySearch 함수를 호출
  }
}
  let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // 탐색할 배열
  let index = binarySearch(arr, 3, 0, arr.length - 1);
  // binarySearch 함수를 호출하여 arr 배열에서 3을 찾고, 탐색 범위는 배열의 처음부터 끝까지로 설정
  console.log(`index: ${index}`);
  // 찾고자 하는 값이 배열의 어느 위치에 있는지 나타내는 인덱스를 출력

