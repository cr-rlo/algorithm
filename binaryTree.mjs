class BinaryTree{
  constructor(data, leftTree = null, rightTree = null){
    this.data = data;
    this.leftSubTree = leftTree;
    this.rightSubTree = rightTree;
  }
  // node 클래스를 따로 만들지 않고 binary tree 클래스에서 leftSubTree와 rightSubTree를 이용하여 트리를 구성한 이유는 이진트리의 노드는 노드이기도 하지만 각각이 트리이기도 하기 때문.

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
}

export {BinaryTree};
