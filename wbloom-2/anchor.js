// 找到<a>標籤
document.addEventListener('DOMContentLoaded', () => {
    const linksWithHash = document.querySelectorAll('a[href^="#"]');

    linksWithHash.forEach(link => { //先在迴圈外面界定迴圈內的主詞，中括號一定是迴圈內
        link.addEventListener('click', function (event) { //一定要把主詞帶入迴圈裡面
            event.preventDefault();//關閉原先auto跳動事件

            const targetId = this.getAttribute('href').substring(1);//抓取href的值的第二個字元
            const targetElement = document.getElementById(targetId);//用抓到的字元去dom使用該字元為id的元素

            if (targetElement) {//該元素掛上滑動功能
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});