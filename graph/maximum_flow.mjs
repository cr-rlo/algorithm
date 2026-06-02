class City{
  constructor(name){
    // 도시의 이름을 저장할 name 매개변수
    this.name = name;
    this.adjacent_cities = {};
    // 인접한 도시들을 저장할 프로퍼티


  }
  addAdjacentCity(city, flowAndCapacity){
    // 간선을 연결하는 함수 (상수관)
    // 매개변수는 연결할 도시인 city와 간선의 유량과 용량을 나타내는 flowAndCapacity
    this.adjacent_cities[city.name] = flowAndCapacity;
    // 현재 도시의 인접 도시를 나타내는 adjacent_cities 에 매개변수롷 받은 city를 추가하고 유량과 용량 정보가 담긴 flowAndCapacity를 value로 저장
    city.adjacent_cities[this.name] = {flow: 0, capacity: 0};
    // 역방향 상수관도 만들어주는데 매개변수로 받은 city의 인접 도시에 현재 도시의 이름으로 참조하고 유량과 용량은 0으로 저장해줌


  }

  removeAdjacentCity(city){
    // 간선을 제거하는 함수 
    // 매개변수로 연결을 끊을 도시를 나타내는 city
    delete this.adjacent_cities[city.name];
    // 현재 도시의 인접 도시를 나타내는 adjacent_cities에서 매개변수로 받은 city를 제거
  }
}
class MaximumFlow{
  // 최대 유량을 구하는 클래스
  constructor(){
    this.all_cities = {};
    // 모든 도시를 저장할 빈 객체를 선언해 해시 테이블로 초기화
    this.paths = [];
    // 깊이 우선 탐색으로 찾은 경로를 저장하기 위한 스택
  }
  registerCity(city){
    // 이 클래스에 도시를 등록하는 함수
   this.all_cities[city.name] = city; 
   // 해시테이블의 key를 도시의 이름이 되고 value는 도시 객체가 되도록 저장

  }

  DFS(source, sink, visited_cities = {}){
    // 깊이 우선 탐색으로 증가 경로를 찾는 함수
    // 매개변수로는 시작점인 source와 목적지인 sink 그리고 방문한 도시를 저장할 빈 객체
    if(source.name == sink.name){
      // 기저조건으로 시작점과 목적지가 같을 때
      // 이 경우엔 더 이상 탐색할 필요가 없으므로 true를 리턴하며 함수 종료
      return true;


    }

    visited_cities[source.name] = true;
    // 현재 함수에서 source는 출발 도시를 나타내므로 source를 방문한 도시로 저잦ㅇ
    for(let adjacent in source.adjacent_cities){
      // 그리고 현재 도시의 인접 도시들을 순회
      let edge = source.adjacent_cities[adjacent];
      // 상수관 즉 간선 구하기
      // edge는 source에서 인접 도시로 가는 간선으로 유량과 용량이 저장되어 있음
      if(visited_cities[adjacent]){
        // 만약 인접도시가 이미 방문한 도시라면 continue로 for문을 건너뛰어 방문하지 않은 다른 인접도시 순회
        continue;

      }else if(edge.capacity - edge.flow > 0 ){
        // 방문한 도시가 아니면서 해당 도시에 연결되는 간선의 잔여 용량이 0 이상이라면 즉 물을 보낼 수 있다면 해당 경로 저장
        this.paths.push(source);

        if(this.DFS(this.all_cities[adjacent], sink, visited_cities) == true){
          // 순회한 도시를 source로 해서 깊이 우선 탐색을 재귀호출
          // 만약 재귀호출로 sink까지 가는 경로가 있다면 경로를 나타내는 스택(paths)에 경로가 저장되므로 true를 리턴하며 함수를 종료하고 
          return true;


        }else{
          // 그렇지 않고 sink까지 가는 경로가 없다면 현재 방문한 도시는 잘못된 경로이므로 경로를 나타내는 스택에서 pop으로 제거 
          this.paths.pop();

        }
      }

    }
    return false;
    // 모든 인접 도시를 전부 시도했는데 경로가 없다면 false룰 리턴하며 함수 종료
  }
}