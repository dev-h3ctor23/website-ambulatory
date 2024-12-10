document.addEventListener('DOMContentLoaded', function() {
    const consultaId = new URLSearchParams(window.location.search).get('id');

    // Obtener la información de la consulta
    fetch(`server/datos-consulta.php?id=${consultaId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la respuesta del servidor');
            }
            return response.json();
        })
        .then(data => {
            if (data.error) {
                console.error(data.error);
                alert('Error: ' + data.error);
            } else {
                document.getElementById('nombre-medico').textContent = data.nombre_medico;
                document.getElementById('nombre-paciente').textContent = data.nombre_paciente;
                document.getElementById('fecha-consulta').textContent = data.fecha;
                document.getElementById('sintomatologia').value = data.sintomas;
                document.getElementById('diagnostico').value = data.diagnostico;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        });

    // Actualizar la consulta
    document.getElementById('actualizar-consulta').addEventListener('click', function() {
        const diagnostico = document.getElementById('diagnostico').value;

        fetch('server/actualizar-consulta.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: `id=${consultaId}&diagnostico=${encodeURIComponent(diagnostico)}`
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                console.error(data.error);
                alert('Error: ' + data.error);
            } else {
                alert('Consulta actualizada correctamente');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error: ' + error.message);
        });
    });
});