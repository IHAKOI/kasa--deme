const siparisler = {
  1: [],
  2: [],
  3: [],
  4: [],
  5: [],
  6: [],
  7: [],
  8: []
};
let currentMasa = null;

// Menüyü göster
function showMenu(masaNo, button) {
  currentMasa = masaNo;
  document.getElementById('menu').style.display = 'block';

  // Diğer masaları gizle
  const masalar = document.querySelectorAll('.masa');
  masalar.forEach(masa => {
      masa.classList.add('disabled');
  });
  button.closest('.masa').classList.remove('disabled'); // Aktif masayı engelleme

  checkRemoveButtons();
}

// Menüyü kapat
function closeMenu() {
  document.getElementById('menu').style.display = 'none';

  // Tüm masaları tekrar göster
  const masalar = document.querySelectorAll('.masa');
  masalar.forEach(masa => {
      masa.classList.remove('disabled');
  });
}

// Sipariş ekleme
function addOrder(urun, fiyat) {
  siparisler[currentMasa].push({ urun, fiyat });
  renderSiparisler();
  checkRemoveButtons();
}

// Sipariş çıkarma
function removeOrder(urun, fiyat) {
  const masaSiparisleri = siparisler[currentMasa];
  const urunIndex = masaSiparisleri.findIndex(siparis => siparis.urun === urun && siparis.fiyat === fiyat);

  if (urunIndex !== -1) {
    masaSiparisleri.splice(urunIndex, 1);
    renderSiparisler();
    checkRemoveButtons();
  }
}

// "- " butonlarını kontrol et, ürün eklenmemişse gözükmesin
function checkRemoveButtons() {
  const masaSiparisleri = siparisler[currentMasa];

  document.getElementById('remove-burger').style.display = masaSiparisleri.some(siparis => siparis.urun === 'Burger') ? 'inline-block' : 'none';
  document.getElementById('remove-patates').style.display = masaSiparisleri.some(siparis => siparis.urun === 'Patates') ? 'inline-block' : 'none';
  document.getElementById('remove-kola').style.display = masaSiparisleri.some(siparis => siparis.urun === 'Kola') ? 'inline-block' : 'none';
}

// Siparişleri ekranda göster ve toplamı güncelle
function renderSiparisler() {
  Object.keys(siparisler).forEach(masaNo => {
      const masaSiparisler = siparisler[masaNo];
      const siparisListesi = document.getElementById(`siparisler-${masaNo}`);
      const odemeButton = document.getElementById(`odeme-button-${masaNo}`);
      
      siparisListesi.innerHTML = ''; // Önceki siparişleri temizle

      let toplam = 0;
      masaSiparisler.forEach(siparis => {
          const siparisElemani = document.createElement('div');
          siparisElemani.textContent = `${siparis.urun} - ${siparis.fiyat} TL`;
          siparisListesi.appendChild(siparisElemani);
          toplam += siparis.fiyat;
      });

      // Toplam tutarı göster
      const toplamElemani = document.createElement('div');
      toplamElemani.textContent = `TOPLAM: ${toplam} TL`;
      siparisListesi.appendChild(toplamElemani);

      // Sipariş varsa "Sipariş Ödendi" butonunu göster
      if (masaSiparisler.length > 0) {
          odemeButton.style.display = 'block';
      } else {
          odemeButton.style.display = 'none';
      }
  });
}

// Sipariş tamamlandığında sıfırla
function completeOrder(masaNo) {
  siparisler[masaNo] = []; // Siparişleri sıfırla
  renderSiparisler(); // Ekranı güncelle
  alert(`Masa ${masaNo} sipariş ödendi ve sıfırlandı.`);
}

