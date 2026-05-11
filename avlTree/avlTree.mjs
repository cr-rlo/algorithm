import {BinaryTree} from './binaryTree.mjs';
// 이진 트리를 이용하여 AVL 트리를 구현하기 위해 BinaryTree 클래스를 가져옴

class AVLTree{
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
  getHeight(node){
    if (node === null){
      return 0;
      // BinaryTree 클래스에서 높이를 저장하는 height 프로퍼티를 선언했으므로 이 프로퍼티를 리턴해주면 되지만, 노드가 null인 경우에는 height 프로퍼티를 참조할 수 없으므로 0을 리턴
    }
    else {return node.height;}
  }

  updateHeight(node){
    // 균형이 무너져서 회전을 하고나면 노드의 높이도 변경되므로 노드의 높이를 업데이트 하는 함수 필요

    let leftChildHeight = this.getHeight(node.getLeftSubTree());
    // 노드의 높이를 구하기 위해서 왼쪽 자식 노드의 높이를 구함
    let rightChildHeight = this.getHeight(node.getRightSubTree());
    // 노드의 높이를 구하기 위해서 오른쪽 자식 노드의 높이를 구함
    node.height = Math.max(leftChildHeight, rightChildHeight) + 1;
    // 왼쪽 자식노드와 오른쪽 자식노드 중에서 더 큰 높이를 가진 자식노드의 높이에 1을 더해서 현재 노드의 높이를 업데이트

  }

  getBalanceFactor(node){
    // 균형을 구할 노드인 매개변수 node의 왼쪽 자식 노드의 높이에서 오른쪽 자식 노드의 높이를 빼서 균형인수 계산
    return this.getHeight(node.getLeftSubTree()) - this.getHeight(node.getRightSubTree());

  }

  rotateLeft(node){
   // 회전할 노드를 매개변수로 받아서 왼쪽으로 회전하는 함수
   let childNode = node.getRightSubTree();
    // 회전할 노드의 오른쪽 자식노드를 childNode 변수에 저장하는 이유는 왼쪽으로 회전할 때, 회전할 노드의 오른쪽 자식노드가 새로운 부모노드가 되기 때문
    // 이진 트리의 특성상 회전할 노드(루트 노드)의 오른쪽 자식노드의 왼쪽 자식노드는 루트 노드보다 큰 값을 가지므로 회전할 노드(루트노드)의 오른쪽 자식노드의 왼쪽 자식노드는 무조건 회전할 노드의 오른쪽 자식노드로 연결해주면 됨
    node.setRightSubTree(childNode.getLeftSubTree());
    // 회전할 노드의 오른쪽 자식노드의 왼쪽 자식노드를 회전할 노드의 오른쪽 자식 노드로 연결
    childNode.setLeftSubTree(node);
    // 회전할 노드를 회전할 노드의 오른쪽 자식노드의 왼쪽 자식노드로 연결

    this.updateHeight(node);
    // 회전할 노드의 높이 업데이트
    this.updateHeight(childNode);
    // 회전할 노드의 오른쪽 자식노드의 높이 업데이트

    return childNode;
    // 회전할 노드의 오른쪽 자식노드가 새로운 부모노드가 되므로 회전할 노드의 오른쪽 자식노드를 반환 -> 바뀐 루트노드 반환
    
  }

  rotateRight(node){
    // 회전할 노드를 매개변수로 전달하고 그 노드를 오른쪽으로 회전하는 함수
    let childNode = node.getLeftSubTree();
    // 회전할 노드의 왼쪽 자식노드를 childNode 변수에 저장하는 이유는 오른쪽으로 회전할 때, 회전할 노드의 왼쪽 자식노드가 새로운 부모노드가 되기 때문
    // 이진 트리의 특성상 회전할 노드의 왼쪽 자식 노드의 오른쪽 자식노드는 회전할 노드보다 작은 값을 가지므로 회전할 노드의 왼쪽 자식 노드가 됨
    node.setLeftSubTree(childNode.getRightSubTree());
    // 회전할 노드의 왼쪽 자식노드의 오른쪽 자식노드를 회전할 노드의 왼쪽 자식노드로 연결
    childNode.setRightSubTree(node);
    // 회전할 노드를 회전할 노드의 왼쪽 자식노드의 오른쪽 자식노드로 연결

    this.updateHeight(node);
    // 회전할 노드의 높이 업데이트
    this.updateHeight(childNode);
    // 회전할 노드의 왼쪽 자식노드의 높이 업데이트
    
    return childNode;
    // 회전할 노드의 왼쪽 자식노드가 새로운 부모노드가 되므로 회전할 노드의 왼쪽 자식노드를 반환 -> 바뀐 루트노드 반환

  }

