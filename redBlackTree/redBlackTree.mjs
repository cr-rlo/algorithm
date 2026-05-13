import {BinaryTree, BLACK, RED} from './binaryTree.mjs';
// 이진 트리를 이용하여 red-black트리 구현

class RedBlackTree{
  constructor(rootNode = null){
    this.root = rootNode;

  }

  search(targetData){
    let currentNode = this.root;
    // 탐색을 시작할 때, 루트노드부터 시작하기 위해서 현재 노드를 루트로 초기화

    while (currentNode !== null) {
      // 현재 노드가 null이 될 때까지 반복하여 탐색. null이면 더 이상 탐색할 노드가 없다는 의미
      if (currentNode.getData() === targetData) {
        // 현재 노드의 데이터가 찾고자 하는 데이터와 일치하는 경우, 해당 노드를 반환하여 탐색 성공을 나타냄
        return currentNode;
      } else if (targetData < currentNode.getData()) {
        // 찾고자 하는 데이터가 현재 노드의 데이터보다 작은 경우, 왼쪽 서브트리로 이동하여 탐색을 계속 진행
        currentNode = currentNode.getLeftSubTree();
      } else {
        // 찾고자 하는 데이터가 현재 노드의 데이터보다 큰 경우, 오른쪽 서브트리로 이동하여 탐색을 계속 진행
        currentNode = currentNode.getRightSubTree();
      }
   }
    return null;
    // 탐색이 종료된 경우 null을 반환하여 찾고자 하는 데이터가 트리에 없음을 나타냄
  }

  rotateLeft(node){
    // 매개 변수 node는 회전할 노드
    let parent = node.getParent();
    // 회전을 하게되면 그 자리에 다른 노드가 들어오기 때문에 부모 노드와 자식노드를 대체한 노드로 연결해줘야 함 -> Parent 변수에 부모 노드 저장
    let rightChild = node.getRightSubTree();
    // LL회전을 하는 경우, 자식 노드가 무조건 오른쪽에 있으므로 오른쪽 자식 노드를 참조해서 저장함


    node.setRightSubTree(rightChild.getLeftSubTree());
    // 노드를 회전하기 전에 오른쪽 자식 노드의 왼쪽 자식노드를 노드의 오른쪽 자식 노드로 연결

    if(rightChild.getLeftSubTree() != null){
      // 만약 오른쪽 자식노드의 왼쪽 노드가 존재한다면 부모노드로 회전할 노드를 가리키게해줌
      rightChild.getLeftSubTree().setParent(node);

    }

    rightChild.setLeftSubTree(node);
    node.setParent(rightChild);
    
    this.replaceParentsChild(parent, node, rightChild);
  }

  rotateRight(node){
    let parent = node.getParent();
    let leftChild = node.getLeftSubTree();

    node.setLeftSubTree(leftChild.getRightSubTree());

    if(leftChild.getRightSubTree() != null){
      leftChild.getRightSubTree().setParent(node);
    }

    leftChild.setRightSubTree(node);
    node.setParent(leftChild);

    this.replaceParentsChild(parent, node, leftChild);
  }




  replaceParentsChild(parent, oldChild, newChild){
    if(parent == null){
       this.root = newChild;
       // 부모 노드가 없는 경우 즉, 루트 노드인 경우
       // 루트노드를 newchild로 설정해줌
    }else if(parent.getLeftSubTree() == oldChild){
      parent.setLeftSubTree(newChild);
    }else if(parent.getRightSubTree() == oldChild){
      parent.setRightSubTree(newChild);
    }
   
    if(newChild != null){
      newChild.setParent(parent);
    }

  }

