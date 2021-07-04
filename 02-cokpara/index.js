let maxPara = Number.MAX_SAFE_INTEGER;

const productList = [
  {
    id: 1,
    name: "Kola",
    price: 4,
    img: "https://i.sozcu.com.tr/wp-content/uploads/2016/01/19/diyet-kola.jpg",
  },
  {
    id: 2,
    name: "Iskender",
    price: 30,
    img: "https://i.lezzet.com.tr/images-xxlarge-recipe/ev-yapimi-iskender-33bd7089-fa36-4398-95f8-02c6463ea27c.jpg",
  },
  {
    id: 3,
    name: "Yat",
    price: 450000,
    img: "https://i.ytimg.com/vi/9BCZpcgsAb8/maxresdefault.jpg",
  },
  {
    id: 4,
    name: "Bahceli Ev",
    price: 9500000,
    img: "https://www.neredekal.com/res/blog/1582812421_7.jpg",
  },
  {
    id: 5,
    name: "Araba Fabrikası",
    price: 120000000,
    img: "https://i.ytimg.com/vi/rfMkp55oTv0/maxresdefault.jpg",
  },
  {
    id: 6,
    name: "Atımsı",
    price: 2000,
    img: "https://i.pinimg.com/originals/67/60/98/676098ce8d71dffb37f858c5807647bb.jpg",
  },
  {
    id: 7,
    name: "COVID Aşısı",
    price: 4000,
    img: "https://www.cumhuriyet.com.tr/Archive/2021/7/4/1849654/kapak_123409.jpg",
  },
  {
    id: 8,
    name: "VOLVO V90",
    price: 90000,
    img: "http://img03.platesmania.com/171005/o/10499245.jpg",
  },
  // ... Kendi örneklerinizi eklemeye çekinmeyin.
];

//Headerda para bolumunu guncelle
function headerParaRender() {
  document.getElementById("kalanPara").textContent = maxPara;
}

function urunOlustur({ id, name, price, img }) {
  //Verilen data ile urun olustur.
  const urunElement = `<div class="urun id=${id}">
  <div class="urun__resim-container">
    <img
      src="${img}"
      alt="${name}"
      class="urun__resim JSurunResim"
      
    />
    <p class="urun__text urun__alinabilecek">
      Alabilecegin: <span class="JSurunAlinabilecek">${Math.floor(
        maxPara / price
      )}</span>
       tane
    </p>
  </div>
  <div class="urun__info-container">
    <h2>${name}</h2>
    <p class="urun__text">Fiyat: <span class="JSurunFiyat">${price}</span>TL</p>
    <p class="urun__text">Alinan: <span class="JSurunAlindi">0</span></p>
    <button class="urun__ekle-btn">Satin AL</button>
  </div>
</div>`;

  return urunElement;
}
function alinaBilecekRender() {
  //Butun urunlerin secimi
  const urunler = document.querySelectorAll(".urun");
  //Urunlerin alinabilecek sayilarini tekrardan renderlama
  urunler.forEach((urun) => {
    let urunFiyat = urun.querySelector(".JSurunFiyat").textContent;
    urunFiyat = Number(urunFiyat);
    urun.querySelector(".JSurunAlinabilecek").textContent = Math.floor(
      maxPara / urunFiyat
    );
  });
}

function urunleriEkle() {
  //Alinan urun listesiyle urun olustur.
  let urunlerHTML = "";
  const urunContainer = document.getElementById("urunlerList");
  urunlerHTML = productList.reduce((htmlDoc, product) => {
    return htmlDoc + urunOlustur(product);
  }, "");
  urunContainer.innerHTML = urunlerHTML;
}

function satinAlmaKontrol(urunFiyat, btnElement) {
  //Urunu satin alabilecek para olup olmadiginin kontrolu.
  if (maxPara - urunFiyat >= 0) {
    return true;
  } else {
    //Para olmamasi durumunda butonun degistirilmesi.
    btnElement.disabled = true;
    btnElement.textContent = "Bu para benim mazotuma yetmez";
    return false;
  }
}

function paraCikar(urunFiyat) {
  //Para cikar tekrar headerda renderla
  maxPara -= urunFiyat;
  headerParaRender();
}

function satinAlmaEkle(tiklananUrun) {
  //Tiklanan urunun alinan sayisini secme
  let alinmaElement = tiklananUrun.querySelector(".JSurunAlindi");
  let alinmaCount = 0;
  //Alinma sayisini arttirip tekrar alinma ogesine yazma.
  alinmaCount = alinmaElement.textContent;
  alinmaCount++;
  alinmaElement.textContent = alinmaCount;
}

function urunSatinAl() {
  //Tiklanan butonun parent elementini kullanarak fiyat bilgisini alma.
  const btnContainerElement = this.parentNode;
  let urunFiyati =
    btnContainerElement.querySelector(".JSurunFiyat").textContent;

  //Urun fiyatinin kontrolu ve toplam paradan cikarma:
  urunFiyati = Number(urunFiyati);
  if (satinAlmaKontrol(urunFiyati, this)) {
    paraCikar(urunFiyati);
    satinAlmaEkle(btnContainerElement);
    alinaBilecekRender();
  }
}

function buttonEventEkle() {
  //Butun butonlara click eventi ekleme
  document
    .querySelectorAll(".urun__ekle-btn")
    .forEach((btn) => btn.addEventListener("click", urunSatinAl));
}

//Loadda calistir
headerParaRender();
urunleriEkle();
buttonEventEkle();
alinaBilecekRender();
