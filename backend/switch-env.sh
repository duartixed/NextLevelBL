#!/bin/bash
# Script para alternar entre .env de Docker y desarrollo local
# Uso: ./switch-env.sh local   ó   ./switch-env.sh docker

MODE=${1:-local}

if [ "$MODE" = "local" ]; then
  cp .env.local .env
  echo "Entorno cambiado a DESARROLLO LOCAL (.env apunta a localhost)"
elif [ "$MODE" = "docker" ]; then
  cp .env.docker .env
  echo "Entorno cambiado a DOCKER (.env apunta a db)"
else
  echo "Modo no reconocido. Usa 'local' o 'docker'."
fi
