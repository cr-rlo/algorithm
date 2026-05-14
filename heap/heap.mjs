import { BinaryTree } from './binaryTree.mjs';  

class Heap{
  constructor(){
    this.root = null;
    this.lastInsertedNode = null;

  }
  insert(data){
    if(this.lastInsertedNode == null){
      // 마지막으로 삽입된 노드가 null인 경우 -> 처음 삽입하는 경우
      this.lastInsertedNode = new BinaryTree(data);
      this.root = this.lastInsertedNode;
      return;
    }

    let insertingParent = this.getInsertingParent();
    // 새로 삽입될 위치의 부모 노드를 가져와 insertingParent 변수에 저장
    let newNode = new BinaryTree(data);
    // 새로 삽입할 노드 만들어줌


    if(insertingParent.getLeftSubTree() == null){
      insertingParent.setLeftSubTree(newNode);
      // insertingParent의 왼쪽 자식 노드가 비었다면 새로운 노드를 왼쪽 자식으로 연결
    }else if(insertingParent.getRightSubTree() == null){
      // InsertingParent의 오른쪽 자식 노드가 비었다면 새로운 노드를 오른쪽 자식 노드로 연결
      insertingParent.setRightSubTree(newNode);
    }
    newNode.setParent(insertingParent);
    // 새로운 노드의 부모 노드를 InsertingParent로 연결
    this.lastInsertedNode = newNode;
    // 마지막에 삽입된 노드를 새로 삽입된 노드로 업데이트


    while(newNode.getParent() != null){
      // 새로운 노드의 부모 노드가 존재하지 않을 때까지 반복
      if(this.isBigPriority(newNode.getData(), newNode.getParent().getData()) == true){
        // 새로 삽입된 노드의 데이터가 부모노드의 데이터보다 우선순위가 높다면
        let tempData = newNode.getParent().getData();
        // 부모 노드의 데이터를 저장하고 
        newNode.getParent().setData(newNode.getData());
        // 부모 노드의 데이터를 새로 삽입된 노드의 데이터로 덮어씀
        newNode.setData(tempData);
        // 새로 삽입된 노드의 데이터를 저장했던 부모노드의 데이터로 덮어써줌
        newNode = newNode.getParent();
        // 한 단계 위로 올라가줌

      }else{
        // 새로 삽입된 노드의 데이터가 부모노드의 데이터보다 우선순위가 낮다면 우선 순위에 맞는 위치 찾기를 완료한 것이므로 위치 찾기 종료
        break;
        // break로 while문 탈출
      }

    }
  }


  isBigPriority(first, second){
    // 최소 힙에서 더 작은 데이터가 우선 순위가 높음
    // first와 second는 정수형 변수가 아니라 클래스의 인스턴스이기 때문에 단순히 first와 second를 비교하는 것이 아니라 person 내부의 priority로 비교해줌 
    return (first.priority < second.priority);
    // first.priority가 더 작을 때 true를 리턴하니 나이가 작을수록 우선순위가 높게 설정됨
  }

