class WeightedGraphVertex{
  constructor(value){
    // 도시 이름을 저장할 value 매개변수
    this.value = value;
    // value 프로퍼티에 도시 이름 저장
    this.adjacent_vertices = {};
    // 인접한 도시들을 저장할 해시 테이블
    // 간선에 가중치도 저장할 것이기 때문

  }

  addAdjacentVertex(vertex, weight){
    // 간선을 연결하는 함수
    // 매개변수는 연결할 정점인 vertex와 간선의 가중치인 weight
    this.adjacent_vertices[vertex.value] = weight;

    // key는 vertex 즉, 지역의 이름이 되고 value는 weight로 가중치가 되어 해시 테이블에 저장
  }

  removeAdjacentVertex(vertex){
    // 간선을 제거하는 함수
    // 매개변수로 연결을 끊을 정점을 나타내는 vertex
    // 삭제는 해당 해시테이블에서 key 즉 지역명으로 제거해주면 됨
    delete this.adjacent_vertices[vertex.value];
  }
}

let seoul = new WeightedGraphVertex("서울");
let wonju = new WeightedGraphVertex("원주");
let gangneung = new WeightedGraphVertex("강릉");
let daejeon = new WeightedGraphVertex("대전");
let jeonju = new WeightedGraphVertex("전주");
let daegu = new WeightedGraphVertex("대구");

seoul.addAdjacentVertex(wonju, 87);
seoul.addAdjacentVertex(daejeon, 140);
seoul.addAdjacentVertex(jeonju, 187);
console.log(seoul.adjacent_vertices);

seoul.removeAdjacentVertex(jeonju);
console.log(seoul.adjacent_vertices);

