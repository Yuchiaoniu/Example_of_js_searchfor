window.onload = function () {
    let anchors = ["#a", "#b", "#c", "#d", "#e"]; // 假設這是您要添加的錨點
    let elements = document.querySelectorAll('.bottomAnchor');

    elements.forEach(function (element, index) {
        let newElement = document.createElement('a');
        newElement.className = 'bottomAnchor';
        newElement.href = anchors[index];
        newElement.innerHTML = element.innerHTML;
        element.parentNode.replaceChild(newElement, element);
    });

    const linksWithHash = document.querySelectorAll('a[href^="#"]');

    linksWithHash.forEach(link => {
        link.addEventListener('click', function (event) {
            event.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
};