  getInsertingParent(){
    // 1. lastIsertedNode가 루트노드인 경우
      if(this.lastInsertedNode.getParent() == null){
        return this.lastInsertedNode;
      }else{
      // 2. lastInsertedNode가 부모노드의 왼쪽 자식노드인 경우
       if(this.lastInsertedNode == this.lastInsertedNode.getParent().getLeftSubTree()){
        return this.lastInsertedNode.getParent();
        }else{
          // 3. lastInsertedNode가 부모노드의 오른쪽 자식 노드인 경우
          let current = this.lastInsertedNode;
          // 상위 노드로 순회할 변수 선언 -> 시작은 마지막에 삽입된 노드에서 시작하기 때문에 마지막에 삽입된 노드로 초기화해줌
          let firstRightSibling = null;
          // 상위 노드 중에서 가장 처음 오른쪽 형제가 있는 경우를 기억해주기 위한 변수 선언

          // 루트 노드는 형제 노드가 없으므로 최대 루트노드의 자식 노드까지만 올라오도록 부모노드의 부모노드가 null이 아닐 때까지 반복
          while(current.getParent().getParent() != null){
            current = current.getParent();

            firstRightSibling = this.getRightSibling(current);
            // current노드의 오른쪽 형제 노드를 가져옴
            if(firstRightSibling != null){
              // current의 오른쪽 형제 노드가 존재한다면
              break;
              // while문 탈출
            }
          }
          // while문을 나오게 되면 부모노드 중에서 오른쪽 형제 노드가 있는 경우와 없는 경우로 나눠지게 됨

          if(firstRightSibling != null){
            // 3.a. 부모 노드 중에서 만약 오른쪽 형제 노드가 존재한다면
            while(firstRightSibling.getLeftSubTree() != null){
              // 오른쪽 형제 노드의 왼쪽 자식 노드로 계속 내려감
              firstRightSibling = firstRightSibling.getLeftSubTree();
            }
            return firstRightSibling;
          }else{
            // 3.b. 부모 노드 중에서 오른쪽 형제 노드가 존재하지 않는 경우
            // 이때는 루트 노드의 가장 왼쪽 쟈식 노드를 리턴해주면 됨
            current = this.root;
            while(current.getLeftSubTree() != null){
              // while문으로 가장 왼쪽 자식 노드에 접근
              current = current.getLeftSubTree();
            }
            return current;
          }
        }
      }
    
  }

getRightSibling(node){
   // node매개변수는 현재 노드를 나타냄
  if(node.getParent().getRightSubTree() != node){
    // 현재 노드가 현재 노드의 부모노드의 오른쪽 자식 노드가 아니라면 왼쪽 자식 노드라는 의미
    return node.getParent().getRightSubTree();
  }
    // 그렇지 않은 경우는 현재 노드가 부모 노드의 오른쪽 자식 노드라는 의미이미로 null 리턴
    return null;
   
 }
getLeftSibling(node){
    // node매개변수는 현재 노드를 나타냄
  if(node.getParent().getLeftSubTree() != node){
    // 현재 노드가 현재 노드의 부모노드의 왼쪽 자식 노드가 아니라면 오른쪽 자식 노드라는 의미
      return node.getParent().getLeftSubTree();
  }
    // 그렇지 않은 경우는 현재 노드가 부모 노드의 왼쪽 자식 노드라는 의미이미로 null 리턴
    return null;
   

 }

  remove(){
    let deletedNode = null;
    // 제거된 노드를 저장할 변수

    if(this.lastInsertedNode == this.root){
      // 데이터가 하나인 경우. 즉, 마지막으로 삽입된 노드가 루트노드인 경우
      deletedNode = this.root;
      // 제거된 노드는 루트 노드로 설정
      this.root = null;
      this.lastInsertedNode = null;
      return deletedNode;
      // 제거된 노드를 리턴하면서 함수 종료
    }

    let prevLastInsertedNode = this.getNewLastInsertedNode();
    // getNewLastInsertedNode() 함수를 통해 마지막에 삽입된 노드의 바로 이전 노드를 구해서 변수에 저장
    let tempData = this.root.getData();
    this.root.setData(this.lastInsertedNode.getData());
    this.lastInsertedNode.setData(tempData);
    // 마지막에 삽입된 노드의 값을 루트 노드의 값과 스왑
    // 우선 순위가 가장 높은 값부터 제거 되기 때문 -> 루트 노드

    // 그리고 마지막에 삽입된 노드를 힙에서 제거
    if(this.lastInsertedNode.getParent().getLeftSubTree() == this.lastInsertedNode){
      // 만약 마지막으로 삽입된 노드가 부모노드의 왼쪽 자식 노드라면
      this.lastInsertedNode.getParent().setLeftSubTree(null);
      // 그 값을 null로 만들고
    }else{
      // 그렇지 않고 마지막으로 삽입된 노드가 부모노드의 오른쪽 자식 노드라면
      this.lastInsertedNode.getParent().setRightSubTree(null);
      // 그 값을 null로 만들기
    }
    this.lastInsertedNode.setParent(null);
    // 마지막으로 삽입된 노드의 부노 노드르 null로 만들기
    deletedNode = this.lastInsertedNode;
    // 제거된 노드를 마지막에 삽입된 노드로 가리킴
    this.lastInsertedNode = prevLastInsertedNode;
    // 마지막에 삽입된 노드 이전에 삽입된 노드를 마지막에 삽입된 노드로 변경


    // 이제 루트노드에 있는 값이 자기 우선순위에 맞도록 찾아가게 하면 됨
    let current = this.root;
    // 루트 노드부터 순회하기 위해서 current에 루트노드 저장
    do{
      // 무조건 한번은 실행되어야 하므로 do while문
      let higherChild = this.getHigherPriority(current.getLeftSubTree(), current.getRightSubTree());
      // 왼쪽 자식 노드와 오른쪽 자식 노드를 인자로 전달하여 함수를 호출해 더 높은 우선 순위의 자식 노드를 구함
      // 현재 higherChild에는 더 높은 우선 순위의 자식 노드가 저장되어 있음
      if(higherChild == null){
        // 자식 노드가 없다면 do while문 탈출
        break;
      }else if(this.isBigPriority(current.getData(), higherChild.getData()) == false){
        // 우선 순위가 높은 자식이 있다면 current 노드와 우선순위 비교 
        // current 노드의 우선 순위가 더 낮다면 
        // 자식 노드와 위치를 바꿔줌
        let tempData = current.getData();
        current.setData(higherChild.getData());
        higherChild.setData(tempData);
        current = higherChild;
        // current노드를 아래로이동
      }else{
        // current노드의 우선 순위가 더 크다면
        // 제자리를 찾은 것이니 break으로 while문 탈출
        break;
      }
    }while(current.getLeftSubTree() != null || current.getRightSubTree() != null){
      // 조건은 자식 노드가 존재하지 않을 때까지

      return deletedNode;

    }

  }

