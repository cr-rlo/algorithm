
class BinaryTree{
  constructor(data){
    this.data = data;
    this.leftSubTree = null;
    this.rightSubTree = null;
    this.parentTree = null;

  }
  // 형제노드와 할아버지 노드를 구하기 위해 부모노드 프로퍼티도 정의
  // 부모 노드에서 자식 노드로만 참조가 가능한 단방향 노드에서 자식 노드에서 부모 노드도 참조가 가능한 양방향 노드로 

  getData(){
    return this.data;
  }
  // data 가져오기
  setData(data){
    this.data = data;
  }
  // 해당 노드의 data로 data 설정하기
  getLeftSubTree(){
    return this.leftSubTree;
  }
  // 왼쪽 서브트리 가져오기

  getRightSubTree(){
    return this.rightSubTree;
  }
  // 오른쪽 서브트리 가져오기
  setLeftSubTree(tree){
    this.leftSubTree = tree;
  }
  // 왼쪽 서브트리를 tree로 설정하기
  
  setRightSubTree(tree){
    this.rightSubTree = tree;
  } 
  // 오른쪽 서브트리를 tree로 설정하기

  preOrderTraversal(tree) {
    // 괄호 안에 들어있는 tree가 바로 매개변수 
    // 함수에게 전달하는 작업 대상
    // 재귀 호출을 할 때마다 대상을 계속 바꿔서 알려줘야야하기 때문에 필요
    // 처음에는 루트 노드가 전달되고, 그 다음에는 왼쪽 서브트리가 전달되고, 그 다음에는 오른쪽 서브트리가 전달되는 식으로 계속 바뀌면서 재귀 호출이 이루어짐
    if (tree === null) return; // 트리가 비어있으면 종료 
    console.log(tree.data); // 현재 노드 방문
    this.preOrderTraversal(tree.getLeftSubTree()); // 왼쪽 서브트리 방문
    this.preOrderTraversal(tree.getRightSubTree()); // 오른쪽 서브트리 방문
  }

  inOrderTraversal(tree) {
    if (tree === null) return; // 트리가 비어있으면 종료 
    this.inOrderTraversal(tree.getLeftSubTree()); // 왼쪽 서브트리 방문
    console.log(tree.data); // 현재 노드 방문
    this.inOrderTraversal(tree.getRightSubTree()); // 오른쪽 서브트리 방문
  }

  postOrderTraversal(tree) {
    if (tree === null) return; // 트리가 비어있으면 종료 
    this.postOrderTraversal(tree.getLeftSubTree()); // 왼쪽 서브트리 방문
    this.postOrderTraversal(tree.getRightSubTree()); // 오른쪽 서브트리 방문
    console.log(tree.data); // 현재 노드 방문
  }

  removeLeftSubTree(){
    let deletingNode = this.leftSubTree;
    this.setLeftSubTree(null);
    return deletingNode;
  }
  // 왼쪽 서브트리를 제거하는 메서드. 제거된 서브트리를 반환하여 필요에 따라 다른 곳에서 사용할 수 있도록 함

  removeRightSubTree(){
    let deletingNode = this.rightSubTree;
    this.setRightSubTree(null);
    return deletingNode;
  }
  // 오른쪽 서브트리를 제거하는 메서드. 제거된 서브트리를 반환하여 필요에 따라 다른 곳에서 사용할 수 있도록 함

  getParent(){
    return this.parentTree;
  }
  // 부모 노드의 정보를 가져옴

  setParent(tree){
    this.parentTree = tree;
  }
  // 매개 변수로 받은 tree를 this.parentTree로 설정. 부모 노드로 등록



}

export {BinaryTree};
