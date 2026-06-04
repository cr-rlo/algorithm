class Job{
  constructor(jobName, startTime, endTime){
    // 매개변수로 세션의 이름, 시작 시각, 종료 시각
    this.jobName = jobName;
    this.startTime = startTime;
    this.endTime = endTime;

  }
}

class IntervalScheduler{
  constructor(){
    // 스케쥴러 클래스
    this.jobs = [];
    // 세션들을 등록할 빈 배열 생성
  }

  addJob(job){
    // 스케쥴러에 세션을 등록하는 함수 
    this.jobs.push(job);
    // 세션을 jobs 배열에 push해서 등록

  }
  intervalScheduling(){
    // 가장 일찍 끝나는 세션을 먼저 선택하는 탐욕 알고리즘
    // 등록된 세션배열(jobs)를 종료되는 시각이 이른 순서대로 정렬
    // 자바스크립트 배열의 sort라는 정렬함수를 통해 endTime이 작은 순서로, 즉 종료 시작이 이른 순으로 정렬
    this.jobs.sort((a,b) => a.endTime - b.endTime);
    // 배열 내부의 요소를 두 개씩 꺼내와 크기를 비교
    // 비교 함수의 반환값이 음수이면 순서를 바꾸지 않고 양수이면 순서를 바꿈 => 오름차순으로 정렬
    let result = [];
    // 선택한 세션을 저장할 빈 배열 
    for(let currentJob of this.jobs){
      // endTime을 기준으로 오름차순으로 정렬된 배열을 첫 번째부터 마지막까지 하나씩 순서대로 검사
      if(result.length == 0){
        // 만약 선택한 세션이 비었다면 현재 세션을 배열에 넣어줌
        // 첫 반복문에서 currentjob은 endTime이 가장 짧기 때문
        result.push(currentJob);

      }else if(currentJob.startTime >= result[result.length - 1].endTime){
        // 선택한 세션이 비어있지 않다면 조건 하나 추가적으로 필요
        // 일찍 끝나는 세션이라고 해도 이미 선택한 세션과 시간이 겹치면 들을 수 없기 때문에 currentJob의 시작 시각이 현재까지 선택한 세션 중 마지막 세션의 종료 시각 이후라는 조건을 넣어줌
        result.push(currentJob);

      }

    }
    // 반복문이 끝나면 result배열에는 들을 세션들이 저장됨
    console.log(result);
  }
}

let intervalScheduler = new IntervalScheduler();
let a = new Job("A", 0, 6);
let b = new Job("B", 1, 4);
let c = new Job("C", 3, 6);
let d = new Job("D", 3, 8);
let e = new Job("E", 4, 7);
let f = new Job("F", 5, 9);
let g = new Job("G", 6, 10);
let h = new Job("H", 8, 11);

intervalScheduler.addJob(a);
intervalScheduler.addJob(b);
intervalScheduler.addJob(c);
intervalScheduler.addJob(d);
intervalScheduler.addJob(e);
intervalScheduler.addJob(f);
intervalScheduler.addJob(g);
intervalScheduler.addJob(h);

intervalScheduler.intervalScheduling();