  getHigherPriority(left, right){
    if(left == null){
      return right;
      // 왼쪽 노드가 없다면 오른쪽 노드가 우선순위가 높다고 판단하여 오른쪽 리턴
    }else if(right == null){
      // 반대로 오른쪽 노드가 없다면 
      return left;
    }else if(this.isBigPriority(left.getData(), right.getData())){
      // 양쪽 자식 노드가 모두 있는 경우
      // isBigPriority함수를 호출해 우선순위 비교
      // 왼쪽 노드의 우선 순위가 더 크다면 왼쪽 노드 리턴
      return left;
    }else{
      return right;
      // 그렇지 않다면 오른쪽 노드의 우선순위가 높으므로 오른쪽 노드 리턴
    }
  }

  getNewLastInsertedNode(){
    let prevLastInsertedNode = null;
    // 이것만으로 마지막으로 삽입된 노드가 루트노드인 경우는 처리
    // prevLastInsertedNode는 마지막에 삽입된 노드 이전에 삽입된 노드를 저장하는 변수

    if(this.lastInsertedNode.getParent().getLeftSubTree() == this.lastInsertedNode){
      // 마지막으로 삽입된 노드가 부모노드의 왼쪽 자식 노드인 경우
      let current = this.lastInsertedNode;
      // 마지막 삽입 위치부터 순회하므로 current를 lastInsertedNode로 초기화
      let firstLeftSibling = null;

      while(current.getParent().getParent() != null){
        // current의 부모 노드의 부모노드가 null일 때 까지. 즉, 루트노드의 자식 노드에 갈 때까지 반복
        current = current.getParent();
        firstLeftSibling = this.getLeftSibling(current);
        if(firstLeftSibling != null){
          break;
          // 만약 왼쪽 형제가 있다면 while문 나오기
          // 이렇게 while문이 끝나고 나면 부모 노드 중에서 왼쪽 형제 노드가 있는지 없는지 앓 수 있음
        }

      }

      if(firstLeftSibling != null){
        // 1.a. 부모 노드 중에 왼쪽 형제 노드가 존재하는 경우
        // 왼쪽 형제 노드의 오른쪽 자식 노드가 Null일 때까지 오른쪽으로 내려가줌
        while(firstLeftSibling.getRightSubTree() != null){
          firstLeftSibling = firstLeftSibling.getRightSubTree();
          
        }
        prevLastInsertedNode = firstLeftSibling;
        // 찾은 위치를 prevLastInsertedNode에 넣어줌
      }else{
        // 1.b. 부모노드 주에 왼쪽 형제 노드가 존재하지 않는 경우
        // 루트 노드의 가장 오른쪽에 있는 노드 선택
        current = this.root;
        // 루트노드부터 내려가므로 root로 초기화
        while(current.getRightSubTree() != null){
          // 오른쪽 자식노드가 null이 아닐 때까지 오른쪽으로 내려감
          current = current.getRightSubTree();

        }
        prevLastInsertedNode = current;
      }

    }else{
      // 2. 마지막에 삽입된 노드가 부모노드의 오른쪽 자식노드인 경우
       prevLastInsertedNode = this.lastInsertedNode.getParent().getLeftSubTree();
    }
    return prevLastInsertedNode;
  }

}

class Person{
  constructor(name, age){
    this.name = name;
    this.age = age;
    this.priority = age;
  }

}

export {Heap};