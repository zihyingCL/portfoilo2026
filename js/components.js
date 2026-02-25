
// 載入共用元件
async function loadComponent(id, file) {
    const response = await fetch(file);
    const html = await response.text();
    document.getElementById(id).innerHTML = html;
}
loadComponent('navbar-placeholder', 'navbar.html');
loadComponent('footer-placeholder', 'footer.html');

function setActiveNav() {
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.navbar .nav-links a').forEach(link => {
        const linkHref = link.getAttribute('href').split('/').pop();
        if (linkHref === currentPath) {
            link.classList.add('active-link');
        } else {
            link.classList.remove('active-link');
        }
    });
}

// 在 loadComponent 完成後呼叫
Promise.all([
    loadComponent('navbar-placeholder', 'navbar.html'),
    loadComponent('footer-placeholder', 'footer.html')
]).then(() => {
    setActiveNav();
});