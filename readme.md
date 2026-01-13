📋 Task Manager App

Descripción:
Aplicación de gestión de tareas , Permite crear, asignar, descartar, completar y editar tareas. Cada tarea tiene nombre, descripción y categoría. Incluye buscador, filtros, ordenamiento y notificaciones.

⚡ Funcionalidades
	•	Crear tareas con título, descripción y categoría.
	•	Editar tareas existentes.
	•	Completar, descartar o eliminar tareas.
	•	Buscar tareas por texto.
	•	Filtrar tareas por categoría.
	•	Ordenar tareas por nombre (ascendente/descendente).
	•	Notificaciones internas (pendientes, completadas).
	•	Animaciones suaves y UI estilo Apple.

    🏗️ Requisitos del proyecto
	•	Node.js ≥ 18
	•	npm ≥ 9
	•	Ionic CLI ≥ 7
	•	Capacitor ≥ 5
	•	Android Studio / Xcode para generar APK / IPA

     Iniciar proyecto
        git clone <REPO_URL>
        cd <PROJECT_FOLDER>

    Instalar dependencias
        npm install

    correr aplicación en desarrollo
        ionic serve

    Comandos importantes
        Construir aplicación web
            npm run build
            ionic build

    Añadir plataforma (Android / iOS)
        npx cap add android
        npx cap add ios

    Sincronizar cambios con plataformas
        npx cap sync

    Abrir proyecto en IDE
        npx cap open android   # Android Studio
        npx cap open ios       # Xcode