  rotation(targetNode, data){
    // 균형이 무너진 노드에서 회전을 하는 함수
    // 매개변수로 받은 노드의 하위 노드들의 높이를 분석해서 필요한 회전을 수행
    // 회전시킬 노드인 targetNode와 이 트리의 균형을 무너뜨린 원인이 된 데이터를 나타낼 data를 매개변수로 전달
    let balanceFactor = this.getBalanceFactor(targetNode);
    // 회전할 노드의 균형이 맞는지 계산. 이 결과가 2이상이 나오면 균형이 깨진 것이므로 회전을 해야함
    let isRootNode = false;
    // 먼저 회전할 노드가 루트노드가 아니라고 가정
    if (targetNode === this.root){
      isRootNode = true;
      // 회전할 노드가 루트노드인 경우 isRootNode 변수를 true로 변경
    }
    // data가 어디 있는지 기준으로 LL회전과 RL회전을 구분해주는 코드 넣어주기
    if (balanceFactor < -1 && data > targetNode.getRightSubTree().getData()){
      // 먼저 균형인수가 -1보다 작은경우, 즉 오른쪽 서브트리가 더 높은 경우 
      // data가 targetNode의 오른쪽 자식노드보다 큰 경우 => LL회전
      // 오른쪽 일직선으로 늘어진 경우이기 때문
      targetNode = this.rotateLeft(targetNode);
      // 회전을 하고나면 루트노드가 바뀔 수 있기 때문에 바뀐 루트노드를 targetNode에 저장
    } else if(balanceFactor > 1 && data < targetNode.getLeftSubTree().getData()){
      // 균형인수가 1보다 큰 경우, 즉 왼쪽 서브트리가 더 높은 경우
      // data가 targetNode의 왼쪽 자식 노드보다 작은 경우 => 왼쪽으로 일직선으로 늘어진 경우 -> RR회전
      targetNode = this.rotateRight(targetNode);
      // 회전을 하고나면 루트노드가 바뀔 수 있기 때문에 바뀐 루트노드를 targetNode에 저장
    } else if (balanceFactor > 1 && data > targetNode.getLeftSubTree().getData()){
      // 왼쪽 서브트리가 더 높고 data가 targetNode의 왼쪽 자식노드보다 큰 경우 => 왼쪽으로 꺾인 후 오른쪽으로 꺾인 경우 -> LR회전
      targetNode.setLeftSubTree(this.rotateLeft(targetNode.getLeftSubTree()));
      // 먼저 targetNode의 왼쪽 자식노드를 왼쪽으로 회전시키고 그 결과를 targetNode의 왼쪽 자식노드로 연결
      targetNode = this.rotateRight(targetNode);
      // 그리고 나서 targetNode를 오른쪽으로 회전시키고 그 결과를 targetNode에 저장
    } else if (balanceFactor < -1 && data < targetNode.getRightSubTree().getData()){
      // 오른쪽 서브트리가 더 높고 data가 targetNode의 오른쪽 자식노드보다 작은 경우 => 오른쪽으로 꺾인 후 왼쪽으로 꺾인 경우 -> RL회전
      targetNode.setRightSubTree(this.rotateRight(targetNode.getRightSubTree()));
      // 먼저 targetNode의 오른쪽 자식노드를 오른쪽으로 회전시키고 그 결과를 targetNode의 오른쪽 자식노드로 연결
      targetNode = this.rotateLeft(targetNode);
      // 그리고 나서 targetNode를 왼쪽으로 회전시키고 그 결과를 targetNode에 저장
    }
    
    if (isRootNode){
      this.root = targetNode;
      // 회전한 노드가 루트노드인 경우, AVL 트리의 루트노드를 회전한 노드로 업데이트

    }
    return targetNode;
    // 회전한 노드를 반환하여 AVL 트리의 균형이 무너진 노드가 회전한 노드로 바뀌었음을 나타냄

  }

