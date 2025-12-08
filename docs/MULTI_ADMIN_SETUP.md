# 🔐 Setup Multi-Admin con Firestore Collection

## Paso 1: Crear Colección de Admins en Firebase Console

### Instrucciones:

1. **Abre Firebase Console:** https://console.firebase.google.com/
2. **Selecciona tu proyecto**
3. **Ve a Firestore Database**
4. **Click en "Iniciar colección"** (o "Start collection")
5. **ID de colección:** `admins`
6. **Click en "Siguiente"**

### Agregar Primer Admin:

**ID del documento:** `zgabros@gmail.com`

**Campos:**
```
active: true (boolean)
name: "Gabriel" (string)
addedAt: [timestamp actual] (timestamp)
```

Click en "Guardar"

### Agregar Segundo Admin:

**Click en "Agregar documento"**

**ID del documento:** `ptraberzo@gmail.com`

**Campos:**
```
active: true (boolean)
name: "Pablo Traberzo" (string)
addedAt: [timestamp actual] (timestamp)
```

Click en "Guardar"

---

## Paso 2: Actualizar Firestore Security Rules

### Reglas Actualizadas:

```javascript
rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    
    // ========================================
    // HELPER FUNCTIONS
    // ========================================
    
    /**
     * Verifica que el usuario sea admin
     * Busca en la colección 'admins' si el email existe y está activo
     */
    function isAdmin() {
      return request.auth != null && 
             request.auth.token.email_verified == true &&
             exists(/databases/$(database)/documents/admins/$(request.auth.token.email)) &&
             get(/databases/$(database)/documents/admins/$(request.auth.token.email)).data.active == true;
    }
    
    /**
     * Valida que los datos requeridos existan
     */
    function hasRequiredFields(fields) {
      return request.resource.data.keys().hasAll(fields);
    }
    
    /**
     * Valida el tamaño de un string
     */
    function isValidStringSize(field, minSize, maxSize) {
      return request.resource.data[field] is string &&
             request.resource.data[field].size() >= minSize &&
             request.resource.data[field].size() <= maxSize;
    }
    
    // ========================================
    // ADMINS COLLECTION
    // ========================================
    
    match /admins/{adminEmail} {
      // Solo admins pueden leer la lista de admins
      allow read: if isAdmin();
      // Solo admins pueden agregar/modificar/eliminar admins
      allow write: if isAdmin();
    }
    
    // ========================================
    // NEWS COLLECTION
    // ========================================
    
    match /news/{newsId} {
      // Lectura pública
      allow read: if true;
      
      // Validación de datos para news
      function isValidNews() {
        let data = request.resource.data;
        
        return hasRequiredFields(['title', 'content', 'date']) &&
               isValidStringSize('title', 1, 200) &&
               isValidStringSize('content', 1, 50000) &&
               data.date is string &&
               (!('mediaType' in data) || data.mediaType in ['image', 'youtube']) &&
               (!('image' in data) || (data.image is string && data.image.size() <= 500)) &&
               (!('youtubeUrl' in data) || (data.youtubeUrl is string && data.youtubeUrl.size() <= 200));
      }
      
      allow create: if isAdmin() && isValidNews();
      allow update: if isAdmin() && isValidNews();
      allow delete: if isAdmin();
    }
    
    // ========================================
    // COURSES COLLECTION
    // ========================================
    
    match /courses/{courseId} {
      // Lectura pública
      allow read: if true;
      
      // Validación de datos para courses
      function isValidCourse() {
        let data = request.resource.data;
        
        return hasRequiredFields(['title', 'description', 'price', 'level']) &&
               isValidStringSize('title', 1, 200) &&
               isValidStringSize('description', 1, 2000) &&
               isValidStringSize('price', 1, 20) &&
               data.level in ['Principiante', 'Intermedio', 'Avanzado'] &&
               (!('duration' in data) || (data.duration is string && data.duration.size() <= 50)) &&
               (!('lessons' in data) || (data.lessons is string && data.lessons.size() <= 50)) &&
               (!('image' in data) || (data.image is string && data.image.size() <= 500)) &&
               (!('gumroadUrl' in data) || (data.gumroadUrl is string && data.gumroadUrl.size() <= 200));
      }
      
      allow create: if isAdmin() && isValidCourse();
      allow update: if isAdmin() && isValidCourse();
      allow delete: if isAdmin();
    }
    
    // ========================================
    // HERO COLLECTION
    // ========================================
    
    match /hero/{heroId} {
      // Lectura pública
      allow read: if true;
      
      // Validación de datos para hero
      function isValidHero() {
        let data = request.resource.data;
        
        return hasRequiredFields(['title', 'subtitle']) &&
               isValidStringSize('title', 1, 100) &&
               isValidStringSize('subtitle', 1, 200) &&
               (!('backgroundImage' in data) || (data.backgroundImage is string && data.backgroundImage.size() <= 500));
      }
      
      allow write: if isAdmin() && isValidHero();
    }
  }
}
```

