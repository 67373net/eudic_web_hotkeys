// ==UserScript==
// @name        欧路词典iPhone视图优化及按键触发
// @namespace   67373net
// @description 欧路词典自用脚本
// @version     0.8
// @author      67373net
// @match       https://dict.eudic.net/areas/recite/*
// @license     MIT
// ==/UserScript==

// 原生按键：
// ⭠ 不认识
// ⭢ 认识
// ⭡ 已掌握（部分生效）
// ⭣ 模糊（部分生效）
// abcd 选项
// enter 下一题

const style = document.createElement('style');
style.type = 'text/css';

style.innerHTML = `
    .nz-resizable.explain-container.ng-star-inserted {
        animation: none !important;
        transition: none !important;
        opacity: 1 !important;
        visibility: visible !important;
        display: none !important;
    }
    /* 如果有限制时间的父容器，也可以添加相应规则 */
    .nz-resizable.explain-container.ng-star-inserted * {
        animation: none !important;
        transition: none !important;
    }
`;

function clickButton(str) {
  document.querySelectorAll('button').forEach(button => {
    if (button.textContent.trim() === str) button.click();
  });
}

function liju() {
  const ele = document.querySelector('.liju-trans');
  ele.click();
  ele.classList.remove('liju-trans-blur')
}

//【添加按键】

const keyFuncs = {
  G: () => {
    document.querySelector('[nztype="rollback"]').click(); // 撤销
  },
  H: () => {
    document.querySelectorAll('.phon-inner')[0].click(); // 英音
  },
  I: () => {
    document.querySelectorAll('.phon-inner')[1].click(); // 美音
  },
  J: () => {
    liju(); // 查看例句中文及读音
  },
  K: () => {
    document.querySelector('.prev-button').click(); // 上一个例句
    liju();
  },
  L: () => {
    document.querySelector('.next-button').click(); // 下一个例句
    liju();
  },
  M: () => {
    clickButton('已掌握'); // 已掌握
  },
  N: () => {
    clickButton('模糊'); // 模糊
  },
}

setTimeout(() => {
  document.querySelector('.card-container.full').style.marginLeft = 0;
  document.querySelector('.card-container.full').style.marginRight = 0;
  document.head.appendChild(style);
  document.addEventListener('keydown', event => {
    const func = keyFuncs[event.key];
    func && func();
  });
}, 1288)
