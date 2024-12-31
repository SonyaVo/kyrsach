const nav = document.querySelector('#nav');
const nav_btn = document.querySelector('#nav-btn');
const nav_btn_img = document.querySelector('#nav-btn-img');

nav_btn.onclick = () => {
    if (nav.classList.toggle('open')) {
        nav_btn_img.src = "../styles/images/close.svg"

    }
    else {
        nav_btn_img.src = "../styles/images/btn.svg"
    }
}