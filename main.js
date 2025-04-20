console.log("Sudah siap");

const base_api = "https://api.genderize.io";

function tunjukinHasil(name, gender, probability) {
  const prediksi = document.getElementById("prediksi");
  const persen = probability * 100;
  let genderBaru;
  if (gender == "male") {
    genderBaru = "cowo";
  } else {
    genderBaru = "cewe";
  }

  let text;
  if (name.toLowerCase() === "daffa") {
    text = `Hai Daffa, karena kamu selaku pembuat program ini, terimakasih yaa, btw jenis kelamin kamu kemungkinan adalah ${genderBaru} sebesar ${persen.toFixed(
      2
    )}%, selamat yaa daff.. `;
  } else if (name.toLowerCase() === "trisna") {
    text = `Hai sayang hehe, jenis kelamin kamu kemungkinan adalah ${genderBaru} dengan persentase ${persen.toFixed(
      2
    )}%, selamat yaa 😍 `;
  } else if (name.toLowerCase() === "risya") {
    text = `duh jadi kangen kan risya, makasi ya, btw jenis kelamin kamu kemungkinan adalah ${genderBaru} dengan persentase ${persen.toFixed(
      2
    )}%`;
  } else if (name.toLowerCase() === "zella") {
    text = `Hai sayang ini pesan khusus yg akan muncul ketika diketik dengan nama yg kamu masukkan, btw jenis kelamin kamu kemungkinan adalah ${genderBaru} dengan persentase ${persen.toFixed(
      2
    )}%, selamat yaa 😍 `;
  } else if (name.toLowerCase() === "zellaovi") {
    text = `sayang tolong jangan ketik nama tersebut, ketik saja nama "zella"`;
  } else {
    text = `Hai ${name}, jenis kelamin kamu kemungkinan adalah ${genderBaru} dengan persentase ${persen.toFixed(
      2
    )}% berdasarkan data gender dengan nama yg sama di indonesia 😲`;
  }
  prediksi.textContent = text;
}

async function prediksi(event) {
  if (event.key == "Enter") {
    const namaDepan = event.target.value;
    const linkQuery = `${base_api}/?name=${namaDepan}&country_id=ID`;

    const respons = await fetch(linkQuery);
    const hasil = await respons.json();
    tunjukinHasil(hasil.name, hasil.gender, hasil.probability);

    fetch("simpan_data.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "nama=" + encodeURIComponent(event.target.value),
    })
      .then((res) => res.text())
      .then(console.log); // Tambahkan ini untuk lihat respon dari PHP
  }
}

const input = document.getElementById("input");

input.addEventListener("input", function () {
  const prediksi = document.getElementById("prediksi");
  if (this.value.trim() === "") {
    prediksi.textContent = "";
  }
});

const navbarMenu = document.querySelector(".navbar-tengah");
document.querySelector("#hamburger-menu").onclick = () => {
  navbarMenu.classList.toggle("active");
};

const hamburgerTutup = document.querySelector("#hamburger-menu");

document.addEventListener("click", function (event) {
  if (
    !hamburgerTutup.contains(event.target) &&
    !navbarMenu.contains(event.target)
  ) {
    navbarMenu.classList.remove("active");
  }
});

function demo() {
  document.getElementById("coba").innerHTML =
    "Silahkan ketik nama kamu dan enter, maka akan muncul prediksi nya 😇";
}

function pemberitahuan() {
  document.getElementById("alert").addEventListener("click", function () {
    alert(
      "Saya Daffa selaku creator mengucapkan terimakasih sudah berkunjung, jangan lupa klik icon i sebelum melakukan prediksi agar kamu paham!!"
    );
  });
}

window.onload = function () {
  pemberitahuan();
};
