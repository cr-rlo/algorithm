class Coin{
  constructor(won){
    this.won = won;
    this.count = 0;

  }
}

function changeCoin(money){
  // 동전 교환 함수
  // 매개변수로 거스름돈인 money
  console.log(`${money}원 거슬러주기`);
  let coins = [];
  // 동전의 종류를 저장할 coins 배열
  coins.push(new Coin(500));
  coins.push(new Coin(100));
  coins.push(new Coin(50));
  coins.push(new Coin(10));
  // coins 배열에 500원, 100원, 50원, 10원짜리 동전을 coin 클래스의 객체로 만들어서 저장  

  for(let i = 0; i < coins.length; i++){
    // 동전의 종류가 저장된 배열의 길이만큼 반복
    while(coins[i].won <= money){
      coins[i].count++;
      // 현재 동전의 금액이 거스름돈보다 작거나 같다면 현재 동전의 개수를 1개 늘리고 -> 해당 동전을 하나 거슬러주고
      money -= coins[i].won;
      // 거스름돈에서 현재 동전의 금액을 빼줌 -> 거스름돈이 현재 동전보다 작아질 때까지 반복

    }
      // 현재 동전으로 거스름돈을 최대한 거슬러주기 -> 거스름돈이 현재 동전보다 작을 때까지 반복
      // while문을 빠져나오면 현재 동전으로 거스름돈을 최대한 거슬러준 상태가 됨
  }
  console.log(coins);
  // 거스름돈 정보가 담긴 coins 배열 출력

}
changeCoin(2380);