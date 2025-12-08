# 📋 Servicios Utilizados - Pablo Traberzo Web

## Inventario Completo de Servicios

### 🔥 Firebase (Google)

**Servicios utilizados:**
- Firebase Authentication (Google OAuth)
- Cloud Firestore (Database)

**Cuenta actual:** zgabros@gmail.com

**Costo:** Gratis (Spark Plan)

**Límites gratuitos:**
- Auth: 50k usuarios/mes
- Firestore: 50k lecturas/día, 20k escrituras/día

**Credenciales en:**
- `.env` local (no en Git)
- Vercel Environment Variables

**Variables:**
```
VITE_FIREBASE_API_KEY
VITE_FIREBASE_AUTH_DOMAIN
VITE_FIREBASE_PROJECT_ID
VITE_FIREBASE_STORAGE_BUCKET
VITE_FIREBASE_MESSAGING_SENDER_ID
VITE_FIREBASE_APP_ID
```

**Para handoff:**
1. Firebase Console → Project Settings → Users and permissions
2. Agregar `ptraberzo@gmail.com` como Owner
3. Pablo puede crear su propio proyecto Firebase si prefiere
4. Migrar datos de Firestore (exportar/importar)

**Mantener:** ✅ SÍ (según tu preferencia)

---

### ☁️ Vercel (Hosting & Deployment)

**Servicio:** Frontend hosting + automatic deployments

**Cuenta actual:** zgabros (GitHub)

**Costo:** Gratis (Hobby Plan)

**Límites gratuitos:**
- 100 GB bandwidth/mes
- Deployments ilimitados

**Conectado a:** GitHub repo (pablo-traberzo-web)

**Variables de entorno configuradas:** Todas las VITE_*

**Para handoff:**
1. Vercel Dashboard → Project Settings → Team
2. Invitar a Pablo (necesita cuenta de Vercel)
3. Transferir ownership del proyecto
4. O Pablo puede crear nuevo proyecto en su cuenta

**Alternativa:** Netlify, GitHub Pages, o cualquier hosting estático

**Para transferir:** ⚠️ RECOMENDADO

---

### 📧 EmailJS

**Servicio:** Envío de emails desde formulario de contacto

**Cuenta actual:** zgabros@gmail.com

**Costo:** Gratis

**Límites gratuitos:**
- 200 emails/mes

**Credenciales en:**
- `.env` local
- Vercel Environment Variables

**Variables:**
```
VITE_EMAILJS_SERVICE_ID
VITE_EMAILJS_TEMPLATE_ID
VITE_EMAILJS_PUBLIC_KEY
```

**Para handoff:**
1. EmailJS Dashboard → Account
2. Crear nueva cuenta para Pablo
3. Configurar servicio de email
4. Crear template
5. Actualizar variables en Vercel

**Para transferir:** ⚠️ RECOMENDADO

---

### ☁️ Cloudinary

**Servicio:** Almacenamiento y optimización de imágenes

**Cuenta actual:** zgabros

**Costo:** Gratis

**Límites gratuitos:**
- 25 GB storage
- 25 GB bandwidth/mes

**Credenciales en:**
- `.env` local
- Vercel Environment Variables

**Variables:**
```
VITE_CLOUDINARY_CLOUD_NAME
VITE_CLOUDINARY_UPLOAD_PRESET
```

**Para handoff:**
1. Cloudinary Dashboard → Settings → Access Control
2. Crear cuenta para Pablo
3. Transferir imágenes (download/upload)
4. Actualizar variables en Vercel

**Para transferir:** ⚠️ RECOMENDADO

---

### 💳 Gumroad

**Servicio:** Procesamiento de pagos para cursos

**Cuenta actual:** No configurada aún (solo URLs de ejemplo)

**Costo:** Gratis + 10% por transacción

**Para configurar:**
1. Pablo debe crear cuenta en Gumroad
2. Crear productos para cada curso
3. Obtener URLs de productos
4. Actualizar cursos en Firestore con URLs reales

**Propiedad:** Pablo (su cuenta de pagos)

---

### 🐙 GitHub

**Servicio:** Control de versiones y código fuente

**Cuenta actual:** zgabros

**Repo:** https://github.com/zgabros/pablo-traberzo-web

**Costo:** Gratis

