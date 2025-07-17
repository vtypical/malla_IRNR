
const ramos = document.querySelectorAll('.ramo');

    ramos.forEach(ramo => {
      ramo.addEventListener('click', () => {
        if (!ramo.classList.contains('aprobado')) {
          ramo.classList.add('aprobado');
          liberarRamos(ramo.dataset.id);
        } else {
          ramo.classList.remove('aprobado');
          bloquearRamosDependientes(ramo.dataset.id);
        }
      });
    });

    function liberarRamos(idAprobado) {
      ramos.forEach(ramo => {
        const prereq = ramo.dataset.prerq.split(',').map(p => p.trim()).filter(Boolean);
        if (prereq.includes(idAprobado)) {
          const todosCumplidos = prereq.every(p => {
            const req = Array.from(ramos).find(r => r.dataset.id === p);
            return req && req.classList.contains('aprobado');
          });
          if (todosCumplidos) {
            ramo.classList.remove('oculto');
          }
        }
      });
    }

    function bloquearRamosDependientes(idDesmarcado) {
      ramos.forEach(ramo => {
        const prereq = ramo.dataset.prerq.split(',').map(p => p.trim()).filter(Boolean);
        if (prereq.includes(idDesmarcado)) {
          ramo.classList.add('oculto');
          ramo.classList.remove('aprobado');
          bloquearRamosDependientes(ramo.dataset.id);
        }
      });
    }
  </script>
</body>
</html>