  insert(data){
    let current = this.root;
    // 루트 노드에서부터 삽입할 위치를 찾아가기 위해 루트 노드 저장
    let parent = null;
    // 삽입할 위치의 부모 노드를 기억하기 위한 변수

    while(current != null){
      // current가 null이 아닌 동안 
      parent = current;
      // current를 이동하기 전에 parent를 current위치로 이동시키고
      if(data < current.getData()){
        // 삽입할 데이터가 current 현재 노드보다 작다면 왼쪽 자식 노드로 이동
        current = current.getLeftSubTree();
      } else if(data > current.getData()){
        current = current.getRightSubTree();
      }else{
        // 삽입할 데이터와 현재 노드의 데이터가 같은 값인 경우
        return;
        // 중복 값을 허용하지 않으므로 함수 종료
      }

      }
      //while 문을 나오면 parent 변수에는 삽입할 노드 위치의 부모 노드가 저장되어 있음 -> 이를 이용해서 새로운 데이터 삽입

      let newNode = new BinaryTree(data);
      if(parent == null){
        this.root = newNode;
      }else if(data < parent.getData()){
        parent.setLeftSubTree(newNode);
      }else if(data > parent.getData()){
        parent.setRightSubTree(newNode);
      }
      newNode.setParent(parent);
      this.rebalanceAfterInsertion(newNode);
    
  }
    rebalanceAfterInsertion(node){
      // 매개변수는 새로 삽입된 노드
      let parent = node.getParent();

      if(parent == null){
        // 1. 새로 삽입한 노드가 루트노드인 경우
        node.color = BLACK;
        return;
      }
      if (parent.color == BLACK){
        return;
        // 2~4번은 모두 부모노드가 빨간색인 경우 이므로 부모노드의 색이 검은색이면 함수 종료
        // 이 밑으로는 부모노드가 모두 빨간색
      }

      let uncle = this.getUncle(parent);
      let grandParent = parent.getParent();
      if (uncle != null && uncle.color == RED){
        // 부모 노드와 삼촌 노드가 빨간색인 경우
        parent.color = BLACK;
        uncle.color = BLACK;
        grandParent.color = RED;
        this.rebalanceAfterInsertion(grandParent);
      }else if(this.isBlack(uncle) == true){
        // 부모는 빨간색, 삼촌노드는 검은색 추가로 새로운 노드가 안쪽 손자인지 체크
        if(grandParent.getRightSubTree() == parent && parent.getLeftSubTree() == node){
          // 오른쪽 안쪽 손자인 경우
          // 이때는 부모노드를 삽입된 노드(새로운 노드)의 반대 방향으로 회전해줘야 함 -> 삽입된 노드는 부모노드의 왼쪽이기 때문에 부모노드를 오른쪽으로 회전
          this.rotateRight(parent);


          // 그 다음 할아버지 노드를 부모노드가 회전했던 반대 방향으로 회전
          this.rotateLeft(grandParent);
          node.color = BLACK;
          // 삽입된 노드의 색을 검은색으로 
          grandParent.color = RED;
          // 할아버지 노드의 색을 빨간색으로
        }else if(grandParent.getLeftSubTree() == parent && parent.getRightSubTree() == node){
          // 새로운 노드가 왼쪽 손자인 경우

          // 먼저 부모노드를 삽입된 노드(새로운 노드) 반대 방향으로 회전
          this.rotateLeft(parent);
          // 할아버지 노드를 부모노드가 회전했던 반대 방향으로 회전
          this.rotateRight(grandParent);
          node.color = BLACK;
          // 삽입된 노드의 색을 검은색으로 
          grandParent.color = RED;
          // 할아버지 노드의 색을 빨간색으로
        }else if(grandParent.getRightSubTree() == parent && parent.getRightSubTree() == node){
          // 손자의 위치만 다르므로 이어서 선언
          // 새로운 노드가 오른쪽 바깥쪽 손자인 경우

          // 할아버지 노드를 새로운 노드가 삽입된 반대 방향으로 회전 -> 오른쪽 손자이므로 왼쪽으로 회전
          this.rotateLeft(grandParent);
          parent.color = BLACK;
          grandParent.color = RED;

        }else if(grandParent.getLeftSubTree() == parent && parent.getLeftSubTree() == node){
          // 새로운 노드가 왼쪽 바깥쪽 손자인 경우
          this.rotateRight(grandParent);
          parent.color = BLACK;
          grandParent.color = RED;

        }
      }
  }
  getUncle(parent){
    // 삼촌 노드를 구하는 함수
    let grandParent = parent.getParent();
    if(grandParent.getLeftSubTree() == parent){
      return grandParent.getRightSubTree();
    }else if(grandParent.getRightSubTree() == parent){
      return grandParent.getLeftSubTree();
    }

    return null;
    // 만약 할아버지 노드가 없다면 삼촌 노드도 없다는 것이므로 null 리턴
  }
  isBlack(node){
    return node == null || node.color == BLACK;
  }