**Para handoff:**
1. GitHub Repo → Settings → Collaborators
2. Agregar `ptraberzo` como colaborador
3. O transferir ownership del repo
4. Pablo puede hacer fork si prefiere

**Para transferir:** ⚠️ RECOMENDADO

---

## 📊 Resumen de Servicios

| Servicio | Cuenta Actual | Costo | Transferir | Prioridad |
|----------|---------------|-------|------------|-----------|
| **Firebase** | zgabros@gmail.com | Gratis | Opcional | Baja |
| **Vercel** | zgabros (GitHub) | Gratis | ✅ Sí | Alta |
| **EmailJS** | zgabros@gmail.com | Gratis | ✅ Sí | Alta |
| **Cloudinary** | zgabros | Gratis | ✅ Sí | Media |
| **Gumroad** | No config | 10%/venta | Pablo | Alta |
| **GitHub** | zgabros | Gratis | ✅ Sí | Alta |

---

## 🔄 Plan de Handoff Recomendado

### Opción A: Transferencia Completa (Recomendada)

**Servicios a transferir a Pablo:**
1. ✅ Vercel (hosting)
2. ✅ EmailJS (emails)
3. ✅ Cloudinary (imágenes)
4. ✅ GitHub (código)
5. ✅ Gumroad (pagos - su cuenta)

**Servicios que puedes mantener:**
- Firebase (si prefieres mantener control de la DB)

**Ventajas:**
- Pablo tiene control total
- No depende de tu cuenta
- Puede gestionar todo independientemente

**Tiempo estimado:** 2-3 horas

---

### Opción B: Acceso Compartido

**Agregar a Pablo como colaborador en:**
1. Firebase (Owner)
2. Vercel (Team member)
3. GitHub (Collaborator)

**Pablo crea sus propias cuentas:**
1. EmailJS
2. Cloudinary
3. Gumroad

**Ventajas:**
- Más rápido
- Acceso compartido
- Backup si algo falla

**Tiempo estimado:** 1 hora

---

## 📝 Checklist de Transferencia

### Antes de transferir:

- [ ] Documentar todas las credenciales
- [ ] Exportar datos de Firestore
- [ ] Descargar todas las imágenes de Cloudinary
- [ ] Hacer backup del código
- [ ] Documentar configuraciones especiales

### Durante la transferencia:

- [ ] Crear cuentas para Pablo en cada servicio
- [ ] Transferir ownership o agregar como colaborador
- [ ] Actualizar variables de entorno en Vercel
- [ ] Probar que todo funcione con nuevas credenciales

### Después de transferir:

- [ ] Verificar que Pablo puede hacer deployments
- [ ] Verificar que puede editar contenido en admin
- [ ] Verificar que emails se envían correctamente
- [ ] Verificar que imágenes se suben correctamente
- [ ] Documentar proceso para Pablo

---

## 🎓 Capacitación para Pablo

**Temas a cubrir:**

1. **Git básico**
   - `git add`, `git commit`, `git push`
   - Cómo hacer cambios y deployar

2. **Admin Panel**
   - Crear/editar/eliminar noticias
   - Crear/editar/eliminar cursos
   - Subir imágenes

3. **Vercel Dashboard**
   - Ver deployments
   - Ver logs
   - Configurar variables de entorno

4. **Firebase Console**
   - Ver datos en Firestore
   - Gestionar admins
   - Ver usuarios autenticados

5. **Gumroad**
   - Crear productos
   - Configurar precios
   - Ver ventas

---

## 💰 Costos Mensuales Estimados

**Gratis (dentro de límites):**
- Firebase: $0
- Vercel: $0
- EmailJS: $0
- Cloudinary: $0
- GitHub: $0

**Pagos:**
- Gumroad: 10% por venta
- Dominio personalizado: ~$12/año (opcional)

**Total:** $0-1/mes (sin contar ventas)

---

## 🆘 Soporte Post-Handoff

**Documentación creada:**
- ✅ Deployment workflow
- ✅ Admin panel usage
- ✅ Services inventory
- ✅ Feature roadmap

**Recursos:**
- Firebase Docs: https://firebase.google.com/docs
- Vercel Docs: https://vercel.com/docs
- React Docs: https://react.dev/

---

**Última actualización:** 8 de diciembre de 2025  
**Estado:** Listo para handoff  
**Recomendación:** Transferencia completa a Pablo
