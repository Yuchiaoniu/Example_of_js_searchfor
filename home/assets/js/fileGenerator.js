import { user } from '../../main.js';
if (user !== null) {
    var email = user?.email;
    console.log(email);
    var loginElement = document.getElementById('login');
    loginElement.innerHTML += `
    <em style="width:80%;">br.searchfor.ovh/page/<strong style="color:blue;">seu título</strong>.html será o URL do seu produto</em><br>
    <input type="text" id="title1" placeholder="título" class="form-input"><br>
    <input type="text" id="title2" placeholder="Confirmar título" class="form-input"><br>
    <input type="text" id="describe" placeholder="Descrição(opção)" class="form-input"><br>
    <button id="submit" class="styled-button">Enviar</button><br>
`;
    // 將用戶的email設置到id為email的元素中
    var emailElement = document.getElementById('email');
    emailElement.textContent = user.email;
    var submitButton = document.getElementById('submit');
    submitButton.addEventListener('click', function () {
        var titleInput1 = document.getElementById('title1');
        var titleInput2 = document.getElementById('title2');
        var describeInput = document.getElementById('describe');

        var title = titleInput1.value;
        var titleConfirm = titleInput2.value;
        var describe = describeInput.value;
        if (!title || !titleConfirm) {
            alert('Title cannot be empty or undefined');
            return;
        }
        if (title !== titleConfirm) {
            alert('Titles do not match');
            return;
        }
        document.title = title;
        var brandNameElement = document.getElementById('brandName');
        if (brandNameElement) {
            brandNameElement.innerText = title;
        }
        var htmlContent = document.documentElement.outerHTML;
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "fileGenerator.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function () {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var fileName = title + '.html';
                    window.location.href = '../../../edit/' + fileName;
                } else {
                    alert('page title has create by other users');
                }
            }
        };
        xhr.send("email=" + encodeURIComponent(email) + "&title=" + encodeURIComponent(title) + "&describe=" + encodeURIComponent(describe) + "&htmlContent=" + encodeURIComponent(htmlContent));
    });
    window.onload = function () {
        window.scrollTo(0, 0);
        setTimeout(function () {
            var loginElement = document.getElementById('login');
            loginElement.scrollIntoView({ behavior: 'smooth' });
        }, 1000);  // 延遲100毫秒
    };
}
document.getElementById('Trial').style.display = 'flex';
document.getElementById('generateButton').style.display = 'none';
