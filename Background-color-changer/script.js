function bgChanger(color){
    document.querySelector('body').style.backgroundColor = color;
}

function custom(){
    const color = document.getElementById('custom').value;
    bgChanger(color);
}