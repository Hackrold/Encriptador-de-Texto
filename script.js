document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('botonEncriptar').addEventListener('click', encryptText);
    document.getElementById('botonDesencriptar').addEventListener('click', decryptText);
    document.getElementById('botonCopiar').addEventListener('click', copyText);
});

function encryptText() {
    const inputText = document.getElementById('ingresaTextoTextarea').value.trim();
    
    if (inputText === '') {
        resetForm();
        return;
    }
    
    if (/^[a-z\s]*$/.test(inputText)) {
        const encryptedText = btoa(inputText);
        showOutput(encryptedText);
        document.getElementById('botonCopiar').style.display = 'block';
    } else {
        console.error('Error: Input contains invalid characters.');
    }
}

function decryptText() {
    const outputText = document.getElementById('mensajeSeccionSalida').textContent.trim();
    
    if (outputText === '') {
        resetForm();
        return;
    }
    
    try {
        const decryptedText = atob(outputText);
        showOutput(decryptedText, true);
        document.getElementById('botonCopiar').style.display = 'none';
    } catch (e) {
        console.error('Error: Invalid encrypted text.');
        resetForm();
    }
}

function copyText() {
    const outputText = document.getElementById('mensajeSeccionSalida').textContent.trim();
    
    if (outputText === '') {
        return;
    }
    
    navigator.clipboard.writeText(outputText)
        .then(() => console.log('Texto copiado'))
        .catch(err => console.error('Error al copiar el texto: ', err));
}

function showOutput(text, isDecrypted = false) {
    const outputText = document.getElementById('mensajeSeccionSalida');
    const defaultMessage = document.getElementById('mensajeDefault');
    const imgMuñeco = document.getElementById('imgMuñeco');
    
    outputText.textContent = text;
    outputText.style.display = 'block';
    defaultMessage.style.display = 'none';
    imgMuñeco.style.display = 'none';
    
    if (isDecrypted) {
        document.getElementById('ingresaTextoTextarea').value = '';
    }
}

function resetForm() {
    document.getElementById('ingresaTextoTextarea').value = '';
    document.getElementById('mensajeSeccionSalida').textContent = '';
    document.getElementById('botonCopiar').style.display = 'none';
    document.getElementById('mensajeDefault').style.display = 'block';
    document.getElementById('imgMuñeco').style.display = 'block';
}

