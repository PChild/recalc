class Rule {
  conditionFn: any;
  haltAfter: any;
  modifyFn: any;
  name: any;
  priority: any;
  constructor(name: any, conditionFn: any, modifyFn: any, haltAfter: any, priority: any) {
    this.name = name;
    this.conditionFn = conditionFn;
    this.modifyFn = modifyFn;
    this.haltAfter = haltAfter;
    this.priority = priority;
  }
}

export default class Rules {
  rules: any;
  constructor() {
    this.rules = [];
  }

  addRule(name: any, conditionFn: any, modifyFn: any, haltAfter = false, priority = 0) {
    this.rules.push(new Rule(name, conditionFn, modifyFn, haltAfter, priority));
    this.rules.sort((a: any, b: any) => b.priority - a.priority);
  }

  solve(source: any, iterationLimit = 100) {
    let runLoop = true;
    let i = 0;

    while (runLoop && i <= iterationLimit) {
      let runForEach = true;
      // console.log('-----');
      this.rules.forEach((rule: any) => {
        if (!runForEach) {
          return;
        }
        // console.log('Checking ' + rule.name + ' (' + rule.priority + ')')
        if (rule.conditionFn(source)) {
          // console.log('Running ' + rule.name);
          rule.modifyFn(source);

          if (rule.haltAfter) {
            runLoop = false;
          }
          runForEach = false;
        }
      });
      i++;
    }
  }
}
