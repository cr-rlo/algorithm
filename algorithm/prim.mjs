class City{
  constructor(name){
    // 도시 이름을 저장할 name 매개변수
    this.name = name;
    // name 프로퍼티에 도시 이름 저장
    this.adjacent_cities = {};
    // 인접한 도시들을 저장할 해시 테이블
    // 간선에 가중치도 저장할 것이기 때문

  }

  addAdjacentCity(city, distance){
    // 간선을 연결하는 함수
    // 매개변수는 연결할 도시인 city와 간선의 거리인 distance
    this.adjacent_cities[city.name] = distance;

    // key는 vertex 즉, 지역의 이름이 되고 value는 weight로 가중치가 되어 해시 테이블에 저장
  }

  removeAdjacentCity(city){
    // 간선을 제거하는 함수
    // 매개변수로 연결을 끊을 도시를 나타내는 city
    // 삭제는 해당 해시테이블에서 key 즉 지역명으로 제거해주면 됨
    delete this.adjacent_cities[city.name];
  }
}

class Prim{
  constructor(){
    this.all_cities = {};
    // 모든 도시를 저장할 빈 객체를 선언해 해시 테이블로 초기화

  }
  registerCity(city){
    // 도시를 등록하는 함수
    this.all_cities[city.name] = city;
    // 해시테이블의 key를 도시의 이름이 되고 value는 도시 객체가 되도록 저장
  }
  Mst(start_city){
    // 최단 경로를 구하는 함수
    // 매개변수는 출발 도시인 start_city와 도착 도시인 end_city
    let visited_cities = {};
    // 방문한 도시를 저장할 변수인 visited_cities는 해시 테이블로 초기화
    let unvisited_cities = {};
    // 방문하지 않은 도시를 저장할 변수인 unvisited_cities는 해시 테이블로 초기화
    let mst_table = {};
    // 최단 경로를 저장할 변수인 shortest_paths는 해시 테이블로 초기화

    for(let city_name in this.all_cities){// 모든 도시를 순회하면서 city_name에는 all_cities의 key 즉 도시 이름이 들어가게 됨
      unvisited_cities[city_name] = this.all_cities[city_name];}
    // unvisited_cities에 도시 이름을 key로 all_cities의 모든 도시를 저장해줌


    if(unvisited_cities[start_city.name] == null){
      // 만약 unvisited_cities에 출발 도시나 도착 도시가 없다면
      console.log("출발 도시가 등록되어 있지 않습니다.");
      return null;
      // 최단 경로를 구할 수 없으므로 null 리턴
    }else{
      // 출발 도시가 unvisited_cities에 있다면
      for(let city_name in unvisited_cities){
        // 방문하지 않은 도시를 순회하면서 shortest_paths는 최단 경로를 저장할 해시 테이블이므로 모든 도시의 최단 경로를 무한대로 초기화
        //shortest_path_table[city_name] = Infinity;
        mst_table[city_name] = 
        {distance: Infinity, city: null};
        // 해시테이블로 거리를 뜻하는 distance에 무한대를, 이전 도시를 나타내는 city에 null을 저장하는 객체로 초기화
      }
    }
    // shortest_path_table[start_city.name] = 0;
    // 출발 도시의 최단 경로는 0으로 초기화
    // 시작도시에서 시작도시로 가는 최단 경로는 0이기 때문
    mst_table[start_city.name] = {distance: 0, city: null};
    // 해시테이블로 거리를 뜻하는 distance에 0을, 이전 도시를 나타내는 city에 null을 저장하는 객체로 초기화

    while(Object.keys(unvisited_cities).length > 0){
      // 이제 방문하지 않은 도시가 없을 때까지 반복하면서 최단 경로를 구함 
      // Object.keys 함수로 unvisited_cities의 key의 수가 0일 때까지 반복
      let closest_city_name = null;
      // 방문하지 않은 도시 중에 가장 가까운 도시를 저장할 변수인 closest_city는 null로 초기화
      // 이를 찾기 위해서 unvisited_cities를 순회
      for(let city_name in unvisited_cities){
        if(closest_city_name == null || mst_table[city_name].distance < mst_table[closest_city_name].distance){
          // closest_city_name이 null이라면 처음 순회하는 도시가 가장 가까운 도시이므로 도시이름을 넣어주고 테이블에 등록된 가장 가까운 도시보다 현재 순회하는 도시가 가깝다면 현재 순회하는 도시를 가장 가까운 도시로 업데이트
          closest_city_name = city_name;
          // for문을 전부 순회하면 closest_city_name에는 방문하지 않은 도시 중에서 가장 가까운 도시의 이름이 들어가게 됨

        }
      }
      visited_cities[closest_city_name] = unvisited_cities[closest_city_name];
      // 가장 가까운 도시를 방문한 도시로 등록
      delete unvisited_cities[closest_city_name];
      // 가장 가까운 도시를 방문하지 않은 도시에서 제거

      for(let adjacent_city_name in visited_cities[closest_city_name].adjacent_cities){
        // 이제 방문한 도시의 인접도시들을 순회하면서 최단 경로 테이블 업데이트
        if(unvisited_cities[adjacent_city_name] == null){
          // 만약 인접 도시가 방문하지 않은 도시에 없다면 이미 방문한 도시이므로 넘어감
          continue;

        }
        //let distance = mst_table[closest_city_name].distance + // 출발도시에서 현재 도시까지의 거리
        //visited_cities[closest_city_name].adjacent_cities[adjacent_city_name];
        // 현재 도시에서 인접도시까지 가는 거리 더하기

        let distance = visited_cities[closest_city_name].adjacent_cities[adjacent_city_name];

        if(mst_table[adjacent_city_name].distance > distance){
          mst_table[adjacent_city_name].distance = distance;
          mst_table[adjacent_city_name].city = visited_cities[closest_city_name];
        }
        // shortest_path_table에 저장된 인접 도시까지 가는거리가 지금 구한 거리보다 크다면 shortest_path_table에 인접 도시까지 가는 거리를 지금 구한 거리로 업데이트
      

        
      }
    }
    
    console.log(mst_table);
    
  }
  
  
}

