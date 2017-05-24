class Fighter{
  constructor(name="Fighter", power=1, health=100){
    this._name = name;
    this._power = power;
    this._health = health;
  }
  
  setDamage(damage){
  	this._health -= damage;
    printMessage(`${this._name}: health=${this._health}`);
  }  
  
  hit(enemy, point){
  	enemy.setDamage(point * this._power);
  }
  
  getHealth(){
    return this._health;
  }
  
  getName(){
    return this._name;
  }
}

class ImprovedFighter extends Fighter{
  doubleHit(enemy, point){
    super.hit(enemy, point * 2);
  }
}

//Функцією пишемо з урахуванням того, що ми не знаємо, які саме типи у переданих
//файтерів
let fight = (firstPlayer=new Fighter(),
             secondPlayer=new ImprovedFighter(),
             ...points) => {

  let isPlayerDead = (player) => {
    return player.getHealth() <= 0;
  };
  
  let greatTheWinner = (player) => {
    printMessage(`And the Oscar goes to... ${player.getName()}`);
  };
  
  //За умовою задачі треба було у класі-нащадку створити новий метод doubleHit, 
  //а не перевизначити метод hit , що дало би можливість поліморфної роботи з класами.
  //Тому створимо функцію, що емулює поліморфізм.
  let hit = (player) => {
    if(player instanceof ImprovedFighter){
      return player.doubleHit.bind(player);
    }
    else{
      return player.hit.bind(player);
    }
  };
  
  for(let i = 0; i < points.length; i++){
    if(i % 2 === 0){
      hit(firstPlayer)(secondPlayer, points[i]);
      if(isPlayerDead(secondPlayer)){
        greatTheWinner(firstPlayer);
        break;
      }
    }
    else{
      hit(secondPlayer)(firstPlayer, points[i]);
      if(isPlayerDead(firstPlayer)){
        greatTheWinner(secondPlayer);
        break;
      }
    } 
  } 
}

//Для тестів за допомогою mocha зручно відключити вивід до console.log 
//меседжів нашої функції fight, але треба залищити консоль доступною для mocha
//Тому виводимо меседжі тільки в тому випадку, якщо скрипт виконується у браузері
function printMessage(message){
  if(typeof window !== "undefined"){
    console.log(message);
  }
}

if(typeof window === "undefined"){
  module.exports = {Fighter, ImprovedFighter, fight};
}