  // 균형을 무너뜨리는 노드를 찾기
  // 삽입할 때는 새로 삽입하는 노드가 균형을 무너뜨리는 data라 따로 찾을 필요가 없지만 삭제할 때는 어떤 노드가 균형을 무너뜨리는지 알 수 없기 때문에 균형이 무너지는 노드를 찾아주는 함수 필요
  getUnbalanceNode(targetRootNode, unbalanceNode = null){
    // targetRootNode는 균형이 무너지는 노드를 찾기 시작할 노드, unbalanceNode는 균형을 무너뜨리는 노드를 저장하는 변수로 초기값은 null
    if (targetRootNode.getLeftSubTree() === null && targetRootNode.getRightSubTree() == null){
      // 해당 노드의 자식 노드가 하나도 없는 경우 -> 터미널 노드
      unbalanceNode = targetRootNode;
      return unbalanceNode;
    }
    let balanceFactor = this.getBalanceFactor(targetRootNode);
    // 해당 노드의 자식트리에서 어떤 곳이 더 높은지 균형인수 계산
    if (balanceFactor > 0){
      // 왼쪽 서브트리가 더 높으면 왼쪽으로 재귀적으로 내려감
      unbalanceNode = this.getUnbalanceNode(targetRootNode.getLeftSubTree(), unbalanceNode);
    } else if (balanceFactor < 0){
      // 오른쪽 서브트리가 더 높으면 오른쪽으로 재귀적으로 내려감
      unbalanceNode = this.getUnbalanceNode(targetRootNode.getRightSubTree(), unbalanceNode);
    } else {
      // 균형인수가 0인 경우, 즉 왼쪽 서브트리와 오른쪽 서브트리의 높이가 같은 경우 -> 오른쪽 자식 노드 선택 => 회전을 하고 대체할 노드도 왼쪽 자식노드의 가장 오른쪽 끝에 있는 자식 노드로 선택하기로 했기 때문
      unbalanceNode = targetRootNode.getRightSubTree();
    }
    return unbalanceNode;

  }

  insert(targetRootNode, data){
    // targetRootNode는 삽입할 노드가 위치할 서브트리의 루트노드, data는 삽입할 데이터
    if (targetRootNode === null){
      // 삽입할 위치에 노드가 비어있는 경우, 최초로 삽입하는 경우나 터미널 노드로 삽입하는 경우
      targetRootNode = new BinaryTree(data);
      // 새로운 노드를 생성하여 삽입할 위치에 연결
    }

    if (this.root === null){
      // AVL 트리에 처음 데이터를 삽입하는 경우
      this.root = targetRootNode;
      // AVL 트리의 루트노드를 삽입한 노드로 설정
    } else if(targetRootNode.getData() == data){
      // AVL 트리에 이미 존재하는 데이터를 삽입하려는 경우 -> 중복된 데이터는 허용하지 않기로 했기 때문에 아무 작업도 하지 않고 종료
      return targetRootNode;
    } else if (targetRootNode.getData() > data){
      // 삽입할 데이터가 targetRootNode의 데이터보다 작은 경우, 왼쪽 서브트리에 삽입
      targetRootNode.setLeftSubTree(this.insert(targetRootNode.getLeftSubTree(), data));
      // targetRootNode의 왼쪽 자식노드보다 data가 작다는 것을 아고 있으므로 왼쪽 서브트리를 대상으로 재귀적으로 insert 함수를 호출하여 데이터를 삽입하고 그 결과를 targetRootNode의 왼쪽 서브트리로 연결
    } else{
      // 삽입할 데이터가 targetRootNode의 데이터보다 큰 경우, 오른쪽 서브트리에 삽입
      targetRootNode.setRightSubTree(this.insert(targetRootNode.getRightSubTree(), data));
      // targetRootNode의 오른쪽 자식노드보다 data가 크다는 것을 아고 있으므로 오른쪽 서브트리를 대상으로 재귀적으로 insert 함수를 호출하여 데이터를 삽입하고 그 결과를 targetRootNode의 오른쪽 서브트리로 연결
    }

    this.updateHeight(targetRootNode);
    // 재귀를 이용해 하향식으로 삽입이 이뤄지기 때문에 가장 아래에 있는 노드가 높이를 먼저 계산하고 루트노드를 가장 늦게 계산하게 됨 -> 삽입이 완료된 후에 삽입한 노드부터 루트노드까지 올라가면서 높이 업데이트
    targetRootNode = this.rotation(targetRootNode, data);
    // 삽입이 완료된 후에 삽입한 노드부터 루트노드까지 올라가면서 균형이 무너지는 노드가 있는지 확인하고 회전 -> 균형이 무너지는 노드가 있으면 회전한 노드를 반환하여 균형이 무너지는 노드를 회전한 노드로 바꿔줌

    return targetRootNode;
    // targetRootNode를 반환
  }

