// 商品データをオブジェクトで管理
const products = {
  1: { name: "オリジナルブレンド200g", price: 500 },
  2: { name: "オリジナルブレンド500g", price: 900 },
  3: { name: "スペシャルブレンド200g", price: 700 },
  4: { name: "スペシャルブレンド500g", price: 1200 },
};

const priceElement = document.getElementById("product");
const numberElement = document.getElementById("number");
let purchases = [];

function add() {
  const productId = priceElement.value;
  const number = parseInt(numberElement.value);
  const product = products[productId]; //IDで商品名を取得

  if (!product) {
    alert("商品が選択されていません。");
    return;
  }

  //購入オブジェクト
  let purchase = {
    id: productId,
    name: product.name,
    price: product.price,
    number: number,
  };

  //重複する場合は数量のみ追加。
  let existingPurchase = purchases.find((item) => item.id === productId);
  if (existingPurchase) {
    existingPurchase.number += purchase.number;
  } else {
    purchases.push(purchase);
  }

  alert(`${display()}\n小計${subtotal()}円`);
  priceElement.value = "";
  numberElement.value = "";
}

function display() {
  return purchases
    .map((purchase) => {
      return `${purchase.name} (${purchase.price})円が${purchase.number}点`;
    })
    .join("\n");
}

function subtotal() {
  return purchases.reduce((prev, purchase) => {
    return prev + purchase.price * purchase.number;
  }, 0);
}

function calc() {
  const sum = subtotal();
  const postage = calcPostageFromPurchase(sum);
  window.alert(
    `小計は${sum}円、送料は${postage}円です。合計は${sum + postage}円です`
  );
  purchases = [];
  priceElement.value = "";
  numberElement.value = "";
}

function calcPostageFromPurchase(sum) {
  if (sum == 0 || sum >= 3000) {
    return 0;
  } else if (sum < 2000) {
    return 500;
  } else {
    return 250;
  }
}
