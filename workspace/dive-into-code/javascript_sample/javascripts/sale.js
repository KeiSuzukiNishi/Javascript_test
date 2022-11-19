const idElement = document.getElementById("product");
const numberElement = document.getElementById("number");
//getElementById=HTMLのid(productとnumber)を取得するメソッド。
//documentは、window内に表示されるWebページ。
//valueでHTMLのvalueの値を取得。
//constで定数に代入。変わらない値。

const products = [
  {id: 0,
    name: "選択してください",
    price: 0},
  {id: 1,
    name: "オリジナルブレンド200g ",
    price: 500},
    {id: 2,
      name: "オリジナルブレンド500g ",
      price: 900},
      {id: 3,
        name: "スペシャルブレンド200g ",
        price: 700},
        {id: 4,
          name: "スペシャルブレンド500g ",
          price: 1200}
        ];
        

let purchases = []

function add() { //HTML上のaddのことで、追加ボタンを押した時に、選択された商品の金額と個数を保持する内容のプログラム
  const id = idElement.value;
  const number = numberElement.value;
  
  let purchase = {
    id: parseInt(id),//parseIntでstringからnumberに変更している
    number: parseInt(number),
    price: parseInt(products[id].price),
    name: (products[id].name),
  };
 
  const newPurchase = purchases.findIndex((item) => item.price === purchase.price) //findIndex()メソッドは、「配列オブジェクト.findIndex(コールバック関数)」のように使用し、コールバック関数に合致する最初の要素の位置を返却するメソッドです。purchases配列の中に、現在追加しようとしている商品と同じpriceプロパティの要素がないか確認しています。もしあった場合は、そのindexが代入され、なかった場合には-1が代入されます。
  if(purchases.length < 1 || newPurchase === -1) { //初回の追加であるか、または新しい商品の追加である場合にtrueになります。newPurchase === -1ということはpurchases配列の中に現在追加しようとしている商品と同じpriceプロパティの要素がなかったということを示しているからです。
    purchases.push(purchase)
  } else {
    purchases[newPurchase].number += purchase.number; //既存で追加済みの商品があった場合、newPurchaseには既存商品がpurchases配列の中のどのindexで格納されているのか、そのindexが代入されているので、再度探す必要がないのです。
  }

  window.alert(`${display()}\n小計${subtotal()}円`);
  idElement.value = "";
  numberElement.value = "";
}

function display() {
  return purchases.map(purchase => {
    return `${purchase.name}${purchase.price}円が${purchase.number}点`
  }).join("\n");
};
//上記のmapメソッドにする前のforの処理
//function display() {
  //let string = ""; //****よくわからない。""の意味。
  //for(let i=0; i<purchases.length; i++){
    //string += `${purchases[i].price}円が${purchases[i].number}点\n`;
  //}
  //return string;
//}//+=を使った文字列の連結をforを使って繰り返し処理を行っています。


  function subtotal() {
    return purchases.reduce((prev, purchase) => {
      return prev + purchase.price * purchase.number 
    }, 0);
  }

//上記のreduceメソッドにする前のforの処理
//function subtotal() {
  //let sum = 0;
      //for(let i=0; i<purchases.length; i++){
      //sum += purchases[i].price * purchases[i].number;
    //}
    //return sum;
  //}//for ("初期化式"; "条件式"; "更新式") {"条件式が正しい間実行したい処理"}
    //iは暫定の変数。配列は0から始まるため、0。
    //purchases.lengthはpurchases配列の要素の数。配列の要素数に達するまでは、処理を続けるという条件
    //i++は一回の処理が終わるごとにiを1増やす
    //sumは上記のlet sum = 0のこと。合計金額を格納する変数。
    //purchases[i] のiは、何番目のインデックスの処理かということ。
    //例：３回追加をした場合、purchases.lengthが0～2の配列番号がpushで追加されており、iが2になるまで計算式を続けるということ。
    //purchases[i].priceで配列番号2のpriceの数値を持ってくるところまで実行される。
    //****よくわからない。returnのある意味。
    

function calc() {//HTML上のcalcのボタンが押されたら実行される。
  const sum = subtotal();//subtotal()関数は、確定した小計金額を返却してくれるので、calc()関数の中で再代入する必要がなくなり、定数const sumとして扱えるようになりました。
  const postage = calcPostageFromPurchase(sum);//送料を格納する変数を定義。送料自体は計算されることはなく、一度代入したら値が確定するため、定義のみ
  window.alert(`小計は${sum}円、送料は${postage}円です。合計は${sum + postage}円です`);
  purchases = [];
  idElement.value= "";
  numberElement.value = "";
}

function calcPostageFromPurchase(sum) {
  if (sum == 0 || sum >= 3000) {
    return 0;
  } else if (sum < 1000){
   return 500;
  } else {
   return 250;
  }
} //送料：合計金額が2,000円未満で送料500円、2,000円以上で送料250円、3,000円以上、 または0円で 送料無料