let prim = new Prim();
// 다익스트라 객체 생성
let seoul = new City("서울");
let wonju = new City("원주");
let gangneung = new City("강릉");
let daejeon = new City("대전");
let jeonju = new City("전주");
let daegu = new City("대구");

prim.registerCity(seoul);
prim.registerCity(wonju);
prim.registerCity(gangneung);
prim.registerCity(daejeon);
prim.registerCity(jeonju);
prim.registerCity(daegu);
// 도시 등록

seoul.addAdjacentCity(wonju, 87);
seoul.addAdjacentCity(gangneung, 165);
seoul.addAdjacentCity(daejeon, 140);
seoul.addAdjacentCity(jeonju, 187);

wonju.addAdjacentCity(seoul, 87);
wonju.addAdjacentCity(gangneung, 95);
wonju.addAdjacentCity(daejeon, 118);
wonju.addAdjacentCity(daegu, 178);

gangneung.addAdjacentCity(seoul, 165);
gangneung.addAdjacentCity(wonju, 95);
gangneung.addAdjacentCity(daegu, 212);

daejeon.addAdjacentCity(seoul, 140);
daejeon.addAdjacentCity(wonju, 118);
daejeon.addAdjacentCity(jeonju, 56);
daejeon.addAdjacentCity(daegu, 122);

jeonju.addAdjacentCity(seoul, 187);
jeonju.addAdjacentCity(daejeon, 56);
jeonju.addAdjacentCity(daegu, 130);

daegu.addAdjacentCity(wonju, 178);
daegu.addAdjacentCity(gangneung, 212);
daegu.addAdjacentCity(daejeon, 122);
daegu.addAdjacentCity(jeonju, 130);

prim.Mst(seoul);

