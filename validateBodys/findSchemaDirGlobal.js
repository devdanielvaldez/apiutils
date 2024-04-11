const fs = require('fs');
const path = require('path');

function findSchemasDir(rootDir) {
    // Función recursiva para buscar la carpeta 'schemas-validators'
    function search(directory) {
        const files = fs.readdirSync(directory);

        // Verifica si la carpeta 'schemas-validators' existe en el directorio actual
        if (files.includes('schemas-validators')) {
            return path.join(directory, 'schemas-validators');
        }

        // Si no se encuentra, busca recursivamente en los subdirectorios
        for (const file of files) {
            const filePath = path.join(directory, file);
            const stat = fs.statSync(filePath);

            if (stat.isDirectory()) {
                const foundDir = search(filePath);
                if (foundDir) {
                    return foundDir;
                }
            }
        }

        // Devuelve null si no se encontró la carpeta 'schemas-validators' en ningún lugar
        return null;
    }

    // Inicia la búsqueda desde la raíz del proyecto
    return search(rootDir);
}

module.exports = findSchemasDir;
