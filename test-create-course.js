// Test script para crear un curso de prueba
// Este script puede ejecutarse en la consola del navegador cuando estés logueado en /admin/courses

import { createCourse } from './src/services/api.js';

const testCourse = {
  title: "Introducción al Flamenco",
  description: "Aprende los fundamentos básicos del flamenco desde cero. Ideal para principiantes que quieren comenzar su viaje en este arte.",
  image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&h=600&fit=crop",
  price: "$35",
  level: "Principiante",
  duration: "3 horas",
  lessons: "3 lecciones",
  gumroadUrl: "https://gumroad.com/l/intro-flamenco"
};

// Ejecutar la creación del curso
createCourse(testCourse)
  .then(result => {
    console.log('✅ Curso creado exitosamente:', result);
    console.log('ID del curso:', result.id);
    console.log('Título:', result.title);
    console.log('Nivel:', result.level);
    console.log('Precio:', result.price);
  })
  .catch(error => {
    console.error('❌ Error al crear el curso:', error);
  });
