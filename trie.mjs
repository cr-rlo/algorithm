import {Heap} from './heap/heap.mjs';


class Node{
  constructor(){
    this.children = {}
    // 여러 자식노드를 가리킬 수 있도록 빈 해시테이블인 children 프로퍼티 만들어줌
    // 해시테이블은 데이터를 키와 값의 쌍으로 저장하는 자료구조 
  }
}

class Trie{
  constructor(){
    this.root = new Node();
  }

  insert(word){
    // 저장할 단어를 매개변수로 설정
    let currentNode = this.root;
    // 루트노드부터 하위노드까지 이동하기 때문에 currentNode를 루트노드로 초기화
    for(let char of word){
      // 입력 받은 word를 한 글자씩 순회
      // for of 문을 사용하면 한 글자씩 쉽게 순회 가능
      // char에는 word의 글자가 한 글자씩 들어가게 됨
      if(currentNode.children[char] != null){
        // 현재 노드의 해시테이블에 입력 받은 단어의 글자가 있다면 현재 노드를 그 글자의 노드로 이동(자식 노드로 이동)
        currentNode = currentNode.children[char];

      }else{
        // 글자가 없다면 (키가 없다면)
        let newNode = new Node();
        // 새로운 노드를 만들어주고
        // 현재 노드의 children에 키에 char에 해당하는 value를 새로 만든 노드로 저장
        currentNode.children[char] = newNode;
        // 그리고 현재 순회하는 currentNode를 새로 생긴 노드로 이동
        currentNode = newNode;
      }

    }
    currentNode.children["*"] = 0;
    // 마지막에는 에스트리스크를 넣어주면서 종료
  }

  search(word, isCounting = false){
    let currentNode = this.root;
    for(let char of word){
      if(currentNode.children[char] != null){
        // 현재 노드의 해시테이블에 해당 단어의 key가 존재한다면 다음 노드로 이동
        currentNode = currentNode.children[char];

      }else{
        // 만약 현재 노드의 해시테이블에 해당 단어의 key가 없다면 찾는 단어가 없다는 말이므로 null을 리턴
        return null;
      }
    }

    if(isCounting == true){
      currentNode.children["*"] ++;

    }
    return currentNode;
  }

  getAllWords(startNode = null, word = "", words = []){
    // 이 함수는 재귀로 구현하므로 재귀에 필요한 startNode매개변수 필요
    // startNode까지의 글자를 저장하는 word 선언
    //순회하면서 완전한 단어를 발견한면 그 단어를 저장할 words 배열

    //루트 노드부터 순회 시작
    let currentNode = this.root;
    // 초깃값은 루트로 설정
    if(startNode != null){
      // startNode가 존재한다면 startNode부터 순회하도록 currentNode값 변경
      currentNode = startNode;

    }

    for(let key in currentNode.children){
      let childNode = currentNode.children[key];
      // 만약 해당 단어가 단어의 끝 즉 에스터리스크라면 검색 빈도 횟수를, 단어의 끝이 아니라면 다음 단어를 나타내는 노드를 참조
      // for in울 이용해서 현재 노드의 해시테이블에 저장된 key를 순회
      if(key == "*"){
        words.push(new WordData(word,childNode));
        // 만약 현재 key가 애스터리스크라면 단어의 완성이니 words배열에 완전한 단어 추가
        // 횟수도 추가

      }else{
        // key가 애스터리스크가 아니라면 단어가 끝나지 않았다는 의미
        // childNode를 현재 노드의 key에 해당하는 노드로 이동
        this.getAllWords(childNode,word + key, words);

      }

    }
    return words;

  }

  autoComplete(word){
    let currentNode = this.search(word);
    if(currentNode == null){
      return null;
    }

    return this.getAllWords(currentNode, word);
  }

    autoCompleteByCount(word){
      // 더 많이 검색된 함수를 먼저 추천해주는 함수
      let words = this.autoComplete(word);
      // 자동완성된 단어들이 담기는 배열인 words
      // wordData로 저장해줬기 때문에 단순히 단어를 담고 있는 문자열이 아니라 문자열과 검색된 횟수도 함께 저장
      let heap = new Heap();
      heap.isBigPriority = function(first, second){
        return (first.priority > second.priority);
      }
      for(let word of words){
        heap.insert(word);

      }

      let sortedBySearchCount = [];
      do{
        let removed = heap.remove();
        if(removed == null){
          break;
        }else{
          sortedBySearchCount.push(removed);
        }
      }
      while(true)
        // while 문을 나온 상황이라면 힙은 비어있게 되고 sortedBySearchCount에는 검색횟수가 많은 순서대로 데이터가 저장됨

      return sortedBySearchCount;
    }
}

class WordData{
  constructor(word, count){
    // 생성자에서 검색할 단어인 word와 그 단어가 검색된 횟수를 저장할 count를 매개 변수로 만들어 프로퍼티로 초기화
    this.word = word;
    this.count = count;
    this.priority = count;
    // 검색된 횟수가 곧 우선순위이기 때문에 count
  }
}

let trie = new Trie();
trie.insert("고등어");
trie.insert("김치");
trie.insert("김치찜");
trie.insert("김치찌개");

trie.search("김치찌개", true);
trie.search("김치찌개", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치", true);
trie.search("김치찜", true);

console.log(trie.autoCompleteByCount("김치"));




