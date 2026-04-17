(function() {
  let observer;

  function initAnimateObserver() {
    if (observer) observer.disconnect();

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('appear');
          observer.unobserve(entry.target); // 只觸發一次
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.animate').forEach(el => observer.observe(el));
  }

  initAnimateObserver();

  // 提供重新整理方法（統一命名）
  window.refreshAnimations = initAnimateObserver;

  // 平滑滾動
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();

async function loadWorks(filterConfig = {}) {
  try {
    // 修正路徑：假設 data 在根目錄
    const response = await fetch('data/works.json');
    const works = await response.json();
    
    let filteredWorks = works;
    if (filterConfig.category) {
      filteredWorks = works.filter(item => item.category === filterConfig.category);
    }
    if (filterConfig.onlyFeatured) {
      filteredWorks = filteredWorks.filter(item => item.isFeatured === true);
    }
    
    // 這裡使用 b - a 是為了「由新到舊」排序（降冪）
    filteredWorks.sort((a, b) => {
      // return new Date(b.date) - new Date(a.date);
      return b.date.localeCompare(a.date);
    });

    renderWorks(filteredWorks, filterConfig.targetId);
  } catch (error) {
    console.error("資料載入失敗:", error);
  }
}

function getRandomAnimation() {
  const animations = ['fade-up', 'fade-down', 'fade-left', 'fade-right', 'zoom-in', 'zoom-out', 'flip-in-x', 'flip-in-y'];
  return animations[Math.floor(Math.random() * animations.length)];
}

function renderWorks(data, targetId) {
  const container = document.getElementById(targetId);
  if (!container) return;

  container.innerHTML = data.map((work, index) => {
    const coverStyle = work.cover 
      ? `style="background-image: url('${work.cover}')"` 
      : `style="background: linear-gradient(45deg, #eee, #ddd)"`;

    const animClass = getRandomAnimation();

    return `
    <div class="portfolio-item work-card animate fade-up delay-${(index % 5) + 1}">
      <a href="work-detail.html?id=${work.id}" class="card-img-link">
        <div class="card-img" ${coverStyle}></div>
      </a>
      <div class="card-content">
        <div class="work-type">
          <span><i class="far fa-calendar"></i> ${work.date}</span>
        </div>
        <h3 class="card-title">
          <a href="work-detail.html?id=${work.id}">${work.title}</a>
        </h3>
        <p class="card-desc">${work.intro || work.desc || ''}</p>
        
        <div class="blog-links">
          ${work.links ? work.links.map(link => `
            <a href="${link.url}" class="btn-link" target="_blank">
              <i class="${link.icon}"></i> ${link.label}
            </a>
          `).join('') : ''}
          <a href="work-detail.html?id=${work.id}" class="btn-link">
            <i class="fas fa-info-circle"></i> 專案詳情
          </a>
        </div>
      </div>
    </div>
    `;
  }).join('');

  // 重要：重新觸發動畫觀察
  if (window.refreshAnimations) window.refreshAnimations();
}

(function() {
  // ----- 頁面切換過渡 -----
  const overlay = document.getElementById('page-transition-overlay');
  if (!overlay) return;

  // 檢查是否從其他頁面切換過來（sessionStorage 標記）
  if (sessionStorage.getItem('pageTransition') === 'true') {
    // 新頁面載入：顯示覆蓋層，然後淡出
    overlay.classList.add('active');
    setTimeout(() => {
      overlay.classList.remove('active');
      sessionStorage.removeItem('pageTransition');
    }, 50); // 微小的延遲確保 DOM 更新
  }

  // 監聽所有內部連結點擊
  document.addEventListener('click', function(e) {
    const link = e.target.closest('a');
    if (!link) return;

    const href = link.getAttribute('href');
    // 排除外部連結、錨點、mailto、tel 等
    if (!href || 
          href.startsWith('#') || 
          link.hasAttribute('data-baguettebox') || // 如果是燈箱連結，就跳過過渡邏輯
          href.startsWith('mailto:') || 
          href.startsWith('tel:') || 
          (href.startsWith('http') && !href.includes(window.location.hostname))) {
        return;
      }

    // 阻止默認跳轉
    e.preventDefault();

    // 如果已經在過渡中，忽略後續點擊
    if (overlay.classList.contains('active')) return;

    // 啟動過渡：顯示覆蓋層
    overlay.classList.add('active');
    sessionStorage.setItem('pageTransition', 'true');

    // 等待動畫完成後跳轉（時間需與 CSS transition 一致）
    setTimeout(() => {
      window.location.href = href;
    }, 400); // 0.4s
  });
})();


// ===== 自訂游標跟隨 + 互動反饋 =====
// (function() {
//     // 建立游標元素（若不存在才建立）
//     if (!document.querySelector('.custom-cursor')) {
//         const cursor = document.createElement('div');
//         cursor.className = 'custom-cursor';
//         document.body.appendChild(cursor);
//     }
//     const cursor = document.querySelector('.custom-cursor');
    
//     let mouseX = 0, mouseY = 0;
//     let cursorX = 0, cursorY = 0;
    
//     // 更新滑鼠座標
//     document.addEventListener('mousemove', (e) => {
//         mouseX = e.clientX;
//         mouseY = e.clientY;
//     });
    
//     // 動畫循環 - 使用較低的緩動係數 (0.08) 讓游標更穩定
//     function animateCursor() {
//         cursorX += (mouseX - cursorX) * 0.1;
//         cursorY += (mouseY - cursorY) * 0.1;
//         cursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
//         requestAnimationFrame(animateCursor);
//     }
//     animateCursor();
    
//     // 為所有可點擊元素添加懸停效果 (使用事件委託 + 動態監聽)
//     function addHoverListeners() {
//         const hoverElements = document.querySelectorAll('a, button, .stat-item, .filter-tab, .btn-link, .btn-outline, .work-card, .hero-stats .stat-item');
//         hoverElements.forEach(el => {
//             // 避免重複綁定
//             if (el.hasAttribute('data-cursor-listener')) return;
//             el.setAttribute('data-cursor-listener', 'true');
//             el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
//             el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
//         });
//     }
    
//     // 初始綁定
//     addHoverListeners();
    
//     // 監聽 DOM 變化，自動綁定新加入的可互動元素（適用於動態加載內容）
//     const observer = new MutationObserver(() => {
//         addHoverListeners();
//     });
//     observer.observe(document.body, { childList: true, subtree: true });
    
//     // 當滑鼠離開視窗時隱藏游標（可選）
//     document.addEventListener('mouseleave', () => {
//         cursor.style.opacity = '0';
//     });
//     document.addEventListener('mouseenter', () => {
//         cursor.style.opacity = '1';
//     });
// })();