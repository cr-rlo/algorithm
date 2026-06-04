const costs = [
  // 도시의 간선을 표현하는 2차원 배열 선언
  [0,2,9,0], 
  [1,0,6,4], 
  [0,7,0,8],
  [6,3,0,0]
];

const dp = Array.from(Array(costs.length), () => Array((1 << costs.length) - 1).fill(Infinity));
  // 계산 결과를 저장할 배열
  // 이 배열의 크기는 각 도시에서 방문할 수 있는 모든 도시의 조합만큼
  // 먼저 행의 수는 costs의 길이 만큼, 즉 도시의 수인 4만큼
  // 열의 수는 도시의 수 4개가 만들어낼 수 있는 경우의 수 보다 1적은 만큼 즉, 15개를 만들어 줌
// 무한대로 초기화된 [4][15]의 배열이 만들어짐
// Array.from(행의 정보, () => 열의 정보 및 초기화)
// Array(costs.length): 행의 크기 정의. 배열의 길이만큼 빈 슬롯을 가진 배열 생성 -> 만약 costs.length가 4라면 [empty x 4] 형태의 배열 준비
// 1 << costs.length: 열의 크기. 비트 왼쪽 시프트 연산. 존재할 수 있는 모든 방문 상태 조합의 개수만큼 공간을 확보하기 위해서 
// .fill(Infinity): 초기화 값 지정. 생성된 열 배열의 모든 칸을 무한대로 채움
// () => Array((1 << costs.length) - 1).fill(Infinity): 화살표 함수 콜백. 행의 개수 만큼 반복 실행됨 

function tsp(city, visited_cities){
  // 매개변수로는 현재 방문한 도시를 나타내는 city와 이때까지 방문한 도시를 나타내는 visited_cities
  // visited_cities는 비트 마스크로 방문한 모든 도시를 정수로 표현
  // 도시 0을 방문했다면 가장 오른쪽 비트가 1, 도시 1을 방문했다면 오른쪽에서 두 번째 비트가 1
  if(visited_cities == (1 << costs.length) - 1){
    // 모든 도시를 방문했다면 비트가 1111
    return costs[city][0];
    // 모든 도시를 방문했다면 현재 도시에서 출발 도시까지 비용을 리턴
    // 2차원 배열에서 행은 해당 도시의 간선 정보를 나타내니 city를 넣어주고 
  }

  if(dp[city][visited_cities] != Infinity){
    // 만약 메모이제이션으로 이미 계산한 결과가 있다면 중복으로 계산하지 않고 저장된 결과를 리턴하면서 함수 종료
    return dp[city][visited_cities];
  }else{
    // 저장된 결과가 없다면 계산해줘야 함
    // 모든 도시 반복
    for(let i = 0; i < costs.length; i++){
      if((visited_cities & (1 << i)) == 0 && costs[city][i] != 0){
      // 그 중 방문하지 않았고 자기 자신이 아닌 경우 재귀적으로 호출하는데 이 중에 가장 작은 값을 취해서 그 결과를 저장해줌
      dp[city][visited_cities] = Math.min(dp[city][visited_cities], costs[city][i] + tsp(i,visited_cities | (1 << i)));
      }
    }
    return dp[city][visited_cities];
  }

}

let minimumCost = tsp(0,1);
console.log(minimumCost);