### Cambios Principales:

1. **Función `isAdmin()` actualizada:**
   ```javascript
   function isAdmin() {
     return request.auth != null && 
            request.auth.token.email_verified == true &&
            exists(/databases/$(database)/documents/admins/$(request.auth.token.email)) &&
            get(/databases/$(database)/documents/admins/$(request.auth.token.email)).data.active == true;
   }
   ```

2. **Nueva sección para colección `admins`:**
   ```javascript
   match /admins/{adminEmail} {
     allow read: if isAdmin();
     allow write: if isAdmin();
   }
   ```

---

## Paso 3: Publicar las Reglas

1. En Firebase Console → Firestore Database → Reglas
2. Reemplaza las reglas actuales con las nuevas
3. Click en "Publicar"

---

## Paso 4: Verificar

### Test 1: Login con zgabros@gmail.com
1. Ve a tu app en producción
2. Haz login con `zgabros@gmail.com`
3. Deberías poder acceder al admin panel
4. Deberías poder crear/editar/eliminar cursos y noticias

### Test 2: Login con ptraberzo@gmail.com
1. Cierra sesión
2. Haz login con `ptraberzo@gmail.com`
3. Deberías poder acceder al admin panel
4. Deberías poder crear/editar/eliminar cursos y noticias

### Test 3: Login con otro email
1. Intenta con un email que NO esté en la colección admins
2. NO deberías poder acceder al admin panel
3. Deberías ser redirigido o ver un error

---

## Gestión de Admins

### Agregar un Nuevo Admin:

1. Firebase Console → Firestore Database
2. Colección `admins`
3. Click en "Agregar documento"
4. ID: `nuevo-email@gmail.com`
5. Campos:
   ```
   active: true
   name: "Nombre del Admin"
   addedAt: [timestamp]
   ```

### Desactivar un Admin (sin eliminarlo):

1. Firebase Console → Firestore Database
2. Colección `admins`
3. Click en el documento del admin
4. Cambiar `active: false`
5. Guardar

### Eliminar un Admin:

1. Firebase Console → Firestore Database
2. Colección `admins`
3. Click en el documento del admin
4. Click en "Eliminar documento"

---

## Ventajas de esta Solución

✅ **No expone emails** en las reglas (solo en Firestore, protegido)
✅ **Fácil agregar/remover admins** desde Firebase Console
✅ **No requiere código** ni scripts
✅ **Gratis** - sin costos adicionales
✅ **Auditable** - puedes ver quién es admin y cuándo se agregó
✅ **Desactivación temporal** - puedes desactivar sin eliminar

---

## Seguridad

### ¿Los emails están seguros?

**SÍ**, porque:
1. La colección `admins` solo es legible por admins
2. Los usuarios normales NO pueden ver quién es admin
3. Las reglas de Firestore protegen el acceso

### ¿Puedo ver los admins desde el código?

**NO**, porque:
- El frontend no tiene acceso a la colección `admins`
- Solo Firestore Rules pueden leerla durante la validación
- Los emails NO aparecen en ningún código público

---

## Troubleshooting

### "Permission denied" al intentar acceder al admin

**Posibles causas:**
1. El email no está en la colección `admins`
2. El campo `active` está en `false`
3. El email no está verificado
4. Las reglas no se publicaron correctamente

**Solución:**
1. Verifica que el email esté en Firestore → `admins`
2. Verifica que `active: true`
3. Verifica que el email esté verificado en Firebase Auth
4. Republica las reglas

### No puedo crear la colección `admins`

**Causa:** Probablemente las reglas antiguas están bloqueando

**Solución temporal:**
1. Cambia temporalmente las reglas a:
   ```javascript
   match /admins/{adminEmail} {
     allow write: if request.auth.token.email == 'zgabros@gmail.com';
   }
   ```
2. Crea la colección
3. Vuelve a las reglas finales

---

## Checklist de Implementación

- [ ] Crear colección `admins` en Firestore
- [ ] Agregar documento para `zgabros@gmail.com`
- [ ] Agregar documento para `ptraberzo@gmail.com`
- [ ] Actualizar Firestore Security Rules
- [ ] Publicar las reglas
- [ ] Probar login con zgabros@gmail.com
- [ ] Probar login con ptraberzo@gmail.com
- [ ] Verificar que otros emails NO tengan acceso
- [ ] Documentar el proceso

---

**Estado:** Listo para implementar ✅
