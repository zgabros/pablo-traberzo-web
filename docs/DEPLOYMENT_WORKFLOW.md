# 🚀 Deployment Workflow - Pablo Traberzo Web

## ⚠️ Estado Actual: Deployment Manual Requerido

**El deployment automático de Vercel desde GitHub NO está funcionando actualmente.**

Por lo tanto, debes hacer deployment manual usando Vercel CLI.

---

## ✅ Procedimiento de Deployment Actual

### Pasos Completos:

1. **Hacer cambios localmente**
   ```bash
   # Editar archivos...
   npm run dev  # Probar localmente
   ```

2. **Commit a Git**
   ```bash
   git add .
   git commit -m "descripción de cambios"
   ```

3. **Push a GitHub**
   ```bash
   git push origin main
   ```

4. **Deployment Manual a Vercel** ⚠️ **NUEVO PASO REQUERIDO**
   ```bash
   vercel --prod
   ```
   
   - Espera ~18-30 segundos
   - Te dará la URL de producción
   - ¡Listo!

---

## 📋 Proceso Completo Paso a Paso

### 1. Desarrollo Local

```bash
# Iniciar servidor de desarrollo
npm run dev

# La app estará en http://localhost:5173
# Hacer cambios y probar
```

### 2. Verificar Cambios

```bash
# Ver qué archivos cambiaron
git status

# Ver diferencias
git diff
```

### 3. Commit

```bash
# Agregar todos los archivos
git add .

# O agregar archivos específicos
git add src/components/MiComponente.jsx

# Hacer commit con mensaje descriptivo
git commit -m "feat: agregar nueva funcionalidad X"
```

**Convenciones de mensajes de commit:**
- `feat:` - Nueva funcionalidad
- `fix:` - Corrección de bug
- `refactor:` - Refactorización de código
- `style:` - Cambios de estilo/CSS
- `docs:` - Documentación
- `chore:` - Tareas de mantenimiento

### 4. Push a GitHub

```bash
git push origin main
```

### 5. Deployment Manual a Vercel

```bash
vercel --prod
```

**Output esperado:**
```
Vercel CLI 49.1.2
✅  Production: https://pablo-traberzo-xxx.vercel.app [18s]
```

### 6. Verificar Deployment

1. Copia la URL que te dio Vercel
2. Ábrela en el navegador
3. Verifica que los cambios estén aplicados

---

## 🔧 Comandos de Vercel CLI

### Deployment a Producción
```bash
vercel --prod
```

### Preview Deployment (sin afectar producción)
```bash
vercel
```

### Ver Logs
```bash
vercel logs
```

### Ver Lista de Deployments
```bash
vercel ls
```

---

## 🧪 Testing Antes de Deploy

### Build Local

```bash
# Crear build de producción
npm run build

# Previsualizar build
npm run preview
```

Si el build falla localmente, **NO hagas deployment**. Arregla los errores primero.

---

## ⚠️ Troubleshooting

### Error: "The specified token is not valid"

**Solución:**
```bash
vercel login
# Sigue las instrucciones en el navegador
```

### Error: "rewrites/redirects/routes conflict"

**Causa:** `vercel.json` mal configurado

**Solución:** Ya está arreglado. El archivo usa `rewrites` ahora.

### Deployment falla con error de build

**Posibles causas:**
1. Error de sintaxis en el código
2. Dependencia faltante en `package.json`
3. Variable de entorno faltante

**Solución:**
1. Revisa el error en la terminal
2. Arréglalo localmente
3. Haz nuevo commit
4. Intenta deployment de nuevo

### Cambios no se reflejan en producción

**Posibles causas:**
1. Cache del navegador
2. Deployment aún en progreso

**Solución:**
1. Espera 1-2 minutos
2. Refresca con Ctrl+Shift+R (hard refresh)
3. Verifica que el deployment haya terminado

### Variables de entorno no funcionan