  remove(data){
    let currentNode = this.root;
    // 제거할 노드를 루트노드부터 아래로 찾아가기 위해서 루트노드 저장
    while(currentNode != null && currentNode.getData() != data){
      if(data < currentNode.getData()){
        currentNode = currentNode.getLeftSubTree();
      }else if(data > currentNode.getData()){
        currentNode = currentNode.getRightSubTree();
      }
    }
    // while 문이 끝나면 제거할 노드의 위치를 찾는 과정이 끝남
    if(currentNode == null){
      // 제거할 노드를 찾지 못했다면 함수 종료
      return;
    }
    // 이 밑으로는 currentNode에 제거할 노드가 반드시 저장된 경우

    let repalceNode = null;
    // 대체할 노드를 담을 변수
    let deletingNodeColor = RED;
    // 제거된 노드의 색을 담을 변수

    // 제거할 노드의 자식에 따라서 경우 구분

    // 제거할 노드의 자식 노드가 0~1개인 경우
    if(currentNode.getLeftSubTree() == null || currentNode.getRightSubTree() == null){
      repalceNode = this.removeWithZeroOrOneChild(currentNode);
      deletingNodeColor = currentNode.color;
    }else if(){
      // 제거할 노드의 자식 노드가 두 개인 노드 제거
    }

  }

  removeWithZeroOrOneChild(node){
    if(node.getLeftSubTree() != null){
      // 제거할 노드가 왼쪽 자식 노드만 갖고 있는 경우
      // 제거할 노드의 부모노드가 제거할 노드 대신 제거할 노드의 왼쪽 자식 노드를 참조하도록 바꿔줌
      this.replaceParentsChild(node.getParent(), node, node.getLeftSubTree());
      return node.getLeftSubTree();
      // 새롭게 연결된 왼쪽 자식 노드 리턴
    }else if(node.getRightSubTree() != null){
      // 제거할 노드가 오른쪽 자식 노드만 갖고 있는 경우
      // 제거할 노드의 부모 노드가 제거할 노드 대신 제거할 노드의 오른쪽 자식 노드를 참조하도록 바꿈
      this.replaceParentsChild(node.getParent(), node, node.getRightSubTree());
      return node.getRightSubTree();
      // 새롭게 연결된 오른쪽 자식 노드 리턴
    }else{
      // 왼쪽 오른쪽 자식 노드가 모두 null 일 때

      // 제거할 노드가 검은색이면 nilnode를 임시로 삽입하고 빨간색이면 null을 삽입해 제거
      let newChild = (node.color == BLACK) ? new NilNode() : null
      // 제거한 노드의 부모 노드가 방금 만든 newChild를 자식 노드로 가리키게 함
      this.replaceParentsChild(node.getParent(), node, newChild)
      return newChild;
      // 새롭게 자식이 된 노드 리턴
    }
  }

  getBiggestNode(node){
    // 왼쪽 자식노드에서 가장 큰 값 가져오기
    while(node.getRightSubTree() != null){
      // 오른쪽 자식 노드가 없을 때까지 오른쪽 노드 참조
      // 오른쪽 자식 노드에는 부모보다 큰 값들이 모여있으므로 오른쪽으로 계속 이동하면 그 구역에서 가장 큰 값에 도달하게 됨
      node = node.getRightSubTree();
    }

    // while 문을 종료하면 node에는 가장 큰 값의 노드 저장
  }
}



class NilNode extends BinaryTree{
  // BinaryTree를 상속받음으로써 그 트리가 가진 모든 메서드와 프로퍼티를 동일하게 사용할 수 있음
  constructor(){
    super(0);
    // super키워드는 부모 클래스의 생성자 호출
    // NilNode는 자신의 데이터를 0으로 고정하여 부모에게 전달
    this.color = BLACK;
    // 모든 nilnode는 검은색이기 때문에 색상을 검은색으로 설정
  }
}

let rbTree = new RedBlackTree();
rbTree.insert(17);
rbTree.insert(9);
rbTree.insert(19);
rbTree.insert(75);
rbTree.insert(85);

console.log(rbTree.root);
if(rbTree.root){
  rbTree.root.inOrderTraversal(rbTree.root);
}