# Script para alternar entre .env de Docker y desarrollo local
# Uso: Ejecuta en PowerShell desde la carpeta backend

param(
    [string]$mode = "local"  # "local" o "docker"
)

if ($mode -eq "local") {
    Copy-Item -Path .env.local -Destination .env -Force
    Write-Host "Entorno cambiado a DESARROLLO LOCAL (.env apunta a localhost)"
} elseif ($mode -eq "docker") {
    Copy-Item -Path .env.docker -Destination .env -Force
    Write-Host "Entorno cambiado a DOCKER (.env apunta a db)"
} else {
    Write-Host "Modo no reconocido. Usa 'local' o 'docker'."
}