**Solución:**
1. Vercel Dashboard → Tu proyecto → Settings
2. Environment Variables
3. Verifica que todas las `VITE_*` estén presentes
4. Redeploy manualmente con `vercel --prod`

---

## 🔄 Arreglar Deployment Automático (Opcional)

Si quieres intentar arreglar el deployment automático:

### Paso 1: Verificar Conexión con GitHub

1. Ve a https://vercel.com/dashboard
2. Tu proyecto → Settings → Git
3. Verifica que esté conectado a `zgabros/pablo-traberzo-web`
4. Verifica que "Production Branch" sea `main`

### Paso 2: Reconectar si es necesario

1. Settings → Git → Disconnect
2. Reconnect con GitHub
3. Selecciona el repositorio correcto
4. Configura branch `main` como producción

### Paso 3: Probar

1. Haz un cambio pequeño
2. Commit y push
3. Espera 2-3 minutos
4. Verifica en Vercel Dashboard si inició el deployment

**Si no funciona:** Continúa usando `vercel --prod` manualmente.

---

## 📊 Monitoreo Post-Deployment

### Verificar que todo funciona:

1. **Homepage** - https://tu-url.vercel.app/
2. **Login** - Probar con ambos admins
3. **Admin Panel** - Crear/editar/eliminar contenido
4. **Catálogo de Cursos** - Verificar que se muestren
5. **Formulario de Contacto** - Enviar mensaje de prueba

### Logs en Tiempo Real

```bash
# Ver logs de Vercel
vercel logs

# O en Vercel Dashboard → Deployments → Click en deployment → Function Logs
```

---

## 🔐 Actualizar Firestore Rules

**IMPORTANTE:** Las reglas de Firestore NO se despliegan automáticamente.

**Proceso manual:**
1. Firebase Console → Firestore Database → Reglas
2. Editar reglas
3. Click en "Publicar"
4. Esperar 30-60 segundos para propagación

---

## 📝 Checklist de Deployment

Antes de cada deployment importante:

- [ ] Código probado localmente (`npm run dev`)
- [ ] Build exitoso (`npm run build`)
- [ ] Sin errores en consola del navegador
- [ ] Commit con mensaje descriptivo
- [ ] Push a GitHub
- [ ] **Ejecutar `vercel --prod`** ⚠️
- [ ] Verificar URL de producción
- [ ] Probar funcionalidades críticas
- [ ] Verificar que no haya errores en logs

---

## 🎯 Resumen Rápido

**Workflow actual (manual):**
```bash
# 1. Desarrollo
npm run dev

# 2. Git
git add .
git commit -m "descripción"
git push origin main

# 3. Deployment manual (REQUERIDO)
vercel --prod

# 4. Verificar en navegador
```

---

## 🔗 URLs Importantes

- **Producción:** https://pablo-traberzo-1oleq5r3d-zgabros-projects.vercel.app
- **Vercel Dashboard:** https://vercel.com/dashboard
- **GitHub Repo:** https://github.com/zgabros/pablo-traberzo-web
- **Firebase Console:** https://console.firebase.google.com/

---

## 💡 Tips

### Deployment Rápido
```bash
# Atajo para todo el proceso
git add . && git commit -m "update" && git push && vercel --prod
```

### Ver Última URL de Deployment
```bash
vercel ls
```

### Rollback a Deployment Anterior
1. Vercel Dashboard → Deployments
2. Click en deployment anterior
3. Click en "Promote to Production"

---

## 📞 Soporte

**Si tienes problemas:**
1. Revisa los logs: `vercel logs`
2. Verifica Vercel Dashboard
3. Revisa la consola del navegador (F12)
4. Verifica Firebase Console

---

**Última actualización:** 8 de diciembre de 2025  
**Workflow:** Git → GitHub → `vercel --prod` (manual)  
**Tiempo de deployment:** ~18-30 segundos  
**Estado:** Deployment automático NO funciona, usar CLI