  remove(targetRootNode, data, parentNode = null){
    // targetRootNode는 삭제할 노드가 위치할 서브트리의 루트노드, data는 삭제할 데이터, parentNode는 삭제할 노드의 부모노드로 초기값은 null
    if (targetRootNode.getData() > data && targetRootNode.getLeftSubTree() !==null){
      // 삭제할 데이터가 targetRootNode의 데이터보다 작고 왼쪽 자식노드가 null이 아닌 경우, 왼쪽 자식 노드를 targetRootNode로 전달하며 remove 함수를 재귀적으로 호출함
      targetRootNode.setLeftSubTree(this.remove(targetRootNode.getLeftSubTree(), data, targetRootNode));
      // 제거를 하면 제거된 노드를 대체하는 자식 노드가 생기는데 그 노드를 targetRootNode의 왼쪽 자식노드로 연결
    }else if (targetRootNode.getData() < data && targetRootNode.getRightSubTree() !==null){
      // 삭제할 데이터가 targetRootNode의 데이터보다 크고 오른쪽 자식노드가 null이 아닌 경우, 오른쪽 자식 노드를 targetRootNode로 전달하며 remove 함수를 재귀적으로 호출함
      targetRootNode.setRightSubTree(this.remove(targetRootNode.getRightSubTree(), data, targetRootNode));
      // 제거를 하면 제거된 노드를 대체하는 자식 노드가 생기는데 그 노드를 targetRootNode의 오른쪽 자식노드로 연결
    }else if (targetRootNode.getData() === data){
      // 삭제할 데이터가 targetRootNode의 데이터와 일치하는 경우, 해당 노드를 삭제
      // 기저 조건, 즉 삭제할 노드를 찾은 경우
      targetRootNode = this.removeHelper(targetRootNode, data, parentNode);
      // removeHelper는 해당 노드를 삭제하고 대체되는 노드를 반환하는 함수

      if (parentNode === null && targetRootNode !== null){
        // 삭제할 노드가 루트노드인 경우, remove 함수는 단 한번만 불리면서 기저 조건으로 함수를 종료하기 때문에 이 영역이 실행되지 않아서 높이 업데이트와 회전이 일어나지 않음 -> 루트노드를 삭제하는 경우에도 높이 업데이트와 회전이 일어나도록 하기 위해서 remove 함수가 재귀적으로 불리는 경우에도 이 영역이 실행되도록 함
        this.updateHeight(targetRootNode);
        let unbalanceNode = this.getUnbalanceNode(targetRootNode);
        targetRootNode = this.rotation(targetRootNode, unbalanceNode.getData());
        }

        return targetRootNode;
      }

    this.updateHeight(targetRootNode);
    let unbalanceNode = this.getUnbalanceNode(targetRootNode);
    // 균형을 무너뜨리는 노드를 찾는 함수 호출
      //insert 함수에서는 삽입하는 노드가 균형을 무너뜨리는 노드이기 때문에 따로 구할 필요가 없었지만, remove 함수에서는 어떤 노드가 균형을 무너뜨리는지 알 수 없기 때문에 균형이 무너지는 노드를 찾아주는 함수 필요
    targetRootNode = this.rotation(targetRootNode, unbalanceNode.getData());
    // 균형이 무너지는 노드가 있으면 회전한 노드를 반환하여 균형이 무너지는 노드를 회전한 노드로 바꿔줌
    

    return targetRootNode;
  }

  removeHelper(deletingNode, data, parentNode){
    let fakeParentRootNode = new BinaryTree(0);
    fakeParentRootNode.setRightSubTree(this.root);

    if(parentNode == null){
      parentNode = fakeParentRootNode;
    }

    let deletingNodeChild = null;
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

          deletingNodeChild = deletingNode;


        }
      
        if (fakeParentRootNode.getRightSubTree() !== this.root){
          // 가짜 부모 노드의 오른쪽 자식노드가 루트노드와 다른 경우라면, 루트노드가 변경되었다면, 루트노드를 가짜 부모 노드의 오른쪽 자식 노드로 설정하여 루트 노드가 변경된 경우에도 일관된 방식으로 트리를 유지할 수 있도록 함
          this.root = fakeParentRootNode.getRightSubTree();
          // 루트 노드를 가짜 부모 노드의 오른쪽 자식 노드로 설정하여 루트 노드가 변경된 경우에도 일관된 방식으로 트리를 유지할 수 있도록 함


        }
        return deletingNodeChild;
        // 제거된 노드의 자식을 반환하여 필요에 따라 다른 곳에서 사용할 수 있도록 함
      
   

  }


}

let avlTree = new AVLTree();
console.log("===== insert =====")
avlTree.insert(avlTree.root, 1);
avlTree.insert(avlTree.root, 2);
avlTree.insert(avlTree.root, 3);
avlTree.insert(avlTree.root, 4);
avlTree.insert(avlTree.root, 5);
avlTree.insert(avlTree.root, 6);
avlTree.insert(avlTree.root, 7);
console.log(avlTree.root);
avlTree.root.inOrderTraversal(avlTree.root);

console.log("===== remove =====")
avlTree.remove(avlTree.root, 2);
avlTree.remove(avlTree.root, 3);
avlTree.remove(avlTree.root, 1);
console.log(avlTree.root);
avlTree.root.inOrderTraversal(avlTree.root);

console.log("===== search =====")
console.log(avlTree.search(7));