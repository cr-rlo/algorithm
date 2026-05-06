import { BinaryTree } from './binaryTree.mjs';  

let tree1 = new BinaryTree(1);
let tree2 = new BinaryTree(2);
let tree3 = new BinaryTree(3);
let tree4 = new BinaryTree(4);
let tree5 = new BinaryTree(5);
let tree6 = new BinaryTree(6);
let tree7 = new BinaryTree(7);
// 노드 7개 생성

tree1.setLeftSubTree(tree2);
tree1.setRightSubTree(tree3);
// tree1의 왼쪽 서브트리를 tree2로 설정하고 오른쪽 서브트리를 tree3으로 설정하기
tree2.setLeftSubTree(tree4);
tree2.setRightSubTree(tree5);
// tree2의 왼쪽 서브트리를 tree4로 설정하고 오른쪽 서브트리를 tree5로 설정하기
tree3.setLeftSubTree(tree6);
tree3.setRightSubTree(tree7);
// tree3의 왼쪽 서브트리를 tree6으로 설정하고 오른쪽 서브트리를 tree7로 설정하기

console.log("루트 노드의 오른쪽 자식 노드:" + tree1.getRightSubTree().getData());
// tree1의 오른쪽 서브트리의 data 가져오기
console.log("루트 노드의 오른쪽 자식 노드의 왼쪽 자식 노드:" + tree1.getRightSubTree().getLeftSubTree().getData());

console.log("전위 순회:");
tree1.preOrderTraversal(tree1);

console.log("중위 순회:");    
tree1.inOrderTraversal(tree1);

console.log("후위 순회:");
tree1.postOrderTraversal(tree1);  

