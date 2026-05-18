import {Queue} from "./../Queue.mjs";

class Vertex{
  // 정점을 표현하는 클래스
  constructor(value){
    // 데이터를 표현할 value를 매개변수로
    this.value = value;
    this.adjacent_vertices = [];
    // 현재 정점의 인접한 정점들을 저장할 빈 배열

  }

  addAdjacentVertex(vertex){
    // 정점들을 이웃으로 연결하는 함수
    // 연결할 정점인 vertex를 adjacent_vertices 배열에 추가하면 됨
    this.adjacent_vertices.push(vertex);
  }

  removeAdjacentVertex(vertex){
    // 정점의 연결을 끊는 기능
    for(let i = 0; i < this.adjacent_vertices.length; i++){
      // 배열을 순회하면서 해당 정점을 찾아서 지우기
      if(this.adjacent_vertices[i] == vertex){
        // 배열에 해당 정점이 있다면
        this.adjacent_vertices.splice(i--, 1);
        // 배열에서 해당 정점을 제거

      }
    }
  }
}

function DFS(vertex, visited_vertices = {}){
  // 시작 정점을 나타내는 vertex와 방문할 정점을 기억할 해시테이블인 visited_vertices 매개변수
  // 깊이 우선 탐색

  visited_vertices[vertex.value] = true;
  // 먼저 현재 정점을 방문한 정점으로 등록

  console.log(`정점 : ${vertex.value}`);

  for(let adjacent of vertex.adjacent_vertices){
    // 해당 정점의 인접 정점 순회
    if(visited_vertices[adjacent.value] == true){
      // 해당 정점을 이미 방문했다면
      continue;
      // 방문하지 않고 넘어감

    }else{
      // 해당 정점이 방문하지 않은 정점이라면 해당 인접 정점을 대상으로 깊이 우선 탐색을 재귀적으로 호출
      DFS(adjacent, visited_vertices);
    }
  }
}

function BFS(vertex){
// 너비 우선 탐색
// 재귀가 없으므로 시작할 정점만 매개변수로 받음
  let queue = new Queue();
  // 빈 큐 생성
  let visited_vertices = [];
  // 방문할 정점들을 저장할 해시테이블 생성

  visited_vertices[vertex.value] = true;
  queue.enqueue(vertex);


  while(queue.isEmpty() == false){
    // 큐가 빌 때까지 반복
    let currentVertex = queue.dequeue().data;
    // 먼저 큐에서 정점 한 개를 dequeue

    console.log(`정점: ${currentVertex.value}`);

    for(let adjacent of currentVertex.adjacent_vertices){
      // 현재 정점의 인접 정점들을 순회
      if(visited_vertices[adjacent.value]){
        // 순회하는 정점이 이미 방문한 정점이라면
        continue;
        // 아무것도 하지 않고 넘어감

      }else{
        visited_vertices[adjacent.value] = true;
        queue.enqueue(adjacent);

      }
    }

  }

}

let ben = new Vertex("Ben");
let ivy = new Vertex("Ivy");
let joy = new Vertex("Joy");
let jake = new Vertex("Jake");
let anna = new Vertex("Anna");
let elin = new Vertex("Elin");
let david = new Vertex("David");
let owen = new Vertex("Owen");

ben.addAdjacentVertex(ivy);
ben.addAdjacentVertex(jake);
ben.addAdjacentVertex(anna);
ben.addAdjacentVertex(david);

ivy.addAdjacentVertex(ben);
ivy.addAdjacentVertex(joy);

joy.addAdjacentVertex(ivy);
joy.addAdjacentVertex(jake);

jake.addAdjacentVertex(ben);
jake.addAdjacentVertex(joy);

david.addAdjacentVertex(ben);
david.addAdjacentVertex(elin);

elin.addAdjacentVertex(david);
elin.addAdjacentVertex(owen);

owen.addAdjacentVertex(elin);




BFS(ben);



