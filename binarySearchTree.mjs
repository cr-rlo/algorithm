import {BinaryTree} from './binaryTree.mjs';
// 이진 트리를 이용하여 이진 탐색 트리를 구현하기 위해 BinaryTree 클래스를 가져옴

class BinarySearchTree{
  constructor(rootNode = null){
    this.root = rootNode;

  }

  insert(data){
    if (this.root === null) {
      // 처음 데이터를 삽입할 때, 트리가 비어있으면 새로운 노드를 루트로 설정
      this.root = new BinaryTree(data);
      return;
    }
    // 이진 탐색트리에 데이터가 없을 때

    let currentNode = this.root;
    // 현재 노드를 루트로 초기화하여 탐색을 시작
    let parentNode = null;
    // 루트 노드는 부모 노드가 없으므로 parentNode를 null로 초기화

    // 루트노드부터 자식이 없을 때까지 계속 비교하면서 내려가야 하므로 반복문을 넣어줌
    while (currentNode !== null) {
      // 현재 노드가 null이 될 때까지 반복하여 탐색. null이면 더 이상 탐색할 노드가 없다는 의미
      parentNode = currentNode;
      // 첫 번째 반복에서는 parentNode가 루트 노드가 되고, 이후 반복에서는 currentNode가 parentNode로 업데이트되어 탐색이 계속 진행됨
      if (data < currentNode.getData()) { // 삽입하려는 데이터가 현재 노드의 데이터보다 작은 경우, 왼쪽 서브트리로 이동
        currentNode = currentNode.getLeftSubTree();
      } else if (data > currentNode.getData()) {
        // 삽입하려는 데이터가 현재 노드의 데이터보다 큰 경우, 오른쪽 서브트리로 이동
        currentNode = currentNode.getRightSubTree();
      }
      else{return;}

    }
    // currentNode가 null이 되면 반복문이 종료되고, parentNode는 삽입하려는 데이터가 들어갈 위치의 부모 노드를 가리키게 됨

    let newNode = new BinaryTree(data);
    // 삽입하려는 데이터를 가진 새로운 노드를 생성
    if (parentNode.getData() > data) {
      // 삽입하려는 데이터가 부모 노드의 데이터보다 작은 경우, 부모 노드의 왼쪽 서브트리에 새로운 노드를 연결
      parentNode.setLeftSubTree(newNode);
    } else {
      // 삽입하려는 데이터가 부모 노드의 데이터보다 큰 경우, 부모 노드의 오른쪽 서브트리에 새로운 노드를 연결
      parentNode.setRightSubTree(newNode);
    }
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

  remove(targetData){
    let fakeParentRootNode = new BinaryTree(0);
    // 삭제하려는 노드의 부모 노드를 찾기 위해 가짜 부모 노드를 생성. 이 가짜 부모 노드는 삭제하려는 노드가 루트인 경우에도 일관된 방식으로 삭제 작업을 수행할 수 있도록 도와줌, 루트 노드는 부모 노드가 없기 때문에 가짜 부모 노드를 사용하여 삭제 작업을 수행할 때 일관된 방식으로 처리할 수 있도록 함
    let parentNode = fakeParentRootNode;
    // 루트 노드에서 탐색을 시작하기 위해 parentNode를 가짜 부모 노드로 초기화
    let currentNode = this.root;
    // 탐색을 시작할 때, 루트 노드부터 시작하기 위해서 현재 노드를 루트로 초기화
    let deletingNode = null;
    // 삭제하려는 노드를 저장하기 위한 변수. 초기값은 null로 설정. 여기에 제거한 노드를 담아서 함수를 반환할 때 넘겨주어 필요에 따라 다른 곳에서 사용할 수 있도록 함

    fakeParentRootNode.setRightSubTree(this.root);
    // 가짜 부모 노드의 오른쪽 서브트리를 루트 노드로 설정하여, 삭제하려는 노드가 루트인 경우에도 일관된 방식으로 삭제 작업을 수행할 수 있도록 함. 왼쪽 오른쪽은 상관없음

    while (currentNode !== null && currentNode.getData() !== targetData) {
      // 현재 노드가 null이 아니고, 현재 노드의 데이터가 찾고자 하는 데이터와 일치하지 않는 동안 반복하여 탐색. null이면 더 이상 탐색할 노드가 없다는 의미
      parentNode = currentNode;
      // 부모 노드를 현재 노드로 설정하는 이유는 탐색이 진행되면서 현재 노드가 이동하기 때문에, 부모 노드도 함께 업데이트하여 탐색이 계속 진행될 수 있도록 하기 위함
      if (currentNode.getData() > targetData) {
        // 현재 노드의 값이 찾고자 하는 데이터보다 큰 경우, 왼쪽 서브트리로 이동하여 탐색을 계속 진행
        currentNode = currentNode.getLeftSubTree();
      
    } else {
      // 현재 노드의 값이 찾고자 하는 데이터보다 작은 경우, 오른쪽 서브트리로 이동하여 탐색을 계속 진행
      currentNode = currentNode.getRightSubTree();
    }
    // while문을 나오게 되면, currentNode에는 찾고자 하는 데이터가 있는 노드가 저장되어 있거나, 찾고자 하는 데이터가 트리에 없는 경우 null이 저장되어 있음
    }
    if (currentNode === null) {
      // 찾고자 하는 데이터가 트리에 없는 경우, null을 반환하여 삭제 작업이 실패했음을 나타냄
      return null;
    }

    
    deletingNode = currentNode;
    // 삭제하려는 노드를 deletingNode 변수에 저장하여 나중에 반환할 수 있도록 함

    //1. 터미널 노드를 제거하는 경우
    if (deletingNode.getLeftSubTree() === null && deletingNode.getRightSubTree() === null) {
      if (parentNode.getLeftSubTree() === deletingNode) {
        // 삭제하려는 노드가 부모 노드의 왼쪽 서브트리인 경우, 부모 노드의 왼쪽 서브트리를 null로 설정하여 삭제하려는 노드를 트리에서 제거
        parentNode.removeLeftSubTree();
      }
      else {
        // 삭제하려는 노드가 부모 노드의 오른쪽 서브트리인 경우, 부모 노드의 오른쪽 서브트리를 null로 설정하여 삭제하려는 노드를 트리에서 제거
        parentNode.removeRightSubTree();
      }
    } else if(deletingNode.getLeftSubTree() === null || deletingNode.getRightSubTree() === null) {
      //2. 자식이 하나인 노드를 제거하는 경우
      // 제거할 노드의 왼쪽 자식 노드가 null이거나, 오른쪽 자식 노드가 null인 경우, 즉 자식이 하나인 경우
      let deletingNodeChild;
       // 제거할 노드의 자식 노드를 저장하기 위한 변수
       if (deletingNode.getLeftSubTree() !== null) {
        // 제거할 노드의 왼쪽 자식 노드가 null이 아닌 경우, 즉 왼쪽 자식 노드가 존재하는 경우
        deletingNodeChild = deletingNode.getLeftSubTree();
        // 제거할 노드의 왼쪽 자식 노드를 deletingNodeChild 변수에 저장하여 나중에 부모 노드와 연결할 수 있도록 함
        }
        else{
          // 제거할 노드의 오른쪽 자식 노드가 null이 아닌 경우, 즉 오른쪽 자식 노드가 존재하는 경우
          deletingNodeChild = deletingNode.getRightSubTree();
          // 제거할 노드의 오른쪽 자식 노드를 deletingNodeChild 변수에 저장하여 나중에 부모 노드와 연결할 수 있도록 함
         }
        // 이 if/ else문을 통해 제거할 노드의 자식 노드를 deletingNodeChild 변수에 저장하여 나중에 부모 노드와 연결할 수 있도록 함
        if (parentNode.getLeftSubTree()=== deletingNode){
          // 제거할 노드가 부모 노드의 왼쪽 서브트리인 경우, 부모 노드의 왼쪽 서브트리를 deletingNodeChild로 설정하여 제거할 노드의 자식 노드를 부모 노드와 연결
          parentNode.setLeftSubTree(deletingNodeChild);
        }
        else{
          // 제거할 노드가 부모 노드의 오른쪽 서브트리인 경우, 부모 노드의 오른쪽 서브트리를 deletingNodeChild로 설정하여 제거할 노드의 자식 노드를 부모 노드와 연결
          parentNode.setRightSubTree(deletingNodeChild);
        }
      }
      else{
        //3. 자식이 둘인 노드를 제거하는 경우
        // 이번에는 제거할 노드의 왼쪽 노드에서 가장 큰 노드를 찾아서 제거할 노드의 데이터와 교체하는 방식으로 제거할 노드를 트리에서 제거
        let replacingNode = deletingNode.getLeftSubTree();
        // 제거할 노드의 왼쪽 노드를 replacingNode 변수에 저장하여, 이 노드에서 가장 큰 노드를 찾기 위한 탐색을 시작
        let replacingNodeParent = deletingNode;
        // 대체할 노드의 부모 노드를 변수로 저장

        while (replacingNode.getRightSubTree() !== null){// 대체할 노드의 오른쪽 자식 노드가 null이 될 때까지 반복하여 탐색. null이면 더 이상 탐색할 노드가 없다는 의미. 그러면 대체할 노드가 제거할 노드의 왼쪽 서브트리에서 가장 큰 노드가 됨
          replacingNodeParent = replacingNode;
          // 대체할 노드의 부모 노드를 대체할 노드로 업데이트하여 아래로 탐색을 계속 진행
          replacingNode = replacingNode.getRightSubTree();
          // 대체할 노드를 대체할 노드의 오른쪽 자식 노드로 업데이트하여 아래로 탐색을 계속 진행

         }
         let deletingNodeData = deletingNode.getData();
         // 제거할 노드의 데이터를 deletingNodeData 변수에 저장하여 나중에 반환할 수 있도록 함
         deletingNode.setData(replacingNode.getData());
         // 제거할 노드의 데이터를 대체할 노드의 데이터로 설정하여 제거할 노드의 데이터를 대체할 노드의 데이터로 교체

         if (replacingNodeParent.getLeftSubTree() === replacingNode) {
          // 대체할 노드의 부모 노드의 왼쪽 자식 노드가 대체할 노드라면 
          replacingNodeParent.setLeftSubTree(replacingNode.getLeftSubTree());
          // 대체할 노드의 부모 노드의 왼쪽 자식 노드를 대체할 노드의 왼쪽 자식 노드로 설정하여 대체할 노드를 트리에서 제거

         }
         else{
          // 그렇지 않고 대체할 노드의 부모 노드의 오른쪽 자식노드가 대체할 노드라면 대체할 노드의 부모노드의 오른쪽 자식노드를 대체할 노드의 왼쪽 자식 노드로 설정
          replacingNodeParent.setRightSubTree(replacingNode.getLeftSubTree());
         }

         deletingNode = replacingNode;
          // 제거할 노드를 대체할 노드로 업데이트하여 나중에 반환할 수 있도록 함
          deletingNode.setData(deletingNodeData);
          // 제거할 노드의 데이터를 deletingNodeData로 설정하여 제거할 노드의 데이터를 원래 제거할 노드의 데이터로 되돌림


        }
      
        if (fakeParentRootNode.getRightSubTree() !== this.root){
          // 가짜 부모 노드의 오른쪽 자식노드가 루트노드와 다른 경우라면, 루트노드가 변경되었다면, 루트노드를 가짜 부모 노드의 오른쪽 자식 노드로 설정하여 루트 노드가 변경된 경우에도 일관된 방식으로 트리를 유지할 수 있도록 함
          this.root = fakeParentRootNode.getRightSubTree();
          // 루트 노드를 가짜 부모 노드의 오른쪽 자식 노드로 설정하여 루트 노드가 변경된 경우에도 일관된 방식으로 트리를 유지할 수 있도록 함


        }
        return deletingNode;
        // 제거된 노드를 반환하여 필요에 따라 다른 곳에서 사용할 수 있도록 함
      }
     }
   




let binarySearchTree = new BinarySearchTree();
// 이진 탐색트리 객체를 생성하여 binarySearchTree 변수에 할당
binarySearchTree.insert(18);
binarySearchTree.insert(15);
binarySearchTree.insert(10);
binarySearchTree.insert(6);
binarySearchTree.insert(3);
binarySearchTree.insert(8);
binarySearchTree.insert(12);
binarySearchTree.insert(11);
binarySearchTree.insert(31);
binarySearchTree.insert(27);
binarySearchTree.insert(24);
binarySearchTree.insert(20);
binarySearchTree.insert(33);
binarySearchTree.insert(35);
binarySearchTree.insert(37);
// 18, 15, 10, 6, 3, 8, 12, 11, 31, 27, 24, 20, 33, 35, 37을 이진 탐색 트리에 삽입하여 트리를 구성

binarySearchTree.root.inOrderTraversal(binarySearchTree.root);
// 이진 탐색 트리의 루트 노드에서 시작하여 중위 순회(in-order traversal)를 수행하여 트리의 노드들을 방문하고, 방문한 노드의 데이터를 출력

console.log("======== serarch 6 ========");
console.log(binarySearchTree.search(6));

console.log("======== serarch 1 ========");
console.log(binarySearchTree.search(1));

binarySearchTree.remove(10);
binarySearchTree.root.inOrderTraversal(binarySearchTree.root);